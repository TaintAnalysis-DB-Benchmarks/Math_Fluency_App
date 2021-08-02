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

    const Sequelize = require('sequelize');

    module.exports = (sequelize, type) => {
        return sequelize.define('teacher', {

        // id: primary ID of teacher, generated internally
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING(50),
            validate: {
                isAlpha: {
                    args: true,
                    msg: 'Only letter characters are allowed for firstName'
                }
            },
            allowNull: false, 
        },
        lastName: {
            type: Sequelize.STRING(50),
            validate: {
                isAlpha: {
                    args: true,
                    msg: 'Only letter characters are allowed for lastName'
                }
            },
            allowNull: false, 
        },
    },{
        timestamps: (process.env.APP_ENVIRONMENT !== "dev")
    })
    }