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

const sequelize = new Sequelize(process.env.RDS_DB_NAME,
    process.env.RDS_USERNAME, process.env.RDS_PASSWORD,
    {
        host: process.env.RDS_HOSTNAME,
        port: process.env.RDS_PORT,
        dialect: process.env.DB_DIALECT
    }
);

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
        force: false
    })
    .then(() => {
        console.log(`Database sync successful - force: true`)
        process.exit(0);
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
