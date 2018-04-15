const db = require('../api/connection')

module.exports = () => {
    return db.tx(t => {
        t.none(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)

        t.none(`create table user_ (
            id          uuid primary key,
            name        varchar(64) not null unique,
            display_name varchar(128),
            salt        varchar(16) not null,
            password    varchar(64) not null,
            groups      bigint not null default 0,
            profile     jsonb,
            photo       bytea
        );`)
    })
}