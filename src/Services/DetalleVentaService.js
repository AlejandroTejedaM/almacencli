import axios from 'axios';

const URL_BASE = "http://localhost:8150/detalleVenta";

class DetalleVentaService {
    findAll() {
        return axios.get(URL_BASE);
    }

    create(detalleVenta) {
        return axios.post(URL_BASE, detalleVenta);
    }

    findById(detalleVentaId) {
        return axios.get(URL_BASE + '/' + detalleVentaId);
    }

    update(detalleVentaId, detalleVenta) {
        return axios.put(URL_BASE + '/' + detalleVentaId, detalleVenta);
    }

    delete(detalleVentaId) {
        return axios.delete(URL_BASE + '/' + detalleVentaId);
    }
}

export default new DetalleVentaService();