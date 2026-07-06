import { loginUser } from "../../store/authSlice";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useState, useEffect, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useAppDispatch();
  const { status, user } = useAppSelector((store) => store.auth);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const hadnleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Sending:", data);

    dispatch(loginUser(data));
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = user?.token || localStorage.getItem("thisistoken");
    if (token) {
      navigate("/home");
    }
  }, [user?.token, navigate]);

  return (
    <>
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-md p-6">
            <img
              className="mx-auto h-12 w-auto"
              src="https://www.svgrepo.com/show/499664/user-happy.svg"
              alt=""
            />

            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
              login ,{user?.userName}
            </h2>

            <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={data.email}
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    onChange={hadnleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={data.password}
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                    onChange={hadnleChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                >
                  Login Account
                </button>
              </div>
              <p className="text-blue-500">
                Wanna Register? <Link to="/register"> Go to Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
