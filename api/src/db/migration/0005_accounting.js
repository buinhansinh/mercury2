const db = require("../connection");

module.exports = () => {
  return db.tx(t => {
    const invoice_columns = `
      (
        id              uuid primary key,
        document_id     uuid not null references mercury.document(id),
        contact_id      uuid not null references mercury.contact_account(id),
        date            date not null,
        amount          money not null,
        discounts       jsonb,
        discount        money not null,
        allocated       money not null default 0,
        check (allocated <= amount - discount)
      );`;

    const payment_columns = `
      (
        id              uuid primary key,
        document_id     uuid not null references mercury.document(id),
        contact_id      uuid not null references mercury.contact_account(id),
        date            date not null,                
        amount          money not null default 0,
        allocated       money not null default 0,
        check (allocated <= amount)
      );`;

    // RECEIVABLES

    t.none("create table if not exists mercury.receivable" + invoice_columns);

    t.none("create table if not exists mercury.collection" + payment_columns);

    t.none(`create table if not exists 
            mercury.collection_allocation (
              collection_id   uuid not null references mercury.collection(id),
              receivable_id   uuid not null references mercury.receivable(id),
              amount          money not null
            );`);

    // PAYABLES

    t.none("create table if not exists mercury.payable" + invoice_columns);

    t.none("create table if not exists mercury.disbursement" + payment_columns);

    t.none(`create table if not exists 
            mercury.disbursement_allocation (
              disbursement_id uuid not null references mercury.disbursement(id),
              payable_id      uuid not null references mercury.payable(id),
              amount          money not null
            );`);

    // EXPENSE

    return t.none(`create table if not exists 
            mercury.expense (
              id              uuid primary key,
              document_id     uuid not null references mercury.document(id),
              amount          money not null
            );`);
  });
};
