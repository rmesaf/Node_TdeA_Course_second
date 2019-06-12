const hbs = require('hbs');
const path = require('path');
const { formatCurrency } = require('./utils');
const { MODE, AVAILABLE, CANCELED } = require('./constants');

hbs.registerHelper('listCourses', (status) => {
    let courses = require(path.join(__dirname, '../coursesList.json'));
    const listCourses = courses.filter(course => course.status.toUpperCase() === status.toUpperCase()); 
    const tableHeader = 
        `<table class="table table-striped table-condensed">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Modality</th>
                    <th>Intensity</th>
                    <th>Status</th>                                            
                </tr>
            </thead>`;
    let tableBody = '<tbody>';
    listCourses.forEach( course =>  {
        const {id, name, description, price, mode, intensity, status} = course;
        const courseRow = `<tr>
                                <td>${id}</td>
                                <td>${name}</td>
                                <td>${description}</td>
                                <td>${formatCurrency(price)}</td>
                                <td>${MODE[mode] || "-"}</td>
                                <td>${intensity || "-"} Hours</td>
                                <td><span class="badge badge-${status.toUpperCase() === AVAILABLE ? 'success' : 'danger'}"}>${status}</span></td>                                       
                            </tr>`;
        tableBody += courseRow;
    });
    tableBody += '</tbody>'
    const tableFooter = '</table>';
    return tableHeader + tableBody + tableFooter;
})