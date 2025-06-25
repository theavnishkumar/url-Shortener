import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router";
import {
  Code,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  UserCircle,
  LinkIcon,
  LayoutDashboard,
  Link2,
  Eye,
  ChartSpline,
  Mail,
  Scale,
} from "lucide-react";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // this will close the profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (isProfileOpen && !target.closest("[data-profile-menu]")) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  //this will prevent body scroll when drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-2 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <LinkIcon className="h-6 w-6 text-gray-700 " />
              <span className="text-xl font-bold text-gray-900 ">
                URL Shortener
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {(user ? navMenu.slice(0, 4) : navMenu.slice(7)).map((item) => (
                <NavLink
                  to={item.link}
                  key={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-700 font-medium underline underline-offset-4 hover:text-indigo-900"
                      : "text-gray-600 font-medium hover:text-gray-900"
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Profile Dropdown*/}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative hidden md:flex" data-profile-menu>
                  <button
                    onClick={toggleProfile}
                    className="flex items-center space-x-2 focus:outline-none"
                    aria-expanded={isProfileOpen}
                    aria-haspopup="true"
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {user.avatar ? (
                        <img
                          src={
                            // user.avatar ||
                            `https://ui-avatars.com/api/?name=${user.name}`
                          }
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserCircle className="h-8 w-8 text-gray-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700  hidden md:inline-block">
                      {user.name.split(" ")[0]}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-500 hidden md:inline-block" />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-10 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-gray-300 ring-opacity-5 focus:outline-none z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 ">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/contact"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Mail className="mr-3 h-4 w-4 text-gray-500" />
                        Contact
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="mr-3 h-4 w-4 text-gray-500" />
                        Your Profile
                      </Link>
                      <Link
                        to="/privacy"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <MdOutlinePrivacyTip className="mr-3 h-4 w-4 text-gray-500" />
                        Privacy
                      </Link>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                        }}
                      >
                        <LogOut className="mr-3 h-4 w-4 text-gray-500 cursor-pointer" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <LoginSignup />
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="text-gray-800 hover:text-gray-900 focus:outline-none md:hidden mr-3"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                <Menu className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-70" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <LinkIcon className="h-6 w-6 text-gray-700 " />
            <span className="text-xl font-bold text-gray-900 ">
              URL Shortener
            </span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-800 hover:text-gray-900 focus:outline-none mr-2"
            aria-label="Close menu"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        {user && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img
                    // src={user.avatar}
                    src={`https://ui-avatars.com/api/?name=${user.name}`}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserCircle className="h-10 w-10 text-gray-500" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 ">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="p-4">
          <ul className="space-y-1">
            {(user ? navMenu.slice(0, 4) : navMenu.slice(7)).map((item) => (
              <li key={item.link}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center py-2 text-indigo-700 underline underline-offset-4 hover:text-indigo-900 font-medium"
                      : "flex items-center py-2 text-gray-700 hover:text-gray-900 font-medium"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {user ? (
            <div className="mt-6 pt-6 border-t border-gray-200 ">
              <ul className="space-y-4">
                {navMenu.slice(4, 7).map((item) => (
                  <li key={item.link}>
                    <NavLink
                      to={item.link}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center py-2 text-indigo-700  hover:text-indigo-900 font-medium"
                          : "flex items-center py-2 text-gray-700  hover:text-gray-900 font-medium"
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <button
                    className="flex items-center w-full py-2 text-gray-700  hover:text-gray-900 font-medium text-left cursor-pointer"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
              <Link
                to="/login"
                className="block w-full py-2 px-4 text-center text-gray-700  border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="block w-full py-2 px-4 text-center bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
export const LoginSignup = () => {
  return (
    <div className="hidden md:flex items-center gap-3">
  <Link
    to="/login"
    className="px-4 py-2 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300"
  >
    Log in
  </Link>
  <Link
    to="/signup"
    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    Sign up
  </Link>
</div>
  );
};

const navMenu = [
  {
    name: "Dashboard",
    link: "/",
    icon: <LayoutDashboard className="mr-3 h-5 w-5" />,
  },
  {
    name: "Create Links",
    link: "/create",
    icon: <Link2 className="mr-3 h-5 w-5" />,
  },
  {
    name: "View Links",
    link: "/view",
    icon: <Eye className="mr-3 h-5 w-5" />,
  },
  {
    name: "Analytics",
    link: "/analytics",
    icon: <ChartSpline className="mr-3 h-5 w-5" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <Mail className="mr-3 h-5 w-5" />,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: <User className="mr-3 h-5 w-5" />,
  },
  {
    name: "Privacy",
    link: "/privacy",
    icon: <MdOutlinePrivacyTip className="mr-3 h-5 w-5" />,
  },
  {
    name: "Home",
    link: "/",
    icon: <User className="mr-3 h-5 w-5" />,
  },
  {
    name: "About",
    link: "/about",
    icon: <User className="mr-3 h-5 w-5" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <Mail className="mr-3 h-5 w-5" />,
  },
  {
    name: "Legal",
    link: "/legal",
    icon: <Scale className="mr-3 h-5 w-5" />,
  },
];
