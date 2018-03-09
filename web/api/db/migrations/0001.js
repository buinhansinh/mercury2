const query = require('../query')
const db = require('../connection')

module.exports = () => {
    return db.tx(t => {
        query(t).users.create()
        query(t).groups.create()
        query(t).usergroups.create()
    })
}