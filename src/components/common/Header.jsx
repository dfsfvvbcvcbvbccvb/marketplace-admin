import React from "react";

function Header() {
    return (
        <header>
            <div className="row">
            <p>MarketPlace Admin</p>
            <p>User:</p>
            <button className="btn btn-primary">Logout</button>
            </div>
        </header>
    )
}

export default Header;