import React from "react";

function TitleBar(props) {
	const title = props.title;
	const backpage = props.backpage;
	return (
		<>
			<nav className="navbar navbar-expand navbar-light bg-light">
				<div className="container-fluid">
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav d-flex justify-content-around w-100">
							<li className="nav-item">
								<a
									className="nav-link active"
									aria-current="page"
									href={backpage}
								>
									<h6 className="m-0">
										<i className="fas fa-arrow-circle-left" />{" "}
									</h6>
								</a>
							</li>
							<li className="nav-item">
								<p className="nav-link m-0">
									<strong>{title}</strong>
								</p>
							</li>
							<li className="nav-item"></li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}

export default TitleBar;
