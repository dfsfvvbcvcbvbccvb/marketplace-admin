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
            setEmailError('Заполните Email')
            isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Неверно указан Email')
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
                        setPasswordError(e.response.data.password)
                    }
                    if (e.response.data.email) {
                        setEmailError(e.response.data.email)
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
                <div className="mt-5 col-6 mx-auto w-50 border border-secondary">
                    <div>
                        <h5 className="display-5">MarketPlace Admin</h5>
                    </div>
                    <div className="border-top">
                        <h2>Login to Admin Panel</h2>
                        <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                                <input onChange={(e) => setEmail(e.target.value)} type="text" className={`form-control ${emailError ? 'is-invalid' : ''}`}  placeholder="admin@example.com"></input>
                        </div>
                        <small className="form-text text-danger">{emailError}</small>
                        <div className="form-group">
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className={`form-control mr-sm-2 mt-2 ${passwordError ? 'is-invalid' : ''}`} placeholder="Password"></input>
                        </div>
                        <small className="form-text text-danger">{passwordError}</small>
                        <ErrorAlert error={error}/>
                        <div>
                            <div className="form-group">
                        <button type="submit" className="btn btn-primary mb-2 btn-lg mt-2">Sign In</button>
                            </div>
                        </div>
                        </form>              
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;