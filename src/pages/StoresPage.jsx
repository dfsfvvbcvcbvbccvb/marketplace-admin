import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import { useEffect, useState } from "react"
import { storeService } from "../services/stores"

function StoresPage() {
    const [stores, setStores] = useState([])

    useEffect(() => {
        storeService.getAll()
            .then((data) => {
                setStores(data.data.data)
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
            <div className="p-3 border text-center border" style={{minWidth: '73%'}}>
                <h2 className="border">StoresPage</h2>
                <div>
                    <a href="/store-add">+ Add new store</a>
                </div>
                            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Пользователь</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map((store) => (
                        <tr key={store.id}>
                            <td>{store.id}</td>
                            <td>{store.name}</td>
                            <td>{store.description}</td>
                            <td>{store.user}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>

    )
}
export default StoresPage