const db = require("../connection");

module.exports = () => {
  return db.tx(t => {
    // t.none(`create extension if not exists "uuid-ossp";`);
    // t.none(`create schema if not exists mercury;`);
    // t.none(`grant all on schmema mercury to postgres;`);
  });
};
