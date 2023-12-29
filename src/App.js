import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerfyEmail from "./pages/VerfyEmail";
import SelectImage from "./pages/SelectImage";


function App() {
  return (
    <div>
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/verfyEmail" element={<VerfyEmail/>} />
      <Route path="/selectImage" element= {<SelectImage/>} />
     </Routes>
    </div>
  );
}

export default App;
