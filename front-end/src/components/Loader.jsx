import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

function Loader() {
	return (
		<div className="loader_screen">
			<PulseLoader color="#8f9cff" />
		</div>
	);
}

export default Loader;
