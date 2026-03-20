import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import ErrorAlert from "../components/common/ErrorAlert"
import { userService } from "../services/users"

function UserForm({initialData, submitLabel, isEditing}) {

    const [userName, setUserName] = useState(initialData?.name)
    const [userEmail, setUserEmail] = useState(initialData?.email)
    const [userPassword, setUserPassword] = useState('')
    const [userRole, setUserRole] = useState('admin')
    const [error, setError] = useState('')
    const location = useLocation()
    const id = location.state?.id
    const navigate = useNavigate()

    async function handleFormSubmit(e) {
        e.preventDefault()

        if (!userEmail) {
            setError('Заполните Email')
            return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
            setError('Неверно указан Email')
            return
        }
        if (!userName) {
            setError('Заполните username')
            return
        }
        if (!userPassword) {
            setError('Заполните пароль')
            return
        }

        let userData = {
            name: userName,
            email: userEmail,
            password: userPassword,
            role: userRole
        }
        try {
            if (!isEditing) {
                await userService.create(userData)
            } else {
                await userService.update(id, userData)
            }
            navigate('/users')
        } catch(e) {
        if (e.response?.data?.message) {
            setError(e.response.data.message)
        } else {
            setError('Произошла ошибка при создании пользователя')
        }
    }
    }


    return (
        <form onSubmit={handleFormSubmit}>
        <div>
        <Header/>
        <div className="d-flex">
            <Sidebar/>
            <div className="border mt-2" style={{minWidth: '73%'}}>
            <div className="text-center border">
                <h2 className="p-2">{submitLabel}</h2>
            </div>
            <Link className="p-2" to="/users">Back To Users</Link>
            <div className="align-center border ">
                <h2 className="border-bottom p-2">Information</h2>
                <div>
                <input value={userName} onChange={(e) => {setUserName(e.target.value)}} className={`form-control mr-sm-2 mt-2 `} placeholder="Username"></input>
                </div>
                <div>
                <input value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}} className={`form-control mr-sm-2 mt-2 `} placeholder="Email"></input>
                </div>
                <div>
                <input onChange={(e) => {setUserPassword(e.target.value)}} className={`form-control mr-sm-2 mt-2 `} type="password" placeholder="Password"></input>    
                </div>
                <div>
                    <select onChange={(e => {setUserRole(e.target.value)})} className="form-select mt-2">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <div>
                <button type="submit" className="btn btn-primary mb-2 btn-lg mt-2">{submitLabel}</button>
                </div>
                <ErrorAlert error={error}></ErrorAlert>
            </div>
            </div>
        </div>
        </div>
        </form>
    )
}

export default UserForm