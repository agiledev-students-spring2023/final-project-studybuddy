import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import SignUp from "./screens/SignUp.jsx";
import Filters from "./screens/Filters.jsx";
import ForgotPW from "./screens/ForgotPW.jsx";
import UploadPost from "./screens/UploadPost.jsx";
import ChatList from "./screens/ChatList.jsx";
import Chat from "./screens/Chat.jsx";
import UserProfile from "./screens/UserProfile.jsx";
import FilteredScreen from "./screens/FilteredScreen.jsx";
import ViewPost from "./screens/ViewPost.jsx";
import Profile from "./screens/Profile.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/global.css";

function App() {
	return (
		<div className="App container-fluid ps-0 pe-0">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signUp" element={<SignUp />} />
					<Route path="/filters" element={<Filters />} />
					<Route path="/forgotPw" element={<ForgotPW />} />
					<Route path="/chatList" element={<ChatList />} />
					<Route path="/chat/:chatId" element={<Chat />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/userprofile" element={<UserProfile />} />
					<Route path="/uploadPost" element={<UploadPost />} />
					<Route
						path="/filteredScreen"
						element={<FilteredScreen />}
					/>
					<Route path="/viewPost/:postId" element={<ViewPost />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
