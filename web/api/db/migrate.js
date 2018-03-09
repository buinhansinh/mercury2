const logger = require('../common/log')
const query = require('./query')
const db = require('./connection')

// migrations
const m0001 = require('./migrations/0001')
var migrations = [
    ['init', m0001],
]

// do migration
const migrate = async () => {

    // drop everything first - TODO: remove on production
    await query(db).table.dropAll()

    // ensure migration table exists
    await query(db).migrations.create()

    // do migrations
    for (let [index, val] of migrations.entries()) {
        let res = await query(db).migrations.exists(index+1)
        if (!res.exists)
            try {
                await val[1]()
                await query(db).migrations.insert(val[0])
                logger.log('info', `migration ${val[0]} success`)
            } catch (e) {
                logger.log('error', `migration ${val[0]} failed: ${e}`)
            }
        else
            logger.log('info', `migration ${val[0]} skipped`)
    }
}

module.exports = migrate