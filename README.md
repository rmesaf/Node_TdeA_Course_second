# First Assignment 
This is the first assignment of Node Fundamentals, a TDA virtual course.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have installed:

* [Git](https://git-scm.com/downloads)
* [Node.js](https://nodejs.org/en/download/) (with NPM)

### Installing

Installing this project:

Clone this project using this command on a terminal:

```
git clone <url>
```

Install all needed dependencies usign this command on a terminal:

```
cd <folder>
npm install
```
### Running

Available Methods.

```
listCourses   List of courses
getCourse     Get course info usign course id
enrollCourse  Enroll student in a course
inscribir     Enroll student in a course
```

To list courses use:

```
node index listCourses
node index
```
To get one course use:

```
node index getCourse -i <courseId>
node index getCourse --course <courseId>
```

To enrollCourse use:

```
node index enrollCourse -i <courseId> -n <Student Name> -d <Student document number>
node index enrollCourse --id <courseId> --name <Student Name> --documentNumber <Student document number>
```

#### Examples
```
node index listCourses
node index getCourse -i 10001
node index enrollCourse -i 10001 -n 'Ricardo Mesa' -d 78903456
```

## Built With

* [NPM](https://www.npmjs.com/) - Package Manager

## Authors

* **Ricardo Mesa** - *Initial work* 

## Acknowledgments

* Hat tip to anyone who's code was used.