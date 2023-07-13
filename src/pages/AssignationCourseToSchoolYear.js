import Assignation from '../components/FormAssignationCourseToSchoolYear';
import React from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import Cookies from 'universal-cookie/es6';
import {useEffect, useState} from 'react';
import {getCoursesWithoutSchoolYear, updateCourse, getCourseById} from '../services/courseService';
import {getActualSchoolYear} from '../services/periodService';

const cookies = new Cookies();

const AssignationCourseToSchoolYear = () => {

    const [courses, setCourses] = useState([]);
    const [schoolYears, setSchoolYears] = useState([]);
    const [course, setCourse] = useState({});
    const [id, setId] = useState("");

    useEffect(() => {
        async function loadCourses() {
            const response = await getCoursesWithoutSchoolYear();

            if (response.status === 200) {
                setCourses(response.data);
                
            };
        };

        loadCourses();
        
    }, []);

    useEffect(() => {
        async function loadSchoolYears() {
            const response = await getActualSchoolYear();

            if (response.status === 200) {
                setSchoolYears(response.data);
                
            };
        };

        loadSchoolYears();
        
    }, []);

    useEffect(() => {
        async function findCourse() {
            const response = await getCourseById(id);

            if (response.status === 200) {
                setCourse(response.data);
                
            };
        };

        findCourse();
        
    }, [id]);

    useEffect(() => {
        if (typeof cookies.get('user') === 'undefined' || cookies.get('type', {path: "/"}) !== '0') {
            window.location.href = "./";
        }
    });

    const handleUpdate = (courseData, setCourseData) => {
        updateCourse(courseData, setCourseData);
    };

    return(
        <>
            <NavbarAdmin /><br/>
            <center>
                <Assignation handleUpdate={handleUpdate} courses={courses} schoolYears={schoolYears} course={course} setCourse={setCourse} setId={setId} />
            </center>
        </>
    );
};

export default AssignationCourseToSchoolYear;