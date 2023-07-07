import axios from 'axios';

const URL_BASE = "http://localhost:8150/tipoCerveza";

class TipoCervezaService {
    findAll() {
        return axios.get(URL_BASE);
    }

    create(tipoCerveza) {
        return axios.post(URL_BASE, tipoCerveza);
    }

    findById(tipoCervezaId) {
        return axios.get(URL_BASE + '/' + tipoCervezaId);
    }

    update(tipoCervezaId, tipoCerveza) {
        return axios.put(URL_BASE + '/' + tipoCervezaId, tipoCerveza);
    }

    delete(tipoCervezaId) {
        return axios.delete(URL_BASE + '/' + tipoCervezaId);
    }
}

export default new TipoCervezaService();