const DBException = require("../error");

const QUERY_USER_EXISTS = `SELECT count(id) > 0 from mercury.user WHERE name = $1 AND archived = FALSE`;

const user = db => {
  return {
    getAll: async (offset, limit) => {
      return db.any(
        `SELECT id, name, display_name, active FROM mercury.user WHERE archived = FALSE ORDER BY name LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
    },

    getById: async id => {
      return db.one(
        `SELECT id, name, display_name, active FROM mercury.user WHERE id = $1 AND archived = FALSE`,
        id
      );
    },

    getByName: async name => {
      return db.one(
        `SELECT id, name, display_name, active, salt, password FROM mercury.user WHERE name = $1 AND archived = FALSE`,
        name
      );
    },

    exists: async name => {
      return db.one(QUERY_USER_EXISTS, name);
    },

    insert: async user => {
      // ensure that username has no duplicate
      const exists = db.one(QUERY_USER_EXISTS, user.name);
      if (!exists) throw new DBException("Username already exists");
      return db.one(
        `INSERT INTO mercury.user (name, display_name, salt, password) 
          values($(name), $(display_name), $(salt), $(password))
          RETURNING id`,
        user
      );
    },

    update: async user => {
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
      return db.none(
        `UPDATE mercury.user SET
          password = $1, 
        WHERE id = $2`,
        [password, id]
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
        `SELECT p.id, p.name 
        FROM mercury.user_group ug 
        LEFT JOIN mercury.group_permission gp ON ug.group_id = gp.group_id
        LEFT JOIN mercury.permission p ON gp.permission_id = p.id
        WHERE ug.user_id = $1`,
        userId
      );
    }
  };
};

module.exports = user;
