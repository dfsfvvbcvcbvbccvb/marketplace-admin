import api from "./api";

export const userService = {
  // Получить всех пользователей
  getAll: (params = {}) => {
    return api.get('/users', { params });
  },
  
  // Получить пользователя по ID
  getById: (id) => {
    return api.get(`/users/${id}`);
  },
  
  // Создать пользователя
  create: (userData) => {
    return api.post('/users', userData);
  },
  
  // Обновить пользователя
  update: (id, userData) => {
    return api.put(`/users/${id}`, userData);
  },
  
  // Удалить пользователя
  delete: (id) => {
    return api.delete(`/users/${id}`);
  }
};

export default userService