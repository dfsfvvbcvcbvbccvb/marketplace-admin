import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import { useEffect, useState } from "react"
import { productService } from "../services/products"
import { Link, useNavigate, useLocation } from "react-router-dom"
import ErrorAlert from "../components/common/ErrorAlert"
import { categoriesService } from "../services/categories"

function EditProduct() {
    const location = useLocation()
    const [product, setProduct] = useState('')
    const [error, setError ] = useState('')
    const [sku, setSku] = useState('')
    const [productName, setProductName ] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productSlug, setProductSlug] = useState('')
    const [productCategoryId, setProductCategoryId] = useState('')
    const [productActive, setProductActive] = useState('true')
    const [productStoreId, setProductStoreId] = useState('')
    const [categories, setCategories] = useState([])
    const [productCategoryName, setProductCategoryName] = useState('')
    const navigate = useNavigate()
    let id = location.state.id
    useEffect(() => {
        productService.getById(id)
            .then((data) => {
                let productData = data.data.data
                setProduct(productData)
                setSku(productData.sku)
                setProductSlug(productData.slug)
                setProductPrice(productData.price)
                setProductQuantity(productData.stockQuantity)
                setProductName(productData.name)
                setProductDescription(productData.description)
                setProductCategoryId(productData.category.id)
                setProductStoreId(productData.store.id)
                setProductCategoryName(productData.category.name)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    useEffect(() => {
        console.log(productStoreId)
    categoriesService.getAll(productStoreId)
            .then((data) => {
                setCategories(Object.values(data.data.data))
                setProductCategoryId('')
        })
        .catch((err) => console.error(err))
    }, [productStoreId])    

    console.log(product)


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
    if (!productCategoryId) {
        setError('Выберите категорию')
        return
    }
      

    const formData = new FormData()

    formData.append('category_id', productCategoryId)
    formData.append('name', productName)
    formData.append('description', productDescription)
    formData.append('price', productPrice)
    formData.append('sku', sku)
    formData.append('stock_quantity', productQuantity)
    formData.append('is_active', productActive === 'true')


    try {
        await productService.update(id, formData)
        navigate('/products')
    } catch(e) {
        if (e.response?.data?.message) {
            setError(e.response.data.message)
        } else {
            setError('Произошла ошибка при обновлении продукта')
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
                    <h2 className="border">Edit Product</h2>
                    </div>
                    <Link to="/products">Back To Products</Link>
                    <div className="align-center text-center">
                        <h2 className="border m-2">Product</h2>
                        <div>
                            <div>
                            <select
                                value={productCategoryId}
                                onChange={(e) => setProductCategoryId(e.target.value)}
                                disabled={!productStoreId}
                                className="form-select"
                            >
                                {categories.map((cat) => {
                                    if (cat.id === productCategoryId) {
                                        return <option key={cat.id} value={cat.id} selected>{cat.name}</option>;
                                    }
                                    return <option key={cat.id} value={cat.id}>{cat.name}</option>;
                                })}
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
                                <input value={sku} type="text" onChange={(e) => setSku(e.target.value)} className="form-control mt-2" placeholder="SKU" ></input>
                            </div>
                            <select className="mt-2 form-select">
                                <option value='true'>Active</option>
                                <option value='false'>InActive</option>
                            </select>
                            <div>
                                <label>Main Image</label>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                                    className="form-control"
                                />
                            </div>
                            <div>
                                <label>Gallery images</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-2 mb-2">Edit Product</button>
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
export default EditProduct