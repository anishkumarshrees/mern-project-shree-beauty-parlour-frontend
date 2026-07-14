import { Link } from "react-router-dom";
import type { IProduct } from "../types";

interface ICardProduct {
  product: IProduct;
}

const Card: React.FC<ICardProduct> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="relative w-72 sm:w-72 md:w-80 overflow-hidden rounded-3xl bg-white border border-pink-100 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl group">

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute left-4 top-4 z-20 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
            {product.discount}% OFF
          </div>
        )}

        {/* Wishlist */}
        <button
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg transition hover:bg-pink-500 hover:text-white"
          type="button"
        >
          ❤️
        </button>

        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={`http://192.168.1.78:3000/${product.productImage}`}
            alt={product.productName}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"></div>
        </div>

        {/* Content */}
        <div className="space-y-3 p-5">

          <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600">
            Beauty Product
          </span>

          <h3 className="truncate text-xl font-bold text-gray-800">
            {product.productName}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-sm text-gray-500">(4.9)</span>
          </div>

          <p className="line-clamp-2 text-sm leading-6 text-gray-500">
            {product.productDescription}
          </p>

          {/* Stock */}
          <div>
            {product.productTotalStock > 0 ? (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                ✓ In Stock ({product.productTotalStock})
              </span>
            ) : (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                Out of Stock
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-2">

            <div>
              <p className="text-3xl font-bold text-pink-600">
                ₹{product.productPrice}
              </p>

              {product.discount > 0 && (
                <p className="text-sm text-gray-400 line-through">
                  ₹
                  {Math.round(
                    product.productPrice /
                      (1 - product.discount / 100)
                  )}
                </p>
              )}
            </div>

            <button
              type="button"
              className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              🛒
            </button>

          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;