create table "user"
(
    lsu_id integer not null
        constraint user_pkey
            primary key,
    first_name varchar(45) not null,
    last_name varchar(45) not null,
    email varchar(100) not null,
    phone_number bigint not null,
    department varchar(50) not null,
    admin boolean default false not null
);

alter table "user" owner to brvuirrqqcjzsb;

create table ticket
(
    ticket_id serial not null
        constraint ticket_pk
            primary key,
    lsu_id integer
        constraint ticket_user_lsu_id_fk
            references "user"
            on update cascade on delete cascade,
    priority integer not null,
    status varchar(20) not null,
    problem_category varchar(50) not null,
    description varchar(500),
    core_issue varchar(50),
    notes varchar(500),
    submission_date timestamp not null
);

alter table ticket owner to brvuirrqqcjzsb;

create unique index ticket_ticket_id_uindex
    on ticket (ticket_id);

create table device
(
    device_id serial not null
        constraint device_pk
            primary key,
    ticket_id integer not null
        constraint device_ticket_ticket_id_fk
            references ticket
            on update cascade on delete cascade,
    model varchar(50) not null,
    component varchar(50),
    manufacturer varchar(50) not null,
    operating_system varchar(20) not null,
    operating_system_version varchar(50) not null
);

alter table device owner to brvuirrqqcjzsb;

create unique index device_device_id_uindex
    on device (device_id);

create table assignment
(
    assignment_id serial not null
        constraint assignment_pk
            primary key,
    lsu_id integer not null
        constraint assignment_user_lsu_id_fk
            references "user"
            on update cascade on delete cascade,
    ticket_id integer not null
        constraint assignment_ticket_ticket_id_fk
            references ticket
            on update cascade on delete cascade
);

alter table assignment owner to brvuirrqqcjzsb;

create unique index assignment_assignment_id_uindex
    on assignment (assignment_id);

create table work
(
    work_id serial not null
        constraint work_pk
            primary key,
    ticket_id integer not null
        constraint work_ticket_ticket_id_fk
            references ticket
            on update cascade on delete cascade,
    lsu_id integer not null
        constraint work_user_lsu_id_fk
            references "user"
            on update cascade on delete cascade,
    start_datetime timestamp not null,
    end_datetime timestamp not null
);

alter table work owner to brvuirrqqcjzsb;

create unique index work_work_id_uindex
    on work (work_id);

