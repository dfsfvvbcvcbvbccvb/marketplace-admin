import Header from "../components/common/Header"
import React from "react"
import Sidebar from "../components/common/Sidebar"

function StoresPage() {
    return (
        <div>
        <Header></Header>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="p-3 border text-center border" style={{minWidth: '73%'}}>
                <h2 className="border">StoresPage</h2>
                <div>
                    <a>+ Add new store</a>
                </div>
            </div>
        </div>
        </div>

    )
}
export default StoresPage