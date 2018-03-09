const migrations = (db) => {
    return {
        create: () => {
            return db.none(`
                CREATE TABLE IF NOT EXISTS migrations (
                    number serial,
                    name varchar(128));`)
        },
        drop: () => {
            return db.none(`
                DROP TABLE IF EXISTS migrations`)
        },
        exists: (number) => {
            return db.one(`
                SELECT EXISTS (
                    SELECT 1 
                    FROM migrations
                    WHERE number = $1);`, 
                number)
        },
        insert: (name) => {
            return db.none(`
                INSERT INTO migrations (name)
                    VALUES ($1);`,
                name)
        }
    }
}

module.exports = migrations