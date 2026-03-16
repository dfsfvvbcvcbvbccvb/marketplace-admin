import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { storeService } from "../services/stores"
import StoreForm from "./StoreForm"

function EditStore() {
    const navigate = useNavigate()
    const [store, setStore] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const location = useLocation()
    const id = location.state?.id

    useEffect(() => {
        storeService.getById(id)
            .then((data) => {
                setStore(data.data.data)
                setIsLoaded(true)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [id]) 

    useEffect(() => {
    if (!id) {
        navigate('/stores')
        return
    }
    storeService.getById(id)
    }, [id])


    return (
        <>
            {isLoaded ? (
                <StoreForm
                    initialData={store}
                    submitLabel="Edit Store"
                    isEditing={true}
                />
            ) : (
                <p>Загрузка</p>
            )}
        </>
    )
}

export default EditStore
