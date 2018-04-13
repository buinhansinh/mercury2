const db = require('../api/connection')

module.exports = () => {
    return db.tx(t => {
        t.none(`create table user_ (
            uuid uuid primary key,
            name        char(64),
            firstName   char(128),
            lastName    char(128),
            salt        char(16),
            password    char(64),
            groups      bigint
        );`);
    })
}