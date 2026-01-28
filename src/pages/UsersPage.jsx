import React from "react"
import Sidebar from "../components/common/Sidebar"
import Header from "../components/common/Header"

function UsersPage() {
    return (
        <div>
            <Header></Header>
            <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="p-3 border text-center" style={{minWidth: '73%'}}>
                <h2>Users</h2>
                <a href="/add-user">Add new user</a>
                <div>

                </div>
            </div>
            </div>
        </div>
    )
}
export default UsersPage