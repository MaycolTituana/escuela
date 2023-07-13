import Assignation from '../components/FormAssignationSubjectToProfessor';
import React from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import Cookies from 'universal-cookie/es6';
import {useEffect, useState} from 'react';
import {getProfessorWithoutSubjects, updateProfessor, getProfessorById} from '../services/professorService';
import {getSubjectsByType} from '../services/subjectService';

const cookies = new Cookies();

const AssignationSubjectoToProfessor = () => {

    const [professors, setProfessors] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [professor, setProfessor] = useState({});
    const [id, setId] = useState("");

    useEffect(() => {
        async function loadProfessors() {
            const response = await getProfessorWithoutSubjects();

            if (response.status === 200) {
                setProfessors(response.data);
                
            };
        };

        loadProfessors();
        
    }, []);

    useEffect(() => {
        async function loadSubjects() {
            const response = await getSubjectsByType();

            if (response.status === 200) {
                setSubjects(response.data);
                
            };
        };

        loadSubjects();
        
    }, []);

    useEffect(() => {
        async function findProfessor() {
            const response = await getProfessorById(id);

            if (response.status === 200) {
                setProfessor(response.data);
                
            };
        };

        findProfessor();
        
    }, [id]);

    useEffect(() => {
        if (typeof cookies.get('user') === 'undefined' || cookies.get('type', {path: "/"}) !== '0') {
            window.location.href = "./";
        }
    });

    const handleUpdate = (professorData, setProfessorData) => {
        updateProfessor(professorData, setProfessorData);
    };

    return(
        <>
            <NavbarAdmin /><br/>
            <center>
                <Assignation handleUpdate={handleUpdate} professors={professors} subjects={subjects} professor={professor} setProfessor={setProfessor} setId={setId} />
            </center>
        </>
    );
};

export default AssignationSubjectoToProfessor;