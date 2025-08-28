import React from "react";
import { assets, menuLinks } from "@/assets/assets";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "../ui/sheet";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const location = useLocation();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search logic here, e.g., navigate or filter
    console.log("Searching for:", searchTerm);
  };

  return (
    <header className={`${location.pathname === "/" ? "bg-blue-100 shadow-sm w-full" : " w-full"} `}>
      <div className="flex items-center justify-between w-full pt-5 pb-5 px-4 md:px-8 mx-auto ">
        <div>
          <Link to="/"><img src={assets.logo} alt="Logo" className="h-8 w-auto" /></Link>
        </div>

        <div className="hidden lg:flex  items-center gap-8">
          <nav className="flex items-center gap-4">
            {menuLinks?.map((menuItem) => (
              <Link to={menuItem.path} className="text-[17px]" key={menuItem.name}>
                {menuItem.name}
              </Link>
            ))}
          </nav>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center border border-gray-300 bg-white rounded-2xl px-2"
          >
            <input
              type="text"
              placeholder="Search cars"
              value={searchTerm}
              onChange={handleSearchChange}
              className="outline-none px-2 py-1"
            />
            <button type="submit">
              <img src={assets.search_icon} alt="Search" />
            </button>
          </form>
        </div>

        <div className="hidden lg:flex items-center text-[17px] gap-4">
          <Link to={"/list-car"}>List Car</Link>
          <Button className="bg-blue-600 text-white">Sign Up</Button>
        </div>

        {/* mobile view menu */}
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger>
              <img src={assets.menu_icon} alt="menu_icon" />
            </SheetTrigger>
            <SheetContent side="left" className="p-4 pl-5 bg-cyan-50 text-lg">
              <SheetHeader>
                <SheetTitle>
                  <img src={assets.logo} alt="Logo" className="-pl-3 h-8 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                {menuLinks?.map((menuItem) => (
                  <Link
                    to={menuItem.path}
                    key={menuItem.name}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {menuItem.name}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center gap-2">
                <span className="text-gray-700 hover:text-blue-600">
                  Search
                </span>
              </div>
              <Link className=" text-gray-700 hover:text-blue-600">
                List Car
              </Link>
              <Button className="bg-blue-600 text-white mt-2 w-full">
                Sign Up
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <hr className="text-gray-300"/>
    </header>
  );
};

export default Navbar;
