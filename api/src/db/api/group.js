const group = db => {
  return {
    getAll: async (offset, limit) => {
      return db.any(
        `SELECT id, name FROM mercury.group ORDER BY name LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
    },

    getById: async id => {
      return db.one(`SELECT id, name FROM mercury.group WHERE id = $1`, id);
    },

    getByName: async name => {
      return db.one(
        `SELECT id, name FROM mercury.group WHERE name = $1`,
        name
      );
    },

    exists: async name => {
      return db.one(`SELECT id, name FROM mercury.group WHERE name = $1`, name);
    },

    insert: async group => {
      return db.one(
        `INSERT INTO mercury.group (name) 
          values($(name))
          RETURNING id`,
        group
      );
    },

    update: async group => {
      return db.none(
        `UPDATE mercury.group SET
          name = $(name)
        WHERE id = $(id)`,
        group
      );
    },

    deleteById: async id => {
      return db.none(
        `DELETE FROM mercury.group
          WHERE id = $1`,
        id
      );
    },

    addUser: async (id, userId) => {
      return db.none(
        `INSERT INTO mercury.user_group (user_id, group_id)
          values($1, $2)`,
        [userId, id]
      );
    },

    removeUser: async (id, userId) => {
      return db.none(
        `DELETE FROM mercury.user_group 
          WHERE user_id = $1 AND group_id = $2`,
        [userId, id]
      );
    },

    permissions: async id => {
      return db.any(
        `SELECT permission_id FROM mercury.group_permission WHERE group_id = $1`,
        id
      );
    },

    addPermission: async (groupId, permissionId) => {
      return db.none(
        `INSERT INTO mercury.group_permission (group_id, permission_id)
          values($1, $2)`,
        [groupId, permissionId]
      );
    },

    removePermission: async (groupId, permissionId) => {
      return db.none(
        `DELETE FROM mercury.group_permission
          WHERE group_id = $1 AND permission_id = $2`,
        [groupId, permissionId]
      );
    }
  };
};

module.exports = group;
