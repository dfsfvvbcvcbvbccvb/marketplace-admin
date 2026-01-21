import { useState } from "react"
import ErrorAlert from "../common/ErrorAlert"

function LoginPage() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    function handleChangeEmail(event) {
        setEmail(event.target.value)
    }
    function validateUser(email) {
        if (email === "") {
            return 'Заполните email'
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return 'Email должен содержать @ и домен'
        }
    }
    function handleFormSubmit() {
        if (validateUser(email) === null) {

        } else {
            console.log(email)
            setError(validateUser(email))
            return
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
                        <div className="input-group mb-2 mr-sm-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">@</div>
                            </div>
                                <input onChange={handleChangeEmail} type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="admin@example.com"></input>
                        </div>  
                        <input type="password" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Password"></input>
                        <ErrorAlert error={error}/>
                        <button onClick={handleFormSubmit} type="submit" className="btn btn-primary mb-2 btn-lg">Sign In</button>              
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;