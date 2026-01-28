import Header from "../components/common/Header"
import React from "react"
import Sidebar from "../components/common/Sidebar"

function Dashboard() {
    return (
        <div>
        <Header></Header>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="p-3 border text-center" style={{minWidth: '73%'}}>
                <div className="border">
                    <h2 className="border">Dashboard</h2>
                    <div className="align-center">
                    <div className="d-flex">
                        <div style={{width: '300px'}} className="border m-3"><h3>Магазины</h3><span>?</span></div>
                        <div style={{width: '300px'}} className="border m-3"><h3>Товары</h3><span>?</span></div>
                    </div>
                    <div className="d-flex">
                        <div style={{width: '300px'}} className="border m-3"><h3>Категории</h3><span>?</span></div>
                        <div style={{width: '300px'}} className="border m-3"><h3>Пользователи</h3><span>?</span></div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

    )
}
export default Dashboard