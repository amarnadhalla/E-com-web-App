import { useState } from "react";
import { Link } from "react-router-dom";

const Signup=()=>{
    let[fullname, pickname]=useState("");
    let[emailid, pickmailid]=useState("");
    let[password, pickpassword]=useState("");

    let[msg, updatemsg]=useState("");
    let[namemsg, name]=useState("");
    let[mailmsg, mail]=useState("");
    let[passmsg, passwd]=useState("");

    const signup=()=>{
            if(fullname === "")
            {
                name("required*");
            }
            else if(emailid === ""){
                mail("required*");
            }
            else if(password === ""){
                passwd("required*");
            }
            else{
                let url="http://localhost:1234/account?email=" + emailid;// it checks the email in the account
                fetch(url)
                .then(response=>response.json())
                .then(userinfo=>{
                    if(userinfo.length>0)//if entered email already exist and returns erroe msg 
                    {
                        mail("email already exist*");
                    }
                    else{
                        let details={fullname:fullname, email:emailid, password:password};
                        let url="http://localhost:1234/account";
                        let postdata={
                            headers:{'content-type': 'application/json'},
                            method : 'POST',
                            body : JSON.stringify(details)
                        }
                        fetch(url, postdata)
                        .then(response=>response.json())
                        .then(serverres=>{
                            updatemsg("Account created please login.");
                            pickname(""); pickmailid(""); pickpassword("")
                        })
                    }
                })
            
        }
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h3 className="mt-4 text-dark">Signup</h3>
                    <div className="card border-0 shadow mt-3 mb-3">
                        <div className="card-header bg-info">
                            <i className="fa fa-gears"></i> Signup
                        </div>
                        <div className="card-body">
                            <label>Full Name</label>
                            <input type="text" className="form-control" onChange={obj=>pickname(obj.target.value)} value={fullname}/>
                            <p className="text-danger">{namemsg}</p>
                            <label className="mt-2">E-Mail Id</label>
                            <input type="mail" className="form-control" onChange={obj=>pickmailid(obj.target.value)} value={emailid}/>
                            <p className="text-danger">{mailmsg}</p>
                            <label className="mt-2">Password</label>
                            <input type="password" className="form-control" onChange={obj=>pickpassword(obj.target.value)} value={password}/>
                            <p className="text-danger">{passmsg}</p>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-info" onClick={signup}><i className="fa fa-user-plus"></i> Signup</button>
                            <div className="text-center"><p className="text "><small>Already had an account?</small><Link to="/login"> <small>Login</small></Link></p>
                        </div>
                        </div>
                    </div>
                    <p className="text-success text-center">{msg}</p>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}
export default Signup;