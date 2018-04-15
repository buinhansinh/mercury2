const logger = require('../../common/log')
const query = require('../api/query')
const db = require('../api/connection')

// migrations
const m0001 = require('./0001')
var migrations = [
    ['init', m0001],
]

// do migration
const migrate = async () => {

    // drop everything first - TODO: remove on production
    await query(db).table.dropAll()

    // ensure migration table exists
    await query(db).migration.create()

    // do migrations
    for (let [index, val] of migrations.entries()) {
        let res = await query(db).migration.exists(index+1)
        if (!res.exists)
            try {
                await val[1]()
                await query(db).migration.insert(val[0])
                logger.log('info', `migration ${val[0]} success`)
            } catch (e) {
                logger.log('error', `migration ${val[0]} failed: ${e}`)
            }
        else
            logger.log('info', `migration ${val[0]} skipped`)
    }

    logger.log('info', `migrations complete`)
}

module.exports = migrate