import ProductForm from "./ProductForm"
import { useEffect, useState } from "react"
import productService from "../services/products"

function Test() {
    const [product, setProduct] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        productService.getById(2)
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
                    onSubmit={(formData) => productService.update(2, formData)}
                    submitLabel="Create Product"
                    isEditing={true}
                />
            ) : (
                <p>loading</p>
            )}
        </>
    )
}

export default Test