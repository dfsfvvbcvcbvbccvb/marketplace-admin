import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useLocation, useNavigate } from "react-router-dom"
import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import ErrorAlert from "../components/common/ErrorAlert"
import { storeService } from "../services/stores"
import { categoriesService } from "../services/categories"

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml']
const MAX_FILE_SIZE = 2 * 1024 * 1024

function ProductForm({ initialData, onSubmit, submitLabel, isEditing }) {
    const [productName, setProductName] = useState(initialData?.name || '')
    const [productDescription, setProductDescription] = useState(initialData?.description || '')
    const [productQuantity, setProductQuantity] = useState(initialData?.stockQuantity || '')
    const [productPrice, setProductPrice] = useState(initialData?.price || '')
    const [productActive, setProductActive] = useState(initialData?.isActive ? 'true' : 'false')
    const [error, setError] = useState('')
    const [sku, setSku] = useState(initialData?.sku || '')
    const [storeId, setStoreId] = useState(initialData?.store?.id || '')
    const [stores, setStores] = useState([])
    const [categoryId, setCategoryId] = useState(initialData?.category?.id || '')
    const [categories, setCategories] = useState([])
    const [mainImage, setMainImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [galleryImages, setGalleryImages] = useState([])
    const [galleryPreviews, setGalleryPreviews] = useState([])
    const location = useLocation()
    let id = location.state?.id
    const navigate = useNavigate()

        useEffect(() => {
            storeService.getAll()
                .then((data) => setStores(data.data.data))
                .catch((err) => console.error(err))
        }, [])
        useEffect(() => {
            if (initialData?.store?.id) {
                setStoreId(initialData.store.id)
            }
        }, [initialData])

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

    function validateImageFile(file) {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            return `Файл "${file.name}" имеет недопустимый формат`
        }
        if (file.size > MAX_FILE_SIZE) {
            return `Файл "${file.name}" превышает 2MB`
        }
        return null
    }


    async function handleFormSubmit(e) {
        e.preventDefault()

        const formData = new FormData()

        if (isEditing === false) {
            formData.append('store_id', storeId)
            formData.append('category_id', categoryId)
            formData.append('name', productName)
            formData.append('description', productDescription)
            formData.append('price', productPrice)
            formData.append('sku', sku)
            formData.append('stock_quantity', productQuantity)
            formData.append('is_active', productActive === 'true' ? 1 : 0)
            if (mainImage) {
                formData.append('main_image', mainImage)
            }

            galleryImages.forEach((file) => {
                formData.append('gallery_images[]', file)
            })
        } else if (isEditing === true) {
            formData.append('category_id', categoryId)
            formData.append('name', productName)
            formData.append('description', productDescription)
            formData.append('price', productPrice)
            formData.append('sku', sku)
            formData.append('stock_quantity', productQuantity)
            formData.append('is_active', productActive === 'true' ? 1 : 0)
            if (mainImage) {
                formData.append('main_image', mainImage)
            }

            galleryImages.forEach((file) => {
                formData.append('gallery_images[]', file)
            })
        }
        try {
            await onSubmit(formData)
            navigate('/products')
        } catch (err) {
            setError('Не удалось сохранить продукт')
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
                    <h2 className="border">{submitLabel}</h2>
                    </div>
                    <Link to="/products">Back To Products</Link>
                    <div className="align-center text-center">
                        <h2 className="border m-2">Product Information</h2>
                        <div>
                            <div>
                                <div>
                                <span>Shop</span>
                                </div>
                                {!isEditing && (
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
                                )}
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
                                {isEditing && initialData.mainImageUrl && (
                                    <div>
                                        <a href={initialData.mainImageUrl}>Картинка</a>
                                    </div>
                                )}
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
                                {isEditing && initialData.galleryImageUrls && (
                                    <div>
                                    {initialData.galleryImageUrls.map((url, index) => (
                                        <a key={index} className="text-decoration-none d-block" href={url}>
                                            {index + 1} Картинка
                                        </a>
                                    ))}
                                    </div>
                                )}
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
                            <button type="submit" className="btn btn-primary mt-2 mb-2">{submitLabel}</button>
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

export default ProductForm