const migration = require("./table/migration")
const user = require("./table/user");

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
    
    return {
        table: table,
        migration: migration(db),
        user: user(db),
    }
}

module.exports = query