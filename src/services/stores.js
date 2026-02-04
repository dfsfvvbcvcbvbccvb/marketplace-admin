import api from "./api";

export const storeService = {
  // Получить все магазины
  getAll: (params = {}) => {
    return api.get('/stores', { params });
  },
  
  // Получить магазин по ID
  getById: (id) => {
    return api.get(`/stores/${id}`);
  },
  
  // Создать магазин
  create: (productData) => {
    return api.post('/stores', productData);
  },
  
  // Обновить магазин
  update: (id, productData) => {
    return api.put(`/stores/${id}`, productData);
  },
  
  // Удалить магазин
  delete: (id) => {
    return api.delete(`/stores/${id}`);
  }
};