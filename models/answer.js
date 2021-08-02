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

const Sequelize = require('sequelize')

module.exports = (sequelize, type) => {
    return sequelize.define('answer', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        studentAnswer: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null,
            set(value) {
                if (value === null) {
                    this.setDataValue('studentAnswer', null)
                } else {
                    this.setDataValue('studentAnswer', parseInt(value));
                }
            }
        },

        correctlyAnswered: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },

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

        operand1: {
            type: Sequelize.INTEGER,
            validate: {
                min: {
                    args: [process.env.APP_MIN_OPERAND || 0],
                    msg: `operand1 is out of application bounds; value must be ` +
                            `greater than or equal to ${process.env.APP_MIN_OPERAND || 0}`
                },
                max: {
                    args: [process.env.APP_MAX_OPERAND || 14],
                    msg: `operand1 is out of application bounds; value must be ` +
                            `less than or equal to ${process.env.APP_MAX_OPERAND || 14}`
                },
                isInt: true
            },
            allowNull: false,
            set(value) {
                this.setDataValue('operand1', parseInt(value));
            }
        },

        operand2: {
            type: Sequelize.INTEGER,
            validate: {
                min: {
                    args: [process.env.APP_MIN_OPERAND || 0],
                    msg: `operand2 is out of application bounds; value must be ` +
                            `greater than or equal to ${process.env.APP_MIN_OPERAND || 0}`
                },
                max: {
                    args: [process.env.APP_MAX_OPERAND || 12],
                    msg: `operand2 is out of application bounds; value must be ` +
                            `less than or equal to ${process.env.APP_MAX_OPERAND || 14}`
                },
                isInt: true
            },
            allowNull: false,
            set(value) {
                this.setDataValue('operand2', parseInt(value));
            }
        }

    },{
        timestamps: (process.env.APP_ENVIRONMENT !== "dev")
    })
}