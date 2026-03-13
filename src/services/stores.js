import api from "./api";

export const storeService = {
  // Получить все магазины
  getAll: (params) => {
    if (params?.storeId) {
      return api.get(`/stores?store_id=${params?.storeId}`);
    } 
    if (params?.page && params?.per_page) {
      return api.get(`/stores?page=${params.page}&per_page=${params.per_page}`);
    } else {
      return api.get(`/stores`);
    }
    
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
