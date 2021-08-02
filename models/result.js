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
    return sequelize.define('result', {

        // id: primary ID for the results
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        // timeTaken: test results timeframe
        timeTaken: {
            type: Sequelize.TIME,
            defaultValue: process.env.APP_MAX_ATTEMPT_TIME,
            validate: {
                is: {
                    args: /^\d{1,3}:\d{2}:\d{2}$/,
                    msg: 'Time must be in "HH:MM:SS" format'
                },
                isUnderMax(value) {
                    if (process.env.APP_MAX_ATTEMPT_TIME) {
                        var maxTime = process.env.APP_MAX_ATTEMPT_TIME

                        var times = value.split(":");
                        var maxTimes = maxTime.split(":");

                        var timesSeconds = new Date();
                        var maxTimesSeconds = new Date();

                        timesSeconds.setHours(times[0], times[1], times[2]);
                        maxTimesSeconds.setHours(maxTimes[0], maxTimes[1], maxTimes[2]);

                        if (timesSeconds.getTime() > maxTimesSeconds.getTime()) {
                            throw new Error('Time exceeds allotted');
                        }
                    } else {
                        var maxTime = "838:59:59"

                        var times = value.split(":");
                        var maxTimes = maxTime.split(":");

                        var timesSeconds = new Date();
                        var maxTimesSeconds = new Date();

                        timesSeconds.setHours(times[0], times[1], times[2]);
                        maxTimesSeconds.setHours(maxTimes[0], maxTimes[1], maxTimes[2]);

                        if (timesSeconds.getTime() > maxTimesSeconds.getTime()) {
                            throw new Error('Time exceeds max time supported');
                        }
                    }
                }
            }
        }

    }, {
        timestamps: (process.env.APP_ENVIRONMENT !== "dev")
    })
}
