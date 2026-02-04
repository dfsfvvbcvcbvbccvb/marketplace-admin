import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"

function CreateProductPage() {

    return (
        <div>
        <Header></Header>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="p-3 border" style={{minWidth: '73%'}}>
                <div className="border">
                    <div className="text-center">
                    <h2 className="border">Create New Product</h2>
                    </div>
                    <a href="/products">Back to products</a>
                    <div className="align-center text-center">
                        <h2 className="border m-2">Product Information</h2>
                        <div>
                            <div>
                                <div>
                                <span>Shop</span>
                                </div>
                                <select className="mt-2 form-select">
                                    <option>My Store</option>
                                </select>
                            </div>
                            <div>
                                <div>
                            <span>Category</span>
                            </div>
                            <select className="mt-2 form-select">
                                <option>Electronics</option>
                            </select>
                            </div>
                            <div>
                                <input type="text" className="form-control mt-2" placeholder="Product Name" ></input>
                            </div>
                            <div>
                                <input type="text" className="form-control mt-2" placeholder="Description"  ></input>
                            </div>
                            <div>
                                <input type="text" className="form-control mt-2" placeholder="Price" ></input>
                            </div>
                            <div>
                                <input type="text" className="form-control mt-2" placeholder="Quantity" ></input>
                            </div>
                            <button >d</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

    )
}
export default CreateProductPage