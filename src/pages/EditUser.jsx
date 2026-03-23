import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { userService } from "../services/users"
import UserForm from "./UserForm"

function EditUser() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const location = useLocation()
    const id = location.state?.id

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
            .catch((err) => console.error(err))
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
                <p>Загрузка</p>
            )}
        </>
    )
}

export default EditUser
