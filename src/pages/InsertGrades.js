import Cookies from 'universal-cookie/es6';
import NavbarProfessor from '../components/NavbarProfessor';
import InsertGradesComponent from '../components/InsertGrades';
import SchoolYear from '../components/SchoolYear';
import InsertGradesComponentPrimary from '../components/InsertGradesPrimary';
import {saveGrades} from '../services/gradesService';
import {getProfessorByUsername} from '../services/professorService';
import {getCourseById} from '../services/courseService';
import {getSubjectsByTypeAndLevel, getSubjectById} from '../services/subjectService';
import {getStudentsByCourse} from '../services/studentService';
import {getSubjectsWithoutGrades} from '../services/gradesService';
import {useEffect, useState} from 'react';
import { getActualSchoolYear } from '../services/periodService';

const cookies = new Cookies();

const InsertGrades = () => {

    const [gradesValues, setGradesValues] = useState([]);
    const [professorValues, setProfessorValues] = useState({
        _id: '',
        name: '',
        lastName: '',
        bornYear: '',
        idCard: '',
        specialization: '',
        level: '',
        disponibility: '',
        email: cookies.get('email', {path: "/"}),
        user: cookies.get('user', {path: "/"}),
        password: cookies.get('password', {path: "/"}),
        idSubject: '',
        idCourse: []
    });
    const [coursesValues, setCoursesValues] = useState([]);
    const [subjectsValues, setSubjectsValues] = useState([]);
    const [studentsValues, setStudentsValues] = useState([]);
    const [count, setCount] = useState(0);

    const [values, setValues] = useState({
        idSubject: '',
        idCourse: '',
        quimester: 0
    })

    const handleSubmit = () => {
        for (var i=0; i<gradesValues.length; i++) {
            const grades = {
                lessons: gradesValues[i].lessons, 
                participations: gradesValues[i].participations, 
                homeworks: gradesValues[i].homeworks, 
                project: gradesValues[i].project, 
                exam: gradesValues[i].exam
            }

            const gradeInformation = {
                grades: grades,
                idStudent: gradesValues[i].idStudent,
                idProfessor: professorValues._id,
                idSubject: values.idSubject,
                idCourse: values.idCourse,
                quimester: values.quimester
            }

            saveGrades(gradeInformation, setGradesValues, setValues, setStudentsValues, setSubjectsValues, setCoursesValues);
        }
        window.alert("Calificaciones registradas")
        setCount(count + 1);
    };

    useEffect(() => {
        async function loadProfessor() {
            const response = await getProfessorByUsername(professorValues.user);
            if (response.status === 200) {
                setProfessorValues(response.data[0]);   
            }
        }
        loadProfessor();
    }, [count]);

    useEffect(() => {
        async function loadCourses() {
            var courses = [];
            
            for (var i=0; i<professorValues.idCourse.length; i++) {
                const response = await getCourseById(professorValues.idCourse[i]);  
                const response2 = await getActualSchoolYear();

                if (response.status === 200) {
                    if (response.data.idSchoolYear === response2.data[0]._id) {
                        courses.push(response.data);                    
                    }
                }
            }
            setCoursesValues(courses);
        }
        loadCourses();
        
    }, [values.quimester]);

    useEffect(() => {
        async function loadSubjects() {
            
            if (professorValues.idSubject === "") {
                const response = await getSubjectsByTypeAndLevel(0, professorValues.level);
                if (response.status === 200) {
                    const data = response.data;
                    var subjects = [];
                    for (var i=0; i<data.length; i++) {
                        const auxBool = await getSubjectsWithoutGrades(data[i]._id, values.idCourse, values.quimester);
                        if (auxBool === false) {
                            subjects.push(data[i]);
                        }
                    }
                    setSubjectsValues(subjects);
                }

            }else if (professorValues.idSubject !== "") {
                const response = await getSubjectById(professorValues.idSubject);

                if (response.status === 200) {
                    const data = response.data;
                    var subjects = [];

                    for (var i=0; i<data.length; i++) {
                        const auxBool = await getSubjectsWithoutGrades(data[i]._id, values.idCourse, values.quimester);
                        if (auxBool === false) {
                            subjects.push(data[i]);
                        }
                    }

                    setSubjectsValues(subjects);
                    
                }
            }            
        }
        loadSubjects();        
    }, [values.quimester, values.idCourse]);

    useEffect(() => {
        async function loadStudents() {            
            const response = await getStudentsByCourse(values.idCourse);            
            if (response.status === 200) {
                setStudentsValues(response.data);
            }
        }
        loadStudents();        
    }, [values.idSubject]);

    useEffect(() => {        
        var gradesInicialization = []
        for (var i=0; i<studentsValues.length; i++) {
            var nameStudent = studentsValues[i].name + " " + studentsValues[i].lastName
            gradesInicialization.push({
                idStudent: studentsValues[i]._id,
                nameStudent: nameStudent,
                lessons: '',
                participations: '',
                homeworks: '',
                project: '',
                exam: ''
            })
        }
        setGradesValues(gradesInicialization)        
    }, [studentsValues]);

    useEffect(() => {
        if (typeof cookies.get('user') === 'undefined' || cookies.get('type', {path: "/"}) !== '2') {
            window.location.href = "./";
        }
    });

    const tableGradesEGB = () => {
        return (
            <InsertGradesComponent handleSubmit={handleSubmit} gradesValues={gradesValues} setGradesValues={setGradesValues} coursesValues={coursesValues} 
            subjectsValues={subjectsValues} values={values} setValues={setValues} />
        );
    };

    const tableGradesPrimary = () => {
        return (
            <InsertGradesComponentPrimary handleSubmit={handleSubmit} gradesValues={gradesValues} setGradesValues={setGradesValues} coursesValues={coursesValues} 
            subjectsValues={subjectsValues} values={values} setValues={setValues} />
        );
    };

    return (
        <>
            <NavbarProfessor />
            <br />
            <SchoolYear />

            {
                professorValues.level === "EGB"?
                tableGradesEGB():
                tableGradesPrimary()
            }
            
        </> 
    );

};
export default InsertGrades; 