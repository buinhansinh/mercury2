const migrate = require('./db/migration/migrate')
const mock = require('./db/mock/mock')
const schedule = require('node-schedule');

const init = async () => {
    // Do db migrations
    await migrate()

    // Fill db with test data
    await mock()

    // Schedule jobs

    // var j = schedule.scheduleJob('42 * * * * *', function(){
    //   console.log('The answer to life, the universe, and everything!');
    // });
}

module.exports = init;