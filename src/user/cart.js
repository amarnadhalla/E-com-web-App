import { useState, useEffect } from "react";

const Mycart=()=>{
    let[cartitem, updatecart]=useState([]);

    const getcart=()=>{
        fetch("http://localhost:1234/cart")
        .then(response=>response.json())
        .then(cartarray=>{
            updatecart(cartarray);
        })
    }

    useEffect(()=>{
        getcart();
    },[1]);

    const delitem=(id)=>{
        let url="http://localhost:1234/cart/" + id;
        let postdata={
            method:'DELETE'
        }
        fetch(url,postdata)
        .then(response=>response.json())
        .then(array=>{
            getcart();
        })
    }
    let total=0;

    const one=(pid, item, action)=>{
        if(action=="A"){
            item["qty"] = item.qty - 1;
        }
        else{
            item["qty"]=item.qty + 1;
        }
        if(item.qty>0){
        let url = "http://localhost:1234/cart/" + pid;
        let postoption={
            headers : {'content-type': 'application/json'},
            method : 'PUT',
            body : JSON.stringify(item)
        };
        fetch(url, postoption)
        .then(response=>response.json())
        .then(serverres=>{
            getcart()
        })
    }else{
        delitem(pid);
    }
    }

    //order place code 

    let[fullname, pickname]=useState("");
    let[mobile, pickmobile]=useState("");
    let[mail, pickmail]=useState("");
    let[address, pickaddress]=useState("");

    const  save=()=>{
        let url="http://localhost:1234/order";
        let orderdata={customername:fullname, mobile:mobile, mailid:mail, address:address, orderitem:cartitem};
        let postOption={
            headers: {'content-type':'application/json'},
            method: 'POST',
            body: JSON.stringify(orderdata)
        };
        fetch(url, postOption)
        .then(response=>response.json())
        .then(customerarray=>{
            alert("order received, order id-:" + customerarray.id);
        })
    }

    return(
        <section className="container">
            <div className="row">
                <div className="col-lg-3 mt-4">
                    <div className="card border-0 shadow-lg">
                        <div className="card-header bg-primary text-white">Customer Details</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label>Customer Name</label>
                                <input type="text" className="form-control" onChange={obj=>pickname(obj.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label>Mobile No</label>
                                <input type="text" className="form-control" onChange={obj=>pickmobile(obj.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label>E-Mail id</label>
                                <input type="text" className="form-control" onChange={obj=>pickmail(obj.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label>Delivery Address</label>
                                <textarea className="form-control" onChange={obj=>pickaddress(obj.target.value)}/>
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-warning" onClick={save}>Place Order</button>
                        </div>
                    </div>
                </div>
                    <div className="col-lg-9">
                        <h3 className="text-center">{cartitem.length} : items in cart</h3>
                                <table className="table table-bordered text-center mt-4">
                                    <thead>
                                        <tr>
                                            <th>Sl NO</th>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>details</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartitem.map((item, index)=>{
                                                total=total + item.qty * item.price;
                                                return(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <div className="input-group">
                                                                <button className="btn btn-info"
                                                                 onClick={one.bind(this, item.id, item, "A")}>-</button>
                                                                <input type="text" className="forn-control" value={item.qty}/>
                                                                <button className="btn btn-warning"
                                                                onClick={one.bind(this, item.id, item, "B")}>+</button> 
                                                            </div>
                                                        </td>
                                                        <td>{item.price}</td>
                                                        <td>{item.details}</td>
                                                        <td>
                                                            <button className="btn btn-sm"
                                                             onClick={delitem.bind(this, item.id)}>
                                                                <i class="fa-solid fa-trash"></i>
                                                             </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr>
                                            <td>SGST -{total*9/100} </td>
                                            <td>CGST -{total*9/100} </td>
                                            <td colSpan="2">GST Amount - { (total * 9 / 100) + (total * 9 / 100)}</td>
                                            <td colSpan="3">{total} : Total Amount To pay</td>
                                        </tr>
                                        <tr>
                                            <td className="text-end" colSpan="7">
                                                 {total + (total * 18/100)} : Total Amount to pay
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                    </div>
            </div>

        </section>
    )
}
export default Mycart;
