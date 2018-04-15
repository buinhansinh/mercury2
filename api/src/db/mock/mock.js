const db = require('../api/connection')
const q = require('../api/query')
const USERS = require('./user')

const mock = async () => {
    db.tx(t => {
        USERS.forEach(async u => {
            let x = await q(t).user.insert(u)
            console.log(x)
        });
    })
}

module.exports = mock