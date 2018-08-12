const db = require("../connection");

module.exports = () => {
  return db.tx(t => {
    t.none(`create table if not exists 
            mercury.user (
              id              uuid primary key,
              name            char(32) not null unique,
              display_name    char(64) not null,
              salt            char(16) not null,
              password        char(64) not null,
              profile         jsonb,
              photo           bytea
            );`);

    t.none(`create table if not exists 
            mercury.group (
              id              uuid primary key,
              name            char(64) not null unique
            );`);

    t.none(`create table if not exists 
            mercury.permission (
              id              smallint primary key,
              name            char(64) not null unique
            );`);

    t.none(`create table if not exists 
            mercury.user_group (
              user_id          uuid references mercury.user(id),
              group_id         uuid references mercury.group(id)
            );`);

    return t.none(`create table if not exists 
            mercury.group_permission (
              group_id         uuid references mercury.group(id),
              permission_id    smallint references mercury.permission(id)
            );`);
  });
};
