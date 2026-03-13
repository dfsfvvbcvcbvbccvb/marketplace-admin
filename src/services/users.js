import api from "./api";

export const userService = {
  // Получить всех пользователей
  getAll: (params) => {
    if (params?.storeId) {
      return api.get(`/users?store_id=${params?.storeId}`);
    } 
    if (params?.page && params?.per_page) {
      return api.get(`/users?page=${params.page}&per_page=${params.per_page}`);
    } else {
      return api.get(`/users`);
    }
    
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