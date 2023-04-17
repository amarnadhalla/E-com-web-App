import {useState , useEffect} from 'react';
import ReactPaginate from 'react-paginate';

const Myhome = () =>{
    let[allproduct, updateProduct] = useState( [] );
    const getProduct = () =>{
        fetch("http://localhost:1234/product")
        .then(response =>response.json())
        .then(productArray =>{
            updateProduct(productArray.reverse());
        })
    }

    useEffect(()=>{
        getProduct();
    }, [1] );

    const addtocart = (product) =>{
        product["qty"] = 1; // adding products to cart with the initial qty as one
            let url= " http://localhost:1234/cart";
            let postdata={
                headers:{'content-type':'application/json'},
                method:"POST",
                body:JSON.stringify(product)
            };
            fetch(url, postdata)
            .then(response=>response.json())
            .then(serverstatus=>{
                alert("item added to cart");
            })
    }

    let[keyword, updatekeyword]=useState("");

    //
    const PER_PAGE = 4;
        const [currentPage, setCurrentPage] = useState(0);
        function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
        }
        const offset = currentPage * PER_PAGE;
        const pageCount = Math.ceil(allproduct.length / PER_PAGE);
    //

    return(
        <main>
            <section id="banner">  React Shopping App </section>
            <section className="container mt-4">
                <div className='row mb-4'>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4'>
                        <input type="text" className='form-control'
                        placeholder='search here'
                        onChange={obj=>updatekeyword(obj.target.value)}/>
                    </div>
                    <div className='col-lg-4'></div>
                </div>
                <div className="row text-center">
                    {
                        allproduct.filter(post =>{if(post.name.toLowerCase().includes(keyword.toLowerCase()) )
                            {
                                     return post;
                            }
                           }).slice(offset, offset + PER_PAGE)
                        .map((product, index)=>{
                            return(
                                <div className="col-lg-4 mb-5" key={index}>
                                    <div className='p-4'>
                                        <h2 className='text-primary mb-3'> {product.name} </h2>
                                        <img src={product.photo} height="200" width="100%" className='rounded'/>
                                        <h5 className='m-3'>
                                            <del className='text-danger m-3'>Rs. {parseInt(product.price) + parseInt(product.price) * 10 / 100} </del>
                                            <ins className='text-primary m-3'>Rs. {product.price} </ins>
                                        </h5>
                                        <p> {product.details} </p>
                                        <button className='btn btn-danger btn-sm' onClick={addtocart.bind(this, product)}> Add To Cart </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="mb-4 mt-4">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination  justify-content-center"}
                            pageClassName={"page-item "}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active primary"}
                        />
                    </div>

            </section>
        </main>
    )
}

export default Myhome;