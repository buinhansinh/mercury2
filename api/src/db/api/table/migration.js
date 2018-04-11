const migration = (db) => {
    return {
        create: () => {
            return db.none(`
                CREATE TABLE IF NOT EXISTS migration (
                    number serial,
                    name varchar(128));`)
        },
        drop: () => {
            return db.none(`
                DROP TABLE IF EXISTS migration`)
        },
        exists: (number) => {
            return db.one(`
                SELECT EXISTS (
                    SELECT 1 
                    FROM migration
                    WHERE number = $1);`, 
                number)
        },
        insert: (name) => {
            return db.none(`
                INSERT INTO migration (name)
                    VALUES ($1);`,
                name)
        }
    }
}

module.exports = migration