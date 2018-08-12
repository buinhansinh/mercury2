const QUERY_GET_CONTACT_ACCOUNT = `
  SELECT DISTINCT ON(contact_id) account_id 
    FROM mercury.contact_account_link AS cal 
    WHERE contact_id = $1
    ORDER BY timestamp DESC`

const QUERY_LINK_CONTACT_ACCOUNT = `
  INSERT INTO mercury.contact_account_link (account_id, contact_id)
    values($1, $2)`

const contact = db => {
  return {
    getAll: async (offset = 0, limit = 10) => {
      return db.any(
        `SELECT id, name, hidden FROM mercury.contact LIMIT $1 OFFSET $2 ORDER BY name`,
        [limit, offset]
      );
    },

    getById: async id => {
      return db.any(`
        SELECT DISTINCT ON (contact_id) contact_id as id, profile 
          FROM mercury.contact_info
          WHERE contact_id = id
          ORDER BY timestamp DESC`,
        id
      );
    },

    search: async name => {
      return db.any(`
        SELECT DISTINCT ON (contact.id) contact.id as id, contact.hidden as hidden, info.profile as profile
        OVER (PARTITION BY contact.id ORDER BY info.timestamp DESC)
        FROM
          (SELECT id FROM mercury.contact WHERE name LIKE %$1:value%) AS contact 
          LEFT JOIN mercury.contact_info as info ON info.contact_id = contact.id`, 
        name
      );
    },

    exists: async name => {
      return db.one(`select count(id) > 0 from mercury.contact where name = $1`, name);
    },

    account: async id => {
      return db.one(QUERY_GET_CONTACT_ACCOUNT, id);
    },

    insert: async contact => {
      return db.tx(t => {
        // insert a new contact
        const contact_id = t.one(`
          insert into mercury.contact (name)
            values (name)
            returning id`);
        
        // insert a new contact account
        const account_id = t.one(`
          insert into mercury.contact_account (id)
            values(uuid_generate_v4())
            returning id`);

        // link the account to the contact
        t.none(QUERY_LINK_CONTACT_ACCOUNT, [account_id, contact_id]);

        // insert the contact info
        return t.one(`
          insert into mercury.contact_info (contact_id, profile) 
            values($1, $2)
            returning contact_id`,
          [contact_id, contact]
        );
      });
    },

    update: async contact => {
      return db.tx(t => {
        t.none(`
          update mercury.contact set 
            name = $(name), 
          where id = $(id)`,
          contact
        );

        return t.one(`
          insert into mercury.contact_info (contact_id, profile) 
            values($(id), $(this))
            returning contact_id`,
          contact);
      });
    },

    merge: async (id_fr, id_to) => {
      return db.tx(t => {
        const act_fr = t.one(QUERY_GET_CONTACT_ACCOUNT, id_fr);
        return t.none(QUERY_LINK_CONTACT_ACCOUNT, [act_fr, id_to]);
      });
    },
  };
};

module.exports = contact;
