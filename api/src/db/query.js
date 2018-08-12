const migration = require("./api/migration");
const user = require("./api/user");
const group = require("./api/group");
const permission = require("./api/permission");
const contact = require("./api/contact");

const query = db => {
  const table = {
    init: () => {
      return db.none(`
        CREATE SCHEMA IF NOT EXISTS public;
        CREATE SCHEMA IF NOT EXISTS mercury;
        GRANT ALL ON SCHEMA mercury TO postgres;
        create extension if not exists "uuid-ossp";
      `);
    },

    getAll: () => {
      return db.any(`
        SELECT * FROM pg_catalog.pg_tables WHERE schemaname = 'mercury';
      `);
    },

    exists: tablename => {
      return db.one(
        `
        SELECT EXISTS (
        SELECT 1 
        FROM pg_tables
        WHERE tablename = $1);`,
        tablename
      );
    },

    dropAll: () => {
      return db.none(`
        DROP SCHEMA IF EXISTS public CASCADE;
        DROP SCHEMA IF EXISTS mercury CASCADE;
      `);
    }
  };

  return {
    table: table,
    migration: migration(db),
    user: user(db),
    group: group(db),
    permission: permission(db),
    contact: contact(db)
  };
};

module.exports = query;
