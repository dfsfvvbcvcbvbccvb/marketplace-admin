import React from "react"
import Sidebar from "../components/common/Sidebar"
import Header from "../components/common/Header"
import { useEffect } from "react"
import { useState } from "react"
import { userService } from "../services/users"

function UsersPage() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAll()
            .then((data) => {
                setUsers(data.data.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    return (
        <div>
            <Header></Header>
            <div className="d-flex">
            <Sidebar></Sidebar>
            <div className="p-3 border text-center" style={{minWidth: '73%'}}>
                <h2>Users</h2>
                <a href="/users/add">Add new user</a>
                <div>
                <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <button className="btn btn-primary m-2">Edit</button>
                            <button value={user.id} className="btn btn-danger">Delete</button>
                        </tr>
                    ))}
                </tbody>
            </table>                    
                </div>
            </div>
            </div>
        </div>
    )
}
export default UsersPage