import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://6256fc506ea7037005434e84.mockapi.io/api/v1',
});