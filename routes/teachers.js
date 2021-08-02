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


////////////////////////////
//   TEACHER SECTION      //
//                        //
////////////////////////////

/**
 * @api (post) /teachers
 * 
 * @apiName Post New Teacher
 * 
 * @apiGroup Teachers
 * 
 * @apiSuccess (JSON) Teacher 
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
        var newTeacher = await data.Teacher.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        console.log(`New teachers data received: Entry ${newTeacher.id} created.`);
        console.log(`Data added was: ${JSON.stringify(newTeacher)}.`);

        var uri = req.protocol + '://' + req.get('host') +
            req.baseUrl + req.path + newTeacher.id;
        result['resource'] = {
            'id': newTeacher.id,   // auto-generated id
            'uri': uri
        };
        result['endpoint'] = "/teachers";
        result['responseCode'] = HttpStatus.CREATED;
        result['response'] = "Created"
        res.status(result.responseCode);
        res.header('Location', uri);
        res.json(result);
        return;
    } catch (err) {
        console.log('Error creating new teacher record');
        console.log(err)
        result['message'] = "Error processing request";
        result['endpoint'] = "/teachers";
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    }
});

/**
 * @api (get) /teachers
 * 
 * @apiName Get All Teachers
 * 
 * @apiGroup Teachers
 * 
 * @apiSuccess (JSON) data Current list of all known teachers
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/', function (req, res) {
    var result = {};
    data.Teacher.findAll()
        .then(function (teachers) {
            result['teachers'] = teachers;
            result['endpoint'] = "/teachers";
            result['responseCode'] = HttpStatus.OK;
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying all teachers');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = "/teachers";
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /teachers/:id
 * 
 * @apiName GetTeacherByID
 * 
 * @apiGroup Teachers
 * 
 * @apiParam (Number) input teacher ID to pull
 * 
 * @apiSuccess (JSON) data Current table entry for teacher by teacher id
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/:id', function (req, res) {
    var result = {};
    data.Teacher.findByPk(req.params.id)
        .then(teacherData => {
            result['teacher'] = teacherData;
            result['endpoint'] = `/teachers/:id`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying of teacher by id');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/teachers/:id`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

router.get('/:id/class', (req, res) => {
    var result = {};
    data.Student.findAll({
        where: {
            teacherId: req.params.id
        }
    })
        .then(studentData => {
            result['students'] = studentData;
            result['endpoint'] = `/teachers/:id/class`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch((err) => {
            console.log("Error querying of teacher's class by id");
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/teachers/:id`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
})

/**
* @api (get) /teachers/firstName/:firstName
* 
* @apiName GetTeachersByFirstName
* 
* @apiGroup Teachers
* 
* @apiParam (String) input Teachers First Name to pull
* 
* @apiSuccess (JSON) data Current table entry for teacher by teacher's first name
* @apiSuccess (JSON) responseCode HTTP Response Code
* @apiSuccess (JSON) response Server Response
* 
* @apiError (JSON) data Empty data set result on error
* @apiError (JSON) responseCode HTTP Response Code
* @apiError (JSON) response Server Response
*/
router.get('/firstName/:firstName', function (req, res) {
    var result = {};
    data.Teacher.findAll({
        where: {
            firstName: req.params.firstName
        }
    })
        .then(teacherData => {
            result['teachers'] = teacherData;
            result['endpoint'] = `/teachers/firstName/:firstName`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a teacher by their first name');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/teachers/firstName/:firstName`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /teachers/lastName/:lastName
 * 
 * @apiName GetTeachersByLastName
 * 
 * @apiGroup Teachers
 * 
 * @apiParam (String) input Teachers Last Name to pull
 * 
 * @apiSuccess (JSON) data Current table entry for teacher by teacher's last name
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/lastName/:lastName', function (req, res) {
    var result = {};
    data.Teacher.findAll({
        where: {
            lastName: req.params.lastName
        }
    })
        .then(teacherData => {
            result['teachers'] = teacherData;
            result['endpoint'] = `/teachers/lastName/:lastName`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a teacher by their last name');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = `/teachers/lastName/:lastName`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

////////////////////////////
//   TEACHER SECTION      //
//      TWO INPUTS        //
////////////////////////////

/**
 * @api (get) /teachers/firstName/:firstName/lastName/:lastName
 * 
 * @apiName GetTeachersByFirstName&LastName
 * 
 * @apiGroup Teachers
 *
 * @apiParam (String) input Teachers First and Last Name to pull
 * 
 * @apiSuccess (JSON) data Current table entry for teacher by teacher's first and last name
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/firstName/:firstName/lastName/:lastName', function (req, res) {
    var result = {};
    data.Teacher.findAll({
        where: {
            firstName: req.params.firstName,
            lastName: req.params.lastName
        },
        attributes: {
            exclude: ['teacherId', 'studentId']
        }
    })
        .then(function (teachers) {
            result['teachers'] = teachers;
            result['endpoint'] = '/teachers/firstName/:firstName/lastName/:lastName';
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying all teachers by first and last name');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = '/teachers/firstName/:firstName/lastName/:lastName';
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});



////////////////////////////
//   TEST SECTION         //
//                        //
////////////////////////////

/**
 * @api (get) /teachers/test/id/id
 * 
 * @apiName GetTestId
 * 
 * @apiGroup Teachers
 * 
 * @apiParam (Number) input test id
 * 
 * @apiSuccess (JSON) data Current table entry for teacher by test's id
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/test/id/:id', (req, res) => {
    var result = {};
    data.Teacher.findAll({
        include: {
            model: data.Test,
            required: true,
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['teacherId', 'studentId']
            }
        }
    })
        .then(function (teachers) {
            result['teachers'] = teachers;
            result['endpoint'] = '/teachers/test/id/:id';
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying teacher by test id');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = '/teachers/test/id/:id';
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

////////////////////////////
//   STUDENT SECTION      //
//                        //
////////////////////////////

/**
* @api (get) /teachers/student/id/:id
* 
* @apiName GetTeacherByStudentId
* 
* @apiGroup Teachers
* 
* @apiParam (Number) input student id
* 
* @apiSuccess (JSON) data Current table entry for teacher by student's id
* @apiSuccess (JSON) responseCode HTTP Response Code
* @apiSuccess (JSON) response Server Response
* 
* @apiError (JSON) data Empty data set result on error
* @apiError (JSON) responseCode HTTP Response Code
* @apiError (JSON) response Server Response
*/
router.get('/student/id/:id', (req, res) => {
    var result = {};
    data.Teacher.findAll({
        include: {
            model: data.Student,
            required: true,
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['teacherId', 'studentId']
            }
        }
    })
        .then(function (teachers) {
            result['teachers'] = teachers;
            result['endpoint'] = '/teachers/student/id/:id';
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying teacher by student id');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = '/teachers/student/id/:id';
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
* @api (get) /teachers/student/firstName/:firstName
* 
* @apiName GetTeacherByStudentFirstName
* 
* @apiGroup Teachers
*
* @apiParam (String) input student first name
* 
* @apiSuccess (JSON) data Current table entry for teacher by student's first name
* @apiSuccess (JSON) responseCode HTTP Response Code
* @apiSuccess (JSON) response Server Response
* 
* @apiError (JSON) data Empty data set result on error
* @apiError (JSON) responseCode HTTP Response Code
* @apiError (JSON) response Server Response
*/
router.get('/student/firstName/:firstName', (req, res) => {
    var result = {};
    data.Teacher.findAll({
        include: {
            model: data.Student,
            required: true,
            where: {
                firstName: req.params.firstName
            },
            attributes: {
                exclude: ['teacherId', 'studentId']
            }
        }
    })
        .then(function (teachers) {
            result['teachers'] = teachers;
            result['endpoint'] = '/teachers/student/firstName/:firstName';
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying teachers by student first name');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = '/teachers/student/firstName/:firstName';
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
* @api (get) /teachers/student/lastName/:lastName
* 
* @apiName GetTeacherByLastName
* 
* @apiGroup Teachers
*
* @apiParam (String) input student last name
* 
* @apiSuccess (JSON) data Current table entry for teacher by student's last name
* @apiSuccess (JSON) responseCode HTTP Response Code
* @apiSuccess (JSON) response Server Response
* 
* @apiError (JSON) data Empty data set result on error
* @apiError (JSON) responseCode HTTP Response Code
* @apiError (JSON) response Server Response
*/
router.get('/student/lastName/:lastName', (req, res) => {
    var result = {};
    data.Teacher.findAll({
        include: {
            model: data.Student,
            required: true,
            where: {
                lastName: req.params.lastName
            },
            attributes: {
                exclude: ['teacherId', 'studentId']
            }
        }
    })
        .then(function (teachers) {
            result['teachers'] = teachers;
            result['endpoint'] = '/teachers/student/lastName/:lastName';
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying teachers by student last name');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = '/teachers/student/lastName/:lastName';
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
* @api (get) /teachers/student/stars/:stars
* 
* @apiName GetTeacherByStudentStars
* 
* @apiGroup Teachers
*
* @apiParam (Number) input student stars
* 
* @apiSuccess (JSON) data Current table entry for teacher by student's stars 
* @apiSuccess (JSON) responseCode HTTP Response Code
* @apiSuccess (JSON) response Server Response
* 
* @apiError (JSON) data Empty data set result on error
* @apiError (JSON) responseCode HTTP Response Code
* @apiError (JSON) response Server Response
*/
router.get('/student/stars/:stars', (req, res) => {
    var result = {};
    data.Teacher.findAll({
        include: {
            model: data.Student,
            required: true,
            where: {
                stars: req.params.stars
            },
            attributes: {
                exclude: ['teacherId', 'studentId']
            }
        }
    })
        .then(function (teachers) {
            result['teachers'] = teachers;
            result['endpoint'] = '/teachers/student/stars/:stars';
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying teachers by student stars');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = '/teachers/student/stars/:stars';
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});


/**
* @api (get) /teachers/student/level/:level
* 
* @apiName GetTeacherByStudentLevel
* 
* @apiGroup Teachers
*
* @apiParam (String) input student level
* 
* @apiSuccess (JSON) data Current table entry for teacher by student's level
* @apiSuccess (JSON) responseCode HTTP Response Code
* @apiSuccess (JSON) response Server Response
* 
* @apiError (JSON) data Empty data set result on error
* @apiError (JSON) responseCode HTTP Response Code
* @apiError (JSON) response Server Response
*/
router.get('/student/level/:level', (req, res) => {
    var result = {};
    data.Teacher.findAll({
        include: {
            model: data.Student,
            required: true,
            where: {
                level: req.params.level
            },
            attributes: {
                exclude: ['teacherId', 'studentId']
            }
        }
    })
        .then(function (teachers) {
            result['teachers'] = teachers;
            result['endpoint'] = '/teachers/student/level/:level';
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying teachers by student level');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = '/teachers/student/level/:level';
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

////////////////////////////
//   STUDENT SECTION      //
//      TWO INPUTS        //
////////////////////////////


/**
* @api (get) /teachers/student/firstName/:firstName/lastName/:lastName
* 
* @apiName GetTeacherByStudentFirst&LastName
* 
* @apiGroup Teachers
*
* @apiParam (String) input student first and last name
* 
* @apiSuccess (JSON) data Current table entry for teacher by student's first and last name
* @apiSuccess (JSON) responseCode HTTP Response Code
* @apiSuccess (JSON) response Server Response
* 
* @apiError (JSON) data Empty data set result on error
* @apiError (JSON) responseCode HTTP Response Code
* @apiError (JSON) response Server Response
*/
router.get('/student/firstName/:firstName/lastName/:lastName', function (req, res) {
    var result = {};
    data.Teacher.findAll({
        include: {
            model: data.Student,
            required: true,
            where: {
                firstName: req.params.firstName,
                lastName: req.params.lastName
            },
            attributes: {
                exclude: ['teacherId', 'studentId']
            }
        }

    })
        .then(function (teachers) {
            result['teachers'] = teachers;
            result['endpoint'] = '/teachers/student/firstName/:firstName/lastName/:lastName';
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying teacher by students first and last name');
            console.log(err)
            result['message'] = "Error processing request";
            result['endpoint'] = '/teachers/student/firstName/:firstName/lastName/:lastName';
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});



////////////////////////////
//  DEFAULT SECTION       //
//                        //
////////////////////////////

// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use(function (req, res) {
    var result = {};
    result['data'] = {
        "endpoint": "/teachers"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});


// required to make routes work
module.exports = router;