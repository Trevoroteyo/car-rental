import React from "react";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import { assets } from "@/assets/assets";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-gray-200 py-10 px-4">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
                <div className="flex flex-col gap-4 md:w-1/3">
                    <img src={assets.logo} alt="logo" className="w-32 mb-2" />
                    <p className="text-sm text-gray-400">
                        Premium car rental service with a wide selection of luxury and
                        everyday vehicles for all your driving needs
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3">
                    <div className="flex flex-col gap-2">
                        <Label className="text-gray-100 font-semibold mb-2">QUICK LINKS</Label>
                        <Link to="/" className="hover:underline">Home</Link>
                        <Link to="/browse" className="hover:underline">Browse Cars</Link>
                        <Link to="/list" className="hover:underline">List Your Car</Link>
                        <Link to="/about" className="hover:underline">About us</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-gray-100 font-semibold mb-2">RESOURCES</Label>
                        <Link to="/help" className="hover:underline">Help Center</Link>
                        <Link to="/terms" className="hover:underline">Terms of Service</Link>
                        <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                        <Link to="/insurance" className="hover:underline">Insurance</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-gray-100 font-semibold mb-2">1234 Luxury</Label>
                        <span>Home</span>
                        <span>Browse Cars</span>
                        <span>List Your Car</span>
                        <a href="mailto:nascars@gmail.com" className="hover:underline">nascars@gmail.com</a>
                    </div>
                </div>
            </div>
            <hr className="my-8 border-gray-700" />
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-2">
                <span>&copy; 2025 CarRental. All rights reserved.</span>
                <div className="flex gap-4">
                    <Link to="/terms" className="hover:underline">Terms</Link>
                    <Link to="/privacy" className="hover:underline">Privacy</Link>
                    <Link to="/cookies" className="hover:underline">Cookies</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
