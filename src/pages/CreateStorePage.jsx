import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { storeService } from "../services/stores"
import ErrorAlert from "../components/common/ErrorAlert"

function CreateStorePage() {

    const [storeName, setStoreName] = useState('')
    const [storeDescription, setStoreDescription] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleFormSubmit(e) {
        e.preventDefault()

        let storeData = {
            user_id: localStorage.getItem('user_id'),
            name: storeName,
            description: storeDescription,
            settings: []
        }

        try {
            await storeService.create(storeData)
            navigate('/stores')
        } catch(e) {
        if (e.response?.data?.message) {
            setError(e.response.data.message)
        } else {
            setError('Произошла ошибка при создании продукта')
        }
    }
    }


    return (
        <form onSubmit={handleFormSubmit}>
        <div>
        <Header></Header>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="border" style={{minWidth: '73%'}}>
            <div className="text-center border">
                <h2>Create New Store</h2>
            </div>
            <Link to="/stores">Back To Stores</Link>
            <div className="align-center border ">
                <h2 className="border-bottom">Information</h2>
                <div>
                <input onChange={(e) => {setStoreName(e.target.value)}} className={`form-control mr-sm-2 mt-2 `} placeholder="Store Name"></input>
                </div>
                <div>
                <input onChange={(e) => {setStoreDescription(e.target.value)}} className={`form-control mr-sm-2 mt-2 `} placeholder="Description"></input>
                </div>
                <div>
                <button type="submit" className="btn btn-primary mb-2 btn-lg mt-2">Create Store</button>
                </div>
                <ErrorAlert error={error}></ErrorAlert>
            </div>
            </div>
        </div>
        </div>
        </form>
    )
}

export default CreateStorePage