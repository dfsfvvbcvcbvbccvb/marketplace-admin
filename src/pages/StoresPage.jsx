import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import { useEffect, useState } from "react"
import { storeService } from "../services/stores"
import { Link, UNSAFE_WithErrorBoundaryProps, useNavigate, useSearchParams } from "react-router-dom"
import ErrorAlert from "../components/common/ErrorAlert"
import { useAuth } from "../context/AuthContext"

function StoresPage() {
    const [stores, setStores] = useState([])
    const [error, setError] = useState('')
    const DEFAULT_PER_PAGE = 15
    const [pagesNumber, setPagesNumber] = useState('')
    const [searchParams] = useSearchParams();
    const current = searchParams.get('page')
    const navigate = useNavigate()
    const { userId } = useAuth()

        useEffect(() => {
            const page = searchParams.get('page')
            const perPage = searchParams.get('per_page')
            if (page === null && perPage === null) {
                storeService.getAll()
                .then((data) => {
                    setStores(data.data.data)
                    setPagesNumber(Math.ceil(data?.data?.meta?.total / DEFAULT_PER_PAGE))
                })
                .catch((err) => {
                    console.error(err)
                })
                
            } else {
            storeService.getAll({
                page: page,
                per_page: perPage
            })
                .then((data) => {
                    setStores(data.data.data)
                    setPagesNumber(Math.ceil(data.data.meta.total / perPage))
                })
                .catch((err) => {
                    console.error(err)
                })
            }
            
    
        }, [searchParams])

    function pagesGenerate() {
        const total = pagesNumber
        const delta = 2
        const currentPage = Number(current) || 1
        const range = []

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(total - 1, currentPage + delta); i++) {
            range.push(i)
        }

        if (range[0] > 2) range.unshift('...')
        if (range[range.length - 1] < total - 1) range.push('...')

        range.unshift(1)
        if (total > 1) range.push(total)
        return range
        
    }

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
            className={`btn ${Number(page) === Number(current) ? 'btn-secondary' : 'btn-outline-primary'} me-1`}
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