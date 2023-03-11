import React from "react";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import "./UploadPost.css";
import { useForm } from "react-hook-form";


const UploadPost = () => {
  const img='https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png'

  const {register,handleSubmit,formState: { errors },} = useForm();
  const onSubmit = (data) => console.log(data);


  return ( 
    <div>
        <TitleBar title='Create Post' backpage='/'/>
    <div className="content-body">
      <div className="container-fluid pageLayout">
            <div className="row text-center">
                  <div className="mb-1">
                    <img src={img} className="Picture" alt='ProfilePicture'/>
                  </div>
                    <p className="mb-1" >User Name</p>
                    <p className="mb-1">User Major</p>
          
              </div>

        
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-floating mb-3 custom-01">
                                <input
                                    type="date"
                                    className={
                                        "form-control " +
                                        (errors.user_id ? "is-invalid" : "")
                                    }
                                    id="date"
                                    placeholder="User ID"
                                    {...register("user_id", { required: true })}
                                />
                                <label htmlFor="user_id">Meeting Date</label>
                            </div>
                            {/* Mode of meeting */}
                                <div class="form-floating mb-3 custom-01">
                                    <select type="text"
                                    className={
                                        "form-control " +
                                        (errors.user_id ? "is-invalid" : "")
                                    }
                                    id="user_id"
                                    placeholder="User ID"
                                    {...register("user_id", { required: true })}>
                                        <option selected disabled value="">Chose a meeting mode</option>
                                        <option value="1">In-person</option>
                                        <option value="2">Online</option>
                                    </select>
                                    
                                    <label for="floatingSelect">In-person/Online meeting</label>
                              </div>

                             {/* Subject */}
                             <div className="form-floating mb-3 custom-01">
                                <input 
                                    type="text" 
                                    className={
                                        "form-control " +
                                        (errors.password ? "is-invalid" : "")
                                    }
                                    id="password"
                                    placeholder="Password"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                <label htmlFor="password">Subject/Topic</label>
                            </div>

                             {/* Description */}
                             <div className="form-floating mb-3 custom02">
                                <input type="text" className="form-control "
                                    id="floatingInputValue"
                                    placeholder="Post Description i.e specific time"
                                />
                                <label htmlFor="password">Description</label>
                            </div>


                            {/* Submit */}
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="submit">
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        
            </div>
        <Navbar user="Post" />




    </div>
   );
}
 


export default UploadPost;
