import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; 


export const getAllFarms = () => {
    return axios.get(`${API_URL}/farms`);
};

export const getFarmById = (id) => {
    return axios.get(`${API_URL}/farm/${id}`);
};


export const addFarm = (farm) => {
    return axios.post(`${API_URL}/add`, farm);
};

export const updateFarm = (id, farm) => {
    return axios.put(`${API_URL}/update/${id}`, farm);
};

export const deleteFarmById = (id) => {
    return axios.delete(`${API_URL}/delete/${id}`);
};