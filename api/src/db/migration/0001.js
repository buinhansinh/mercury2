const db = require('../api/connection')

module.exports = () => {
    return db.tx(t => {
        t.none(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)

        t.none(`create table user_ (
            uuid uuid primary key,
            name        varchar(64),
            firstName   varchar(128),
            lastName    varchar(128),
            salt        varchar(16),
            password    varchar(64),
            groups      bigint
        );`)
    })
}