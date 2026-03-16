import Sidebar from "../components/common/Sidebar"
import Header from "../components/common/Header"
import { useEffect } from "react"
import { useState } from "react"
import { userService } from "../services/users"
import { Link, useSearchParams } from "react-router-dom"
import ErrorAlert from "../components/common/ErrorAlert"

function UsersPage() {

    const [users, setUsers] = useState([])
    const [error, setError] = useState('')
    const DEFAULT_PER_PAGE = 15
    const [pagesNumber, setPagesNumber] = useState('')
    const [searchParams] = useSearchParams();
    const current = searchParams.get('page')

    useEffect(() => {
        const page = searchParams.get('page')
        const perPage = searchParams.get('per_page')
        if (page === null && perPage === null) {
            userService.getAll()
            .then((data) => {
                setUsers(data.data.data)
                setPagesNumber(Math.ceil(data?.data?.meta?.total / DEFAULT_PER_PAGE))
            })
            .catch((err) => {
                console.error(err)
            })
            
        } else {
        userService.getAll({
            page: page,
            per_page: perPage
        })
            .then((data) => {
                setUsers(data.data.data)
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
            await userService.delete(id)
            setUsers(users.filter(user => Number(user.id) !== Number(id)))
        } catch (err) {
            console.error(err)
            setError('Не удалось удалить пользователя')
        }
    }

    return (
        <div>
            <Header></Header>
            <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="p-3 border mt-2" style={{minWidth: '73%'}}>
                <h2 className="text-center">Users</h2>
                <Link to='/users/add'>+ Add new user</Link>
                <div>
                <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><button className="btn btn-primary m-2">Edit</button>
                            <button value={user.id} onClick={handleDelete} className="btn btn-danger">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>                    
                </div>
                                        <div className="m-2">
                {pagesGenerate(current, pagesNumber).map((page, i) =>
    page === '...'
        ? <span key={`dots-${i}`} className="px-2">...</span>
        : <Link
            key={page}
            to={`/users?page=${page}&per_page=${DEFAULT_PER_PAGE}`}
            className={`btn ${Number(page) === Number(current) ? 'btn-secondary' : 'btn-outline-primary'} me-1`}
          >
            {page}
          </Link>
)}
            </div>
                <ErrorAlert error={error}></ErrorAlert>
            </div>
            </div>
        </div>
    )
}
export default UsersPage