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

/**
 * @api (get) /tests/:id
 * 
 * @apiName GetTestsById
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch ID to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/:id', function (req, res) {
    var result = {};
    data.Test.findByPk(req.params.id)
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            delete parsed.operation;
            delete parsed.baseNumber;
            result['test'] = parsed;
            result['endpoint'] = `/tests/:id`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/:id`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/id/:id/category/:category
 * 
 * @apiName GetTestsById&Category
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch ID & Category to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
/*
router.get('/id/:id/category/:category', function(req,res) {
    var result = {};
    var value = req.params.category;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    data.Test.findAll({
            where: {
                id: req.params.id,
	            category: value
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/id/:id/category/:category`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/id/:id/category/:category`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});
*/

/**
 * @api (get) /tests/id/:id/attemptsRemaining/:attemptsRemaining
 * 
 * @apiName GetTestsById&attemptsRemaining
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch ID & attemptsRemaining to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
/*
router.get('/id/:id/attemptsRemaining/:attemptsRemaining', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                id: req.params.id,
	            attemptsRemaining:req.params.attemptsRemaining
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/id/:id/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/id/:id/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});
*/

/**
 * @api (get) /tests/id/:id/level/:level
 * 
 * @apiName GetTestsById&Level
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch ID & Level to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
/*
router.get('/id/:id/level/:level', function(req,res) {
    var result = {};
    var paramLevel = req.params.level.split('');
    data.Test.findAll({
            where: {
                id: req.params.id,
	            baseNumber: paramLevel[0],
	    	    operation: paramLevel[1]
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/id/:id/level/:level`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/id/:id/level/:level`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});
*/

/**
 * @api (get) /tests/id/:id/teachers/:teacherId
 * 
 * @apiName GetTestsById&teacherId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch ID & teacherId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
/*
router.get('/id/:id/teachers/:teacherId', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                id: req.params.id,
	            teacherId:req.params.teacherId
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/id/:id/teachers/:teacherId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/id/:id/teachers/:teacherId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});
*/

/**
 * @api (get) /tests/id/:id/students/:studentId
 * 
 * @apiName GetTestsById&studentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch ID & studentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
/*
router.get('/id/:id/students/:studentId', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                id: req.params.id,
	        studentId:req.params.studentId
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/id/:id/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/id/:id/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});
*/

/**
 * @api (get) /tests/id/:id/teachers/:teacherId/students/:studentId
 * 
 * @apiName GetTestsById&teacherId&studentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch ID & teacherId & studentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
/*
router.get('/id/:id/teachers/:teacherId/students/:studentId', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                id: req.params.id,
	        teacherId:req.params.teacherId,
	        studentId:req.params.studentId
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/id/:id/teachers/:teacherId/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/id/:id/teachers/:teacherId/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});
*/

/**
 * @api (get) /tests/id/:id/category/:category/level/:level/attemptsRemaining/:attemptsRemaining/teachers/teacherId/students/studentId
 * 
 * @apiName GetTestsById&Category&Level&AttemptsRemaining&TeacherId&StudentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch ID & Category & Level & AttemptsRemaining & TeacherId & StudentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
/*
router.get('/id/:id/category/:category/level/:level/attemptsRemaining/:attemptsRemaining/teachers/:teacherId/students/:studentId', function(req,res) {
    var result = {};
    var value = req.params.category;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    var paramLevel = req.params.level.split('');
    data.Test.findAll({
            where: {
                id: req.params.id,
	            category: value,
                baseNumber: paramLevel[0],
	    	    operation: paramLevel[1],
                attemptsRemaining: req.params.attemptsRemaining,
                teacherId: req.params.teacherId,
                studentId: req.params.studentId
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/id/:id/category/:category/level/:level/attemptsRemaining/:attemptsRemaining/teachers/:teacherId/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/id/:id/category/:category/level/:level/attemptsRemaining/:attemptsRemaining/teachers/:teacherId/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});
*/

