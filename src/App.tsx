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
// import AdminLayout from "./pages/admin/AdminLayout";
import Categories from "./pages/admin/categories/Categories";
import AdminStats from "./pages/admin/stats/AdminStats";
// import axios from "axios";
import User from "./pages/admin/users/Users";
import AdminProduct from "./pages/admin/products/Product";
import ProductDescription from "./pages/admin/productDesctiption/ProductDescription";
import AdminOrder from "./pages/admin/order/AdminOrder";
import AdminOrderDetails from "./pages/admin/order-details/AdminOrderDetails";
// import AdminIndex from "./pages/admin/Layout";
import { io } from "socket.io-client";
import AdminProtectedRoute from "./pages/admin/adminProtected/AdminProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";


export const socket = io("https://shree-beauty-parlour-server.onrender.com", {
  auth: {
    token: localStorage.getItem("thisistoken"),
  },
});

function App() {
  
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            {/* <Route path="/product/:id" element={<SingleProduct />} />{" "} */}
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/my-cart" element={<MyCart />} />
            <Route path="/my-checkout" element={<CheckOut />} />
            <Route path="/my-order" element={<MyOrder />} />
            <Route path="/my-order/:id" element={<MyOrderDetails />} />
            

             <Route element={<AdminProtectedRoute />}>
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminStats />} />
    <Route path="categories" element={<Categories />} />
    <Route path="users" element={<User />} />
    <Route path="product" element={<AdminProduct />} />
    <Route path="product/:id" element={<ProductDescription />} />
    <Route path="orders" element={<AdminOrder />} />
    <Route path="orders/:id" element={<AdminOrderDetails />} />
 
</Route>
    
</Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
