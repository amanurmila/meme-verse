import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-transform duration-300 hover:scale-110 hover:shadow-lg px-4 py-2 rounded-md ${
              isActive
                ? "bg-cyan-600 text-white"
                : " text-cyan-600 border border-cyan-600"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `transition-transform duration-300 hover:scale-110 hover:shadow-lg px-4 py-2 rounded-md ${
              isActive
                ? "bg-cyan-500 text-white"
                : " text-cyan-600 border border-cyan-600"
            }`
          }
        >
          Explore
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/Upload"
              className={({ isActive }) =>
                `transition-transform duration-300 hover:scale-110 hover:shadow-lg px-4 py-2 rounded-md ${
                  isActive
                    ? "bg-cyan-600 text-white"
                    : " text-cyan-500 border border-cyan-500"
                }`
              }
            >
              Upload
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/userDashboard"
              className={({ isActive }) =>
                `transition-transform duration-300 hover:scale-110 hover:shadow-lg px-4 py-2 rounded-md ${
                  isActive
                    ? "bg-cyan-600 text-white"
                    : " text-cyan-500 border border-cyan-500"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div>
      <div className="navbar flex bg-base-100 px-10 shadow-md">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu px-6 gap-4 menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              {navOptions}
            </ul>
          </div>

          {/* Logo with Fancy Border */}
          <Link to="/" className="relative flex items-center justify-center">
            <div className="p-1 border-2 border-gray-500 rounded-full">
              <div>
                <img
                  className="w-12 h-12 rounded-full object-cover transition-transform duration-300 hover:scale-110 shadow-lg"
                  src={logo}
                  alt="Logo"
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">{navOptions}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {user ? (
            <button
              onClick={() => {
                toast.success("Logged out successfully!");
                logOut();
              }}
              className="btn btn-outline"
            >
              LogOut
            </button>
          ) : (
            <Link
              to="/login"
              className="btn font-bold bg-gradient-to-br from-purple-600 to-cyan-600 hover:bg-gradient-to-bl hover:from-cyan-600 hover:to-purple-600 transition-transform duration-300 hover:scale-110"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Navbar;
