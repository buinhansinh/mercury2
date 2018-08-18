const migrate = require("./db/migration");
const mock = require("./db/mock");
const schedule = require("node-schedule");

const init = async () => {
  // Do db migrations
  await migrate();

  // Fill db with test data
  // await mock()

  // init database enums

  // set default users

  // Schedule jobs

  // var j = schedule.scheduleJob('42 * * * * *', function(){
  //   console.log('The answer to life, the universe, and everything!');
  // });
};

module.exports = init;
