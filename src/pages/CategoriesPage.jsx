import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { categoriesService } from "../services/categories"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function CategoriesPage() {

    const [categories, setCategories] = useState([])
    const [searchParams] = useSearchParams();
    const DEFAULT_PER_PAGE = 15
    const [pagesNumber, setPagesNumber] = useState('')
    const [error, setError ] = useState('')
    const current = searchParams.get('page')
    const navigate = useNavigate()

    useEffect(() => {
        const page = searchParams.get('page')
        const perPage = searchParams.get('per_page')
        console.log(page, perPage)
        if (page === null && perPage === null) {
            categoriesService.getAll()
            .then((data) => {
                setCategories(data.data.data)
                setPagesNumber(Math.ceil(data?.data?.meta?.total / DEFAULT_PER_PAGE))
            })
            .catch((err) => {
                console.error(err)
            })
            
        } else {
        categoriesService.getAll({
            page: page,
            per_page: perPage
        })
            .then((data) => {
                setCategories(data.data.data)
                setPagesNumber(Math.ceil(data.data.meta.total / perPage))
            })
            .catch((err) => {
                console.error(err)
            })
        }
        
    }, [searchParams])

    function handleNavigate(e) {
        navigate('/categories/edit', { state: { id: e.target.value } });
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

    return (
        <div>
        <Header></Header>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="border mt-2" style={{minWidth: '73%'}}>
                <div className="text-center align-center">
                    <h2 className="border">Categories</h2>
                </div>
                <div className="m-2">
                <Link to="/categories/add">+ Add New Category</Link>
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
                                <p>{children.name}</p>
                            ))}
                            </td>
                            <td><button onClick={handleNavigate} value={category.id} className="btn btn-primary m-2">Edit</button>
                            <button value={category.id} onClick={handleDelete} className="btn btn-danger">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
                        <div className="m-2">
                {pagesGenerate(current, pagesNumber).map((page, i) =>
    page === '...'
        ? <span key={`dots-${i}`} className="px-2">...</span>
        : <Link
            key={page}
            to={`/categories?page=${page}&per_page=${DEFAULT_PER_PAGE}`}
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
export default CategoriesPage