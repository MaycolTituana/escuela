import axios from 'axios'

const baseUrl = "https://backend-notas-seven.vercel.app";

export async function savePeriod(periodData, setPeriodDataValues, messageBox, setMessage){

    try{
        const response = await axios({
            url: `${baseUrl}/actualSchoolYear/${true}`,
            method: 'GET',
        })
        console.log(response.data.length)

        if (response.data.length !== 0) {
            const actualSchoolYear = response.data[0];
            console.log(actualSchoolYear);
            try{
                const response2 = await axios({
                    url: `${baseUrl}/schoolYears/${actualSchoolYear._id}`,
                    method: 'PUT',
                    data: {
                        actual: false
                    }
                });

                try{
                    const response3 = await axios({
                        url: `${baseUrl}/schoolYears`,
                        method: 'POST',
                        data: periodData
                    });
                    setMessage({type: 'success', message: 'Año lectivo registrado', isHidden: false});
                   
            
                }catch(error){
                    setMessage({type: 'error', message: 'Hubo problemas al registrar el año lectivo', isHidden: false})
                }
                setPeriodDataValues({
                    name: '',
                    startDate: new Date(),
                    endDate: new Date()
                });
        
            }catch(error){
                console.log(error);
            }
                      
        }else {
            try{
                const response3 = await axios({
                    url: `${baseUrl}/schoolYears`,
                    method: 'POST',
                    data: periodData
                });
                setMessage({type: 'success', message: 'Año lectivo registrado', isHidden: false});
                console.log(periodData);
        
            }catch(error){
                setMessage({type: 'error', message: 'Hubo problemas al registrar el año lectivo', isHidden: false})
            }
            setPeriodDataValues({
                name: '',
                startDate: new Date(),
                endDate: new Date()
            });
        }
  
    }catch(error){
      console.log(error)
    }
};

export async function getActualSchoolYear(){
    try{
        const response = await axios({
            url: `${baseUrl}/actualSchoolYear/${true}`,
            method: 'GET',
        })
        
        return response;
  
    }catch(error){
      console.log(error)
    }
};

export async function getSchoolYears(){
    try{
        const response = await axios({
            url: `${baseUrl}/schoolYears`,
            method: 'GET',
        })
        
        return response;
  
    }catch(error){
      console.log(error)
    }
};