import { HashRouter, Routes, Route} from "react-router-dom";
import Myhome from "./home";
import Login from "./login";
import Mycart from "./cart";
import Publicheader from "./publicheader";
import Signup from "./signup";
import Myfooter from "./footer";

const Userapp=()=>{
    return(
        <HashRouter>
        <Publicheader/>

        <Routes>
            <Route exact path="/" element={<Myhome/>}/>
            <Route exact path="/Mycart" element={<Mycart/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
        </Routes>
        <Myfooter/>

        </HashRouter>
    )
}
export default Userapp;