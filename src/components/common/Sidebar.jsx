import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom'

function Sidebar() {

    return (
        <div className="d-flex flex-column flex-shrink-0 bg-light mt-2 p-3 border" style={{width: '380px', minHeight: '100vh'}}>
            <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link link-dark'}>
                Dashboard
                </NavLink>
            </li>
            <li>
            <NavLink to="/stores" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link link-dark'}>
            Stores
            </NavLink>
            </li>
            <li>
                <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link link-dark'}>
                Products
                </NavLink>
            </li>
            <li>
                <NavLink to="/categories" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link link-dark'}>
                Categories
                </NavLink>
            </li>
            <li>
                <NavLink to="/users" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link link-dark'}>
                Users
                </NavLink>
            </li>
            </ul>
        </div>
    )
}
export default Sidebar