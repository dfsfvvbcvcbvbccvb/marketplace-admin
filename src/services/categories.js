import api from "./api";

export const categoriesService = {
  // Получить все категории
  getAll: (storeId) => {
    return api.get(`/categories/${storeId}`);
  },
  
  // Получить категорию по ID
  getById: (id) => {
    return api.get(`/categories/${id}`);
  },
  
  // Создать категорию
  create: (categorieData) => {
    return api.post('/categories', categorieData);
  },
  
  // Обновить категорию
  update: (id, categorieData) => {
    return api.put(`/categories/${id}`, categorieData);
  },
  
  // Удалить категорию
  delete: (id) => {
    return api.delete(`/categories/${id}`);
  }
};
