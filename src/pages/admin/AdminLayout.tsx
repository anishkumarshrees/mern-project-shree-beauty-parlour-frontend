import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-gray-100">


      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="
          fixed inset-0
          z-40
          bg-black/50
          backdrop-blur-sm
          md:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />
      )}



      {/* Sidebar */}
      <aside
        className={`
        fixed md:static
        z-50
        top-0 left-0
        h-full
        w-64
        bg-[#111827]
        shadow-xl
        transition-transform
        duration-300
        ease-in-out
        flex
        flex-col

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
          h-20
          px-6
          flex
          items-center
          justify-between
          border-b
          border-gray-700
          "
        >

          <div>

            <h1
              className="
              text-white
              text-2xl
              font-bold
              tracking-wide
              "
            >
              Shree Beauty
            </h1>


            <p
              className="
              text-gray-400
              text-xs
              mt-1
              "
            >
              Admin Dashboard
            </p>

          </div>



          {/* Close button mobile */}
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



        {/* Sidebar Links */}
        <div
          className="
          flex-1
          overflow-y-auto
          py-4
          "
        >
          <Sidebar />
        </div>


      </aside>





      {/* Main Content */}
      <div
        className="
        flex-1
        flex
        flex-col
        min-w-0
        "
      >




        {/* Top Navbar */}
        <header
          className="
          h-20
          bg-white
          border-b
          shadow-sm
          flex
          items-center
          justify-between
          px-4
          md:px-8
          "
        >



          {/* Left */}
          <div
            className="
            flex
            items-center
            gap-4
            "
          >


            {/* Hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="
              md:hidden
              p-2
              rounded-lg
              hover:bg-gray-100
              "
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

              <h2
                className="
                text-xl
                font-bold
                text-gray-900
                "
              >
                Dashboard
              </h2>


              <p
                className="
                text-sm
                text-gray-500
                hidden sm:block
                "
              >
                Manage your beauty parlour
              </p>

            </div>


          </div>





          {/* Right */}
          <div
            className="
            flex
            items-center
            gap-4
            "
          >



            {/* Search */}
            <div className="hidden lg:block">

              <input
                type="text"
                placeholder="Search..."
                className="
                w-72
                rounded-xl
                border
                border-gray-300
                px-5
                py-3
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
              gap-3
              "
            >

              <div
                className="
                h-11
                w-11
                rounded-full
                bg-pink-500
                text-white
                flex
                items-center
                justify-center
                font-bold
                text-lg
                "
              >
                A
              </div>



              <div className="hidden sm:block">

                <p
                  className="
                  text-sm
                  font-semibold
                  text-gray-800
                  "
                >
                  Admin
                </p>


                <p
                  className="
                  text-xs
                  text-gray-500
                  "
                >
                  Manager
                </p>


              </div>


            </div>


          </div>



        </header>






        {/* Page */}
        <main
          className="
          flex-1
          overflow-y-auto
          bg-gray-50
          p-4
          md:p-8
          "
        >

          <Outlet />

        </main>



      </div>


    </div>
  );
}

export default AdminLayout;