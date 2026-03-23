import ProductForm from "../components/ProductForm"
import productService from "../services/products"

function CreateProductPage() {

    return (
        <ProductForm
            submitLabel='Create product'
            onSubmit={(formData) => productService.create(formData)}
            isEditing={false}
        />
    )
}
export default CreateProductPage