import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://watchnest.onrender.com/api/login`,
        data
      );
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex justify-around ">
      <div className="flex-6">
        <div className="bg-blue-700 h-">
          <h1>LOGO</h1>
        </div>
      </div>
      <div className="flex-6">
        <h1>Admin Login</h1>
        <form action="" className="form_container" onSubmit={handleSubmit}>
          <h1>Login to Your Account</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className="input"
          />
          <button type="submit" className="green_btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
