
import Sidebar from "./components/sidebar/Sidebar"
import { useState } from "react";



function AdminLayout({children}:Readonly<{children:React.ReactNode}>){
  const [sidebarOpen, setSidebarOpen] = useState(false);
    return(
        <>
     <div className="flex h-screen bg-gray-100 overflow-hidden">

  {/* Overlay */}
  {sidebarOpen && (
    <div
      className="fixed inset-0 bg-black/50 z-40 md:hidden"
      onClick={() => setSidebarOpen(false)}
    ></div>
  )}

  {/* Sidebar */}
  <div
    className={`
      fixed md:static top-0 left-0 z-50
      h-full w-64 bg-gray-800
      transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
    `}
  >
    <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
      <span className="text-white font-bold text-sm">
        Shree Beauty Parlour
      </span>

      {/* Close button */}
      <button
        onClick={() => setSidebarOpen(false)}
        className="text-white md:hidden"
      >
        ✕
      </button>
    </div>

    <Sidebar />
  </div>

  {/* Main Content */}
  <div className="flex flex-col flex-1 overflow-y-auto">

    {/* Header */}
    <div className="flex items-center justify-between h-16 bg-white border-b px-4">

      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
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

        {/* Desktop Menu */}
        <button className="hidden md:block text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
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

        <input
          type="text"
          placeholder="Search..."
          className="hidden sm:block border rounded-lg px-4 py-2 w-64"
        />
      </div>

      <button className="text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l-7-7 7-7m5 14l7-7-7-7"
          />
        </svg>
      </button>
    </div>

    {/* Page */}
    <div className="p-4 md:p-6">
      {children}
    </div>

  </div>
</div>

        </>
    )
}

export default AdminLayout