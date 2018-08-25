const DBException = require("../error");
const bcrypt = require("bcryptjs");

const QUERY_USER_EXISTS = `SELECT count(id) > 0 as exists from mercury.user WHERE name = $1 AND archived = FALSE`;

const user = db => {
  return {
    getAll: async (offset, limit) => {
      return db.any(
        `SELECT id, name, display_name, active, COUNT(id) OVER() FROM mercury.user WHERE archived = FALSE ORDER BY name LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
    },

    // getAllCount: async () => {
    //   return db.one(
    //     `SELECT COUNT(id) FROM mercury.user WHERE archived = FALSE`
    //   );
    // },

    getById: async id => {
      return db.oneOrNone(
        `SELECT id, name, display_name, active FROM mercury.user WHERE id = $1 AND archived = FALSE`,
        id
      );
    },

    getByName: async name => {
      return db.oneOrNone(
        `SELECT id, name, display_name, active, salt, password FROM mercury.user WHERE name = $1 AND archived = FALSE`,
        name
      );
    },

    exists: async name => {
      const ret = await db.one(QUERY_USER_EXISTS, name);
      return ret.exists;
    },

    search: async (name, limit, offset) => {
      console.log(name, limit, offset);
      return db.any(
        `SELECT id, name, display_name, active, COUNT(id) OVER() FROM mercury.user WHERE name LIKE '%$1#%' LIMIT $2 OFFSET $3`,
        [ name, limit, offset ]
      );
    },

    insert: async user => {
      user.salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, user.salt);      
      return db.one(
        `INSERT INTO mercury.user (name, display_name, salt, password) 
          values($(name), $(display_name), $(salt), $(password))
          RETURNING id`,
        user
      );
    },

    update: async (id, user) => {
      return db.none(
        `UPDATE mercury.user SET
          name = $(name),
          display_name = $(display_name),
          active = $(active)
        WHERE id = $(id)`,
        user
      );
    },

    deleteById: async id => {
      return db.none(
        `UPDATE mercury.user SET
          archived = TRUE
          WHERE id = $1`,
        id
      );
    },

    updatePassword: async (id, password) => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      return db.none(
        `UPDATE mercury.user SET
          salt = $1,
          password = $2
        WHERE id = $3`,
        [salt, hash, id]
      );
    },

    groups: async id => {
      return db.any(
        `SELECT group_id FROM mercury.user_group WHERE user_id = $1`,
        id
      );
    },

    permissions: async userId => {
      return db.any(
        `SELECT gp.permission_id
        FROM mercury.user_group ug 
        LEFT JOIN mercury.group_permission gp ON ug.group_id = gp.group_id
        WHERE ug.user_id = $1`,
        userId
      );
    }
  };
};

module.exports = user;
