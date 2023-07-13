import axios from 'axios'

const baseUrl = "https://backend-notas-seven.vercel.app";

export async function saveGrades(gradesData, setGradesData, setValues, setStudentsValues, setSubjectsValues, setCoursesValues){

    try{
        const response = await axios({
            url: `${baseUrl}/grades`,
            method: 'POST',
            data: gradesData
        });
        setGradesData([])
        setValues({
            idSubject: '',
            idCourse: '',
            quimester: 0
        })
        setValues([])
        setStudentsValues([])
        setSubjectsValues([])
        setCoursesValues([])

    }catch(error){
        console.log(error);
    }
};

export async function getGradesByCourseSubjectAndQuimester(values){
    try{
        const response = await axios({
            url: `${baseUrl}/gradesByCourseSubjectAndQuimester/${values.idCourse}/${values.idSubject}/${values.quimester}`,
            method: 'GET',
        })
        
        return response;
    }catch(error){
        console.log(error)
    }
};

export async function getGradesByStudentAndQuimester(idStudent, quimester){
    try{
        const response = await axios({
            url: `${baseUrl}/gradesByStudentAndQuimester/${idStudent}/${quimester}`,
            method: 'GET',
        })
        
        return response;
        
    }catch(error){
        console.log(error)
    }
};

export async function getSubjectsWithoutGrades(idSubject, idCourse, quimester){
    try{
        const response = await axios({
            url: `${baseUrl}/subjectsWithoutGrades/${idCourse}/${idSubject}/${quimester}`,
            method: 'GET',
        })
        
        if (response.data.length === 0) {
            return false;
        }else {
            return true;
        }

    }catch(error){
        console.log(error)
    }
}

export async function updateGrades(gradesData, setGradesData, idGrade){
    console.log(gradesData)
    const response = await axios.put(`${baseUrl}/grades/${idGrade}`, gradesData)
    .then(response => {
        console.log('');
    })
    .catch(error => {
        console.log(error)
    });

    
};
