import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import { Link } from "react-router-dom"
import { useState } from "react"
import { productService } from "../services/products"
import ErrorAlert from "../components/common/ErrorAlert"
import { useNavigate } from "react-router-dom"
import { categoriesService } from "../services/categories"
import { useEffect } from "react"

function CreateProductPage() {

    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productActive, setProductActive] = useState('')
    const [error, setError] = useState('')
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        categoriesService.getAll(2)
            .then((data) => {
                setCategories(data.data.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])  
    console.log(categories)  


    async function handleFormSubmit() {
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
        let productSku = 'SKU-' + Math.ceil(Math.random() * 10000)

        const productData = {
            store_id: 2,
            category_id: 2,
            name: productName,
            slug: productName + '-' + Math.ceil(Math.random() * 10000),
            description: productDescription,
            price: productPrice,
            sku: productSku,
            stock_quantity: productQuantity,
            isActive: Boolean(productActive),
                }
            try {
                await productService.create(productData)
                navigate('/products')
            } catch(e) {
                setError(e.response.data.message)
            }
        
    }

    return (
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
                                <select className="mt-2 form-select">
                                    <option>My Store</option>
                                </select>
                            </div>
                            <div>
                                <div>
                            <span>Category</span>
                            </div>
                            <select className="mt-2 form-select">
                                <option value='electronics'>Electronics</option>
                            </select>
                            </div>
                            <div>
                                <input onChange={(e) => setProductName(e.target.value)} type="text" className="form-control mt-2" placeholder="Product Name" ></input>
                            </div>
                            <div>
                                <input onChange={(e) => setProductDescription(e.target.value)} type="text" className="form-control mt-2" placeholder="Description"  ></input>
                            </div>
                            <div>
                                <input onChange={(e) => setProductPrice(e.target.value)} type="text" className="form-control mt-2" placeholder="Price" ></input>
                            </div>
                            <div>
                                <input onChange={(e) => setProductQuantity(e.target.value)} type="text" className="form-control mt-2" placeholder="Quantity" ></input>
                            </div>
                            <select onChange={(e) => setProductActive(e.target.value)} className="mt-2 form-select">
                                <option value='true'>Active</option>
                                <option value='false'>No Active</option>
                            </select>
                            <button onClick={handleFormSubmit} className="btn btn-primary mt-2 mb-2">Create Product</button>
                            <ErrorAlert error={error}></ErrorAlert>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

    )
}
export default CreateProductPage