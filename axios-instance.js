import axios from 'axios';

const instance = axios.create({
     baseURL: 'https://c3unilagapi.now.sh/api'
});

export default instance;