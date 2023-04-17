import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const Newproduct=()=>{
    let[pname, pickname]=useState("");
    let[pprice, pickprice]= useState("");
    let[pphoto, pickphoto]= useState("");
    let[pdetails, pickdetails]= useState("");

    const save=()=>{
        let sellerid = localStorage.getItem("sellerid");
        let url = "http://localhost:1234/product";
        let pinfo = {
            "name":pname,
            "price":pprice,
            "photo":pphoto,
            "details":pdetails,
            "seller":sellerid
        };
        let postOption={
            headers: {"content-type" : "application/json"},
            method : 'POST',
            body : JSON.stringify(pinfo)
        }
        fetch(url, postOption)
        .then(response=>response.json())
        .then(serverres=>{
            toast(pname + "saved successfully");
            pickname(""); pickprice(""); pickphoto(""); pickdetails("")
        })
    }

    return(
        <section className="container mt-4">
            <div className="row">
                <div className="col-lg-12 text-center mb-3">
                    <h1 className="text-primary">Enter New Product Details</h1>
                    <ToastContainer/>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="mb-3">
                        <label>Enter Product Name</label>
                        <input type="text" className="form-control mt-2" 
                        onChange={obj=>pickname(obj.target.value)} value={pname}/>
                    </div>
                    <div className="mb-3">
                        <label>Enter Price / Unit</label>
                        <input type="number" className="form-control mt-2"
                         onChange={obj=>pickprice(obj.target.value)} value={pprice}/>
                    </div>
                    <div className="mb-3">
                        <label>Enter Photo URL</label>
                        <input type="text" className="form-control mt-2" 
                        onChange={obj=>pickphoto(obj.target.value)} value={pphoto}/>
                    </div>
                    <div className="mb-3">
                        <label>Enter Product Details</label>
                        <textarea className="form-control" 
                        onChange={obj=>pickdetails(obj.target.value)} value={pdetails}></textarea>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-danger" onClick={save}>Save</button>
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </section>
    )
}
export default Newproduct;