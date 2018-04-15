const crypto = require("crypto");

const user = (db) => {
    return {
        getAll: async () => {
            return db.any(`select uuid as id, name, firstName, lastName, groups from user_`)
        },

        getById: async id => {
            console.log(id)
            return db.one(`select uuid as id, name, firstName, lastName, groups from user_ where uuid = $1`, id)
        },

        exists: async name => {
            return db.one(`select count(*) from user_ where name = $1`, name)
        },

        insert: async user => {
            // user["salt"] = crypto.randomBytes(16).toString("hex");
            return db.one(`insert into user_ (uuid, name, firstName, lastName, salt, password, groups) 
                values(uuid_generate_v4(), $(name), $(firstName), $(lastName), $(salt), $(password), $(groups))
                returning uuid as id`, user)
        },

        // // insert one or many users
        // insert: async users => {
        //     // ensure what is passed in is an array
        //     users = Array.isArray(users) ? users : [users]

        //     // salt em all
        //     for (let u of users) {
        //         u["salt"] = crypto.randomBytes(16).toString("hex");
        //     }

        //     // generate a multi-row insert query
        //     const cs = new pgp.helpers.ColumnSet(
        //         [
        //             'name',
        //             'firstName',
        //             'lastName',
        //             'salt',
        //             'password',
        //             'groups'
        //         ], {
        //             table: "user_"
        //         }
        //     )
        //     const query = pgp.helpers.insert(users, cs)

        //     // executing the query:
        //     return await db.none(query)
        // },

        update: async user => {
            return db.one(`
                update user_ set
                    name = $(name), 
                    firstName = $(firstName), 
                    lastName = $(lastName), 
                    groups = $(groups) 
                where id = $(id)
                returning id, name, firstName, lastName, groups`, user)
        },

        updatePassword: async (id, password) => {
            return db.one(`
                update user_ set 
                    password = $1, 
                where id = $2
                returning id`, [ password, id ])
        }
    }
};

module.exports = user