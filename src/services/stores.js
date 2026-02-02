import api from "./api";

export const storeService = {
  // Получить все продукты
  getAll: (params = {}) => {
    return api.get('/stores', { params });
  },
  
  // Получить продукт по ID
  getById: (id) => {
    return api.get(`/stores/${id}`);
  },
  
  // Создать продукт
  create: (productData) => {
    return api.post('/stores', productData);
  },
  
  // Обновить продукт
  update: (id, productData) => {
    return api.put(`/stores/${id}`, productData);
  },
  
  // Удалить продукт
  delete: (id) => {
    return api.delete(`/stores/${id}`);
  }
};