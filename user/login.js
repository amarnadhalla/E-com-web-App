import { useState } from "react";
import { Link } from "react-router-dom";

const Login=()=>{
    let[msg, updatemsg]=useState("Enter Your Login Details");
    let[username, pickusername]=useState("");
    let[password, pickpassword]=useState("");

    let[mailmsg, mailalert]=useState("");
    let[passmsg, passalert]=useState("");

    const gologin=()=>{
        if(username === ""){
            mailalert("Required*");
        }
        else if(password === ""){
            passalert("Required*");
        }
            else{
            updatemsg("please wait processing...!");
            let url="http://localhost:1234/account?email="+username+"&password="+ password;
            // it checks the email and password you entered is present in the account details
            fetch(url)
            .then(response=>response.json())
            .then(userinfo=>{
                if(userinfo.length>0)//if email and password present in the account its length would be 1.
                {
                    updatemsg("success : Redirecting...");
                    localStorage.setItem("sellerid", userinfo[0].id);//setting up the local storage to the seller id
                    localStorage.setItem("adminname", userinfo[0].fullname);//local storage to adminname
                    window.location.reload();// refresh the current page.
                }else{
                    updatemsg("fail: Invalid email or password...");
                }
            })

        }
    }
    return(
            <section className="container mt-5">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <p className="text-danger text-center">{msg}</p>
                    <div className="card border-0 shadow-lg">
                       
                        <div className="card-header bg-primary text-white">
                            <i className="fa fa-lock"></i> Login
                        </div>

                        <div className="card-body">
                            <div className="mb-3">
                                <label>e-Mail Id</label>
                                <input type="text" className="form-control" onChange={obj=>pickusername(obj.target.value)}/>
                                <p className="text-danger">{mailmsg}</p>
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input type="password" className="form-control" onChange={obj=>pickpassword(obj.target.value)}/>
                                <p className="text-danger">{passmsg}</p>
                            </div>
                        </div>

                        <div className="card-footer text-center">
                            <button className="btn btn-danger" onClick={gologin}>
                                Login <i className="fa fa-arrow-right"></i>
                            </button>
                            <div className="text-center">
                                    <p className="text "><small>Not a member?</small>
                                    <Link to="/signup"> <small>signup</small></Link></p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-4"></div>
            </div>
       </section>
    )
}
export default Login;