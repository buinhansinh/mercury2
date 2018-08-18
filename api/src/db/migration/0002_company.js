const db = require("../connection");

module.exports = () => {
  return db.tx(t => {
    t.none(`create table if not exists
            mercury.contact (
              id              uuid primary key default uuid_generate_v4(),
              name            varchar(256),
              archived        boolean default FALSE
            );`);

    t.none(`create table if not exists 
            mercury.contact_info (
              contact_id      uuid not null references mercury.contact(id),
              timestamp       timestamp default now(),
              profile         jsonb,
              primary key(contact_id, timestamp)
            );`);

    t.none(`create table if not exists
            mercury.contact_account (
              id              uuid primary key default uuid_generate_v4()
            );`);

    t.none(`create table if not exists
            mercury.contact_account_link (
              account_id      uuid not null references mercury.contact_account(id),
              contact_id      uuid not null references mercury.contact(id),
              timestamp       timestamp default now(),
              primary key(account_id, timestamp)
            );`);

    t.none(`create table if not exists
            mercury.offer (
              id              uuid primary key default uuid_generate_v4(),
              type            smallint not null default 0,
              description     varchar(256),
              archived        boolean
            );`);

    t.none(`create table if not exists
            mercury.offer_info (
              id              uuid not null references mercury.offer(id),
              timestamp       timestamp default now(),
              profile         jsonb,
              primary key(id, timestamp)
            );`);

    t.none(`create table if not exists
            mercury.offer_account (
              id              uuid primary key default uuid_generate_v4()
            );`);

    t.none(`create table if not exists
            mercury.offer_account_link (
              id              uuid not null references mercury.offer_account(id),
              contact_id      uuid not null references mercury.offer(id),
              timestamp       timestamp default now(),
              primary key(id, timestamp)
            );`);

    t.none(`create table if not exists
            mercury.location (
              id              uuid primary key default uuid_generate_v4(),
              name            varchar(64) not null unique,
              archived        boolean
            );`);

    t.none(`create table if not exists
            mercury.location_info (
              id              uuid not null references mercury.location(id),
              timestamp       timestamp default now(),
              profile         jsonb
            );`);

    t.none(`create table if not exists
            mercury.location_account (
              id              uuid primary key default uuid_generate_v4()
            );`);

    return t.none(`create table if not exists
            mercury.location_account_link (
              id              uuid not null references mercury.location_account(id),
              location_id     uuid not null references mercury.location(id),
              timestamp       timestamp default now(),
              primary key(id, timestamp)
            );`);
  });
};
