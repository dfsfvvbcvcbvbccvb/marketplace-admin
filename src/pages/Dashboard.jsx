import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import { storeService } from "../services/stores"
import { useEffect, useState } from "react"
import { productService } from "../services/products"
import { userService } from "../services/users"
import { categoriesService } from "../services/categories"

function Dashboard() {

    const [storesTotal, setStoresTotal] = useState(0)
    const [productsTotal, setProductsTotal] = useState(0)
    const [usersTotal, setUsersTotal] = useState(0)
    const [categoriesTotal, setCategoriesTotal] = useState(0)

    useEffect(() => {
        storeService.getAll().then(data => setStoresTotal(data.data.meta.total))
        productService.getAll().then(data => setProductsTotal(data.data.meta.total))
        userService.getAll().then(data => setUsersTotal(data.data.meta.total))
        categoriesService.getAll().then(data => setCategoriesTotal(data.data.meta.total))
    }, [])


    return (
        <div>
        <Header/>
        <div className="d-flex">
            <Sidebar/>
            <div className="p-3 border text-center mt-2" style={{minWidth: '73%'}}>
                <div className="border">
                    <h2 className="border">Dashboard</h2>
                    <div className="align-center">
                    <div className="d-flex">
                        <div style={{width: '300px'}} className="border m-3"><h3>Stores</h3><span>{storesTotal}</span></div>
                        <div style={{width: '300px'}} className="border m-3"><h3>Products</h3><span>{productsTotal}</span></div>
                    </div>
                    <div className="d-flex">
                        <div style={{width: '300px'}} className="border m-3"><h3>Categories</h3><span>{categoriesTotal}</span></div>
                        <div style={{width: '300px'}} className="border m-3"><h3>Users</h3><span>{usersTotal}</span></div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

    )
}
export default Dashboard