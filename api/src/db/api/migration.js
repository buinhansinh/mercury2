const migration = (db) => {
    return {
        create: () => {
          return db.none(`
            create table if not exists mercury.migration (
              number serial,
              name varchar(128));`)
        },
        drop: () => {
            return db.none(`
                drop table if exists mercury.migration`)
        },
        exists: (number) => {
            return db.one(`
                select exists (
                    select 1 
                    from mercury.migration
                    where number = $1);`, 
                number)
        },
        insert: (name) => {
            return db.none(`
                insert into mercury.migration (name)
                    values ($1);`,
                name)
        }
    }
}

module.exports = migration