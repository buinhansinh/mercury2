const crypto = require("crypto");

const user = db => {
  return {
    getAll: async () => {
      return db.any(`select id, name, display_name, groups from mercury.user`);
    },

    getById: async id => {
      return db.one(
        `select id, name, display_name, groups from mercury.user where id = $1`,
        id
      );
    },

    exists: async name => {
      return db.one(`select count(*) from mercury.user where name = $1`, name);
    },

    insert: async user => {
      // user["salt"] = crypto.randomBytes(16).toString("hex");
      return db.one(`
        insert into mercury.user (id, name, display_name, salt, password, groups) 
          values(uuid_generate_v4(), $(name), $(display_name), $(salt), $(password), $(groups))
          returning id`,
        user
      );
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
    //             table: "mercury.user"
    //         }
    //     )
    //     const query = pgp.helpers.insert(users, cs)

    //     // executing the query:
    //     return await db.none(query)
    // },

    update: async user => {
      return db.none(`
        update mercury.user set
          name = $(name), 
          display_name = $(display_name), 
          groups = $(groups) 
        where id = $(id)`,
        user
      );
    },

    updatePassword: async (id, password) => {
      return db.none(`
        update mercury.user set 
          password = $1, 
        where id = $2`,
        [password, id]
      );
    }
  };
};

module.exports = user;
