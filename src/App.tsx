import "./App.css";
import "tailwindcss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/user/register";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./pages/user/login";
import Home from "./home/home";
import Product from "./pages/product/product";
import SingleProduct from "./pages/singlePage/singleProduct";
import MyCart from "./pages/cart/my-cart";
import CheckOut from "./pages/checkOut/CheckOut";
import MyOrder from "./pages/my-orders/MyOrder";
import MyOrderDetails from "./pages/my-order-details/MyorderDetails";
import AdminLayout from "./pages/admin/AdminLayout";
import Categories from "./pages/admin/categories/Categories";
import AdminStats from "./pages/admin/stats/AdminStats";
import axios from "axios";
// import AdminIndex from "./pages/admin/Layout";

function App() {
  
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<SingleProduct />} />{" "}
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/my-cart" element={<MyCart />} />
            <Route path="/my-checkout" element={<CheckOut />} />
            <Route path="/my-order" element={<MyOrder />} />
            <Route path="/my-order/:id" element={<MyOrderDetails />} />
            <Route path="/admin" element={<AdminStats />} />
             <Route path="/admin/categories" element={<Categories />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
