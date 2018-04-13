const crypto = require("crypto");

const user = (db) => {
    return {
        getById: async id => {
            return await db.oneOrNone(`select * from user_ where uuid = $1`, id)
        },

        getByName: async name => {
            return await db.oneOrNone(`select * from user_ where name = $1`, name)
        },

        insert: async user => {
            user["salt"] = crypto.randomBytes(16).toString("hex");
            return await db.one(`insert into user_(name, firstName, lastName, salt, password, groups) 
                values($(name), $(firstName), $(lastName), $(salt), $(password), $(groups))`, user)
        },

        insertMany: async users => {
            const cs = new pgp.helpers.ColumnSet(
                [
                    'name',
                    'firstName',
                    'lastName',
                    'salt',
                    'password',
                    'groups'
                ],
                { table: "user_" }
            )

            // generating a multi-row insert query:
            const query = pgp.helpers.insert(users, cs)

            // executing the query:
            return await db.none(query)
        }
    }
};

module.exports = user