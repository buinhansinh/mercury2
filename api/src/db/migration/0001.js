const query = require('../api/query')
const db = require('../api/connection')

module.exports = () => {
    return db.tx(t => {
        t.none(`CREATE TABLE user_ (
            uuid uuid PRIMARY KEY,
            name varchar(64),
            salt varchar(128),
            password varchar(128),
            groups bit(6)
        );`)
    })
}