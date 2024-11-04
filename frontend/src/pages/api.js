import axios from 'axios';
import { BACKEND_URL } from './key';

export const api = axios.create({
    baseURL: BACKEND_URL
})