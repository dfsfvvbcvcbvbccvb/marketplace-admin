import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import { categoriesService } from "../services/categories"
import { useSearchParams, useNavigate, Link } from "react-router-dom"
import { pagesGenerate } from "../utils/pagination"
import usePaginatedData from "../hooks/usePaginatedHooks"
import ErrorAlert from "../components/common/ErrorAlert"
import { DEFAULT_PER_PAGE } from "../utils/constants"

function CategoriesPage() {

    const [searchParams] = useSearchParams();
    const current = searchParams.get('page')
    const navigate = useNavigate()
    const { data: categories, setData: setCategories, pagesNumber, error, setError } = usePaginatedData(categoriesService, 15)

    function handleNavigate(e) {
        navigate(`/categories/${e.target.value}/edit`);
    }

    async function handleDelete(e) {
        if (!window.confirm('Вы уверены, что хотите удалить?')) return
                const id = e.target.value
                try {
                    await categoriesService.delete(id)
                    setCategories(categories.filter(category => Number(category.id) !== Number(id)))
                } catch (err) {
                    console.error(err)
                    setError('Не удалось удалить категорию')
                }
        return
    }

    return (
        <div>
        <Header/>
        <div className="d-flex">
            <Sidebar/>
            <div className="border mt-2" style={{minWidth: '73%'}}>
                <div className="text-center align-center">
                    <h2 className="border">Categories</h2>
                </div>
                <div className="m-2">
                <Link to="/categories/create">+ Add New Category</Link>
                </div>
                                <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Store Id</th>
                        <th>Childrens</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.store_id}</td>
                            <td>
                            {category.children.map((children) => (
                                <p key={children.id}>{children.name}</p>
                            ))}
                            </td>
                            <td><button onClick={handleNavigate} value={category.id} className="btn btn-primary m-2">Edit</button>
                            <button value={category.id} onClick={handleDelete} className="btn btn-danger">Delete</button></td>
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
            to={`/categories?page=${page}&per_page=${DEFAULT_PER_PAGE}`}
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
export default CategoriesPage