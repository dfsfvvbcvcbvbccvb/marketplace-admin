import Header from "../components/common/Header"
import { productService } from "../services/products"
import Sidebar from "../components/common/Sidebar"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import ErrorAlert from "../components/common/ErrorAlert"
import { useSearchParams } from 'react-router-dom';

function ProductsPage() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [error, setError] = useState('')
    const DEFAULT_PER_PAGE = 15
    const [pagesNumber, setPagesNumber] = useState('')
     const [searchParams] = useSearchParams();
     const current = searchParams.get('page')
    useEffect(() => {
        const page = searchParams.get('page')
        const perPage = searchParams.get('per_page')
        if (page === null && perPage === null) {
            productService.getAll()
            .then((data) => {
                setProducts(data.data.data)
                setPagesNumber(Math.ceil(data?.data?.meta?.total / DEFAULT_PER_PAGE))
            })
            .catch((err) => {
                console.error(err)
            })
            
        } else {
        productService.getAll({
            page,
            perPage
        })
            .then((data) => {
                setProducts(data.data.data)
                setPagesNumber(Math.ceil(data.data.meta.total / perPage))
            })
            .catch((err) => {
                console.error(err)
            })
        }
        

    }, [searchParams])
    function galleryImagesGenerate(product) {
        if (!product.galleryImageUrls?.length) {
            return <td>Отсутствует</td>
        }
        return (
            <td>
                {product.galleryImageUrls.map((url, index) => (
                    <a key={index} className="text-decoration-none d-block" href={url}>
                        {index + 1} Картинка
                    </a>
                ))}
            </td>
        )
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
    
    function mainImageGenerate(product) {
        if (!product.mainImageUrl) {
            return <td>Отсутствует</td>
        } else {
            return <td><a className="text-decoration-none" href={product.mainImageUrl}>Картинка</a></td>
        }
    }

    async function handleProductDelete(e) {
        if (!window.confirm('Вы уверены, что хотите удалить?')) return
        const id = e.target.value
        try {
            await productService.delete(id)
            setProducts(products.filter(product => Number(product.id) !== Number(id)))
        } catch (err) {
            console.error(err)
            
        }
    }

    function handleNavigate(e) {
        navigate('/products/edit', { state: { id: e.target.value } });
    }
    return (
        <div>
        <Header></Header>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="border" style={{minWidth: '73%'}}>
                <div className="text-center align-center">
                    <h2>Products</h2>
                </div>
                <Link to="/products/create">+ Add New Product</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Store</th>
                        <th>Main image</th>
                        <th>Gallery Images</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stockQuantity}</td>
                            <td>{product.store.name}</td>
                            {mainImageGenerate(product)}
                            {galleryImagesGenerate(product)}
                            <td>{product.isActive ? '✅' : '❌'}</td>
                            <td><button value={product.id} onClick={handleNavigate} className="btn btn-primary m-2">Edit</button>
                            <button value={product.id} onClick={handleProductDelete} className="btn btn-danger">Delete</button></td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
            <ErrorAlert error={error}></ErrorAlert>
            <div>
                {pagesGenerate(current, pagesNumber).map((page, i) =>
    page === '...'
        ? <span key={`dots-${i}`} className="px-2">...</span>
        : <Link
            key={page}
            to={`/products?page=${page}&per_page=${DEFAULT_PER_PAGE}`}
            className={`btn ${page === current ? 'btn-secondary' : 'btn-outline-primary'} me-1`}
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
export default ProductsPage