import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"

function CreateStorePage() {
    return (
        <div>
        <Header></Header>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="border" style={{minWidth: '73%'}}>
            <div className="text-center border">
                <h2>Create New Store</h2>
            </div>
            <a href="stores">Back to stores</a>
            <div className="align-center border ">
                <h2 className="border-bottom">Store Information</h2>
                <div>
                <input className={`form-control mr-sm-2 mt-2 `} placeholder="Store Name"></input>
                </div>
                <div>
                <input className={`form-control mr-sm-2 mt-2 `} placeholder="Description"></input>
                </div>
                <select class="form-select form-select-lg mb-3 mt-2" aria-label=".form-select-lg example">
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <div>
                <button className="btn btn-primary mb-2 btn-lg mt-2">Create Store</button>
                </div>
            </div>
            </div>
        </div>
        </div>

    )
}
export default CreateStorePage