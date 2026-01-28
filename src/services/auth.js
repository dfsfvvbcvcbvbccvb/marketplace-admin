import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

export const authService = {
    login: async ({ email, password }) => {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        })
        const { access_token } = response.data
        localStorage.setItem('token', access_token)
        return access_token
    }
}

export default authService