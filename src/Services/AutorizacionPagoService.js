import axios from 'axios';

const URL_BASE = "http://localhost:8150/autorizacionPago";

class AutorizacionPagoService {
    findAll() {
        return axios.get(URL_BASE);
    }
    create(auto) {
        return axios.post(URL_BASE, auto);
    }
    findById(idAuto) {
        return axios.get(URL_BASE + '/' + idAuto);
    }
    update(idAuto, auto) {
        return axios.put(URL_BASE + '/' + idAuto, auto);
    }
    delete(idAuto) {
        return axios.delete( URL_BASE+ '/' + idAuto);
    }
}

export default new AutorizacionPagoService();