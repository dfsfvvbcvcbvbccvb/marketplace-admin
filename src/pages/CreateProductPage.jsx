import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { productService } from "../services/products"
import ErrorAlert from "../components/common/ErrorAlert"
import { categoriesService } from "../services/categories"
import { storeService } from "../services/stores"

function CreateProductPage() {

    const [productName, setProductName] = useState('')
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
    const navigate = useNavigate()
    
    useEffect(() => {
        storeService.getAll()
            .then((data) => setStores(data.data.data))
            .catch((err) => console.error(err))
    }, [])

    useEffect(() => {
        if (!storeId) {
            setCategories([])
            setCategoryId('')
            return
        }


    categoriesService.getAll(storeId)
            .then((data) => {
                setCategories(Object.values(data.data.data))
                setCategoryId('')
        })
        .catch((err) => console.error(err))
    }, [storeId])

    useEffect(() => {
        return () => {
            galleryPreviews.forEach((url) => URL.revokeObjectURL(url))
        }
    }, [galleryPreviews])    

    function validateImageFile(file) {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            return `Файл "${file.name}" имеет недопустимый формат`
        }
        if (file.size > MAX_FILE_SIZE) {
            return `Файл "${file.name}" превышает 2MB`
        }
        return null
    }

    function handleImageChange(e) {
        const file = e.target.files[0]

        if (!file) return

        const errorMsg = validateImageFile(file)
        if (errorMsg) {
            setError(errorMsg)
            return
        }

        setMainImage(file)

        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    }

    function handleGalleryChange(e) {
        const files = Array.from(e.target.files)

        let errorMsg = ''

    
        for (const file of files) {
            errorMsg = validateImageFile(file)
            if (errorMsg) {
                setError(errorMsg)
                return
            }
        }        

        setGalleryImages(files)

        const previews = files.map((file) => URL.createObjectURL(file))
        setGalleryPreviews(previews)
    }

async function handleFormSubmit(e) {
    e.preventDefault()
    setError('')

    if (productName === '') {
        setError('Заполните название продукта')
        return
    }
    if (productPrice === '') {
        setError('Заполните стоимость продукта')
        return
    }
    if (productQuantity === '') {
        setError('Заполните quantity продукта')
        return
    }
    if (productDescription === '') {
        setError('Заполните описание продукта')
        return
    }
    if (!storeId) {
        setError('Выберите магазин')
        return
    }
    if (!categoryId) {
        setError('Выберите категорию')
        return
    }
      

    const formData = new FormData()

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

    try {
        await productService.create(formData)
        navigate('/products')
    } catch(e) {
        if (e.response?.data?.message) {
            setError(e.response.data.message)
        } else {
            setError('Произошла ошибка при создании продукта')
        }
    }
}

    return (
        <form onSubmit={handleFormSubmit}>
        <div>
        <Header></Header>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="p-3 border" style={{minWidth: '73%'}}>
                <div className="border">
                    <div className="text-center">
                    <h2 className="border">Create New Product</h2>
                    </div>
                    <Link to="/products">Back To Products</Link>
                    <div className="align-center text-center">
                        <h2 className="border m-2">Product Information</h2>
                        <div>
                            <div>
                                <div>
                                <span>Shop</span>
                                </div>
                                <select
                                    value={storeId}
                                    onChange={(e) => setStoreId(e.target.value)}
                                    className="form-select"
                                >
                                    <option value="">Select store</option>
                                    {stores.map((store) => (
                                        <option key={store.id} value={store.id}>
                                            {store.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <div>
                            <span>Category</span>
                            </div>
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                disabled={!storeId}
                                className="form-select"
                            >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                            </select>
                            </div>
                            <div>
                                <input value={productName} onChange={(e) => setProductName(e.target.value)} type="text" className="form-control mt-2" placeholder="Product Name" ></input>
                            </div>
                            <div>
                                <input value={productDescription} onChange={(e) => setProductDescription(e.target.value)} type="text" className="form-control mt-2" placeholder="Description"  ></input>
                            </div>
                            <div>
                                <input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} type="number" className="form-control mt-2" placeholder="Price" ></input>
                            </div>
                            <div>
                                <input value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} type="number" className="form-control mt-2" placeholder="Quantity" ></input>
                            </div>
                            <div>
                                <input value={sku} onChange={(e) => setSku(e.target.value)} type="text" className="form-control mt-2" placeholder="SKU" ></input>
                            </div>
                            <select onChange={(e) => setProductActive(e.target.value)} className="mt-2 form-select">
                                <option value='true'>Active</option>
                                <option value='false'>InActive</option>
                            </select>
                            <div>
                                <label>Main Image</label>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                                    onChange={handleImageChange}
                                    className="form-control"
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ maxWidth: '200px', marginTop: '10px' }}
                                    />
                                )}
                            </div>
                            <div>
                                <label>Gallery images</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                                    onChange={handleGalleryChange}
                                    className="form-control"
                                />
                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                                    {galleryPreviews.map((preview, index) => (
                                        <img
                                            key={index}
                                            src={preview}
                                            alt={`Gallery ${index}`}
                                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-2 mb-2">Create Product</button>
                            <ErrorAlert error={error}></ErrorAlert>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </form>

    )
}
export default CreateProductPage