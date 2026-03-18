import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ErrorAlert from "../components/common/ErrorAlert"
import { categoriesService } from "../services/categories"
import { useEffect } from "react"
import { storeService } from "../services/stores"

function CategoryForm({initialData, isEditing, submitLabel, id}) {

        const [categoryName, setCategoryName] = useState(initialData?.name)
        const [categoryDescription, setCategoryDescription] = useState(initialData?.description)
        const [categorySlug, setCategorySlug] = useState(initialData?.slug)
        const [parentId, setParentId] = useState(null)
        const [error, setError] = useState('')
        const [stores, setStores] = useState([])
        const [storeId, setStoreId] = useState('')
        const navigate = useNavigate()

        useEffect(() => {
                    storeService.getAll()
                        .then((data) => setStores(data.data.data))
                        .catch((err) => console.error(err))
        }, [])

        console.log(initialData)

        

        async function handleFormSubmit(e) {
            e.preventDefault()
            if (!isEditing) {
                if (storeId === '') {
                setError('Выберите store')
                return
            }
            }
            if (categoryName === '') {
                setError('Введите название')
                return
            }
            if (categoryDescription === '') {
                setError('Введите описание')
                return
            }
            if (categorySlug === '') {
                setError('Введите slug')
                return
            }
            const categoryData = {
                store_id: storeId,
                name: categoryName,
                description: categoryDescription,
                slug: categorySlug
            }
            if (!isEditing) {await categoriesService.create(categoryData)}
            if (isEditing) {await categoriesService.update(id, categoryData)}
            navigate('/categories')
        }

        return (
        <form onSubmit={handleFormSubmit}>
        <div>
        <Header/>
        <div className="d-flex">
            <Sidebar/>
            <div className="border mt-2" style={{minWidth: '73%'}}>
            <div className="text-center border">
                <h2 className="border-bottom p-2">Information</h2>
                    <div>
                        {!isEditing && (
                                <select
                                    value={storeId}
                                    onChange={(e) => setStoreId(e.target.value)}
                                    className="form-select"
                                >
                                    <option value="">Select store</option>
                                    {stores.map((store) => (
                                        <option key={store.id} value={store.id}>
                                            {store.name}
                                        </option>
                                    ))}
                                </select>
                        )}
                    </div>
                <div>
                <input onChange={(e) => {setCategoryName(e.target.value)}} value={initialData?.name} className={`form-control mr-sm-2 mt-2 `} placeholder="Name"></input>
                </div>
                <div>
                <input onChange={(e) => {setCategoryDescription(e.target.value)}} value={initialData?.description} className={`form-control mr-sm-2 mt-2 `} placeholder="Description"></input>
                </div>
                <div>
                <input onChange={(e) => {setCategorySlug(e.target.value)}} value={initialData?.slug} className={`form-control mr-sm-2 mt-2 `} placeholder="Slug"></input>
                </div>
                <div>
                <button type="submit" className="btn btn-primary mb-2 btn-lg mt-2">{submitLabel}</button>
                </div>
                <ErrorAlert error={error}></ErrorAlert>
            </div>
            </div>
        </div>
        </div>
        </form>
    )
}

export default CategoryForm