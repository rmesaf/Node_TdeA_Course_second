const fs = require('fs');
const path = require('path');
const { STATUS_MAP } = require('./constants');

const createCourse = async(courseInfo) => {
    try{
        const { id, state } = courseInfo;
        courseInfo.status = STATUS_MAP[state || 'a'];
        let coursesList = await readCourses();
        let exists = coursesList.find(course => course.id === id);
        if(!exists) {
            coursesList.push(courseInfo);
            await fs.writeFile('./coursesList.json', JSON.stringify(coursesList), (err) => {
                if(err) throw err; 
            });
            return { status: "success", error: false, message: "Course created successfully" };
        } else {
            return { status: "error", error: true, message: "One course is already associated with that ID" };
        }
        
    } catch(err) {
        console.log(err)
    }
}

const createStudent = async(studentInfo) => {
    try{
        const { documentNumber } = studentInfo;
        let studentList = await readStudents();
        let exists = studentList.find(student => student.documentNumber === documentNumber);
        if(!exists) {
            studentList.push(studentInfo);
            await fs.writeFile('./studentList.json', JSON.stringify(studentList), (err) => {
                if(err) throw err; 
            });
        }
    } catch(err) {
        console.log(err)
    }
}

const formatCurrency = (value) => {
    return `$${value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
}

const getCourse = async(courseId) => {
    let coursesList = await readCourses();
    const course = coursesList.find(course => course.id === courseId);
    if(!course) return {};
    return course; 
}

const getStudent = (studentId) => {
    let studentList = require(path.join(__dirname, '../studentList.json'));
    const student = studentList.find(student => student.documentNumber === studentId);
    if(!student) return {};
    return student; 
}

const getSubscribedStudents = (courseId) => {
    
    const subscriptions = require(path.join(__dirname, '../subscriptions.json'));
    const subscribed = subscriptions.filter(subscription => subscription.courseId === courseId);
    let studentRow = ""; 
    subscribed.forEach( subscription =>  {
        const { studentId } = subscription;
        let student = getStudent(studentId);
        const row = `<tr>
                        <td>${student.documentNumber}</td>
                        <td>${student.name}</td>
                        <td>${student.email}</td>                                       
                    </tr>`;
        studentRow += row;
    });
    return studentRow;
}

const readCourses = async () => {
    try {
        const coursesListData = await require('../coursesList.json');
        return coursesListData;
    } catch (err){
        return [];
    }
}

const readStudents = async () => {
    try {
        const studentListData = await require('../studentList.json');
        return studentListData;
    } catch (err){
        return [];
    }
}

const readSubscriptions = async () => {
    try {
        const subscriptionsData = await require('../subscriptions.json');
        return subscriptionsData;
    } catch (err){
        return [];
    }
}

const subscribeStudent = async(subscriptionInfo) => {
    try{
        const { studentId, courseId } = subscriptionInfo;
        let subscriptions = await readSubscriptions();
        let exists = subscriptions.find(subscription => subscription.studentId === studentId && subscription.courseId === courseId );
        if(!exists) {
            subscriptions.push({studentId, courseId});
            await fs.writeFile('./subscriptions.json', JSON.stringify(subscriptions), (err) => {
                if(err) throw err; 
            });
            return { status: "success", error: false, message: "Student subscribed successfully" };
        } else {
            return { status: "error", error: true, message: "The student is already subscribed in that course" };
        }
        
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    createCourse,
    createStudent,
    formatCurrency,
    getCourse,
    getSubscribedStudents,
    readCourses,
    subscribeStudent,
};