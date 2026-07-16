import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  CreditCard,
  FolderOpen,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={22} />,
    },
    {
      name: "Products",
      path: "/admin/product",
      icon: <Package size={22} />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users size={22} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <ShoppingBag size={22} />,
    },
    {
      name: "Payments",
      path: "/admin/payments",
      icon: <CreditCard size={22} />,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <FolderOpen size={22} />,
    },
  ];

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-5 left-5 z-50 md:hidden bg-pink-600 p-2 rounded-xl text-white shadow-xl"
      >
        <Menu />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:static top-0 left-0
        h-screen
        w-72
        bg-gradient-to-b
        from-pink-500
        via-pink-600
        to-purple-700
        text-white
        shadow-2xl
        z-50
        transform
        transition-all
        duration-300
        ${
          open ? "translate-x-0" : "-translate-x-full"
        }
        md:translate-x-0
      `}
      >
        <div className="flex justify-between items-center p-6 border-b border-pink-300/30">
          <div>
            <h1 className="text-2xl font-bold">
              💄 Shree Beauty
            </h1>

            <p className="text-pink-100 text-sm">
              Admin Dashboard
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden"
          >
            <X />
          </button>
        </div>

        <nav className="mt-8 px-4">

          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl mb-3 transition-all duration-300

              ${
                location.pathname === menu.path
                  ? "bg-white text-pink-600 shadow-xl scale-105"
                  : "hover:bg-white/20 hover:translate-x-2"
              }`}
            >
              {menu.icon}

              <span className="font-medium">
                {menu.name}
              </span>
            </Link>
          ))}

        </nav>

        <div className="absolute bottom-5 w-full px-5">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
              className="w-16 h-16 rounded-full mx-auto mb-3"
            />

            <h2 className="font-semibold">
              Beauty Parlour
            </h2>

            <p className="text-sm text-pink-100">
              Admin Panel
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar