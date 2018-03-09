const migrate = require('./db/migrate.js')

const init = () => {
    // Do db migrations
    migrate()

    // Schedule jobs
    var schedule = require('node-schedule');

    // var j = schedule.scheduleJob('42 * * * * *', function(){
    //   console.log('The answer to life, the universe, and everything!');
    // });
}

module.exports = init;