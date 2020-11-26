import axios from 'axios';

const api = axios.create({
//    baseURL: 'http://10.0.2.2:8000'
    baseURL: 'http://localhost:8000'  //EMULATOR
});

export default api;