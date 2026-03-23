import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { userService } from "../services/users"
import UserForm from "../components/UserForm"
import ErrorAlert from "../components/common/ErrorAlert"

function EditUser() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const location = useLocation()
    const { id } = useParams()

    useEffect(() => {
        if (!id) {
            navigate('/users')
            return
        }
        userService.getById(id)
            .then((data) => {
                setUser(data.data.data)
                setIsLoaded(true)
            })
            .catch((err) => { setError('Не удалось загрузить данные пользователя') })
    }, [id])


    return (
        <>
            {isLoaded ? (
                <UserForm
                    initialData={user}
                    submitLabel="Edit User"
                    isEditing={true}
                    id={id}
                />
            ) : (
                <div>
                <p>Загрузка</p>
                <ErrorAlert error={error}></ErrorAlert>
                </div>
            )}
        </>
    )
}

export default EditUser
