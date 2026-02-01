import { useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="d-flex flex-column flex-shrink-0 bg-light mt-2 p-3 border" style={{width: '380px', minHeight: '100vh'}}>
            <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
                <a href="/" className={`nav-link ${isActive('/') ? 'active' : 'link-dark'}`}>
                Dashboard
                </a>
            </li>
            <li>
                <a href="/stores" className={`nav-link ${isActive('/stores') ? 'active' : 'link-dark'}`}>
                Stores
                </a>
            </li>
            <li>
                <a href="/products" className={`nav-link ${isActive('/products') ? 'active' : 'link-dark'}`}>
                Products
                </a>
            </li>
            <li>
                <a href="/categories" className={`nav-link ${isActive('/categories') ? 'active' : 'link-dark'}`}>
                Categories
                </a>
            </li>
            <li>
                <a href="/users" className={`nav-link ${isActive('/users') ? 'active' : 'link-dark'}`}>
                Users
                </a>
            </li>
            </ul>
        </div>
    )
}
export default Sidebar