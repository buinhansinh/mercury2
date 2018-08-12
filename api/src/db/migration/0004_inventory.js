const db = require("../connection");

module.exports = async () => {
  return await db.tx(t => {
    const inventory_columns = `
      (
        id              uuid primary key,
        document_id     uuid not null references mercury.document(id),
        contact_id      uuid references mercury.contact_account(id),
        offer_id        uuid not null references mercury.offer_account(id),
        location_id     uuid not null references mercury.location_account(id),
        date            date not null,
        price           money not null,
        quantity        money not null,
        allocated       money not null,
        check (allocated <= quantity)
      );`;

    t.none("create table if not exists mercury.inventory_receipt" + inventory_columns);

    t.none("create table if not exists mercury.inventory_release" + inventory_columns);

    return t.none(`create table if not exists 
            mercury.inventory_allocation (
              receipt_id      uuid not null references mercury.inventory_receipt (id),
              release_id      uuid not null references mercury.inventory_release (id),
              quantity        money not null,
              primary key(receipt_id, release_id)
            );`);

    
  });
};
