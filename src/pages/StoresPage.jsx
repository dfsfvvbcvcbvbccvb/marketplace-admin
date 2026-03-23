import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import { storeService } from "../services/stores"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import ErrorAlert from "../components/common/ErrorAlert"
import { pagesGenerate } from "../utils/pagination"
import usePaginatedData from "../hooks/usePaginatedHooks"

function StoresPage() {
    const DEFAULT_PER_PAGE = 15
    const [searchParams] = useSearchParams();
    const current = searchParams.get('page')
    const navigate = useNavigate()
    const { data: stores, setData: setStores, pagesNumber, error, setError } = usePaginatedData(storeService, 15)

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

    return (
        <div>
        <Header/>
            <div className="d-flex">
            <Sidebar/>
            <div className="p-3 border border mt-2" style={{minWidth: '73%'}}>
                <h2 className="text-center">StoresPage</h2>
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
                            <td><button className="btn btn-primary m-2" onClick={() => navigate('/stores/edit', { state: { id: store.id } })}>Edit</button>
                            <button value={store.id} onClick={handleDelete} className="btn btn-danger">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ErrorAlert error={error}></ErrorAlert>
                        <div className="m-2">
                {pagesGenerate(current, pagesNumber).map((page, i) =>
    page === '...'
        ? <span key={`dots-${i}`} className="px-2">...</span>
        : <Link
            key={page}
            to={`/stores?page=${page}&per_page=${DEFAULT_PER_PAGE}`}
            className={`btn ${Number(current || 1) === Number(page) ? 'btn-secondary' : 'btn-outline-primary'} me-1`}
          >
            {page}
          </Link>
)}
            </div>
            </div>
        </div>
        </div>

    )
}
export default StoresPage