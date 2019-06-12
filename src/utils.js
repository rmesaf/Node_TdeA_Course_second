const fs = require('fs');
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
const readCourses = async () => {
    try {
        const coursesListData = await require('../coursesList.json');
        return coursesListData;
    } catch (err){
        return [];
    }
}

const formatCurrency = (value) => {
    return `$${value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
}

module.exports = {
    createCourse,
    readCourses,
    formatCurrency,
};