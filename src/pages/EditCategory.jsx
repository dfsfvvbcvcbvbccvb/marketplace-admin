import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { categoriesService } from "../services/categories"
import CategoryForm from "../components/CategoryForm"

function EditCategory() {
    const navigate = useNavigate()
    const [category, setCategory] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const location = useLocation()
    const { id } = useParams()

    useEffect(() => {
        if (!id) {
            navigate('/categories')
            return
        }
        categoriesService.getById(id)
            .then((data) => { setCategory(data.data.data); setIsLoaded(true) })
            .catch((err) => console.error(err))
    }, [id])

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
