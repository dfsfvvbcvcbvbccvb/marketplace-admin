import Header from "../components/common/Header"
import { productService } from "../services/products"
import Sidebar from "../components/common/Sidebar"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import ErrorAlert from "../components/common/ErrorAlert"
import { useSearchParams } from 'react-router-dom';
import { pagesGenerate } from "../utils/pagination"
import usePaginatedData from "../hooks/usePaginatedHooks"

function ProductsPage() {
    const navigate = useNavigate()
    const DEFAULT_PER_PAGE = 15
     const [searchParams] = useSearchParams();
     const current = searchParams.get('page')

     const { data: products, setData: setProducts, pagesNumber, error, setError } = usePaginatedData(productService, 15)
    function galleryImagesGenerate(product) {
        if (!product.galleryImageUrls?.length) {
            return <td>Отсутствует</td>
        }
        return (
            <td>
                {product.galleryImageUrls.map((url, index) => (
                    <a href={url} key={url} target="_blank" rel="noreferrer">
                    <img src={url} alt="Фото" style={{ width: 50, height: 50, objectFit: 'cover' }} />
                    </a>
                ))}
            </td>
        )
    }

    function mainImageGenerate(product) {
        const url = product.mainImageUrl
        if (!product.mainImageUrl) {
            return <td>Отсутствует</td>
        } else {
        return (
            <td>
                <a href={url} target="_blank" rel="noreferrer">
                    <img src={url} alt="Фото" style={{ width: 50, height: 50, objectFit: 'cover' }} />
                </a>
            </td>
        )
        }
    }

    async function handleProductDelete(e) {
        if (!window.confirm('Вы уверены, что хотите удалить?')) return
        const id = e.target.value
        try {
            await productService.delete(id)
            setProducts(products.filter(product => Number(product.id) !== Number(id)))
        } catch (err) {
            setError(err)
        }
    }

    return (
        <div>
        <Header/>
        <div className="d-flex">
            <Sidebar/>
            <div className="border mt-2" style={{minWidth: '73%'}}>
                <div className="text-center align-center">
                    <h2>Products</h2>
                </div>
                <div className="m-2">
                <Link to="/products/create">+ Add New Product</Link>
                </div>
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
                            <td>{product.price.toLocaleString('ru')}</td>
                            <td>{product.stockQuantity}</td>
                            <td>{product.store.name}</td>
                            {mainImageGenerate(product)}
                            {galleryImagesGenerate(product)}
                            <td>{product.isActive ? '✅' : '❌'}</td>
                            <td><button className="btn btn-primary m-2" onClick={() => navigate('/products/edit', { state: { id: product.id } })}>Edit</button>
                            <button value={product.id} onClick={handleProductDelete} className="btn btn-danger">Delete</button></td>
                           
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
            to={`/products?page=${page}&per_page=${DEFAULT_PER_PAGE}`}
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
export default ProductsPage