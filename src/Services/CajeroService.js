import axios from 'axios';

const URL_BASE = "http://localhost:8150/cajero";

class CajeroService {
    findAll() {
        return axios.get(URL_BASE);
    }
    create(cajero) {
        return axios.post(URL_BASE, cajero);
    }
    findById(cajeroId) {
        return axios.get(URL_BASE + '/' + cajeroId);
    }
    update(cajeroId, cajero) {
        return axios.put(URL_BASE + '/' + cajeroId, cajero);
    }
    delete(cajeroId) {
        return axios.delete( URL_BASE+ '/' + cajeroId);
    }
}

export default new CajeroService();