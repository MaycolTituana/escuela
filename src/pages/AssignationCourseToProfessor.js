import React, {useState, useEffect} from 'react'
import Assignation from '../components/FormAssignationCourseToProfessor';
import Cookies from 'universal-cookie/es6';
import NavbarAdmin from '../components/NavbarAdmin';
import { getProfessorsByLevel, updateCoursesProfessor, getProfessorById } from '../services/professorService';
import { getCourseByNevel } from '../services/courseService'
import { breadcrumbsClasses } from '@mui/material';

const cookies = new Cookies();

const AssignationCourseToProfessor = () => {
    const [ professors, setProfessors ] = useState([]);
    const [ courses, setCourses ] = useState([]);
    const [ professor, setProfessor ] = useState({
        bornYear: "",
        disponibility: 2,
        email: "",
        idCard: "",
        idCourse: [],
        idSubject: "",
        lastName: "",
        level: "",
        name: "",
        password: "",
        specialization: "",
        user: "",
        _id: ""
    });
    const [ level, setLevel ] = useState("");
    const [ id, setId ] = useState("")

    useEffect(() => {
        async function loadProfessors() {
            const response = await getProfessorsByLevel(level);
            if (response.status === 200) {
                setProfessors(response.data);
            };
        };
        loadProfessors();
    }, [level]);
    
    useEffect(() => {
        const coursesArray = []
        const newArray = courses;
        const newCourses = [];

        async function findProfessor() {
            const response = await getProfessorById(id);
            if (response.status === 200){
                setProfessor(response.data); 
                response.data.idCourse.forEach(course => {
                    courses.forEach(c => {
                        if(c._id === course){
                            coursesArray.push(c)
                        }
                    })
                })
            }; 
            for(var i = 0; i < newArray.length; i++){
                if(coursesArray.includes(newArray[i]) === false){
                    newCourses.push(newArray[i])
                }
            }
            setCourses(newCourses)
        };
        
        findProfessor();     
    }, [id]);

    useEffect(() => {
        async function loadCourses() {
            const response = await getCourseByNevel(level);
            
            if (response.status === 200) {
                var courses = [];
                console.log(professor)
                for (var i=0; i<response.data.length; i++) {
                    /*if (professor.disponibility === 1) {
                        var auxBool = true;
                        for (var j=0; j<professor.idCourse.length; j++) {
                            if (professor.idCourse[j] === response.data[i]._id) {
                                auxBool = false;
                            }
                        }

                        if (auxBool === true && response.data[i].idSchoolYear !== "") {
                            courses.push(response.data[i]);
                        }

                    }else {*/
                        if (response.data[i].idSchoolYear !== "") {
                            courses.push(response.data[i]);
                        }
                    //}
                        
                }

                setCourses(courses);
            };
        };

        loadCourses();
    }, [level]);

    useEffect(() => {
        if (typeof cookies.get('user') === 'undefined' || cookies.get('type', {path: "/"}) !== '0') {
            window.location.href = "./";
        }
    });

    const handleUpdate = (professorData, setProfessorData) => {
        updateCoursesProfessor(professorData, setProfessorData);
    }

    return(
        <>
            <NavbarAdmin/><br/><br/>
            <center>
                <Assignation professors={professors} courses={courses} setLevel={setLevel}
                id={id} setId={setId} setProfessor = {setProfessor} professor={professor} 
                handleUpdate={handleUpdate} setCourses={setCourses}/>
            </center>
        </>
    )
}

export default AssignationCourseToProfessor;