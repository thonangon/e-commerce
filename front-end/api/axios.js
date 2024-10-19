import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';
const URL_PORT = 'http://127.0.0.1:8000/app';

export default {
  myaccount(){
    return axios.get(`${API_URL}/login`);
  },
  mainCategories(){
    return axios.get(`${URL_PORT}/main-categories/`);
  },
  subCategories(){
    return axios.get(`${URL_PORT}/sub-categories/`);
  }


};

