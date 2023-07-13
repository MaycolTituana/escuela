import axios from 'axios'

const baseUrl = "https://backend-notas-seven.vercel.app";

export async function saveProfessor(professorData){

    try{
        const response = await axios({
            url: `${baseUrl}/professors`,
            method: 'POST',
            data: professorData
        });
        
    }catch(error){
        console.log(error);
    }
};

export async function saveUser(professorData){

    try{
        const response = await axios({
            url: `${baseUrl}/users`,
            method: 'POST',
            data: {
                "email": professorData.Correo,
                "user": professorData.Usuario,
                "password": professorData.Contraseña,
                "type": 2 
            }
        });
        
    }catch(error){
        console.log(error);
    }
};

export async function getProfessorWithoutSubjects(){
    try{
        const response = await axios({
            url: `${baseUrl}/professorsWithoutSubjects`,
            method: 'GET',
        })
        
        return response;
  
    }catch(error){
      console.log(error)
    }
};

export async function getProfessorById(professorId){
    try{
        const response = await axios({
            url: `${baseUrl}/professors/${professorId}`,
            method: 'GET',
        })

        return response;
  
    }catch(error){
      console.log(error)
    }
};


export async function getProfessorByUsername(professorUsername){
    try{
        const response = await axios({
            url: `${baseUrl}/professorByUsername/${professorUsername}`,
            method: 'GET',
        })
        
        return response;
        
  
    }catch(error){
      console.log(error)
    }
};

export async function getProfessorsByLevel(level){
    try{
        const response = await axios({
            url: `${baseUrl}/professorsByLevel/${level}`,
            method: 'GET',
        })
        
        const professors = response.data;
        const avaliableProfessors = [];

        for (var i=0; i<professors.length; i++) {
            if ((professors[i].disponibility == 0 && professors[i].idCourse.length == 0) || professors[i].disponibility == 1) {
                avaliableProfessors.push(professors[i]);
            }
        }
        response.data = avaliableProfessors;
        return response;

    }catch(error){
        console.log(error)
    }
}

export async function updateProfessor(professorData, setProfessorData){
    const response = await axios.put(`${baseUrl}/professors/${professorData._id}`, {
        idCourse: professorData.idCourse,
        idSubject: professorData.idSubject
    })
    .then(response => {
        window.alert('Asignación realizada con éxito');
        window.location.reload();
    })
    .catch(error => {
      console.log(error);
    })
    setProfessorData([]);
};

export async function updateCoursesProfessor(professorData, setProfessorData){
    const response = await axios.put(`${baseUrl}/professorsCourses/${professorData._id}`, {
        idCourse: professorData.idCourse
    })
    .then(response => {
        console.log('Data: ' + professorData)
        window.alert('Asignación realizada con éxito');
        window.location.reload();
    })
    .catch(error => {
      console.log(error);
    })
    setProfessorData([]);
};