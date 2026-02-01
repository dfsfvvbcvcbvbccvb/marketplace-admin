import Header from "../components/common/Header"
import { productService } from "../services/products"
import Sidebar from "../components/common/Sidebar"
import { useEffect, useState } from "react"

function ProductsPage() {
    const [products, setProducts] = useState([])
    useEffect(() => {
    productService.getAll().then((data) => {
        setProducts(data.data.data)
    })
    }, []
)
console.log(products)
    return (
        <div>
        <Header></Header>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <div>
                 {products.map((product) => (
                    <div>
                        <table>
                            <tr>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                            </tr>
                        </table>
                    </div>
                   ))}
            </div>
        </div>
        </div>

    )
}
export default ProductsPage