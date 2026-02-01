import { useAuth } from '../../context/AuthContext'

function Header() {
    const { logout } = useAuth();

    return (
        <nav className="navbar navbar-light bg-light border">
        <a className="navbar-brand m-1" href="#">
            <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt=""></img>
            MarketPlace Admin
        </a>
        <h3>User: Admin</h3>
        <button onClick={logout} type="submit" className="btn btn-primary m-2 btn-lg">Logout</button>
        </nav>
    )
}

export default Header;