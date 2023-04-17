import { useState, useEffect } from "react";

const Mydashboard=()=>{
    let[allproduct, updateProduct]=useState([]);
    let[allorder, updateOrder]=useState([]);

    const Getproduct=()=>{
        let sellerid = localStorage.getItem("sellerid");
        let url = "http://localhost:1234/product?seller="+sellerid;
        fetch(url)
        .then(response=>response.json())
        .then(productarray=>{
            updateProduct(productarray.reverse());
        })
    }
    const Getorder=()=>{
        let sellerid = localStorage.getItem("sellerid");
        let url = "http://localhost:1234/order";
        fetch(url)
        .then(response=>response.json())
        .then(productarray=>{
            updateOrder(productarray.reverse());
        })
    }

    useEffect(()=>{
        Getproduct();
        Getorder();
    },[1])

    return(
        <section className="container mt-4">
            <div className="row mb-4">
                <div className="col-lg-12 text-center">
                        <h1>Seller Dashboard</h1>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-lg-3"></div>
                <div className="col-lg-3">
                    <i className="fa fa-suitcase fa-5x text-info mb-3"></i>
                    <h2>{allproduct.length} : Total Products</h2>
                </div>
                <div className="col-lg-3">
                <i className="fa fa-headset fa-5x text-warning mb-3"></i>
                    <h2>{allorder.length} : Total Order</h2>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </section>
    )
}
export default Mydashboard;