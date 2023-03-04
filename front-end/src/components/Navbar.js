import React from "react";

function Navbar() {
    return (
        <>
            <nav className="navbar fixed-bottom navbar-expand navbar-light bg-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav d-flex justify-content-around w-100">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="/"
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/messageList">
                                    Chat
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/profile/1">
                                    Profile
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
