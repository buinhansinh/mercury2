const db = require("../connection");

module.exports = () => {
  return db.tx(t => {
    t.none(`create table if not exists 
            mercury.document_type (
              id              smallint primary key,
              name            varchar(32)
            );`);

    t.none(`create table if not exists 
            mercury.document_status (
              id              smallint primary key,
              name            varchar(32)
            );`);

    t.none(`create table if not exists 
            mercury.document (
              id              uuid primary key,
              parent_id       uuid references mercury.document(id),
              contact_id      uuid references mercury.contact_account(id),
              type            smallint references mercury.document_type(id),
              status          smallint references mercury.document_status(id),
              date            date not null default now(),
              ref_no          varchar(32)
            );`);

    return t.none(`create table if not exists 
            mercury.document_revision (
              document_id     uuid not null references mercury.document(id),
              timestamp       timestamp not null default now(),
              user_id         uuid not null references mercury.user(id),
              content         jsonb,
              primary key(document_id, timestamp)
            );`);
  });
};
