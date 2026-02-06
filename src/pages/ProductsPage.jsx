import Header from "../components/common/Header"
import { productService } from "../services/products"
import Sidebar from "../components/common/Sidebar"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

function ProductsPage() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        productService.getAll()
            .then((data) => {
                setProducts(data.data.data)
            })
            .catch((err) => {
                console.error(err)
            })
            
    }, [])
    function handleFormSubmit(e) {
        const id = e.target.value
        productService.delete(id)
        setProducts(products.filter(product => Number(product.id) !== Number(id)));
        console.log(products, id)
    }
    return (
        <div>
        <Header></Header>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="border" style={{minWidth: '73%'}}>
                <div className="text-center align-center">
                    <h2>Products</h2>
                </div>
                <Link to="/products/create">+ Add New Product</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Store</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stockQuantity}</td>
                            <td>{product.store.name}</td>
                            <td>{product.isActive ? '✅' : '❌'}</td>
                            <td><button className="btn btn-primary m-2">Edit</button><button value={product.id} onClick={handleFormSubmit} className="btn btn-danger">Delete</button></td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>

    )
}
export default ProductsPage