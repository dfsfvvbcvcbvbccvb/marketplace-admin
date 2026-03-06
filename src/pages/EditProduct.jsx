import ProductForm from "./ProductForm"
import { useEffect, useState } from "react"
import productService from "../services/products"
import { useLocation } from "react-router-dom"

function EditProduct() {
    const [product, setProduct] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const location = useLocation()
    const id = location.state?.id

    useEffect(() => {
        productService.getById(id)
            .then((data) => {
                setProduct(data.data.data)
                setIsLoaded(true)
            })
            .catch((err) => {
                console.error(err)
            })
    }, []) 
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