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
  create: (storeData) => {
    return api.post('/stores', storeData);
  },
  
  // Обновить магазин
  update: (id, storeData) => {
    return api.put(`/stores/${id}`, storeData);
  },
  
  // Удалить магазин
  delete: (id) => {
    return api.delete(`/stores/${id}`);
  }
};