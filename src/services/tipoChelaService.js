import axios from "axios";

const URL_BASE = "http://localhost:8080/api/tipoCerveza"

class tipoChelaService{
findAll(){
    return axios.get(URL_BASE);
    }

    create(tipoCerveza){
        return axios.post(URL_BASE, tipoCerveza)
    }

    findByID(tipoCervezaId){
        return axios.get(URL_BASE+'/'+tipoCervezaId);
    
    }

    update(tipoCervezaId, tipoCerveza){
        return axios.put(URL_BASE+'/'+tipoCervezaId, tipoCerveza);
    }

    delete(tipoCervezaId){
        return axios.delete(URL_BASE+'/'+tipoCervezaId)
    }
}

export default new tipoChelaService();