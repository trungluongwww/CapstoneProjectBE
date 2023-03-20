create table provinces
(
    id         text                                   not null
        constraint provinces_pk
            primary key,
    name       text                     default ''    not null,
    code       text                     default ''    not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create table districts
(
    id          text                                   not null
        constraint districts_pk
            primary key,
    province_id text                                   not null
        constraint provinces_pk
            references provinces,
    name        text                     default ''    not null,
    code        text                     default ''    not null,
    created_at  timestamp with time zone default now() not null,
    updated_at  timestamp with time zone default now() not null
);

create table wards
(
    id          text                                   not null
        constraint wards_pk
            primary key,
    district_id text                                   not null
        constraint districts_pk
            references districts,
    name        text                     default ''    not null,
    code        text                     default ''    not null,
    created_at  timestamp with time zone default now() not null,
    updated_at  timestamp with time zone default now() not null
);

create table users
(
    id          text                                   not null
        constraint users_pk
            primary key,
    name        text                     default ''    not null,
    email       text                     default ''    not null,
    password    text                     default ''    not null,
    province_id text                     default ''    not null
        constraint provinces_pk
            references provinces,
    district_id text                     default ''    not null
        constraint districts_pk
            references districts,
    ward_id     text                     default ''    not null
        constraint wards_pk
            references wards,
    address     text                     default ''    not null,
    avatar      text                     default ''    not null,
    created_at  timestamp with time zone default now() not null,
    updated_at  timestamp with time zone default now() not null
);

create table contact_users
(
    id            text                                   not null
        constraint contact_users_pk
            primary key,
    phone         text                     default ''    not null,
    facebook_link text                     default ''    not null,
    zalo_link     text                     default ''    not null,
    created_at    timestamp with time zone default now() not null,
    updated_at    timestamp with time zone default now() not null
);

create table room
(
    id           text                                   not null
        constraint rooms_pk
            primary key,
    name         text                     default ''    not null,
    owner_id     text                                   not null
        constraint users_pk
            references users,
    max_capacity integer                  default 1     not null,
    description  text                     default ''    not null,
    status       text                     default ''    not null,
    created_at   timestamp with time zone default now() not null,
    updated_at   timestamp with time zone default now() not null
);

create table room_images
(
    id         text                                   not null
        constraint room_images_pk
            primary key,
    room_id    text                                   not null
        constraint rooms_pk
            references rooms,
    originName text                     default ''    not null,
    name       text                     default ''    not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
)