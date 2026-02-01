import api from "./api";

export const productService = {
  // Получить все продукты
  getAll: (params = {}) => {
    return api.get('/products', { params });
  },
  
  // Получить продукт по ID
  getById: (id) => {
    return api.get(`/products/${id}`);
  },
  
  // Создать продукт
  create: (productData) => {
    return api.post('/products', productData);
  },
  
  // Обновить продукт
  update: (id, productData) => {
    return api.put(`/products/${id}`, productData);
  },
  
  // Удалить продукт
  delete: (id) => {
    return api.delete(`/products/${id}`);
  }
};
