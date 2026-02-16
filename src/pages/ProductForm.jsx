import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function ProductForm({ initialData, onSubmit, submitLabel, page }) {
    const [productName, setProductName] = useState(initialData?.name || '')
    const [productDescription, setProductDescription] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productActive, setProductActive] = useState('true')
    const [error, setError] = useState('')
    const [sku, setSku] = useState('')
    const [storeId, setStoreId] = useState('')
    const [stores, setStores] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState([])
    const [mainImage, setMainImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [galleryImages, setGalleryImages] = useState([])
    const [galleryPreviews, setGalleryPreviews] = useState([])
    const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml']
    const MAX_FILE_SIZE = 2 * 1024 * 1024
    const location = useLocation()
    const [productCategoryId, setProductCategoryId] = useState('')
    const [productStoreId, setProductStoreId] = useState('')
    let id = location.state.id
    const navigate = useNavigate()

    async function handleFormSubmit(e) {
        e.preventDefault()

        const formData = new FormData()

        if (page === 'create') {
            formData.append('store_id', storeId)
            formData.append('category_id', categoryId)
            formData.append('name', productName)
            formData.append('description', productDescription)
            formData.append('price', productPrice)
            formData.append('sku', sku)
            formData.append('stock_quantity', productQuantity)
            formData.append('is_active', productActive === 'true')

            if (mainImage) {
                formData.append('main_image', mainImage)
            }

            galleryImages.forEach((file) => {
                formData.append('gallery_images[]', file)
            })
        } else if (page === 'edit') {
            formData.append('category_id', productCategoryId)
            formData.append('name', productName)
            formData.append('description', productDescription)
            formData.append('price', productPrice)
            formData.append('sku', sku)
            formData.append('stock_quantity', productQuantity)
            formData.append('is_active', productActive === 'true' ? 1 : 0)
        }
 

        onSubmit(formData)
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <button type="submit">{submitLabel}</button>
        </form>
    )
}