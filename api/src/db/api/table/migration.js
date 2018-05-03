const migration = (db) => {
    return {
        create: () => {
            return db.none(`
                create table if not exists migration (
                    number serial,
                    name varchar(128));`)
        },
        drop: () => {
            return db.none(`
                drop table if exists migration`)
        },
        exists: (number) => {
            return db.one(`
                select exists (
                    select 1 
                    from migration
                    where number = $1);`, 
                number)
        },
        insert: (name) => {
            return db.none(`
                insert into migration (name)
                    values ($1);`,
                name)
        }
    }
}

module.exports = migration