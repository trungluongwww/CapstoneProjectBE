create table provinces
(
    id         text not null PRIMARY KEY,
    created_at timestamp with time zone ,
    updated_at timestamp with time zone ,
    name       text
        code       text
);

create table districts
(
    id          text not null PRIMARY KEY,
    created_at  timestamp with time zone ,
    updated_at  timestamp with time zone ,
    province_id text                     ,
    name        text
        code        text
);

create table wards
(
    id          text not null PRIMARY KEY,
    created_at  timestamp with time zone ,
    updated_at  timestamp with time zone ,
    district_id varchar                  ,
    name        varchar,
    code        varchar
);


create table users
(
    id          text not null PRIMARY KEY,
    created_at  timestamp with time zone ,
    updated_at  timestamp with time zone ,
    password    text
    phone       text
    email       text
    name        text
    avatar      text
    search_text text
    province_id text references provinces,
    district_id text references districts,
    ward_id     text references wards,
    address     text
    root        boolean default false
);

create table rooms
(
    id               text not null PRIMARY KEY,
    created_at       timestamp with time zone ,
    updated_at       timestamp with time zone ,
    user_id          text references users,
    name             text
    description      text                     ,
    rent_per_month   integer                  ,
    deposit          integer                  ,
    square_metre     integer                  ,
    province_id      text references provinces,
    district_id      text references districts,
    ward_id          text references wards,
    address          text
    search_text      text
    status           text
    type             text                      ,
    recent_active_at timestamp with time zone
);

create table room_files
(
    id         text not null PRIMARY KEY,
    created_at timestamp with time zone ,
    updated_at timestamp with time zone ,
    room_id    text references rooms,
    info       jsonb
);

create table conversations
(
    id             text not null PRIMARY KEY,
    created_at     timestamp with time zone ,
    updated_at     timestamp with time zone ,
    owner_id       text references users,
    participant_id text references users,
    last_sender_id text
    unread         integer
);

create table messages
(
    id              text not null PRIMARY KEY,
    created_at      timestamp with time zone ,
    updated_at      timestamp with time zone ,
    author_id       text references users,
    content         text
    type            text
    file            jsonb,
    room_id         text references rooms,
    conversation_id text references conversations
);

create table user_favourite_rooms
(
    id         text not null PRIMARY KEY,
    created_at timestamp with time zone ,
    updated_at timestamp with time zone ,
    room_id    text references rooms,
    user_id    text references users
);

create table conveniences
(
    id         text not null PRIMARY KEY,
    created_at timestamp with time zone ,
    updated_at timestamp with time zone ,
    name       text                     ,
    code       text                     ,
    "order"    integer
);

create table room_conveniences
(
    id             text not null PRIMARY KEY,
    created_at     timestamp with time zone ,
    updated_at     timestamp with time zone ,
    room_id        text references rooms,
    convenience_id text references conveniences
);

create table user_room_histories
(
    id         text not null PRIMARY KEY,
    created_at timestamp with time zone ,
    updated_at timestamp with time zone ,
    room_id    text references rooms,
    user_id    text references users,
    action     text
);

