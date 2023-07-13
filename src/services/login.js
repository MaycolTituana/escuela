import axios from 'axios'
import Cookies from 'universal-cookie/es6'

const cookies = new Cookies()
const baseUrl = "https://backend-notas-seven.vercel.app/";

export function checkLogin(loginValues, setLoginValues) {

    const response =  axios.get(`${baseUrl}/users`)
    .then(response => {
        const data = response.data;
        var dataLogin = null;
        
        for (var i=0; i<data.length; i++) {
            if (data[i].user === loginValues.user && data[i].password === loginValues.password) {
                dataLogin = data[i];
                break;
            }
        }
        
        if (dataLogin !== null) {
            cookies.set('id', dataLogin._id, {path: "/"});
            cookies.set('email', dataLogin.email, {path: "/"});
            cookies.set('user', dataLogin.user, {path: "/"});
            cookies.set('password', dataLogin.password, {path: "/"});
            cookies.set('type', dataLogin.type, {path: "/"});
            window.alert('Bienvenido');

            switch (dataLogin.type) {
                case 0:
                    window.location.href = "./homeScreenAdmin";
                    break;

                case 2:
                    window.location.href = "./homeScreenProfessor";
                    break;

                case 3:
                    window.location.href = "./homeScreenStudent";
                    break;
            }
        }else {
            setLoginValues({
                user: '',
                password: ''
            });
            window.alert('Usuario o contraseña incorrectos');
        }

    }).catch(error => {
        console.log(error);
    })
    
}

