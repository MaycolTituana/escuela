import React from 'react'
import NavbarAdmin from '../components/NavbarAdmin';
import RegisterForm from '../components/RegisterPeriodForm'
import Cookies from 'universal-cookie/es6';
import {useEffect} from 'react';
import { savePeriod } from '../services/periodService';

const cookies = new Cookies();

const CreatePeriod = () => {

    const handleSubmit = (periodData, setPeriodDataValues, messageBox, setMessage) => {
        savePeriod(periodData, setPeriodDataValues, messageBox, setMessage);
    }

    useEffect(() => {
        if (typeof cookies.get('user') === 'undefined' || cookies.get('type', {path: "/"}) !== '0') {
            window.location.href = "./";
        }
    });

    return(
        <>
            <NavbarAdmin/><br/>
            <center>
                <RegisterForm handleSubmit={handleSubmit} />
            </center>
        </>
    )
}

export default CreatePeriod;