import jwt_decode from "jwt-decode";

const saveToken = (token) => localStorage.setItem("token", token);

const getToken = () => localStorage.getItem("token");

// equivalent to logging out
const removeToken = () => localStorage.removeItem("token");

// Returns true is user is logged in, false otherwise
const isAuthenticated = () => {
	const token = getToken();
	if (!token) {
		return false;
	}
	try {
		jwt_decode(token);
		return true;
	} catch (error) {
		return false;
	}
};

// Returns the basic user information if the user is logged in, null otherwise
const getUser = () => {
	const token = getToken();
	if (!token) {
		return null;
	}
	try {
		const decoded = jwt_decode(token);
		return decoded;
	} catch (error) {
		return null;
	}
};

export { saveToken, getToken, removeToken, isAuthenticated, getUser };
