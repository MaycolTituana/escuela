import Assignation from '../components/FormAssignationStudentToCourse';
import React from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import Cookies from 'universal-cookie/es6';
import {useEffect, useState} from 'react';
import {getStudentsWithoutCourse, updateStudent, getStudentById} from '../services/studentService';
import {getCoursesWithCapacity} from '../services/courseService';

const cookies = new Cookies();

const AssignationStudentToCourse = () => {

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [student, setStudent] = useState({});
    const [id, setId] = useState("");

    useEffect(() => {
        async function loadStudents() {
            const response = await getStudentsWithoutCourse();

            if (response.status === 200) {
                setStudents(response.data);
                
            };
        };

        loadStudents();
        
    }, []);

    useEffect(() => {
        async function loadCourses() {
            const response = await getCoursesWithCapacity();

            if (response.status === 200) {
                var courses = [];
                for (var i=0; i<response.data.length; i++) {
                    if (response.data[i].idSchoolYear !== "") {
                        courses.push(response.data[i]);
                    }
                }
                setCourses(courses);
            };
        };

        loadCourses();
        
    }, []);

    useEffect(() => {
        async function findStudent() {
            const response = await getStudentById(id);

            if (response.status === 200) {
                setStudent(response.data);
            };
        };

        findStudent();
        
    }, [id]);

    useEffect(() => {
        if (typeof cookies.get('user') === 'undefined' || cookies.get('type', {path: "/"}) !== '0') {
            window.location.href = "./";
        }
    });

    const handleUpdate = (professorData, setProfessorData) => {
        updateStudent(professorData, setProfessorData);
    };

    return(
        <>
            <NavbarAdmin /><br/>
            <center>
                <Assignation handleUpdate={handleUpdate} students={students} courses={courses} student={student} setStudent={setStudent} setId={setId} />
            </center>
        </>
    );
};

export default AssignationStudentToCourse;