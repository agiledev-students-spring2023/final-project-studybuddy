const URL = {
	LOGIN: process.env.REACT_APP_BACK_URL + "/auth/login",
	FORGOT_PASSWORD: process.env.REACT_APP_BACK_URL + "/auth/forgot-password",
	RESET_PASSWORD: process.env.REACT_APP_BACK_URL + "/auth/reset-password",
	UPLOAD_POST: process.env.REACT_APP_BACK_URL + "/post/",
	REGISTER: process.env.REACT_APP_BACK_URL + "/auth/register",
	MAJORS: process.env.REACT_APP_BACK_URL + "/general/majors",
};

export default URL;
