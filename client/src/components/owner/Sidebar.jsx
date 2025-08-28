import React from "react";
import { assets, ownerMenuLinks } from "@/assets/assets";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="flex flex-col md:w-64 w-16 bg-white border-r border-gray-200 min-h-screen">
      {/* Profile */}
      <div className="flex flex-col items-center py-6 ">
        <img
          src={assets.user_profile}
          className="sm:h-14 sm:w-14 h-10 w-10 object-cover rounded-full"
          alt="User Profile"
        />
        <p className="mt-2 font-semibold sm:flex hidden text-gray-800">Richard Sanford</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col py-4 gap-0.5 pl-0 ml-1">
        {ownerMenuLinks.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2 transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium border-r-5 rounded-l-lg border-blue-500"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:rounded hover:shadow-sm"
                }`}
            >
              <img
                src={link.icon}
                alt={link.name}
                className={`sm:h-5 sm:w-5 h-7 w-7 ${isActive ? "filter-blue" : ""}`}
              />
              <span className="hidden md:flex">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
