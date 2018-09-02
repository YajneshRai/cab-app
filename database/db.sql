drop database if exists cabapp;

create database cabapp;

show databases;

use cabapp;

create table customer (
    customer_id varchar(100) unique not null,
    primary key(customer_id)
);

create table driver (
    driver_id int(5) auto_increment not null,
    location_x int(1),
    location_y int(1),
    primary key(driver_id)
);

create table ride (
    request_id int(5) auto_increment not null,
    request_time timestamp,
    location_x int(1),
    location_y int(1),
    customer_id varchar(100),
    status enum('1','2','3'),
    primary key(request_id),
    foreign key(customer_id) references customer(customer_id)
);

create table ride_taken (
    id int(5) auto_increment not null,
    request_id int(5),
    driver_id int(5),
    start_time timestamp,
    end_time timestamp,
    primary key(id),
    foreign key(request_id) references ride(request_id),
    foreign key(driver_id) references driver(driver_id)
);

show tables;

insert into driver(driver_id, location_x, location_y) values (1,1,1),(2,2,2),(3,3,3),(4,4,4),(5,5,5);

select * from driver;
