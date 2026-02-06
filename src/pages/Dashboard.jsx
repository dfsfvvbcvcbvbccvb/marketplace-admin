import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import { storeService } from "../services/stores"
import { useEffect, useState } from "react"
import { productService } from "../services/products"

function Dashboard() {

    const [stores, setStores] = useState([])
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        storeService.getAll()
            .then((data) => {
                setStores(data.data.data)
            })
            .catch((err) => {
                console.error(err)
            })
        productService.getAll()
            .then((data) => {
                setProducts(data.data.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    return (
        <div>
        <Header></Header>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="p-3 border text-center" style={{minWidth: '73%'}}>
                <div className="border">
                    <h2 className="border">Dashboard</h2>
                    <div className="align-center">
                    <div className="d-flex">
                        <div style={{width: '300px'}} className="border m-3"><h3>Stores</h3><span>{stores.length}</span></div>
                        <div style={{width: '300px'}} className="border m-3"><h3>Products</h3><span>{products.length}</span></div>
                    </div>
                    <div className="d-flex">
                        <div style={{width: '300px'}} className="border m-3"><h3>Categories</h3><span>?</span></div>
                        <div style={{width: '300px'}} className="border m-3"><h3>Users</h3><span>?</span></div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

    )
}
export default Dashboard