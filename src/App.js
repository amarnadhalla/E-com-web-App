
import Userapp from "./user/userapp";
import Adminapp from "./admin/adminapp";


function App() {
  if(localStorage.getItem("sellerid") == null)
  {
    return ( <Userapp/> );
  }else
  {
    return ( <Adminapp/> );
  }
}

export default App;
