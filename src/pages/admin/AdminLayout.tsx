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
          className="
          fixed inset-0
          bg-black/50
          backdrop-blur-sm
          z-40
          md:hidden
          "
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
          shrink-0
          bg-gradient-to-b from-gray-950 to-gray-800
          shadow-xl
          transition-transform duration-300 ease-in-out

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* Logo */}
        <div
          className="
          h-16
          flex
          items-center
          justify-between
          px-5
          border-b
          border-gray-700
          "
        >

          <div>
            <h1 className="text-white text-lg font-bold">
              Shree Beauty
            </h1>

            <p className="text-xs text-gray-400">
              Admin Panel
            </p>
          </div>


          <button
            onClick={() => setSidebarOpen(false)}
            className="
            md:hidden
            text-gray-300
            text-xl
            "
          >
            ✕
          </button>

        </div>


        {/* Sidebar */}
        <div className="h-[calc(100dvh-64px)] overflow-y-auto">
          <Sidebar />
        </div>


      </aside>



      {/* Right Section */}
      <div className="flex flex-col flex-1 min-w-0">


        {/* Navbar */}
        <header
          className="
          h-16
          bg-white
          border-b
          flex
          items-center
          justify-between
          px-4
          md:px-6
          shadow-sm
          "
        >


          <div className="flex items-center gap-4">


            {/* Mobile Menu */}
            <button
              className="
              md:hidden
              p-2
              rounded-lg
              hover:bg-gray-100
              "
              onClick={() => setSidebarOpen(true)}
            >

              <svg
                className="w-7 h-7 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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



          {/* Right */}
          <div className="flex items-center gap-3">


            {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              className="
              hidden
              lg:block
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



            {/* Profile */}
            <div
              className="
              flex
              items-center
              gap-2
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



        {/* Page Content */}
        <main
          className="
          flex-1
          overflow-y-auto
          p-3
          sm:p-4
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