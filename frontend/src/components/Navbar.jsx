import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import logoImg from "../assets/Samagi-icon-dark.png";

const Navbar = () => {
    const { isAuthenticated, user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <img src={logoImg} alt="Logo" className="h-10 w-auto" />
                        <div className="flex flex-col items-start leading-none">
                            <span className="brand-title">Samagi</span>
                            <span className="brand-subtitle">Enterprises</span>
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <ul className="hidden lg:flex items-center gap-6 list-none m-0 p-0">
                        <li>
                            <Link className="nav-hover-link font-medium text-sm" to="/">Home</Link>
                        </li>
                        <li>
                            <a className="nav-hover-link font-medium text-sm" href="#collection">Collection</a>
                        </li>
                        <li>
                            <a className="nav-hover-link font-medium text-sm" href="#reviews">Reviews</a>
                        </li>
                        <li>
                            <a className="nav-hover-link font-medium text-sm" href="#about">About</a>
                        </li>
                        <li>
                            <a className="nav-hover-link font-medium text-sm" href="#contact">Contact</a>
                        </li>
                    </ul>

                    {/* Desktop Auth Section */}
                    <div className="hidden lg:flex items-center">
                        {isAuthenticated ? (
                            <Link
                                to="/dashboard"
                                className="nav-hover-link flex items-center gap-2 font-medium text-sm text-black no-underline"
                            >
                               <div className="flex items-center gap-2">
                            {/* Initial Logo */}
                            <div
                                className="bg-black text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                                style={{ width: "30px", height: "30px" }}
                            >
                                {user?.first_name?.[0]}
                                {user?.last_name?.[0]}
                            </div>

                            {/* User Name */}
                            <span className="font-medium">
                                {user?.first_name} {user?.last_name}
                                
                            </span>
                            </div>
                            </Link>
                        ) : (
                            <Button to="/login">Sign In</Button>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation"
                    >
                        {menuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-3">
                    <Link className="nav-hover-link font-medium text-sm" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <a className="nav-hover-link font-medium text-sm" href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
                    <a className="nav-hover-link font-medium text-sm" href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
                    <a className="nav-hover-link font-medium text-sm" href="#about" onClick={() => setMenuOpen(false)}>About</a>
                    <a className="nav-hover-link font-medium text-sm" href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
                    <div className="pt-2 border-t border-gray-100">
                        {isAuthenticated ? (
                            <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-black no-underline" onClick={() => setMenuOpen(false)}>
                                <div className="bg-black text-white rounded-full flex items-center justify-center font-bold text-xs" style={{ width: "28px", height: "28px" }}>
                                    {user?.first_name?.[0]}{user?.last_name?.[0]}
                                </div>
                                <span>{user?.first_name} {user?.last_name}</span>
                            </Link>
                        ) : (
                            <Button to="/login" onClick={() => setMenuOpen(false)}>Sign In</Button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
