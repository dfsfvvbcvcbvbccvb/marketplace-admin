import { useState } from "react"
import ErrorAlert from "../components/common/ErrorAlert"
import authService from "../services/auth"
import { useNavigate } from "react-router-dom"

function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    function validateForm() {
        let isValid = true

        if (!email) {
            setEmailError(true)
            isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError(true)
            isValid = false
        }

        if (!password) {
            setPasswordError('Заполните пароль')
            isValid = false
        }

        return isValid
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
            setPasswordError('')
            setEmailError('')
            setError('')
            if (!validateForm()) {
                return
            }
            try {
                await authService.login({email, password})
                navigate('/')
            } catch(e) {
                if (e.status === 422) {
                    if (e.response.data.password) {
                        setPasswordError(true)
                    }
                    if (e.response.data.email) {
                        setEmailError(true)
                    }
                    
                } else if 
                (e.status === 401) {
                    setError('Неверный логин или пароль!')
                } else {
                    setError('Неизвестная ошибка!')
                }
            }
            
    }

    return (
        <div className="container">
            <div className="row">
                <div className="mt-5 col-6 mx-auto w-50 text-center border border-secondary">
                    <div>
                        <h5 className="display-5">MarketPlace Admin</h5>
                    </div>
                    <div className="border-top">
                        <h2>Login to Admin Panel</h2>
                        <form onSubmit={handleFormSubmit}>
                        <div className="input-group mb-2 mr-sm-2">
                                <input onChange={(e) => setEmail(e.target.value)} type="text" className={`form-control ${emailError ? 'is-invalid' : ''}`} id="inlineFormInputGroupUsername2" placeholder="admin@example.com"></input>
                        </div>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className={`form-control mb-2 mr-sm-2 ${passwordError ? 'is-invalid' : ''}`} id="inlineFormInputName2" placeholder="Password"></input>
                        <ErrorAlert error={error}/>
                        <button type="submit" className="btn btn-primary mb-2 btn-lg">Sign In</button>
                        </form>              
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;