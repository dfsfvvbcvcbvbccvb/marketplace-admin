import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"

function CategoriesPage() {
    return (
        <div>
        <Header></Header>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="border" style={{minWidth: '73%'}}>
                <div className="text-center align-center">
                    <h2 className="border">Categories</h2>
                </div>
                <a href="add-category">+ Add New Category</a>
            </div>
        </div>
        </div>

    )
}
export default CategoriesPage