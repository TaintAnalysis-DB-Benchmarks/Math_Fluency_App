/*
    Copyright 2019 SER402 Project 14 Team - All Rights Reserved
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
    return sequelize.define('student', {

        // id: primary ID of student, generated internally
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        //Student's first name
        firstName: {
            type: Sequelize.STRING,
            validate: {
                isAlpha: {
                    args: true,
                    msg: 'Only letter characters are allowed for firstName'
                }
            },
            allowNull: false,
        },

        //Student's last name
        lastName: {
            type: Sequelize.STRING,
            validate: {
                isAlpha: {
                    args: true,
                    msg: 'Only letter characters are allowed for lastName'
                }
            },
            allowNull: false,        
        },

        //Stars student has earned
        stars: {
            type: Sequelize.INTEGER(50),
            validate: {
                isInt: {
                    args: true,
                    msg: 'Only integers are allowed for number of stars'
                }
            },
            allowNull: false,
            defaultValue: 0
        },

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
            allowNull: true
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
            allowNull: true
        },

        //Level of student
        level: {
            type: Sequelize.VIRTUAL,
            get() {
                return `${this.baseNumber}${this.operation}`;
            },
            set(value) {
                throw new Error("Do not set level directly");
            }
        }
    },{
        validate: {
            bothLevelComponents() {
                if ((this.operation === null) !== (this.baseNumber === null)) {
                    throw new Error('Set both operation and baseNumber, or neither');
                }
            }
        },
        timestamps: (process.env.APP_ENVIRONMENT !== "dev")
    })
}