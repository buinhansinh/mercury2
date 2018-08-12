const db = require('./connection')
const q = require('./query')
const USERS = require('./mock/user')

const mock = async () => {
    // db.tx(t => {
    //     USERS.forEach(async u => {
    //         let x = await q(t).user.insert(u)
    //         console.log(x)
    //     });
    // })
}

module.exports = mock