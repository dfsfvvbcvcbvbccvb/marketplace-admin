import api from "./api";

export const userService = {
  // Получить все продукты
  getAll: (params = {}) => {
    return api.post('/users');
  },
  
  // Получить продукт по ID
  getById: (id) => {
    return api.get(`/users/${id}`);
  },
  
  // Создать продукт
  create: (productData) => {
    return api.post('/users', productData);
  },
  
  // Обновить продукт
  update: (id, productData) => {
    return api.put(`/users/${id}`, productData);
  },
  
  // Удалить продукт
  delete: (id) => {
    return api.delete(`/users/${id}`);
  }
};