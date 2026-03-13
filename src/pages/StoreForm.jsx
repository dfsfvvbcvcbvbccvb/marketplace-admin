import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import { Link } from "react-router-dom"
import ErrorAlert from "../components/common/ErrorAlert"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { storeService } from "../services/stores"

function StoreForm({ initialData, onSubmit, submitLabel, isEditing }) {
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [storeName, setStoreName] = useState(initialData?.name)
    const [storeDescription, setStoreDescription] = useState(initialData?.description)

        async function handleFormSubmit(e) {
            e.preventDefault()
    
            let storeData = {
                user_id: localStorage.getItem('user_id'),
                name: storeName,
                description: storeDescription,
                settings: []
            }
    
            if (!isEditing) {
            try {
                await storeService.create(storeData)
                navigate('/stores')
            } catch(e) {
            if (e.response?.data?.message) {
                setError(e.response.data.message)
            } else {
                setError('Произошла ошибка при создании магазина')
            }
            }
            }
            if (isEditing) {
            try {
                await storeService.update(initialData.id, storeData)
                navigate('/stores')
            } catch(e) {
            if (e.response?.data?.message) {
                setError(e.response.data.message)
            } else {
                setError('Произошла ошибка при редактировании магазина')
            }
            }
            }
        }


        return (
             <form onSubmit={handleFormSubmit}>
        <div>
        <Header></Header>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="border mt-2" style={{minWidth: '73%'}}>
            <div className="text-center border">
                {!isEditing && (
                    <h2>Create New Store</h2>
                )}
                {isEditing && (
                    <h2>Edit Store</h2>
                )}
            </div>
            <Link to="/stores">Back To Stores</Link>
            <div className="align-center border ">
                <h2 className="border-bottom">Information</h2>
                <div>
                <input value={storeName} onChange={(e) => {setStoreName(e.target.value)}} className={`form-control mr-sm-2 mt-2 `} placeholder="Store Name"></input>
                </div>
                <div>
                <input value={storeDescription} onChange={(e) => {setStoreDescription(e.target.value)}} className={`form-control mr-sm-2 mt-2 `} placeholder="Description"></input>
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

export default StoreForm