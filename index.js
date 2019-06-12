const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const { createCourse } = require('./src/utils');
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
app.get('/list-courses', (req, res) => {
    res.render('listCourses');
});

app.get('*', (req, res) => {
    res.render('index', {
        title: 'Continuous Education'
    });
});

app.listen(3000, () => {
    console.info('Listening 3000');
})