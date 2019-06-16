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
                    <th>Actions</th>                                            
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
                                <td><a class="btn btn-primary" href="course?id=${id}"}>More</span></td>                                        
                            </tr>`;
        tableBody += courseRow;
    });
    tableBody += '</tbody>'
    const tableFooter = '</table>';
    return tableHeader + tableBody + tableFooter;
});

hbs.registerHelper('courseDetails', (price, mode, intensity, status) => {
    const details = 
        `<ul>
            <li><strong>Price: </strong>${formatCurrency(price)}</li>
            <li><strong>Modality: </strong>${MODE[mode] || "-"}</li>
            <li><strong>Intensity: </strong>${intensity || "-"} Hours</li>
            <li><strong>Status: </strong><span class="badge badge-${status.toUpperCase() === AVAILABLE ? 'success' : 'danger'}"}>${status}</span></li>
        </ul>`;

    return details;
});

hbs.registerHelper('courseDropdown', (status) => {
    const courses = require(path.join(__dirname, '../coursesList.json'));
    const listCourses = courses.filter(course => course.status.toUpperCase() === status.toUpperCase()); 
    let select = 
        `<select name="course" class="form-control mdb-select md-form" id="course">
            <option value="-" disabled="true" selected="true">Choose course</option>
        `;
    listCourses.forEach( course =>  {
        const option = `<option value="${course.id}">${course.name}</option>`
        select += option;
    });
    select += `</select>`;
    return select;
});