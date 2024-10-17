import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // URL đến Spring Boot API

// Lấy danh sách tất cả farms
export const getAllFarms = () => {
    return axios.get(`${API_URL}/farms`);
};

// Lấy farm theo ID
export const getFarmById = (id) => {
    return axios.get(`${API_URL}/farm/${id}`);
};

// Thêm mới farm
export const addFarm = (farm) => {
    return axios.post(`${API_URL}/add`, farm);
};

// Cập nhật farm theo ID
export const updateFarm = (id, farm) => {
    return axios.put(`${API_URL}/update/${id}`, farm);
};

// Xóa farm theo ID
export const deleteFarmById = (id) => {
    return axios.delete(`${API_URL}/delete/${id}`);
};