import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const api = axios.create({
    baseURL: BASE_URL
})

export const getPostsPage = async (pageParam = 1, options = {}) => {
    const response = await api.get(`/filterCatchQuery?page=${pageParam}`, options)
    return response.data;
}