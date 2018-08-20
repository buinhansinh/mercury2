const db = require("../connection");

module.exports = () => {
  return db.tx(t => {
    t.none(`create table if not exists 
            mercury.user (
              id              uuid primary key default uuid_generate_v4(),
              name            char(32) not null,
              display_name    char(64) not null,
              salt            char(64) not null,
              password        char(60) not null,
              active          boolean default TRUE,
              archived        boolean default FALSE,
              profile         jsonb,
              photo           bytea
            );`);

    t.none(`create table if not exists 
            mercury.group (
              id              uuid primary key default uuid_generate_v4(),
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
              group_id         uuid references mercury.group(id) ON DELETE CASCADE,
              primary key (user_id, group_id)
            );`);

    return t.none(`create table if not exists 
            mercury.group_permission (
              group_id         uuid references mercury.group(id) ON DELETE CASCADE,
              permission_id    smallint references mercury.permission(id) ON DELETE CASCADE,
              primary key (group_id, permission_id)
            );`);
  });
};
