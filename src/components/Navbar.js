import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/admin" className="hover:underline">
            Admin Portal
          </Link>
          <Link to="/chatbot" className="hover:underline">
            Chatbot Preview
          </Link>
        </div>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-2 rounded">
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
