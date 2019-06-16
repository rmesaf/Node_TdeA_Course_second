const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const { createCourse, createStudent, getCourse, subscribeStudent } = require('./src/utils');
require('./src/helpers');

// Express
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '/public')));

// HBS View Engine
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/partials'));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Continuous Education'
    });
});

app.get('/create', (req, res) => {
    res.render('createCourse');
});

app.post('/create', (req, res) => {
    const {body: courseInfo} = req;
    createCourse(courseInfo).then( (response) => {
        res.render('listCourses', {
            ...response,
        });
    });
});

app.get('/subscribe', (req, res) => {
    res.render('subscribeCourse');
});

app.post('/subscribe', (req, res) => {
    const {body: studentInfo} = req;
    const {documentNumber, name, email, telephone} = studentInfo
    const student = { documentNumber, name, email, telephone };
    createStudent(student).then( (response) => {
        if(studentInfo.course){
            const subscriptionInfo = {
                studentId: studentInfo.documentNumber,
                courseId: studentInfo.course,
            };
            subscribeStudent(subscriptionInfo).then( (response) => {
                res.render('subscribeCourse', {
                    ...response,
                });
            });
        } else {
            res.render('subscribeCourse', {
                studentInfo,
                status: "error", 
                error: true, 
                message: "Please select a course"
            });
        }
    });
    
    
});

app.get('/list-courses', (req, res) => {
    res.render('listCourses');
});

app.get('/course', (req, res) => {
    const {query: params} = req;
    getCourse(params.id).then( (response) => {
        res.render('course', {
            ...response,
        });
    });
});

app.get('/subscriptions', (req, res) => {
    res.render('subscriptions');
});

app.get('*', (req, res) => {
    res.render('index', {
        title: 'Continuous Education'
    });
});

app.listen(3000, () => {
    console.info('Listening 3000');
})