const db = require('../api/connection')

module.exports = () => {
    return db.tx(t => {
        t.none(`create extension if not exists "uuid-ossp";`)

        // COMPANY

        t.none(`create table if not exists 
            user_ (
                id              uuid primary key,
                name            char(64) not null unique,
                display_name    char(64) not null,
                salt            char(16) not null,
                password        char(64) not null,
                groups          bigint not null default 0,
                profile         jsonb,
                photo           bytea
            );`)

        t.none(`create table if not exists 
            contact (
                id              uuid primary key,
                name            char(256) not null unique,
                hidden          boolean default false,
                profile         jsonb
            );`)

        t.none(`create table if not exists
            contact_merge (
                a               uuid not null references contact(id),
                b               uuid not null references contact(id),
                check (a != b)
            );`)

        t.none(`create table if not exists 
            product (
                id              uuid primary key,
                brand           char(64),
                category        char(64),
                model           char(64),
                specs           char(256),
                type            smallint not null default 0,
                hidden          boolean default false,
                profile         jsonb
            );`)

        t.none(`create table if not exists
            product_merge (
                a               uuid not null references product(id),
                b               uuid not null references product(id),
                check (a != b)
            );`)

        t.none(`create table if not exists
            service (
                id              uuid primary key,
                name            char(64),
                description     jsonb
            );`)

        t.none(`create table if not exists 
            location (
                id              uuid primary key,
                name            char(256) not null,
                profile         jsonb
            );`)

        // DOCUMENT

        t.none(`create table if not exists 
            document_revision (
                id              uuid primary key,
                user_id         uuid not null references user_(id),
                date            timestamp not null default now(),
                content         jsonb
            );`)

        t.none(`create table if not exists 
            document (
                id              uuid primary key,
                parent_id       uuid references document(id),
                revision_id     uuid references document_revision(id),
                contact_id      uuid references contact(id),
                type            smallint not null default 0,
                status          smallint not null default 0,
                date            date not null default now(),
                ref_no          char(32)
            );`)

        // INVENTORY

        const inventory_columns = `
            (
                id              uuid primary key,
                document_id     uuid not null references document(id),
                contact_id      uuid not null references contact(id),
                product_id      uuid not null references product (id),
                location_id     uuid not null references location (id),
                date            date not null,
                price           money not null,
                quantity        money not null,
                allocated       money not null,
                check (allocated <= quantity)
            );`

        t.none('create table if not exists inventory_in' + inventory_columns)

        t.none('create table if not exists inventory_out' + inventory_columns)

        t.none(`create table if not exists 
            inventory_allocation (
                in_id           uuid not null references inventory_in (id),
                out_id          uuid not null references inventory_out (id),
                quantity        money not null
            );`)

        const receivable_columns = `
            (
                id              uuid primary key,
                document_id     uuid not null references document(id),
                contact_id      uuid not null references contact(id),
                date            date not null,
                gross_amount    money not null,
                total_discount  money not null,
                discounts       jsonb,
                net_amount      money not null,
                allocated       money not null default 0,
                check (allocated <= net_amount),
                check (net_amount = gross_amount - total_discount)
            );`

        const payment_columns = `
            (
                id              uuid primary key,
                document_id     uuid not null references document(id),
                contact_id      uuid not null references contact(id),
                date            date not null,                
                amount          money not null default 0,
                allocated       money not null default 0,
                check (allocated <= amount)
            );`

        // RECEIVABLES

        t.none('create table if not exists receivable' + receivable_columns)

        t.none('create table if not exists payment' + payment_columns)

        t.none(`create table if not exists 
            payment_allocation (
                payment_id      uuid not null references payment(id),
                receivable_id   uuid not null references receivable(id),
                amount          money not null
            );`)

        // PAYABLES

        t.none('create table if not exists payable' + receivable_columns)

        t.none('create table if not exists disbursement' + payment_columns)

        t.none(`create table if not exists 
            disbursement_allocation (
                disbursement_id uuid not null references disbursement(id),
                payable_id      uuid not null references payable(id),
                amount          money not null
            );`)

        // EXPENSE

        t.none(`create table if not exists 
            expense (
                id              uuid primary key,
                document_id     uuid not null references document(id),
                amount          money not null
            );`)
        
    })

}