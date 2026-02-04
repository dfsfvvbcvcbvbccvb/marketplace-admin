import Header from "../components/common/Header"
import { productService } from "../services/products"
import Sidebar from "../components/common/Sidebar"
import { useEffect, useState } from "react"
import { storeService } from "../services/stores"

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
            .finally(() => {
                
            })
            
    }, [])
    let storeName = ''
    async function getStoreName(id) {
        storeName = await storeService.getById(id)
        return storeName
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
                <a href="add-product">+ Add New Product</a>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Qty</th>
                        <th>Магазин</th>
                        <th>Активный</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stockQuantity}</td>
                            <td>My Store</td>
                            <td>{product.isActive ? '✅' : '❌'}</td>
                            <td><button className="btn btn-primary m-2">Редактировать</button><button className="btn btn-danger">Удалить</button></td>
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