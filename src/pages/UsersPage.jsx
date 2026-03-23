import Sidebar from "../components/common/Sidebar"
import Header from "../components/common/Header"
import { userService } from "../services/users"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import ErrorAlert from "../components/common/ErrorAlert"
import { pagesGenerate } from "../utils/pagination"
import usePaginatedData from "../hooks/usePaginatedHooks"
import { DEFAULT_PER_PAGE } from "../utils/constants"

function UsersPage() {

    const [searchParams] = useSearchParams();
    const current = searchParams.get('page')
    const navigate = useNavigate()
    const { data: users, setUsers: setUsers, pagesNumber, error, setError } = usePaginatedData(userService, 15)

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
            <Header/>
            <div className="d-flex">
            <Sidebar/>
            <div className="p-3 border mt-2" style={{minWidth: '73%'}}>
                <h2 className="text-center">Users</h2>
                <Link to='/users/create'>+ Add new user</Link>
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
                            <td><button value={user.id} className="btn btn-primary m-2" onClick={() => navigate(`/users/${user.id}/edit`)}>Edit</button>
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
                            className={`btn ${Number(current || 1) === Number(page) ? 'btn-secondary' : 'btn-outline-primary'} me-1`}
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