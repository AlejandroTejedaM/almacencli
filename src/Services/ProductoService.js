import axios from 'axios';

const URL_BASE = "http://localhost:8150/producto";

class ProductoService {
    findAll() {
        return axios.get(URL_BASE);
    }
    create(producto) {
        return axios.post(URL_BASE, producto);
    }
    findById(productoId) {
        return axios.get(URL_BASE + '/' + productoId);
    }
    update(productoId, producto) {
        return axios.put(URL_BASE + '/' + productoId, producto);
    }
    delete(productoId) {
        return axios.delete( URL_BASE+ '/' + productoId);
    }
}

export default new ProductoService();