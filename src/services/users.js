import api from "./api";

export const userService = {
  // Получить всех пользователей
  getAll: (params = {}) => {
    return api.get('/users');
  },
  
  // Получить пользователя по ID
  getById: (id) => {
    return api.get(`/users/${id}`);
  },
  
  // Создать пользователя
  create: (productData) => {
    return api.post('/users', productData);
  },
  
  // Обновить пользователя
  update: (id, productData) => {
    return api.put(`/users/${id}`, productData);
  },
  
  // Удалить пользователя
  delete: (id) => {
    return api.delete(`/users/${id}`);
  }
};