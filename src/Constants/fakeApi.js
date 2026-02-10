import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchUsers = () => api.get("/users");

export const createUser = (data) => api.post("/users", data);

export const deleteUser = (id) => api.delete(`/users/${id}`);

export const updateUser = (id, data) =>
    api.put(`/users/${id}`, data);
