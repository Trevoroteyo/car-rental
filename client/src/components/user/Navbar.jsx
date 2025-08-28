import React, { useState, useContext } from "react";
import { assets, menuLinks } from "@/assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "../ui/sheet";
import { AuthContext } from "@/context/AuthContext";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";
import BecomeOwner from "./BecomeOwner";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    setShowSignUp,
    setShowSignIn,
    showSignUp,
    showSignIn,
    auth,
    logOut,
    showBecomeOwner,
    setShowBecomeOwner,
  } = useContext(AuthContext);

  async function handleBecomeOwner() {
    if (
      Array.isArray(auth?.user?.roles) &&
      auth.user.roles.length === 1 &&
      auth.user.roles[0] === "user"
    ) {
      setShowBecomeOwner(true);
    } else if (auth.user.roles.includes("owner")) {
      navigate("/owner");
    }
  }
  console.log(auth?.user?.roles, "roles");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <header
      className={`${
        location.pathname === "/"
          ? "bg-blue-100 shadow-sm w-full"
          : "shadow-sm w-full"
      }`}
    >
      <div className="flex items-center justify-between w-full pt-5 pb-5 px-4 md:px-8 mx-auto ">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex  items-center gap-8">
          <nav className="flex items-center gap-4">
            {menuLinks?.map((menuItem) => (
              <Link
                key={menuItem.name}
                to={menuItem.path}
                className="text-[17px]"
              >
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
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none px-2 py-1"
            />
            <button type="submit">
              <img src={assets.search_icon} alt="Search" />
            </button>
          </form>
        </div>

        <div className="hidden lg:flex items-center text-[17px] gap-4">
          {auth?.authenticated ? (
            <div className="flex flex-row items-center gap-4">
              <div onClick={handleBecomeOwner}>List Car</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <p className="text-white bg-blue-600 rounded-full px-3 py-1 flex text-center cursor-pointer">
                    {auth.user?.name?.charAt(0).toUpperCase()}{" "}
                  </p>
                </DropdownMenuTrigger>
                <UserProfile handleLogout={logOut} />
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex flex-row gap-4 items-center">
              <Button
                className="bg-blue-600 text-white"
                onClick={() => {
                  setShowSignIn(true);
                  setShowSignUp(false);
                }}
              >
                Log In
              </Button>
              <Button
                className="bg-blue-600 text-white"
                onClick={() => {
                  setShowSignUp(true);
                  setShowSignIn(false);
                }}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* mobile view menu */}
        <div className="flex lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <img src={assets.menu_icon} alt="menu_icon" />
            </SheetTrigger>
            <SheetContent side="left" className="p-4 pl-5 bg-cyan-50 text-lg">
              <SheetHeader>
                <SheetTitle>
                  <img
                    src={assets.logo}
                    alt="Logo"
                    className="-pl-3 h-8 w-auto"
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                {menuLinks?.map((menuItem) => (
                  <button
                    key={menuItem.name}
                    onClick={() => handleNavClick(menuItem.path)}
                    className="text-left text-gray-700 hover:text-blue-600"
                  >
                    {menuItem.name}
                  </button>
                ))}
                {auth?.authenticated ? (
                  <div className="flex flex-col items-start gap-4">
                    <div onClick={handleBecomeOwner} className="text-gray-700">
                      List Car
                    </div>
                    <p className="text-white bg-blue-600 rounded-full px-3 py-1 flex text-center cursor-pointer">
                      {auth.user?.name?.charAt(0).toUpperCase()}
                    </p>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setShowSignIn(true);
                        setShowSignUp(false);
                        setOpen(false);
                      }}
                      className="bg-blue-600 text-white mt-2 w-full"
                    >
                      Sign In
                    </button>

                    <button
                      onClick={() => {
                        setShowSignUp(true);
                        setShowSignIn(false);
                        setOpen(false);
                      }}
                      className="bg-blue-600 text-white mt-2 w-full"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <hr className="text-gray-300" />
      <SignUp open={showSignUp} setOpen={setShowSignUp} />
      <SignIn open={showSignIn} setOpen={setShowSignIn} />
      <BecomeOwner
        open={showBecomeOwner}
        setOpen={setShowBecomeOwner}
        userId={auth?.user?.userId}
      />
    </header>
  );
};

export default Navbar;
