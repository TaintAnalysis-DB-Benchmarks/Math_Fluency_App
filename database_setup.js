/*
    Copyright 2019 SER401 Project 14 Team - All Rights Reserved

    Team Members: 
    RAYMOND ACEVEDO
    SHAWN WEINER
    CHRISTOPHER SALAZAR
    ROBERT PILLITTERI
    SHELTON LACY 

    Unauthorized copying of this file, via any medium is strictly prohibited
    Proprietary and confidential
*/

/*

This file is usefull in the setup and development process
On initial setup, it completely wipes a prior database version and recreates it.  This is only usefull at the
initial install step.  For development, when adjusting foreign keys you can leave the database in a broken state.
Running this file in that case clears this issue as it allows the database to be completely recreated during devlopment.
*/

const db = require('mysql2');
var fs = require('fs');
var readline = require('readline');
require('dotenv').config();


// Fill in the values for a MySQL user with privileges to create dtabase schema
const ADMIN_USER = process.env.DB_ADMIN || "admin";
const ADMIN_PASSWORD = process.env.DB_ADMIN_PASSWORD || "admin_password";

// read .env file, if not filled out, use default values in .env_sample
// commenting next line out for testing
var MATHAPP_DB_NAME = process.env.RDS_DB_NAME || "mathapp";
var MATHAPP_DB_USER = process.env.RDS_USERNAME || "mathapp_api";
var MATHAPP_DB_PASSWORD = process.env.RDS_PASSWORD || "password_mathapp_api";
var MATHAPP_DB_HOST = process.env.RDS_HOSTNAME || "localhost";
var MATHAPP_DB_PORT = process.env.RDS_PORT || "3306";

// 
var connection = db.createConnection({
    host: MATHAPP_DB_HOST,
    port: MATHAPP_DB_PORT,
    user: ADMIN_USER,
    password: ADMIN_PASSWORD,
    multipleStatements: true
})

var db_drop = `DROP SCHEMA IF EXISTS ${MATHAPP_DB_NAME};`;
var db_create = `CREATE SCHEMA IF NOT EXISTS ${MATHAPP_DB_NAME};`;
var user_create = `CREATE USER IF NOT EXISTS '${MATHAPP_DB_USER}'@'%'`;
var user_password = `SET PASSWORD FOR '${MATHAPP_DB_USER}'@'%' =  '${MATHAPP_DB_PASSWORD}';`
var user_access = `GRANT ALL ON ${MATHAPP_DB_NAME}.* TO '${MATHAPP_DB_USER}'@'%'`
// this is callback hell, but it's a quick hack to do the deed
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connection made!");
    console.log("Executing: " + db_drop);
    connection.query(db_drop,
        function (err, result) {
            if (err) throw err;
            console.log("Database Dropped.");
        });
    console.log("Executing: " + db_create);
    connection.query(db_create,
        function (err, result) {
            if (err) throw err;
            console.log("Database Created.");
        });
    console.log("Executing: " + user_create);
    connection.query(user_create,
        function(err, result) {
            if (err) throw err;
            console.log("User Dropped.");
        });
    console.log("Executing: " + user_password);
    connection.query(user_password,
        function(err, result) {
            if (err) throw err;
            console.log("User Created.");
        });
    console.log("Executing: " + user_access);
    connection.query(user_access,
        function (err, result) {
            if (err) throw err;
            console.log("User Access Granted.")
        });
    });

setTimeout((function () {
    return process.exit(0);
}), 5000);