import api from "./api"

export const authService = {
    login: async ({ email, password }) => {
        const response = await api.post('/login', { email, password })
        const { access_token } = response.data
        return {
            token: access_token,
            user_id: response.data.data.id
        }
    }
}
