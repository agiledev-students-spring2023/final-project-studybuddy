import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./css/global.css";
import Chat from "./screens/Chat.jsx";
import ChatList from "./screens/ChatList.jsx";
import FilteredScreen from "./screens/FilteredScreen.jsx";
import Filters from "./screens/Filters.jsx";
import ForgotPW from "./screens/ForgotPW.jsx";
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import Profile from "./screens/Profile.jsx";
import ResetPW from "./screens/ResetPW.jsx";
import SignUp from "./screens/SignUp.jsx";
import UploadPost from "./screens/UploadPost.jsx";
import UserProfile from "./screens/UserProfile.jsx";
import ViewPost from "./screens/ViewPost.jsx";
import EditProfile from "./screens/EditProfile.jsx";

function App() {
	return (
		<div className="App container-fluid ps-0 pe-0">
			<ToastContainer position="top-center" />
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signUp" element={<SignUp />} />
					<Route path="/filters" element={<Filters />} />
					<Route path="/forgotPw" element={<ForgotPW />} />
					<Route path="/resetPw" element={<ResetPW />} />
					<Route path="/chatList" element={<ChatList />} />
					<Route path="/chat/:chatId" element={<Chat />} />
					<Route path="/profile" element={<Profile />} />
					<Route
						path="/userprofile/:userId"
						element={<UserProfile />}
					/>
					<Route path="/uploadPost" element={<UploadPost />} />
					<Route
						path="/filteredScreen"
						element={<FilteredScreen />}
					/>
					<Route path="/viewPost/:postId" element={<ViewPost />} />
					<Route path="/editProfile" element={<EditProfile />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
