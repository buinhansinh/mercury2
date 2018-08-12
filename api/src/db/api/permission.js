const permission = db => {
  return {
    getAll: async (offset, limit) => {
      return db.any(
        `SELECT id, name FROM mercury.permission ORDER BY name LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
    },

    getById: async id => {
      return db.one(`SELECT id, name FROM mercury.permission WHERE id = $1`, id);
    },

    exists: async name => {
      return db.one(`SELECT id, name FROM mercury.permission WHERE name = $1`, name);
    },

    insert: async permission => {
      return db.one(
        `INSERT INTO mercury.permission (id, name) 
          values($(id), $(name))
          RETURNING id`,
        permission
      );
    },

    update: async permission => {
      return db.none(
        `UPDATE mercury.permission SET
          name = $(name), 
        WHERE id = $(id)`,
        permission
      );
    },

    deleteById: async id => {
      return db.none(
        `DELETE FROM mercury.permission
          WHERE id = $1`,
        id
      );
    },
  };
};

module.exports = permission;
