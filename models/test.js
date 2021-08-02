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
        return sequelize.define('test', {

        // id: primary ID for the test
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        //category: practice(true, 0) or graded(false, 1)
        practice: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },

        //attempts_remaining: number of attempts left to take test
        attemptsRemaining: {
            type: Sequelize.INTEGER,
            validate: {
                isValid(value) {
                    if (value < 0 && value != -1) {
                        throw new Error('Attempts must be set to greater than -1')
                    }
                }
            },
            allowNull: false,
            defaultValue: -1
        },
        //baseNumber: the number used as the base for each test i.e. 1, 2, 3, 4 etc.
        baseNumber: {
            type: Sequelize.INTEGER,
            validate: {
                min: {
                    args: [process.env.APP_MIN_OPERAND || 0],
                    msg: `baseNumber is out of application bounds; value must be ` +
                            `greater than or equal to ${process.env.APP_MIN_OPERAND || 0}`
                },
                max: {
                    args: [process.env.APP_MAX_OPERAND || 14],
                    msg: `baseNumber is out of application bounds; value must be ` +
                            `less than or equal to ${process.env.APP_MAX_OPERAND || 14}`
                },
            },
            allowNull: false
        },
        //operation: the operation used for each test i.e. +(add), -(subtract), *(multiply), /(divide).
        operation: {
            type: Sequelize.ENUM,
            values: ['+', '-', '*', '/'],
            validate: {
                isIn: {
                    args: [['+', '-', '*', '/']],
                    msg: "Must be basic arithmetic operation"
                }
            },
            allowNull: false
        },
        
        //level: difficulty of test i.e. 1+, 2+, 3+, etc.
        level: {
            type: Sequelize.VIRTUAL,
            get() {
                return `${this.baseNumber}${this.operation}`;
            },
            set(value) {
                throw new Error("Do not set level directly");
            }
        }

    }, {
        timestamps: (process.env.APP_ENVIRONMENT !== "dev")
    })
    }
