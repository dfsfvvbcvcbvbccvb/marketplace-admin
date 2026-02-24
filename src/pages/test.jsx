import ProductForm from "./ProductForm"
import { useEffect } from "react"
import { useState } from "react"
import productService from "../services/products"

function Test() {

    const [product, setProduct] = useState('')

    useEffect(() => {
        productService.getById(2)
            .then((data) => {
                setProduct(data.data.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, []) 

    return (
        <ProductForm
    initialData={product}
    onSubmit={(formData) => productService.create(2, formData)}
    submitLabel="Create Product"
    isEditing={false}
        />
    )
}

export default Test