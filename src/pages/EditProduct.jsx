import ProductForm from "../components/ProductForm"
import { useEffect, useState } from "react"
import productService from "../services/products"
import { useLocation, useNavigate, useParams } from "react-router-dom"

function EditProduct() {
    const [product, setProduct] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (!id) {
            navigate('/products')
            return
        }
        productService.getById(id)
            .then((data) => {
                setProduct(data.data.data)
                setIsLoaded(true)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [id])
    return (
        <>
            {isLoaded ? (
                <ProductForm
                    initialData={product}
                    onSubmit={(formData) => productService.update(id, formData)}
                    submitLabel="Edit Product"
                    isEditing={true}
                />
            ) : (
                <p>Загрузка</p>
            )}
        </>
    )
}

export default EditProduct