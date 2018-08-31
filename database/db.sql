drop database if exists cabapp;

create database cabapp;

show databases;

use cabapp;

create table customer (
    customer_id int(5) auto_increment not null,
    primary key(customer_id)
);

create table driver (
    driver_id int(5) auto_increment not null,
    primary key(driver_id)
);

create table ride (
    request_id int(5) auto_increment not null,
    request_time timestamp,
    customer_id int(5),
    driver_id int(5),
    start_time timestamp,
    end_time timestamp,
    status enum('1','2','3'),

    primary key(request_id),
    foreign key(customer_id) references customer(customer_id),
    foreign key(driver_id) references driver(driver_id)
);

show tables;

insert into driver(driver_id) values (1),(2),(3),(4),(5);

select * from driver;