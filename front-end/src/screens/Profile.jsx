import React from "react";
import { useState, useEffect } from "react";
import "./Profile.css";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

const PostPreview = ({ id, title }) => (
	<Link to={`/viewPost/${id}`} state={ {from: "/profile"} }>
		<div className="Post-preview">
			<h5>{title}</h5>
		</div>
	</Link>
);

const ProfilePic = ({profilepic}) => {
	const [image,setImage]=useState();
	
	function handleImage(e)
	{
			setImage(e.target.files[0]);
	}

	function handleSubmit() {
		const formData=new FormData();
		formData.append('profile_pic', image)
		axios
			.post('profile', formData)
			.then((res) =>{
				if (res.status === 200) {
					localStorage.setItem("token", res.data.token);
					//navigate("/profile");
				} else {
					alert(res.data.message);
				}
			})
			.catch((err) => {
				console.log(err);
				alert(err.response.data.message);
			});
	};

	return (
		<div className="Pic">
			<div className="Picture">
				<img src= {profilepic} alt=""/>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="input-group mb-3">
					<input className="form-control" type="file" id="formFile" onChange={handleImage}/>		
					<button>Upload</button>
				</div>
			</form>
		</div>
);
};

const UserName = ({ name, major, picture}) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	 return( 
	<div className="UserInfo">
		<div>
			<button style={{border: 'none', background: 'none', padding: 0, cursor: 'pointer'}} onClick={handleShow}>
			<img src={picture} className="Picture" alt="ProfilePicture"/>
			</button>
			<div className="Mymodal">
			  <Modal show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}>
					<Modal.Header closeButton>
						<Modal.Title>Upload Profile Picture</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<ProfilePic pic={picture} />
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>  Close </Button>
					</Modal.Footer>
     			 </Modal>	
				  </div>
		</div>
		<div>
			<h5> {name}</h5>
			<h5>{major}</h5>
		</div>
	</div>
);
 };

const Profile = () => {
	const [myaccount, setMyaccount] = useState([]);

	useEffect(() => {
		loadFilteredPosts();
	}, []);

	const loadFilteredPosts = () => {
		const options = "/profile";

		axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
				const object = response.data.find((obj) => obj.id === 1);
				setMyaccount(object);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	return (
		<div>
			<div className="title-bar">
				{" "}
				<TitleBar title="My Account" backpage="/" />{" "}		
			</div>
			<div className="content-body">
				<div className="container-fluid pageLayout">
					<div className="Logout">
						<a href="/Login">Log out</a>
					</div>

					<UserName
						name={myaccount.name}
						major={myaccount.major}
						picture={myaccount.profile_pic}
					/>
			
					<div className="Post">
						<h2>Posts</h2>
						<div className="Postgrid">
							{myaccount &&
							myaccount.post && myaccount.post.map((post) => (
								<PostPreview key={post.postId} title={post.title} id={post.postId} />
							))}
						</div>
					</div>
				</div>
			</div>

			<Navbar user="Profile" />
		</div>
	);
};
export default Profile;
