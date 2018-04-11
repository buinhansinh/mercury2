const migration = require("./table/migration")

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
    
    const user = {
        create: () => {
            return db.none(`CREATE TABLE user_ (
                uuid uuid PRIMARY KEY,
                name varchar(64),
                salt varchar(128),
                password varchar(128));`)
        }
    }

    const group = {
        create: () => {
            return db.none(`CREATE TABLE group_ (
                uuid uuid PRIMARY KEY,
                name varchar(64));`)            
        }
    }

    const usergroup = {
        create: () => {
            return db.none(`CREATE TABLE usergroup (
                userId uuid REFERENCES user_,
                groupId uuid REFERENCES group_);`)
        }
    }

    return {
        table: table,
        migration: migration(db),
        user: user,
        group: group,
        usergroup: usergroup,
    }
}

module.exports = query