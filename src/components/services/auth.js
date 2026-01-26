import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL

export const authService = {
    login: async ({ email, password }) => {
        console.log(API_URL)
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        })
        const { access_token } = response.data
        localStorage.setItem('token', access_token)
        return access_token
    },
    logout: () => {
        localStorage.removeItem('token')
    }
}

export default authService