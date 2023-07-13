import axios from 'axios'

const baseUrl = "https://backend-notas-seven.vercel.app";

export async function saveSubject(subjectData){

    try{
        const response = await axios({
            url: `${baseUrl}/subjects`,
            method: 'POST',
            data: subjectData
        });
        
    }catch(error){
        console.log(error);
    }
};

export async function getSubjectsByType(){
    try{
        const response = await axios({
            url: `${baseUrl}/subjectsByType`,
            method: 'GET',
        })
        
        return response;
  
    }catch(error){
      console.log(error)
    
    }
};

export async function getSubjectsByLevel(level){
    try{
        const response = await axios({
            url: `${baseUrl}/subjectsByLevel/${level}`,
            method: 'GET',
        })
        
        return response;
  
    }catch(error){
      console.log(error)
    
    }
};

export async function getSubjectsByTypeAndLevel(type, level){
    try{
        const response = await axios({
            url: `${baseUrl}/subjectsByTypeAndLevel/${type}/${level}`,
            method: 'GET',
        })
        
        return response;
  
    }catch(error){
      console.log(error)
    }
};

export async function getSubjectById(idSubject){
    try{
        const response = await axios({
            url: `${baseUrl}/subjects/${idSubject}`,
            method: 'GET',
        })
        var subjects = [];
        subjects.push(response.data);

        response.data = subjects;
    
        return response;
        
    }catch(error){
      console.log(error)
    }
};