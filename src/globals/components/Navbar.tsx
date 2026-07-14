import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { setUser } from "../../store/authSlice";
import { fetchCartItems } from "../../store/cartSlice";

function Navbar() {
  const reduxToken = useAppSelector((store) => store.auth.user.token);
  const { items } = useAppSelector((store) => store.cart);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(
    reduxToken || localStorage.getItem("thisistoken")
  );

  useEffect(() => {
    if (reduxToken) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, reduxToken]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 border-b border-pink-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-5">

        <div className="flex flex-wrap items-center justify-between ">

          {/* Logo */}

          <Link
            to="/home"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 via-rose-400 to-pink-300 flex items-center justify-center shadow-lg group-hover:scale-110 duration-300">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5 h-5"
              >
                <path
                  fill="white"
                  d="M44,7L4,23l40,16l-7-16L44,7z"
                />
              </svg>

            </div>

            <div>
              <h1 className="text-2 font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                Shree Beauty
              </h1>

              <p className="text-xs text-gray-500 tracking-widest">
                PARLOUR
              </p>
            </div>
          </Link>

          {/* Navigation */}

          <nav className="flex flex-wrap justify-center gap-7 text-gray-700 font-semibold mt-4 md:mt-0">

            <Link
              to="/home"
              className="hover:text-pink-600 duration-300"
            >
              Home
            </Link>

            <Link
              to="/product"
              className="hover:text-pink-600 duration-300"
            >
              Products
            </Link>

            <Link
              to="/my-order"
              className="hover:text-pink-600 duration-300"
            >
              My Orders
            </Link>

            {isLoggedIn && (
              <Link
                to="/my-cart"
                className="relative hover:text-pink-600 duration-300"
              >
                Cart

                {items.length > 0 && (
                  <span className="absolute -top-3 -right-4 bg-pink-500 text-white rounded-full text-[11px] w-5 h-5 flex items-center justify-center shadow">
                    {items.length}
                  </span>
                )}
              </Link>
            )}

          </nav>

          {/* Buttons */}

          <div className="flex gap-3 mt-4 md:mt-0">

            {isLoggedIn ? (
              <button
                onClick={() => {
                  localStorage.removeItem("thisistoken");

                  dispatch(
                    setUser({
                      userName: null,
                      email: null,
                      password: null,
                      token: null,
                    })
                  );

                  navigate("/home", {
                    replace: true,
                  });
                }}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:scale-105 hover:shadow-xl duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/register">
                  <button className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:scale-105 duration-300">
                    Register
                  </button>
                </Link>

                <Link to="/login">
                  <button className="px-6 py-2 rounded-full border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white duration-300">
                    Login
                  </button>
                </Link>
              </>
            )}

          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;