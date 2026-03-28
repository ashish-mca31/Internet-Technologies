import axios from 'axios';

const API = '/api/users';

export const getUsers   = (params) => axios.get(API, { params });
export const createUser = (data)   => axios.post(API, data);
export const updateUser = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteUser = (id)     => axios.delete(`${API}/${id}`);
