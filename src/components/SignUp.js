import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await signup(username, email, password);
      localStorage.setItem("token", token);
      navigate("/admin");
    } catch (error) {
      console.error("Sign up failed:", error);
      setAlertMessage("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100"
      >
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
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
          <label className="block mb-2 text-sm">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Sign Up
        </button>
        <div className="text-center mt-4">
          <span className="text-sm">Already have an account? </span>
          <Link to="/" className="text-blue-500">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
