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

const express = require('express');
const router = express.Router();
const data = require('../database');
const HttpStatus = require('http-status-codes');
const Sequelize = require('sequelize');

// basic getter to get record by primary key
/**
 * @api (get) /results/:id
 * 
 * @apiName GetTestResultsByID
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input Result batch ID to pull
 * 
 * @apiSuccess (JSON) data Current table entry for result
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/:id', (req, res) => {
    var result = {};
    data.Result.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: data.Answer,
            required: true,
            where: {
                resultId: req.params.id
            },
            attributes: {
                exclude: ['id', 'resultId']
            }
        }
    }).then((resultData) => {
        result['result'] = resultData;
        result['endpoint'] = `/results/:id`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        var message;
        var responseCode;
        var response;
        if (err instanceof Sequelize.ValidationError || 
                err instanceof Sequelize.ForeignKeyConstraintError) {
            message = err.message;
            responseCode = HttpStatus.BAD_REQUEST;
            response = "Bad Request";
        } else {
            message = "Error processing request";
            responseCode = HttpStatus.INTERNAL_SERVER_ERROR;
            response = "Internal Server Error";
        }
        console.log('Error querying a result by id');
        console.log(err)
        result['message'] = message;
        result['endpoint'] = "/results/:id/";
        result['responseCode'] = responseCode;
        result['response'] = response;
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

/**
 * @api (get) /results/:id/summary
 * 
 * @apiName GetSummaryTestResultsByID
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input Result batch ID to pull
 * 
 * @apiSuccess (JSON) data Current table entry for result
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/:id/summary', async (req, res) => {
    var result = {};
    try {
        var correctCount = await data.Result.count({
            where: {
                id: req.params.id
            },
            include: {
                model: data.Answer,
                required: true,
                where: {
                    resultId: req.params.id,
                    correctlyAnswered: true
                }
            }
        });
        var resultData = await data.Result.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: data.Answer,
                required: true,
                where: {
                    resultId: req.params.id
                },
                attributes: []
            },
            attributes: {
                include: [
                    [Sequelize.fn('COUNT', Sequelize.col('resultId')), 'totalQuestions']
                ]
            }
        });
        resultData.dataValues.correctlyAnswered = correctCount;
        result['result'] = resultData;
        result['endpoint'] = `results/:id/summary`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    } catch (err) {
        var message;
        var responseCode;
        var response;
        if (err instanceof Sequelize.ValidationError || 
                err instanceof Sequelize.ForeignKeyConstraintError) {
            message = err.message;
            responseCode = HttpStatus.BAD_REQUEST;
            response = "Bad Request";
        } else {
            message = "Error processing request";
            responseCode = HttpStatus.INTERNAL_SERVER_ERROR;
            response = "Internal Server Error";
        }
        console.log('Error querying results summary');
        console.log(err)
        result['message'] = message;
        result['endpoint'] = "/results/:id/summary";
        result['responseCode'] = responseCode;
        result['response'] = response;
        res.status(result.responseCode);
        res.json(result);
        return;
    }
});

// getter to get record(s) by test
/**
 * @api (get) /results/test/:id
 * 
 * @apiName GetResultsBytestId
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input Test ID to pull
 * 
 * @apiSuccess (JSON) data Current results table entries for test 
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/test/:testId', (req, res) => {
    var result = {};
    data.Result.findAll({
        where: {
            testId: req.params.testId
        },
        include: {
            model: data.Answer,
            required: true,
            where: {
                resultId: Sequelize.col('result.id')
            },
            attributes: {
                exclude: ['id', 'resultId']
            }
        }
    }).then((resultData) => {
        result['results'] = resultData;
        result['endpoint'] = `results/test/:testId`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch((err) => {
        var message;
        var responseCode;
        var response;
        if (err instanceof Sequelize.ValidationError || 
                err instanceof Sequelize.ForeignKeyConstraintError) {
            message = err.message;
            responseCode = HttpStatus.BAD_REQUEST;
            response = "Bad Request";
        } else {
            message = "Error processing request";
            responseCode = HttpStatus.INTERNAL_SERVER_ERROR;
            response = "Internal Server Error";
        }
        console.log('Error querying results by test');
        console.log(err)
        result['message'] = message;
        result['endpoint'] = "/results/test/:testId";
        result['responseCode'] = responseCode;
        result['response'] = response;
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

/**
 * @api (get) /results/test/:id/summary
 * 
 * @apiName GetSummaryResultsBytestId
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input Test ID to pull
 * 
 * @apiSuccess (JSON) data Current results table entries for test 
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/test/:testId/summary', async (req, res) => {
    var result = {};

    try {
        var resultData = await data.Result.findAll({
            where: {
                testId: req.params.testId
            },
            include: {
                model: data.Answer,
                required: true,
                where: {
                    resultId: Sequelize.col('result.id')
                },
                attributes: []
            }
        })
        for (i = 0; i < resultData.length; i++) {
            var correctCount = await data.Result.count({
                where: {
                    id: resultData[i].dataValues.id
                },
                include: {
                    model: data.Answer,
                    required: true,
                    where: {
                        resultId: resultData[i].dataValues.id,
                        correctlyAnswered: true
                    }
                }
            });
            var totalCount = await data.Result.count({
                where: {
                    id: resultData[i].dataValues.id
                },
                include: {
                    model: data.Answer,
                    required: true,
                    where: {
                        resultId: resultData[i].dataValues.id
                    }
                }
            });
            resultData[i].dataValues.totalQuestions = totalCount;
            resultData[i].dataValues.correctlyAnswered = correctCount;
        }
        result['results'] = resultData;
        result['endpoint'] = `results/test/:testId/summary`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    } catch (err) {
        var message;
        var responseCode;
        var response;
        if (err instanceof Sequelize.ValidationError || 
                err instanceof Sequelize.ForeignKeyConstraintError) {
            message = err.message;
            responseCode = HttpStatus.BAD_REQUEST;
            response = "Bad Request";
        } else {
            message = "Error processing request";
            responseCode = HttpStatus.INTERNAL_SERVER_ERROR;
            response = "Internal Server Error";
        }
        console.log('Error querying results by test');
        console.log(err)
        result['message'] = message;
        result['endpoint'] = "/results/test/:testId/summary";
        result['responseCode'] = responseCode;
        result['response'] = response;
        res.status(result.responseCode);
        res.json(result);
        return;
    }
});

/**
 * @api (get) /results/student/:id
 * 
 * @apiName GetResultsBystudentId
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input student ID to pull
 * 
 * @apiSuccess (JSON) data Current results entires for student
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/student/:studentId', (req, res) => {
    var result = {};
    data.Result.findAll({
        where: {
            testId: {
                [Sequelize.Op.in]: Sequelize.literal(`(
                    SELECT testId
                    FROM tests
                    WHERE studentId = ${req.params.studentId}
                )`)
            }
        },
        include: {
            model: data.Answer,
            required: true,
            where: {
                resultId: Sequelize.col('result.id')
            },
            attributes: {
                exclude: ['id', 'resultId']
            }
        }
    }).then((resultData) => {
        result['results'] = resultData;
        result['endpoint'] = `results/student/:studentId`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch((err) => {
        var message;
        var responseCode;
        var response;
        if (err instanceof Sequelize.ValidationError || 
                err instanceof Sequelize.ForeignKeyConstraintError) {
            message = err.message;
            responseCode = HttpStatus.BAD_REQUEST;
            response = "Bad Request";
        } else {
            message = "Error processing request";
            responseCode = HttpStatus.INTERNAL_SERVER_ERROR;
            response = "Internal Server Error";
        }
        console.log('Error querying results by student');
        console.log(err)
        result['message'] = message;
        result['endpoint'] = "/results/student/:studentId";
        result['responseCode'] = responseCode;
        result['response'] = response;
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

/**
 * @api (get) /results/student/:id/summary
 * 
 * @apiName GetSummaryResultsBystudentId
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input student ID to pull
 * 
 * @apiSuccess (JSON) data Current summary results entires for student
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/student/:studentId/summary', async (req, res) => {
    var result = {};

    try {
        var resultData = await data.Result.findAll({
            where: {
                testId: {
                    [Sequelize.Op.in]: Sequelize.literal(`(
                        SELECT testId
                        FROM tests
                        WHERE studentId = ${req.params.studentId}
                    )`)
                }
            },
            include: {
                model: data.Answer,
                required: true,
                where: {
                    resultId: Sequelize.col('result.id')
                },
                attributes: []
            }
        });
        for (i = 0; i < resultData.length; i++) {
            var correctCount = await data.Result.count({
                where: {
                    id: resultData[i].dataValues.id
                },
                include: {
                    model: data.Answer,
                    required: true,
                    where: {
                        resultId: resultData[i].dataValues.id,
                        correctlyAnswered: true
                    }
                }
            });
            var totalCount = await data.Result.count({
                where: {
                    id: resultData[i].dataValues.id
                },
                include: {
                    model: data.Answer,
                    required: true,
                    where: {
                        resultId: resultData[i].dataValues.id
                    }
                }
            });
            resultData[i].dataValues.totalQuestions = totalCount;
            resultData[i].dataValues.correctlyAnswered = correctCount;
        }
        result['results'] = resultData;
        result['endpoint'] = `results/student/:studentId/summary`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    } catch (err) {
        var message;
        var responseCode;
        var response;
        if (err instanceof Sequelize.ValidationError || 
                err instanceof Sequelize.ForeignKeyConstraintError) {
            message = err.message;
            responseCode = HttpStatus.BAD_REQUEST;
            response = "Bad Request";
        } else {
            message = "Error processing request";
            responseCode = HttpStatus.INTERNAL_SERVER_ERROR;
            response = "Internal Server Error";
        }
        console.log('Error querying results by student');
        console.log(err)
        result['message'] = message;
        result['endpoint'] = "/results/student/:studentId/summary";
        result['responseCode'] = responseCode;
        result['response'] = response;
        res.status(result.responseCode);
        res.json(result);
        return;
    }
});

/**
 * @api (get) /results/teacher/:id
 * 
 * @apiName GetResultsByteacherId
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input teacher ID to pull
 * 
 * @apiSuccess (JSON) data Current results entries by teacher
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/teacher/:teacherId', (req, res) => {
    var result = {};
    data.Result.findAll({
        where: {
            testId: {
                [Sequelize.Op.in]: Sequelize.literal(`(
                    SELECT testId
                    FROM tests
                    WHERE teacherId = ${req.params.teacherId}
                )`)
            }
        },
        include: {
            model: data.Answer,
            required: true,
            where: {
                resultId: Sequelize.col('result.id')
            },
            attributes: {
                exclude: ['id', 'resultId']
            }
        }
    }).then((resultData) => {
        result['results'] = resultData;
        result['endpoint'] = `results/teacher/:teacherId`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch((err) => {
        var message;
        var responseCode;
        var response;
        if (err instanceof Sequelize.ValidationError || 
                err instanceof Sequelize.ForeignKeyConstraintError) {
            message = err.message;
            responseCode = HttpStatus.BAD_REQUEST;
            response = "Bad Request";
        } else {
            message = "Error processing request";
            responseCode = HttpStatus.INTERNAL_SERVER_ERROR;
            response = "Internal Server Error";
        }
        console.log('Error querying results by teacher');
        console.log(err)
        result['message'] = message;
        result['endpoint'] = "results/teacher/:teacherId";
        result['responseCode'] = responseCode;
        result['response'] = response;
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

/**
 * @api (get) /results/teacher/:id/summary
 * 
 * @apiName GetSummaryResultsByteacherId
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input teacher ID to pull
 * 
 * @apiSuccess (JSON) data Current summary results entires for teacher
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/teacher/:teacherId/summary', async (req, res) => {
    var result = {};

    try {
        var resultData = await data.Result.findAll({
            where: {
                testId: {
                    [Sequelize.Op.in]: Sequelize.literal(`(
                        SELECT testId
                        FROM tests
                        WHERE teacherId = ${req.params.teacherId}
                    )`)
                }
            },
            include: {
                model: data.Answer,
                required: true,
                where: {
                    resultId: Sequelize.col('result.id')
                },
                attributes: []
            }
        });
        for (i = 0; i < resultData.length; i++) {
            var correctCount = await data.Result.count({
                where: {
                    id: resultData[i].dataValues.id
                },
                include: {
                    model: data.Answer,
                    required: true,
                    where: {
                        resultId: resultData[i].dataValues.id,
                        correctlyAnswered: true
                    }
                }
            });
            var totalCount = await data.Result.count({
                where: {
                    id: resultData[i].dataValues.id
                },
                include: {
                    model: data.Answer,
                    required: true,
                    where: {
                        resultId: resultData[i].dataValues.id
                    }
                }
            });
            resultData[i].dataValues.totalQuestions = totalCount;
            resultData[i].dataValues.correctlyAnswered = correctCount;
        }
        result['results'] = resultData;
        result['endpoint'] = `results/teacher/:teacherId/summary`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    } catch (err) {
        var message;
        var responseCode;
        var response;
        if (err instanceof Sequelize.ValidationError || 
                err instanceof Sequelize.ForeignKeyConstraintError) {
            message = err.message;
            responseCode = HttpStatus.BAD_REQUEST;
            response = "Bad Request";
        } else {
            message = "Error processing request";
            responseCode = HttpStatus.INTERNAL_SERVER_ERROR;
            response = "Internal Server Error";
        }
        console.log('Error querying results by teacher');
        console.log(err)
        result['message'] = message;
        result['endpoint'] = "results/teacher/:teacherId/summary";
        result['responseCode'] = responseCode;
        result['response'] = response;
        res.status(result.responseCode);
        res.json(result);
        return;
    }
});

// get all results
/**
 * @api (get) /results/
 * 
 * @apiName GetTestResults
 * 
 * @apiGroup Results
 * 
 * @apiSuccess (JSON) data All current table entry for result
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/', (req, res) => {
    var result = {};

    data.Result.findAll({
        include: {
            model: data.Answer,
            required: true,
            where: {
                resultId: Sequelize.col('result.id')
            },
            attributes: {
                exclude: ['id', 'resultId']
            }
        }
    }).then(function (results) {
        result['results'] = results;
        result['endpoint'] = `/results`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        var message;
        var responseCode;
        var response;
        if (err instanceof Sequelize.ValidationError || 
                err instanceof Sequelize.ForeignKeyConstraintError) {
            message = err.message;
            responseCode = HttpStatus.BAD_REQUEST;
            response = "Bad Request";
        } else {
            message = "Error processing request";
            responseCode = HttpStatus.INTERNAL_SERVER_ERROR;
            response = "Internal Server Error";
        }
        console.log('Error querying all results');
        console.log(err)
        result['message'] = message;
        result['endpoint'] = "/results";
        result['responseCode'] = responseCode;
        result['response'] = response;
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

// post data to endpoint
/**
 * @api (post) /results/
 * 
 * @apiName PostTestResults
 * 
 * @apiGroup Results
 * 
 * @apiSuccess (JSON) data id and uri of new result
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.post('/', async (req, res) => {
    var result = {};
    console.log(`Post: `);
    console.log(req.body);

    try {
        var test = await data.Test.findByPk(req.body.testId);

        if (test === null) {
            throw new Sequelize.ForeignKeyConstraintError(
                { message: `Test with id ${req.body.testId} does not exist` });
        } else if (test.attemptsRemaining == 0) {
            throw new Sequelize.ValidationError('Test has no attempts remaining');
        }

        var addResult = await data.sequelize.transaction();
        var newResult = await data.Result.create({
            timeTaken: req.body.timeTaken,
            testId: req.body.testId
        }, {
            transaction: addResult
        });

        console.log(`New result data received: Entry ${newResult.id} created.`);
        console.log(`There are ${Object.keys(req.body.answers).length} answers.`);

        for (i = 0; i < Object.keys(req.body.answers).length; i++) {
            var answerData = req.body.answers[i]
            await data.Answer.create({
                studentAnswer: answerData.studentAnswer,
                operation: answerData.operation,
                operand1: answerData.operand1,
                operand2: answerData.operand2,
                correctlyAnswered: answerData.studentAnswer
                    == eval(answerData.operand1 + answerData.operation
                        + answerData.operand2),
                resultId: newResult.id
            }, {
                transaction: addResult
            });
        }

        await data.Test.decrement('attemptsRemaining', {
            where: {
                id: req.body.testId,
                attemptsRemaining: {
                    [Sequelize.Op.not]: -1
                }
            },
            transaction: addResult
        });

        await addResult.commit();

        var uri = req.protocol + '://' + req.get('host') +
            req.baseUrl + req.path + newResult.id;
        result['resource'] = {
            'id': newResult.id,
            'uri': uri
        };
        result['endpoint'] = "/results";
        result['responseCode'] = HttpStatus.CREATED;
        result['response'] = "Created"
        res.status(result.responseCode);
        res.header('Location', uri);
        res.json(result);
        return;
    } catch (err) {
        var message;
        var responseCode;
        var response;
        if (addResult) {
            await addResult.rollback();
        }
        if (err instanceof Sequelize.ValidationError) {
            message = err.message;
            responseCode = HttpStatus.BAD_REQUEST;
            response = "Bad Request";
        } else if (err instanceof Sequelize.ForeignKeyConstraintError) {
            message = err.message;
            responseCode = HttpStatus.NOT_FOUND;
            response = "Not Found";
        } else {        
            message = "Error processing request";
            responseCode = HttpStatus.INTERNAL_SERVER_ERROR;
            response = "Internal Server Error";
        }
        console.log('Error creating new result record');
        console.log(err)
        result['message'] = message;
        result['endpoint'] = "/results";
        result['responseCode'] = responseCode;
        result['response'] = response;
        res.status(result.responseCode);
        res.json(result);
        return;
    }
});

// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use((req, res) => {
    var result = {};
    result['results'] = {
        "endpoint": "/results"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});

// required to make routes work
module.exports = router;