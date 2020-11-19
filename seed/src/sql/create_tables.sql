CREATE TABLE IF NOT EXISTS customer (
        lsu_id integer NOT NULL,
        first_name varchar(45) NOT NULL,
        last_name varchar(45) NOT NULL,
        email varchar(100) NOT NULL,
        password varchar(450) NOT NULL,
        phone_number integer NOT NULL,
        department varchar(50) NOT NULL,
        PRIMARY KEY (lsu_id)
    );

CREATE TABLE IF NOT EXISTS technician (
        lsu_id integer NOT NULL,
        first_name varchar(45) NOT NULL,
        last_name varchar(45) NOT NULL,
        email varchar(100) NOT NULL,
        password varchar(450) NOT NULL,
        phone_number integer NOT NULL,
        PRIMARY KEY (lsu_id)
    );

CREATE TABLE IF NOT EXISTS ticket (
      ticket_id SERIAL PRIMARY KEY,
      priority integer NOT NULL,
      status varchar(20) NOT NULL,
      category varchar(50) NOT NULL,
      description varchar(500) NOT NULL,
      device varchar(50) NOT NULL,
      os varchar(20) NOT NULL,
      os_version varchar(50) NOT NULL
    );

