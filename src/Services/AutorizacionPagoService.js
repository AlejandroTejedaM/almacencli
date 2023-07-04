import axios from 'axios';

const URL_BASE = "http://localhost:8150/autorizacionPago";

class AutorizacionPagoService {
    findAll() {
        return axios.get(URL_BASE);
    }
    create(autorizacionPago) {
        return axios.post(URL_BASE, autorizacionPago);
    }
    findById(autorizacionId) {
        return axios.get(URL_BASE + '/' + autorizacionId);
    }
    update(autorizacionId, autorizacionPago) {
        return axios.put(URL_BASE + '/' + autorizacionId, autorizacionPago);
    }
    delete(autorizacionId) {
        return axios.delete( URL_BASE+ '/' + autorizacionId);
    }
}

export default new AutorizacionPagoService();