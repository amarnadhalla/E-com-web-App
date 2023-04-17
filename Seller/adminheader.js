import { Link } from "react-router-dom";

const Adminheader=()=>{
    return(
        <nav className="navbar navbar-expand-lg bg-info p-2 sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#"><i className="fa fa-shopping-bag fa-lg"></i>React Shpooing App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ps-4">
                <Link to="/" className="nav-link active text-white" aria-current="page" href="#"> <i className="fa fa-cogs"></i> Dashboard </Link>
              </li>
              <li className="nav-item ps-4">
                <Link to="/order" className="nav-link text-white" href="#"> <i className="fa-solid fa-suitcase"></i> My Order </Link>
              </li>
              <li className="nav-item ps-4">
                <Link to="/product" className="nav-link text-white" href="#"><i className="fa fa-table"></i> Products </Link>
              </li>
              <li className="nav-item ps-4">
                <Link to="/addproduct" className="nav-link text-white" href="#"><i className="fa fa-plus"></i> Add Products </Link>
              </li>
              <li className="nav-item ps-4">
                <a className="nav-link text-danger" href="#" onClick={logout}>Welcome - {localStorage.getItem("adminname")} <i className="fa fa-plus"></i> Logout </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}
export default Adminheader;

const logout=()=>{
  localStorage.clear();
  window.location.reload();
}