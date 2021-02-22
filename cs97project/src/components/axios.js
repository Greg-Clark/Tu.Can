import axios from 'axios';

// deployment URL
const instance = axios.create({
    baseURL: "http://localhost:9000",
});

export default instance;