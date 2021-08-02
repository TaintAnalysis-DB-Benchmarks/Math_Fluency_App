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

// data object models
const Sequelize = require('sequelize');
const StudentModel = require('./models/student');
const ResultModel = require('./models/result');
const TeacherModel = require('./models/teacher');
const TestModel = require('./models/test');
const AnswerModel = require('./models/answer');
// fix for working with windows
require('dotenv').config();

// instantiate database AWS
console.log("Environment Variables: ");
console.log(process.env.RDS_DB_NAME);
console.log(process.env.RDS_PORT);
console.log(process.env.RDS_USERNAME);
console.log(process.env.RDS_HOSTNAME);
console.log(process.env.RDS_USERNAME);
console.log(process.env.RDS_PASSWORD);



const sequelize = new Sequelize(process.env.RDS_DB_NAME,
    process.env.RDS_USERNAME, process.env.RDS_PASSWORD,
    {
        host: process.env.RDS_HOSTNAME,
        port: process.env.RDS_PORT,
        dialect: process.env.DB_DIALECT
    }
);

/*
console.log("Did sequelize initialize?:");
console.log(sequelize);
*/

/*
// instantiate database local testing environment
const path = require('path');
const dbpath = path.resolve(__dirname, 'data/storage.sqlite');
console.log(dbpath);
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbpath
});
*/

// instantiate data objects
const Student = StudentModel(sequelize, Sequelize);
const Result = ResultModel(sequelize, Sequelize);
const Test = TestModel(sequelize, Sequelize);
const Teacher = TeacherModel(sequelize, Sequelize);
const Answer = AnswerModel(sequelize, Sequelize);

// create foriegn keys
Result.hasMany(Answer, {
    foreignKey: {
        allowNull: false
    }
});
Answer.belongsTo(Result);
Test.hasMany(Result, {
    foreignKey: {
        allowNull: false
    }
});
Result.belongsTo(Test);
Teacher.hasMany(Test);
Test.belongsTo(Teacher);
Teacher.hasMany(Student);
Student.belongsTo(Teacher);
Student.hasMany(Test);
Test.belongsTo(Student);

const APP_ENVIRONMENT = process.env.APP_ENVIRONMENT || "live";
if (APP_ENVIRONMENT === "dev") {
    sequelize.sync({
        force: true
    })
    .then(() => {
        console.log(`Database sync successful - force: true`)
    });
} else {
    sequelize.sync({
        force: false
    })
    .then(() => {
        console.log(`Database sync successful - force: false`)
    });
}
// sync database

/*
    Export our DataModels for use in routes
    Export local sequelize for transactions
*/
module.exports = {
    Student,
    Teacher,
    Result,
    Test,
    Answer,
    sequelize
};
