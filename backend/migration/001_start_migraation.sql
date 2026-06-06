CREATE TABLE IF NOT EXISTS TaskCategory (
    Id uuid primary key default gen_random_uuid(),
    title varchar(255)
);

CREATE TABLE IF NOT EXISTS Task (
    Id uuid primary key default gen_random_uuid(),
    title varchar(255),
    typeId uuid not null references TaskCategory(id) on delete cascade,
    dateStart TIMESTAMPTZ,
    dateEnd TIMESTAMPTZ,
    descricao text
);
