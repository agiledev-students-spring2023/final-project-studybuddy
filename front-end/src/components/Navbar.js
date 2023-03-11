import React from "react";

const authLinks = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Chat",
        path: "/messageList",
    },
    {
        name: "Profile",
        path: "/profile",
    },
];

const unAuthLinks = [
	{
		name: "Login",
		path: "/login",
	},
	{
		name: "Sign Up",
		path: "/signup",
	},
];

function Navbar(props) {
	const { user } = props;

	const links = user ? authLinks : unAuthLinks;

	return (
		<>
			<nav className="navbar fixed-bottom navbar-expand navbar-light bg-light">
				<div className="container-fluid">
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav d-flex justify-content-around w-100">
							{links.map((link, index) => {
								return (
									<li className="nav-item" key={index}>
										<a
											className={
												"nav-link " +
												(window.location.pathname ===
												link.path
													? "active"
													: "")
											}
											href={link.path}
										>
											{link.name}
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
