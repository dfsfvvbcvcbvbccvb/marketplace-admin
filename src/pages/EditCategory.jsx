import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { categoriesService } from "../services/categories"
import CategoryForm from "./CategoryForm"

function EditCategory() {
    const navigate = useNavigate()
    const [category, setCategory] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const location = useLocation()
    const id = location.state?.id

    useEffect(() => {
        categoriesService.getById(id)
            .then((data) => {
                setCategory(data.data.data)
                setIsLoaded(true)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [id]) 

    useEffect(() => {
    if (!id) {
        navigate('/categories')
        return
    }
    categoriesService.getById(id)
    }, [id])

    console.log(category)
    return (
        <>
            {isLoaded ? (
                <CategoryForm
                    initialData={category}
                    submitLabel="Edit Category"
                    isEditing={true}
                    id={id}
                />
            ) : (
                <p>Загрузка</p>
            )}
        </>
    )
}

export default EditCategory
