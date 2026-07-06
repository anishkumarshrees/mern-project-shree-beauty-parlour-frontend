import "./App.css";
import "tailwindcss";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./pages/user/register";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./pages/user/login";
import Home from "./home/home"
import Product from "./pages/product/product";
function App() {
  return (
    <>
  <Provider store = {store}>
     <BrowserRouter>
   <Routes>
    <Route path="/register" element={<Register/>}/>
     <Route path="/login" element={<Login />}/>
     <Route path="/home" element={<Home />}/>
      <Route path="/product" element={<Product />}/>
   </Routes>
   </BrowserRouter>
  </Provider>
    </>
  );
}

export default App;