/**
 * @api (get) /tests/practice/:isPractice
 * 
 * @apiName GetTestsByIsPractice
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch test type to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/practice/:isPractice', function (req, res) {
    var result = {};
    var value = req.params.isPractice;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    data.Test.findAll({
        where: {
            practice: value
        },
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/practice/:isPractice`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/practice/:isPractice`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

///**
// * @api (get) /tests/practice/:isPractice/level/:level
// * 
// * @apiName GetTestsByIsPractice&Level
// * 
// * @apiGroup Tests
// * 
// * @apiParam (Number) input Test batch Practice & Level to pull
// * 
// * @apiSuccess (JSON) data Current table entry for test
// * @apiSuccess (JSON) responseCode HTTP Response Code
// * @apiSuccess (JSON) response Server Response
// * 
// * @apiError (JSON) data Empty data set test on error
// * @apiError (JSON) responseCode HTTP Response Code
// * @apiError (JSON) response Server Response
// */
router.get('/practice/:isPractice/level/:level', function (req, res) {
    var result = {};
    var value = req.params.isPractice;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    var paramLevel = req.params.level.split('');
    data.Test.findAll({
        where: {
            practice: value,
            baseNumber: paramLevel[0],
            operation: paramLevel[1]
        },
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/practice/:isPractice/level/:level`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/practice/:isPractice/level/:level`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/practice/:isPractice/teachers/:teacherId/students/:studentId
 * 
 * @apiName GetTestsByIsPractice&teacherId&studentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch Practice & TeacherId & StudentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/practice/:isPractice/teachers/:teacherId/students/:studentId', function (req, res) {
    var result = {};
    var value = req.params.isPractice;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    data.Test.findAll({
        where: {
            practice: value,
            teacherId: req.params.teacherId,
            studentId: req.params.studentId
        },
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/practice/:isPractice/teachers/:teacherId/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/practice/:isPractice/teachers/teacherId/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

///**
// * @api (get) /tests/level/:level
// * 
// * @apiName GetTestsByLevel
// * 
// * @apiGroup Tests
// * 
// * @apiParam (Number) input Test batch Level to pull
// * 
// * @apiSuccess (JSON) data Current table entry for test
// * @apiSuccess (JSON) responseCode HTTP Response Code
// * @apiSuccess (JSON) response Server Response
// * 
// * @apiError (JSON) data Empty data set test on error
// * @apiError (JSON) responseCode HTTP Response Code
// * @apiError (JSON) response Server Response
// */
router.get('/level/:level', function (req, res) {
    var result = {};
    var paramLevel = req.params.level.split('');
    data.Test.findAll({
        where: {
            baseNumber: paramLevel[0],
            operation: paramLevel[1]
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/level/:level`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/level/:level`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })

});

/**
 * @api (get) /tests/level/:level/practice/:isPractice/attemptsRemaining/:attemptsRemaining
 * 
 * @apiName GetTestsByLevel&IsPractice&AttemptsRemaining
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch Level Practice AttemptsRemaining to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/level/:level/practice/:isPractice/attemptsRemaining/:attemptsRemaining', function (req, res) {
    var result = {};
    var paramLevel = req.params.level.split('');
    var value = req.params.isPractice;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    data.Test.findAll({
        where: {
            baseNumber: paramLevel[0],
            operation: paramLevel[1],
            practice: value,
            attemptsRemaining: req.params.attemptsRemaining
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/level/:level/practice/:isPractice/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/level/:level/practice/:isPractice/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })

});

/**
 * @api (get) /tests/level/:level/students/studentId
 * 
 * @apiName GetTestsByLevel&StudentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch Level & StudentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/level/:level/students/:studentId', function (req, res) {
    var result = {};
    var paramLevel = req.params.level.split('');
    data.Test.findAll({
        where: {
            baseNumber: paramLevel[0],
            operation: paramLevel[1],
            studentId: req.params.studentId
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/level/:level/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/level/:level/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })

});

/**
 * @api (get) /tests/level/:level/teachers/teacherId
 * 
 * @apiName GetTestsByLevel&teacherId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch Level & teacherId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/level/:level/teachers/:teacherId', function (req, res) {
    var result = {};
    var paramLevel = req.params.level.split('');
    data.Test.findAll({
        where: {
            baseNumber: paramLevel[0],
            operation: paramLevel[1],
            teacherId: req.params.teacherId
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/level/:level/teachers/:teacherId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/level/:level/teachers/:teacherId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })

});

/**
 * @api (get) /tests/level/:level/attemptsRemaining/:attemptsRemaining
 * 
 * @apiName GetTestsBylevel&attemptsRemaining
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch level attemptsRemaining to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
//commented out because URL params don't work with '/' so any implementation would require body parameters
//router.get('/level/:level/attemptsRemaining/:attemptsRemaining', function (req, res) {
//    var result = {};
//    var paramLevel = req.params.level.split('');
//    data.Test.findAll({
//        where: {
//            baseNumber: paramLevel[0],
//	        operation: paramLevel[1],
//            attemptsRemaining: req.params.attemptsRemaining
//        }
//    })
//        .then(testData => {
//            var parsed = JSON.parse(JSON.stringify(testData));
//            for(i = 0; i < parsed.length; i++) {
//                delete parsed[i].operation;
//                delete parsed[i].baseNumber;
//            }
//            result['tests'] = parsed;
//            result['endpoint'] = `/tests/level/:level/attemptsRemaining/:attemptsRemaining`;
//            result['responseCode'] = HttpStatus.OK;
//            result['response'] = "Query Successful";
//            res.status(result.responseCode);
//            res.json(result);
//            return;
//        }).catch(function (err) {
//            console.log('Error querying a test');
//            console.log(err)
//            result['message'] = "Error processing request";
//            result['endpoint'] = `/tests/level/:level/attemptsRemaining/:attemptsRemaining`;
//            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
//            result['response'] = "Internal Server Error";
//            res.status(result.responseCode);
//            res.json(result);
//            return;
//        })
//});


/**
 * @api (get) /tests/level/:level/attemptsRemaining/:attemptsRemaining/students/studentId
 * 
 * @apiName GetTestsByLevel&AttemptsRemaining&StudentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch Level AttemptsRemaining StudentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/level/:level/attemptsRemaining/:attemptsRemaining/students/:studentId', function (req, res) {
    var result = {};
    var paramLevel = req.params.level.split('');
    data.Test.findAll({
        where: {
            baseNumber: paramLevel[0],
            operation: paramLevel[1],
            attemptsRemaining: req.params.attemptsRemaining,
            studentId: req.params.studentId
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `tests/level/:level/attemptsRemaining/:attemptsRemaining/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/level/:level/attemptsRemaining/:attemptsRemaining/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })

});

/**
 * @api (get) /tests/attemptsRemaining/:attemptsRemaining
 * 
 * @apiName GetTestsByAttemptsRemaining
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch AttemptsRemaining to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/attemptsRemaining/:attemptsRemaining', function (req, res) {
    var result = {};
    data.Test.findAll({
        where: {
            attemptsRemaining: req.params.attemptsRemaining
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })

});

/**
 * @api (get) /tests/teachers/:teacherId
 * 
 * @apiName GetTestsByteacherId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch teacherId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/teachers/:teacherId', function (req, res) {
    var result = {};
    data.Test.findAll({
        where: {
            teacherId: req.params.teacherId
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/teachers/:teacherId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/teachers/:teacherId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })

});

/**
 * @api (get) /tests/students/:studentId
 * 
 * @apiName GetTestsBystudentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch studentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/students/:studentId', function (req, res) {
    var result = {};
    data.Test.findAll({
        where: {
            studentId: req.params.studentId
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/students/:studentId/level/:level/attemptsRemaining/:attemptsRemaining
 * 
 * @apiName GetTestsBystudentId&level&attemptsRemaining
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch studentId level attemptsRemaining to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/students/:studentId/level/:level/attemptsRemaining/:attemptsRemaining', function (req, res) {
    var result = {};
    var paramLevel = req.params.level.split('');
    data.Test.findAll({
        where: {
            studentId: req.params.studentId,
            baseNumber: paramLevel[0],
            operation: paramLevel[1],
            attemptsRemaining: req.params.attemptsRemaining
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/students/:studentId/level/:level/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/students/:studentId/level/:level/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/students/:studentId/attemptsRemaining/:attemptsRemaining
 * 
 * @apiName GetTestsBystudentId&attemptsRemaining
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch studentId & attemptsRemaining to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/students/:studentId/attemptsRemaining/:attemptsRemaining', function (req, res) {
    var result = {};
    data.Test.findAll({
        where: {
            studentId: req.params.studentId,
            attemptsRemaining: req.params.attemptsRemaining
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/students/:studentId/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/students/:studentId/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/teachers/:teacherId/students/:studentId
 * 
 * @apiName GetTestsByteacherId&studentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch teacherId & studentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/teachers/:teacherId/students/:studentId', function (req, res) {
    var result = {};
    data.Test.findAll({
        where: {
            teacherId: req.params.teacherId,
            studentId: req.params.studentId
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/teachers/:teacherId/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/teachers/:teacherId/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/practice/:isPractice/attemptsRemaining/:attemptsRemaining
 * 
 * @apiName GetTestsByIsPractice&attemptsRemaining
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch practice & attemptsRemaining to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/practice/:isPractice/attemptsRemaining/:attemptsRemaining', function (req, res) {
    var result = {};
    var value = req.params.isPractice;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    data.Test.findAll({
        where: {
            practice: value,
            attemptsRemaining: req.params.attemptsRemaining
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/practice/:isPractice/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/practice/:isPractice/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/practice/:isPractice/teachers/:teacherId
 * 
 * @apiName GetTestsByIsPractice&teacherId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch practice & teacherId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/practice/:isPractice/teachers/:teacherId', function (req, res) {
    var result = {};
    var value = req.params.isPractice;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    data.Test.findAll({
        where: {
            practice: value,
            teacherId: req.params.teacherId
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/practice/:isPractice/teachers/:teacherId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/practice/:isPractice/teachers/:teacherId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/practice/:isPractice/students/:studentId
 * 
 * @apiName GetTestsByIsPractice&studentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch practice & studentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/practice/:isPractice/students/:studentId', function (req, res) {
    var result = {};
    var value = req.params.isPractice;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    data.Test.findAll({
        where: {
            practice: value,
            studentId: req.params.studentId
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/practice/:isPractice/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/practice/:isPractice/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/teachers/:teacherId/attemptsRemaining/:attemptsRemaining
 * 
 * @apiName GetTestsByteacherId&attemptsRemaining
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch teacherId & attemptsRemaining to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/teachers/:teacherId/attemptsRemaining/:attemptsRemaining', function (req, res) {
    var result = {};
    data.Test.findAll({
        where: {
            teacherId: req.params.teacherId,
            attemptsRemaining: req.params.attemptsRemaining
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/teachers/:teacherId/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/teachers/:teacherId/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })

});

/**
 * @api (get) /tests/baseNumber/:baseNumber
 * 
 * @apiName GetTestsByBaseNumber
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch baseNumber to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/baseNumber/:baseNumber', function (req, res) {
    var result = {};
    data.Test.findAll({
        where: {
            baseNumber: req.params.baseNumber
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = `/tests/baseNumber/:baseNumber`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/tests/baseNumber/:baseNumber`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })

});

/**
 * @api (post) /tests/
 * 
 * @apiName PostTests
 * 
 * @apiGroup Tests
 * 
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.post('/', async (req, res) => {
    var result = {};
    console.log(`Post: `);
    console.log(req.body);

    try {
        var student = await data.Student.findByPk(req.body.studentId);
        var teacher = await data.Teacher.findByPk(req.body.teacherId);

        if (student === null) {
            throw new Sequelize.ForeignKeyConstraintError(
                { message: `Student with id ${req.body.studentId} does not exist` });
        } else if (teacher === null) {
            throw new Sequelize.ForeignKeyConstraintError(
                { message: `Teacher with id ${req.body.teacherId} does not exist` });
        }

        var newTest = await data.Test.create({
            practice: req.body.practice,
            baseNumber: req.body.baseNumber,
            operation: req.body.operation,
            attemptsRemaining: req.body.attemptsAllowed,
            teacherId: req.body.teacherId,
            studentId: req.body.studentId
        });

        console.log(`New tests data received: Entry ${newTest.id} created.`);

        var uri = req.protocol + '://' + req.get('host') +
            req.baseUrl + req.path + newTest.id;
        result['resource'] = {
            'id': newTest.id,
            'uri': uri
        };
        result['endpoint'] = "/tests";
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
        console.log('Error creating new test record');
        console.log(err)
        result['message'] = message;
        result['endpoint'] = "/tests";
        result['responseCode'] = responseCode;
        result['response'] = response;
        res.status(result.responseCode);
        res.json(result);
        return;
    }
});

/**
 * @api (patch) /tests/
 * 
 * @apiName PatchTests
 * 
 * @apiGroup Tests
 * 
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.patch('/:id', async (req, res) => {
    var result = {};
    console.log(`Patch: `);
    console.log(req.body);
    try {
        var test = await data.Test.findByPk(req.params.id);

        if (test === null) {
            throw new Sequelize.EmptyResultError(
                `Test with id ${req.params.id} does not exist`);
        }

        await data.Test.update({
            attemptsRemaining: req.body.attemptsRemaining
        }, { where: { id: req.params.id } });
        var uri = req.protocol + '://' + req.get('host') +
            req.baseUrl + req.path;
        res.set('Location', uri);
        res.status(HttpStatus.NO_CONTENT);
        res.json(result);
        return;
    } catch (err) {
        var message;
        var responseCode;
        var response;
        if (err instanceof Sequelize.ValidationError) {
            message = err.message;
            responseCode = HttpStatus.BAD_REQUEST;
            response = "Bad Request";
        } else if (err instanceof Sequelize.ForeignKeyConstraintError ||
                err instanceof Sequelize.EmptyResultError) {
            message = err.message;
            responseCode = HttpStatus.NOT_FOUND;
            response = "Not Found";
        } else {        
            message = "Error processing request";
            responseCode = HttpStatus.INTERNAL_SERVER_ERROR;
            response = "Internal Server Error";
        }
        console.log('Error updating test information');
        console.log(err)
        result['message'] = message;
        result['endpoint'] = "/tests";
        result['responseCode'] = responseCode;
        result['response'] = response;
        res.status(result.responseCode);
        res.json(result);
    }
});

/**
 * @api (get) /tests/
 * 
 * @apiName GetTests
 * 
 * @apiGroup Tests
 * 
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/', function (req, res) {
    var result = {};
    data.Test.findAll()
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for (i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['tests'] = parsed;
            result['endpoint'] = "/tests";
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying all tests');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = "/tests";
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
})

// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use(function (req, res) {
    var result = {};
    result['tests'] = {
        "endpoint": "/tests"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});

// required to make routes work
module.exports = router;