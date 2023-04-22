import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { MdArrowBack, MdSend } from "react-icons/md";
import { Link } from "react-router-dom";
import { getUser } from "../auth/auth"

const PostPreview = ({ id, title, userid }) => (
    <Link to={`/viewPost/${id}`} state={{ from: `/userprofile/${userid}` }}>
        <div className="Post-preview">
            <h5>{title}</h5>
        </div>
    </Link>
);

const UserName = ({ name, major, picture }) => (
    <div className="UserInfo">
        <div>
            <img src={picture} className="Picture" alt="ProfilePicture" />
        </div>
        <div>
            <h5> {name}</h5>
            <h5>{major}</h5>
        </div>
    </div>
);
const UserProfile = () => {
    const { userId } = useParams();
    const [myposts, setMyposts] = useState([]);
    const [profile, setMyprofile] =useState([]);
    const [chatId, setChatId] = useState("");

    useEffect(() => {
        loadFilteredPosts(userId);
        fetchChatId(userId);
    }, [userId]);

    const loadFilteredPosts = (userId) => {
        const options = {
            method: "GET",
            url: `/userprofile/${userId}`,
        };
        axios
            .request(options)
            .then(function (response) {
                const user = response.data.user;
                const posts = response.data.posts;
                setMyposts(posts);
                setMyprofile(user);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    const fetchChatId = async (userId) => {
        const chatIdAPI = `/_chat`;
        const { id } = await getUser()
        const {
            data: { chat_id },
        } = await axios.post(chatIdAPI, { buddy_id: userId }, { headers: {userId: id }});
        setChatId(chat_id);
    };
    return (
        <div>
            <div className="user_profile_header">
                <MdArrowBack
                    className="cursor_pointer back_icon_"
                    onClick={() => window.history.back()}
                />
            </div>

            <div className="content-body">
                <div className="container-fluid pageLayout">
                    <UserName
                        name={profile.name}
                        major={profile.major}
                        picture={profile.Profile_pic}
                    />

                    <div className="Message">
                        <a
                            href={`/chat/${chatId}`}
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            Direct Message
                        </a>
                    </div>

                    <div className="Post">
                        <h2>Posts</h2>
                        <div className="Postgrid">
                        {myposts && myposts.length > 0 ? (
                            myposts.map((post) => (
                                <PostPreview
                                    title={post.subject}
                                    id={post._id}
                                    userid={profile.id}
                                    key={post._id}
                                />
                            ))) : (
                             <p>No posts</p>
                                )}
                        </div>
                    </div>
                </div>
            </div>
            <Navbar user="Others" />
        </div>
    );
};

export default UserProfile;