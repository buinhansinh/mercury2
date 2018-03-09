const migrations = require("./tables/migrations")

const query = (db) => {

    const table = {
        exists: (tablename) => {
            return db.one(`
                SELECT EXISTS (
                SELECT 1 
                FROM pg_tables
                WHERE tablename = $1);`, 
                tablename);
        },
    
        dropAll: () => {
            return db.none(`
                DROP SCHEMA public CASCADE;
                CREATE SCHEMA public;
                GRANT ALL ON SCHEMA public TO postgres;
                GRANT ALL ON SCHEMA public TO public;
                COMMENT ON SCHEMA public IS 'standard public schema';`)
        }
    }
    
    const users = {
        create: () => {
            return db.none(`CREATE TABLE users (
                uuid uuid PRIMARY KEY,
                name varchar(64),
                salt varchar(128),
                password varchar(128));`)
        }
    }

    const groups = {
        create: () => {
            return db.none(`CREATE TABLE groups (
                uuid uuid PRIMARY KEY,
                name varchar(64));`)            
        }
    }

    const usergroups = {
        create: () => {
            return db.none(`CREATE TABLE usergroups (
                userId uuid REFERENCES users,
                groupId uuid REFERENCES groups);`)
        }
    }

    return {
        table: table,
        migrations: migrations(db),
        users: users,
        groups: groups,
        usergroups: usergroups,
    }
}

module.exports = query