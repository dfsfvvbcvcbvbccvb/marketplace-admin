import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react';
import { userService } from '../../services/users';
import logo from './logo.jpg'

function Header() {
    const { logout } = useAuth();
    const [username, setUsername] = useState()
    const { userId } = useAuth()
            useEffect(() => {
                userService.getById(userId)
                    .then((data) => setUsername(data.data.data.name))
                    .catch((err) => console.error(err))
            }, [])

    return (
        <nav className="navbar navbar-light bg-light border">
        <a className="navbar-brand m-1" href="/">
            <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""></img>
            MarketPlace Admin
        </a>
        <h3>User: {username}</h3>
        <button onClick={logout} type="button" className="btn btn-primary m-2 btn-lg">Logout</button>
        </nav>
    )
}

export default Header;