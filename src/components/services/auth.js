import axios from 'axios';

export const authService = {
    login: async (params) => {
        const {email, password} = params
            const response = await axios({
            method: 'post',
            url: 'https://shop-admin.softana.ru/api/login',
            data: {
                email,
                password
            }
        })
        const {access_token} = response.data
        localStorage.setItem('token', access_token)
    }
}

export default authService
