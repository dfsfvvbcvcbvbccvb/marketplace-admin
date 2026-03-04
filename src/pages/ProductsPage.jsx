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
    const perPage = 15
    const [pagesNumber, setPagesNumber] = useState('')
     const [searchParams] = useSearchParams();
    useEffect(() => {
        const page = searchParams.get('page')
        const perPage = searchParams.get('per_page')
        if (page === null && perPage === null) {
            productService.getAll()
            .then((data) => {
                setProducts(data.data.data)
                setPagesNumber(Math.ceil(data?.data?.meta?.total / 15))
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
        

    }, [])
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
        let pages = []
        for (let a = 1; a <= pagesNumber; a++) {
            pages.push(<a key={a} href={`/products?page=${a}&per_page=${perPage}`} className="btn btn-primary">{a}</a>)
        }
        return pages
    }
    
    function mainImageGenerate(product) {
        if (!product.mainImageUrl) {
            return <td>Отсутствует</td>
        } else {
            return <td><a className="text-decoration-none" href={product.mainImageUrl}>Картинка</a></td>
        }
    }

    async function handleProductDelete(e) {
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
                {pagesGenerate()}
            </div>
            </div>
            
        </div>
        </div>

    )
}
export default ProductsPage