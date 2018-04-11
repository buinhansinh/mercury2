const query = require('../api/query')
const db = require('../api/connection')

module.exports = () => {
    return db.tx(t => {
        query(t).user.create()
        query(t).group.create()
        query(t).usergroup.create()
    })
}