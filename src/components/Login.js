import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(username, password);
      localStorage.setItem("token", token);
      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error);
      setAlertMessage("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {alertMessage && (
          <div className="bg-red-500 text-white p-2 rounded">
            {alertMessage}
          </div>
        )}
        <div>
          <label className="block mb-2 text-sm">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full px-3 py-2 text-white bg-blue-500 rounded-md"
        >
          Login
        </button>
        <div className="text-center mt-4">
          <span className="text-sm">No account yet? </span>
          <Link to="/signup" className="text-blue-500">
            Sign up here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
