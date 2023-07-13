import React from 'react'
import RegisterStudentForm from '../components/RegisterStudentForm';
import NavbarAdmin from '../components/NavbarAdmin';
import Cookies from 'universal-cookie/es6';
import {useEffect, useState} from 'react';
import {getAllStudents, saveStudent, saveUser} from '../services/studentService';

const cookies = new Cookies();

const RegisterStudent = () => {
    const [ students, setStudents ] = useState([])

    const handleSubmit = (studentData, setStudentValues, messageBox, setMessage) => {
        saveStudent(studentData, setStudentValues,messageBox, setMessage);
        saveUser(studentData, setMessage);
    };

    useEffect(() => {
        async function loadStudents(){
            const response = await getAllStudents()
            if(response.status === 200){
                setStudents(response.data)
            }
        }
        loadStudents()
    },[])

    useEffect(() => {
        if (typeof cookies.get('user') === 'undefined' || cookies.get('type', {path: "/"}) !== '0') {
            window.location.href = "./";
        }
    });
    
    return(
        <>
            <NavbarAdmin /><br/>
            <center>
                <RegisterStudentForm students={students} handleSubmit={handleSubmit} />
            </center>
        </>
    );
};

export default RegisterStudent;