/*
@name seedCustomer
@param customers -> ((lsu_id, first_name, last_name, email, password, phone_number, department)...)
*/
INSERT INTO customer (
    lsu_id,
    first_name,
    last_name,
    email,
    password,
    phone_number,
    department
) VALUES :customers RETURNING *;

/*
@name getAllCustomers
*/
SELECT * FROM customer;

/*
@name seedTechnician
@param technicians -> ((lsu_id, first_name, last_name, email, password, phone_number)...)
*/
INSERT INTO technician (
    lsu_id,
    first_name,
    last_name,
    email,
    password,
    phone_number
) VALUES :technicians RETURNING *;

/*
@name getAllTechnicians
*/
SELECT * FROM technician;

/*
@name seedTicket
@param tickets -> ((priority, status, category, description, device, os, os_version)...)
*/
 
INSERT INTO ticket (
    priority,
    status,
    category,
    description,
    device,
    os,
    os_version
) VALUES :tickets RETURNING *;

/*
@name getAllTickets
*/
SELECT * FROM ticket;


