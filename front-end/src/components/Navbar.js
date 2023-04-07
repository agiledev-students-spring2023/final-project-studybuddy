import React from "react";
import { HouseFill, ChatFill, PersonFill, CloudUploadFill } from "react-bootstrap-icons";

const authLinks = [
	{
		name: "Home",
		path: "/",
        icon: <HouseFill size={24} />,
	},
	
    {
        name: "Upload",
        path: "/uploadpost",
        icon: <CloudUploadFill size={24} />
    },
	{
		name: "Chat",
		path: "/chatList",
        icon: <ChatFill size={24} />,
	},
	{
		name: "Profile",
		path: "/profile",
        icon: <PersonFill size={24} />,
	}
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
											<div className="d-flex flex-column align-items-center">
                                                {link.icon}
                                                <span>{link.name}</span>
                                            </div>
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
