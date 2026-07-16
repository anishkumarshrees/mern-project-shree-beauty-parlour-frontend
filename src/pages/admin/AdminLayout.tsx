import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] bg-gray-100 overflow-hidden">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          z-50
          h-full
          w-72
          bg-gradient-to-b from-gray-900 to-gray-800
          shadow-xl
          transition-transform duration-300 ease-in-out

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-gray-700">

          <div>
            <h1 className="text-white text-lg font-bold">
              Shree Beauty
            </h1>

            <p className="text-xs text-gray-400">
              Admin Panel
            </p>
          </div>


          {/* Mobile Close */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-300 text-xl"
          >
            ✕
          </button>

        </div>


        {/* Sidebar Menu */}
        <Sidebar />

      </aside>



      {/* Main Area */}
      <div className="flex flex-col flex-1">


        {/* Navbar */}
        <header
          className="
          h-16
          bg-white
          border-b
          flex
          items-center
          justify-between
          px-4 md:px-6
          shadow-sm
          "
        >

          <div className="flex items-center gap-4">


            {/* Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />

              </svg>

            </button>



            <div>
              <h2 className="font-semibold text-gray-800 text-lg">
                Dashboard
              </h2>

              <p className="text-xs text-gray-500 hidden sm:block">
                Manage your beauty parlour
              </p>

            </div>


          </div>




          {/* Right Side */}
          <div className="flex items-center gap-4">


            {/* Search */}
            <div className="hidden md:block relative">

              <input
                type="text"
                placeholder="Search..."
                className="
                w-64
                rounded-xl
                border
                px-4
                py-2
                text-sm
                outline-none
                focus:ring-2
                focus:ring-pink-400
                "
              />

            </div>



            {/* Admin Profile */}
            <div
              className="
              flex
              items-center
              gap-2
              cursor-pointer
              "
            >

              <div
                className="
                w-10
                h-10
                rounded-full
                bg-pink-500
                text-white
                flex
                items-center
                justify-center
                font-bold
                "
              >
                A
              </div>


              <span className="hidden sm:block text-sm font-medium">
                Admin
              </span>


            </div>


          </div>


        </header>



        {/* Content */}
        <main
          className="
          flex-1
          overflow-y-auto
          p-4
          md:p-6
          "
        >

          <Outlet />

        </main>


      </div>


    </div>
  );
}

export default AdminLayout;