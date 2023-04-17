import { useState, useEffect } from "react";

const Myproduct=()=>{
    let[allproduct, updateproduct]=useState([]);
    const Getproduct=()=>{
        let sellerid = localStorage.getItem("sellerid");
        let url = "http://localhost:1234/product?seller="+sellerid;
        fetch(url)
        .then(response=>response.json())
        .then(productarray=>{
            updateproduct(productarray.reverse());
        })
    }

    useEffect(()=>{
        Getproduct();
    },[1])

    let delitem=(id)=>{
        let url="http://localhost:1234/product/"+ id ;
        let postdata={
            method: 'DELETE'
        }
        fetch(url, postdata)
        .then(response=>response.json())
        .then(serverres=>{
            Getproduct();
        })
    }

    let[keyword, updatekeyword]=useState("")

    return(
        <section className="container">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <input type="text" className="form-control mt-4" placeholder="Search Product"
                    onChange={obj=>updatekeyword(obj.target.value)}/>
                </div>
                <div className="col-lg-4"></div>
            </div>
            <div className="row">
                <div className="col-lg-12 text-center">
                    <table className="table mt-4 shadow-lg">
                        <thead>
                            <tr className="bg-light text-primary">
                                <th>Id</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Photo</th>
                                <th>Details</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allproduct.filter(post=>{if(post.name.toLowerCase().includes(keyword.toLowerCase()))
                                    {
                                        return post;
                                    }
                                })
                                .map((product, index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td><img src={product.photo} height="50" width="50"/></td>
                                            <td>{product.details}</td>
                                            <td><button className="btn btn-danger text-center"
                                            onClick={delitem.bind(this, product.id)}>
                                            <i className="fa fa-trash"></i></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
export default Myproduct;