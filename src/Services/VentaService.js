import axios from 'axios';

const URL_BASE = "http://localhost:8150/venta";

class VentaService {
    findAll() {
        return axios.get(URL_BASE);
    }
    create(venta) {
        return axios.post(URL_BASE, venta);
    }
    findById(ventaId) {
        return axios.get(URL_BASE + '/' + ventaId);
    }
    update(ventaId, venta) {
        return axios.put(URL_BASE + '/' + ventaId, venta);
    }
    delete(ventaId) {
        return axios.delete( URL_BASE+ '/' + ventaId);
    }
}

export default new VentaService();