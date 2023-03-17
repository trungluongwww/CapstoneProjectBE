create table provinces
(

);

create table wards
(

);

create table districts
(

);

create table users
(
    id          text                                   not null
        constraint users_pk
            primary key,
    name        text                     default ''    not null,
    email       text                     default ''    not null,
    password    text                     default ''    not null,
    province_id text                     default ''    not null,
    district_id text                     default ''    not null,
    ward_id     text                     default ''    not null,
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
    owner_id     text                     default ''    not null
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
    room_id    text                     default ''    not null
        constraint rooms_pk
            references rooms,
    originName text                     default ''    not null,
    name       text                     default ''    not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
)