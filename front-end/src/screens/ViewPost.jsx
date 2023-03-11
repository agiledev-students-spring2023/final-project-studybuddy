import React from "react";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import "./ViewPost.css"
import { useForm } from "react-hook-form";


const UserComments = () => {
  return (    
  <div className="row border p-1 pt-2 pb-2 m-1">
    <p2 className="mb-1 text-left">User Name</p2>
    <p className="mb-1 text-left">User Comment</p>
  </div>

 );
}
 

const  ViewPost= () => {

  const {register,handleSubmit,formState: { errors },} = useForm();
  const onSubmit = (data) => console.log(data);


  const img='https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png'
  const date="13-03-2022"
  const mode="Online"
  const subject="Software Engineering"

  return (    

  <div className="View Post">
 
 <TitleBar title='View Post' backpage='/filteredScreen'/>
    <div className="content-body">
      <div className="container-fluid pageLayout">
        <div className="profile">
                      <div className="mb-1">
                        <img src={img} className="Picture" alt='ProfilePicture'/>
                      </div>
                      <div>
                        <h2 className="mb-1" >User Name</h2>
                        <h2 className="mb-1">User Major</h2>
                      </div>
              
          </div>

          <div className="Post-info">
                        <p > {subject} </p>
                        <p >{mode} </p>
                        <p >{date}</p>
                        
                        
                                  
          </div>

          <div className="Description">
                        <p>Description</p>
          </div>
        <div className="Comments">
                  <UserComments/>
                  <UserComments/>
                  <UserComments/>
          </div>

          {/* Enter comment section */}
          <div className="custom-comments">
            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-floating mb-3 custom">
                                    <input
                                        type="text"
                                        className={
                                            "form-control " +
                                            (errors.user_id ? "is-invalid" : "")
                                        }
                                        id="user_id"
                                        placeholder="User ID"
                                        {...register("user_id", { required: true })}
                                    />
                                    <label htmlFor="user_id">Enter Comment</label>
                                </div>

            </form>

            <div className="button">
                  <button className="btn btn-primary" type="submit"> Send</button>
            </div>
          </div>
          

      </div>
    </div>
  
  <Navbar user="Post" />
</div>

   );
}
 


  export default ViewPost;
