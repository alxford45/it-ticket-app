/*
Schema for tables and fields for both API and CLIENT
Feel free to modify
*/


CREATE TABLE student (
    lsu_id integer NOT NULL,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    email varchar(100) NOT NULL,
    phone_number BigInt NOT NULL,
    department varchar(50) NOT NULL,
    PRIMARY KEY (lsu_id) 
);

/* Is it okay for student and technician to share so many common fields? */
CREATE TABLE technician (
    lsu_id integer NOT NULL,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    email varchar(100) NOT NULL,
    phone_number BigInt NOT NULL,
    PRIMARY KEY (lsu_id)
);
    
CREATE TABLE ticket (
    ticket_id SERIAL PRIMARY KEY,
    priority integer NOT NULL,
    status varchar(20) NOT NULL,
    category varchar(50) NOT NULL,
    problem varchar(500) NOT NULL,
    description varchar(500) NOT NULL,
    model varchar(50) NOT NULL,
    os varchar(20) NOT NULL,
    version varchar(50) NOT NULL
);

/*    
technician ---- work ---- ticket

one to many: 1 technician works many tickets? 
*/
CREATE TABLE work (
    ticket_id Foreign Key(ticket.ticket_id) 
    issue varchar(50),
    component varchar(50),
    description varchar(500),
    starttime Date,
    endtime Date,
);
/*
admin/technician ---- issue ---- technician
                        |
                     ticket

one to one to one: 1 admin/technician assigns 1 ticket to 1 technician?
*/

CREATE TABLE issue (
  ticket_id Foreign Key(ticket.ticket_id),
  assignedby Foreign Key(technician.lsu_id),
  assignedto Foreign Key(technician.lsu_id),
  comment varchar(500),
  assigndate Date,
);





