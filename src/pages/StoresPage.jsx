import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import { useEffect, useState } from "react"
import { storeService } from "../services/stores"
import { Link } from "react-router-dom"
import ErrorAlert from "../components/common/ErrorAlert"
import { useNavigate } from "react-router-dom"

function StoresPage() {
    const [stores, setStores] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        storeService.getAll()
            .then((data) => {
                setStores(data.data.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    async function handleDelete(e) {
        if (!window.confirm('Вы уверены, что хотите удалить?')) return
        const id = e.target.value
        try {
            await storeService.delete(id)
            setStores(stores.filter(store => Number(store.id) !== Number(id)))
        } catch (err) {
            console.error('Ошибка при удалении:', err)
            setError('Не удалось удалить магазин')
        }
    }

    function handleNavigate(e) {
        navigate('/stores/edit', { state: { id: e.target.value } });
    }

    return (
        <div>
        <Header></Header>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="p-3 border text-center border" style={{minWidth: '73%'}}>
                <h2 className="border">StoresPage</h2>
                <div>
                    <Link to="/stores/create">+ Add New Store</Link>
                </div>
                            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map((store) => (
                        <tr key={store.id}>
                            <td>{store.id}</td>
                            <td>{store.name}</td>
                            <td>{store.description}</td>
                            <td>{store.userId}</td>
                            <td><button onClick={handleNavigate} value={store.id} className="btn btn-primary m-2">Edit</button>
                            <button value={store.id} onClick={handleDelete} className="btn btn-danger">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ErrorAlert error={error}></ErrorAlert>
            </div>
        </div>
        </div>

    )
}
export default StoresPage