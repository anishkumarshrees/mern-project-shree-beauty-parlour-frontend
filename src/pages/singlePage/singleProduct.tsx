import { useEffect } from "react";
import Navbar from "../../globals/components/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProduct } from "../../store/productSlice";
import { useParams } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";

function SingleProduct() {
  const { id } = useParams();
  const { product } = useAppSelector((store) => store.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  const stock = product?.productTotalStock ?? 0;

  const handleAddToCart =()=>{
    if (id) {
      dispatch(addToCart(id))
    }
    
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 p-5 sm:p-8 lg:p-12 items-center">
              {/* LEFT SIDE */}
              <div>
                <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-md">
                  <img
                    src={`http://localhost:3000/${product?.productImage}`}
                    alt={product?.productName}
                    className="w-full h-72 sm:h-96 md:h-125 object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <button className="w-full sm:flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold transition shadow-lg" onClick={handleAddToCart}>
                    Add to Cart
                  </button>

                  <button className="w-full sm:flex-1 border border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-semibold transition">
                    ❤️ Wishlist
                  </button>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col items-start">
                {/* Category */}
                <span className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold">
                  {product?.category?.categoryName}
                </span>

                {/* Product Name */}
                <h1 className="mt-5 text-3xl  md:text-4xl lg:text-5xl font-bold text-black-800 wrap-break-words">
                  {product?.productName}
                </h1>

                {/* Price & Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 w-full">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Price</p>

                    <h2 className="text-3xl font-bold text-teal-600">
                      Rs. {product?.productPrice}
                    </h2>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm mb-2">Availability</p>

                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {stock > 0 ? `${stock} In Stock` : "Out of Stock"}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-10 w-full">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    Description
                  </h3>

                  <p className="text-gray-600 leading-8 text-base">
                    {product?.productDescription}
                  </p>
                </div>

                {/* Features */}
                <div className="mt-10 flex flex-wrap gap-3">
                  <span className="bg-gray-100 px-4 py-2 rounded-full text-sm shadow-sm">
                    🚚 Fast Delivery
                  </span>

                  <span className="bg-gray-100 px-4 py-2 rounded-full text-sm shadow-sm">
                    🔒 Secure Payment
                  </span>

                  <span className="bg-gray-100 px-4 py-2 rounded-full text-sm shadow-sm">
                    ✔ Quality Assured
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
