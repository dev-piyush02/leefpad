import axios from 'axios'
// export const BASE_URL='http://localhost:8080/idle-notes';
export const BASE_URL='http://localhost:8085/idle-notes';
//export const BASE_URL='https://leefpad.onrender.com/idle-notes';

export const axiosObj= axios.create({
    baseURL: BASE_URL,
});