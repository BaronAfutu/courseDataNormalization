const e = require("express");

let splitEntry=(text)=>{
    /**
     * Schemes through text and returns array of 
     * distinct set of characters and digits
    */
    let course=[];
    let m='';
    let re = /[a-z]+|[0-9]+/gi;
    do{
        m = re.exec(text);
        if(m)course.push(m[0]);
    }while(m);
    return course;
}

let getYear = (text)=>{
    /**
     * Converts a 2 digit year to a 4 digit year
     * or return year if is already 4 digits
     */
    let schoolStartYear = 1900;
    let nextYearSuffix = (new Date().getFullYear()%100) + 1;//gets last 2 digits of next year
    let year = parseInt(text);
    if(text.length==4)return year;
    else if(text.length==2){
        if(year>nextYearSuffix)return 1900+year;
        else return 2000+year;
    }
    else return -1;
}

let getSemester = (text)=>{
    let semesters = {
        'Summer':/su/i,
        'Fall':/f/i,
        'Spring':/s/i,
        'Winter':/w/i
    }
    for(x in semesters){
        if(text.match(semesters[x]))return x;
    }
    return -1;
}

let validate = (courseObject)=>{
    for(x in courseObject){
        if(courseObject[x]==-1)return false;
    }
    return true;
}

let getCourse = (element)=>{
    let splited = splitEntry(element);

    if(splited.length!=4)return {
        'data': {},
        'err': 'Bad Request: Invalid Content!',
        'status': 400
    };

    let course = {};
    course['department'] = splited[0];
    course['course_number'] = splited[1];
    if(splited[2].match(/[0-9]+/)){
        course['year'] = getYear(splited[2]);
        course['semester'] = getSemester(splited[3]);
    }
    else{
        course['year'] = getYear(splited[3]);
        course['semester'] = getSemester(splited[2]);
    }

    let reply = {};
    if(validate(course)){
        reply = {
            'data': course,
            'err': null,
            'status':200
        };
    }
    else{
        reply = {
            'data': null,
            'err': 'Bad Request: Invalid Content!',
            'status':400
        }
    }
    return reply;
}
module.exports = getCourse;