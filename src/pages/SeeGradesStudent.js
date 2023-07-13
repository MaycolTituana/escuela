import Cookies from 'universal-cookie/es6';
import NavbarStudent from '../components/NavbarStudent';
import TableGradesStudent from '../components/TableGradesStudent';
import TableGradesStudentPrimary from '../components/TableGradesStudentPrimary';
import SchoolYear from '../components/SchoolYear';
import {getStudentByUsername} from '../services/studentService';
import {getGradesByStudentAndQuimester} from '../services/gradesService';
import {getCourseById} from '../services/courseService';
import {getSubjectsByLevel} from '../services/subjectService';
import {useEffect, useState} from 'react';

const cookies = new Cookies();

const SeeGradesProfessor = () => {

    const [gradesValues, setGradesValues] = useState([]);
    const [studentValues, setStudentValues] = useState({
        _id: '',
        name: '',
        lastName: '',
        bornYear: '',
        idCard: '',
        genre: '',
        nationality: '',
        email: cookies.get('email', {path: "/"}),
        user: cookies.get('user', {path: "/"}),
        password: cookies.get('password', {path: "/"}),
        idCourse: ''
    });
    const [subjectsValues, setSubjectsValues] = useState([]);
    const [courseValues, setCourseValues] = useState({});

    const [values, setValues] = useState({
        idCourse: '',
        quimester: 0
    });

    useEffect(() => {
        async function loadStudent() {
            const response = await getStudentByUsername(studentValues.user);

            if (response.status === 200) {
                setStudentValues(response.data[0]);
            }
        }

        loadStudent();
        
    }, []);

    useEffect(() => {
        async function loadCourse() {
            const response = await getCourseById(studentValues.idCourse);
                
            if (response.status === 200) {

                //if 
                setCourseValues(response.data);
                setValues({...values, idCourse: studentValues.idCourse});
                
            }
            
        }

        loadCourse();
        
    }, [values.quimester]);

    useEffect(() => {
        async function loadSubjects() {
            
            const response = await getSubjectsByLevel(courseValues.level);

            if (response.status === 200) {
                setSubjectsValues(response.data);
                //setValues({...values, idSubject: studentValues.idCourse});
            }
        }
        loadSubjects();
    }, [values.idCourse, values.quimester]);

    useEffect(() => {
        
        async function loadGrades() {
            
            const response = await getGradesByStudentAndQuimester(studentValues._id, values.quimester);
            
            if (response.status === 200) {
                setGradesValues(response.data);
            }
        }

        loadGrades();
        
    }, [values]);

    useEffect(() => {
        if (typeof cookies.get('user') === 'undefined' || cookies.get('type', {path: "/"}) !== '3') {
            window.location.href = "./";
        }
    });

    const tableGradesStudentEGB = () => {
        return (
            <TableGradesStudent gradesValues={gradesValues} subjectsValues={subjectsValues} values={values} setValues={setValues} />
            
        );
    }

    const tableGradesStudedntPrimary = () => {
        return (
            <TableGradesStudentPrimary gradesValues={gradesValues} subjectsValues={subjectsValues} values={values} setValues={setValues} />
            
        );
    }

    return (
        <>
            <NavbarStudent />
            <br />
            <SchoolYear />
            {
                courseValues.level === "EGB" ?
                tableGradesStudentEGB() :
                tableGradesStudedntPrimary()
            }

            <br />
        </> 
    );

};
export default SeeGradesProfessor; 