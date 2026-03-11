import api from "./api";

export const categoriesService = {
  // Получить все категории
  getAll: (storeId) => {
    return api.get(`/categories?store_id=${storeId}`);
  },

  getByStore: (storeId) =>
  api.get('/categories/by-store', {
    params: { store_id: storeId, nested: true }
  }),
  
  // Получить категорию по ID
  getById: (id) => {
    return api.get(`/categories/${id}`);
  },
  
  // Создать категорию
  create: (categoryData) => {
    return api.post('/categories', categoryData);
  },
  
  // Обновить категорию
  update: (id, categoryData) => {
    return api.put(`/categories/${id}`, categoryData);
  },
  
  // Удалить категорию
  delete: (id) => {
    return api.delete(`/categories/${id}`);
  }
};
