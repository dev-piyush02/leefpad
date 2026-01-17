import axios from 'axios'
//export const BASE_URL = 'http://localhost:8085/idle-notes';
export const BASE_URL = 'https://leefpad-862030982716.europe-west1.run.app/idle-notes';

export const axiosObj = axios.create({
    baseURL: BASE_URL,
});