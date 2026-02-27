import ProductForm from "./ProductForm"
import { useEffect, useState } from "react"
import productService from "../services/products"
import { useLocation } from "react-router-dom"

function EditProduct() {
    const [product, setProduct] = useState('')
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const id = location.state.id

    useEffect(() => {
        productService.getById(id)
            .then((data) => {
                setProduct(data.data.data)
                setLoading(true)
            })
            .catch((err) => {
                console.error(err)
            })
    }, []) 
    return (
        <>
            {loading ? (
                <ProductForm
                    initialData={product}
                    onSubmit={(formData) => productService.update(id, formData)}
                    submitLabel="Edit Product"
                    isEditing={true}
                />
            ) : (
                <p>loading</p>
            )}
        </>
    )
}

export default EditProduct