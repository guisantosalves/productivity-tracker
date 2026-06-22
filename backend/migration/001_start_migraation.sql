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

CREATE TABLE IF NOT EXISTS Users (
    Id uuid primary key default gen_random_uuid(),
    email varchar(255) not null,
    password text not null,
    state smallint 
);

INSERT INTO Users (Id, email, password, state) VALUES ('4d0e3ae5-653d-453a-b4c0-1322ba77172b', 'admin@email.com', '$2a$10$VQABztZG1obVHhtki23VJOFicmYar9iLzutPGMuYC547XOPY0kD5q', 0);