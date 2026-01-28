import Header from "./Header"

function Sidebar() {
    return (
        <div className="d-flex flex-column flex-shrink-0 bg-light mt-2 p-3 border" style={{width: '380px', minHeight: '100vh'}}>
            <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
                <a href="/" className="nav-link active" aria-current="page">
                Dashboard
                </a>
            </li>
            <li>
                <a href="/stores" classname="nav-link link-dark">
                Stores
                </a>
            </li>
            <li>
                <a href="/products" className="nav-link link-dark">
                Products
                </a>
            </li>
            <li>
                <a href="/categories" className="nav-link link-dark">
                Categories
                </a>
            </li>
            <li>
                <a href="/users" className="nav-link link-dark">
                Users
                </a>
            </li>
            </ul>
        </div>
    )
}
export default Sidebar