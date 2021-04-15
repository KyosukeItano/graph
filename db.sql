create database graph;


create table user(
    u_id int auto_increment not null primary key,
    u_username varchar(255) not null,
    u_email varchar(255) not null,
    u_password char(30) not null,
    u_gender int not null
);

create table chart(
    c_date date not,
    u_id int not null,
    c_money int not null,
    c_used char(255) not null
);