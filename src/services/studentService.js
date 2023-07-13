import axios from 'axios'

const baseUrl = "https://backend-notas-seven.vercel.app";

export async function saveStudent(studentData, setStudentValues, messageBox, setMessage){
    try{
        const response = await axios({
            url: `${baseUrl}/students`,
            method: 'POST',
            data: studentData
        });
        setMessage({type: 'success', message: 'Estudiante registrado', isHidden: false})
    }catch(error){
        setMessage({type: 'error', message: 'Hubo problemas al registrar el estudiante', isHidden: false})
    }
    setStudentValues({
        name: '',
        lastName: '',
        bornYear: '',
        idCard: '',
        genre: '',
        nationality: '',
        email: '',
        user: '',
        password: '',
        idCourse: ''
    });
};

export async function saveUser(studentData, messageBox, setMessage){

    try{
        const response = await axios({
            url: `${baseUrl}/users`,
            method: 'POST',
            data: {
                "email": studentData.email,
                "user": studentData.user,
                "password": studentData.password,
                "type": 3
            }
        });
        setMessage({type: 'success', message: 'Estudiante registrado', isHidden: false})
    }catch(error){
        setMessage({type: 'error', message: 'Hubo problemas al registrar el estudiante', isHidden: false})
    }
};

export async function getAllStudents(){
    try{
        const response = await axios({
            url: `${baseUrl}/students`,
            method: 'GET',
        })
        return response
    }catch(error){
        console.log(error)
    }
}

export async function getNumberStudentsPerCourse(idCourse){
    try{
        const response = await axios({
            url: `${baseUrl}/studentsByCourse/${idCourse}`,
            method: 'GET',
        })
        const numStudents = response.data.length;

        return numStudents;
  
    }catch(error){
      console.log(error)
    }
};

export async function getStudentsWithoutCourse(){
    try{
        const response = await axios({
            url: `${baseUrl}/studentsWithoutCourse`,
            method: 'GET',
        })

        return response;
  
    }catch(error){
      console.log(error)
    }
};

export async function getStudentByUsername(studentUsername){
    try{
        const response = await axios({
            url: `${baseUrl}/studentByUsername/${studentUsername}`,
            method: 'GET',
        })
        
        return response;
        
  
    }catch(error){
      console.log(error)
    }
};

export async function getStudentsByCourse(idCourse){
    try{
        const response = await axios({
            url: `${baseUrl}/studentsByCourse/${idCourse}`,
            method: 'GET',
        })

        return response;
  
    }catch(error){
      console.log(error)
    }
};

export async function getStudentById(studentId){
    try{
        const response = await axios({
            url: `${baseUrl}/students/${studentId}`,
            method: 'GET',
        })

        return response;
  
    }catch(error){
      console.log(error)
    }
};

export async function updateStudent(studentData, setStudentData){
    const response = await axios.put(`${baseUrl}/students/${studentData._id}`, {
        idCourse: studentData.idCourse
    })
    .then(response => {
        window.alert('Asignación realizada con éxito');
      
    })
    .catch(error => {
      console.log(error);
    })
    
    setStudentData([]);
    window.location.reload();
};