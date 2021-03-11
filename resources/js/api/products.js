import axios from 'axios';

const url = '/api/products/';

export default {
    getPage(page = 1) {
        return axios.get(`${url}?page=${page}`)					
    },
    all() {
        return axios.get(url)
    },
    find(id) {
        return axios.get(url + id)
    },
    store(data) {
        return axios.post(url, data)
    },
    update(id, data) {
        return axios.put(url + id, data)
    },
    delete(id) {
        return axios.delete(url + id)
    }
}