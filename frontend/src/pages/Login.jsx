import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/todo/me", {
          withCredentials: true,
        });

        if (res.data.user) {
          navigate("/homepage");
        }
        dispatch(login(res.data.user));
      } catch (error) {
        dispatch(login());
      }
    };
    checkAuth();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      alert("Please fill email and password");
      return;
    }
    const res = await axios.post(
      "http://localhost:8000/api/v1/todo/login",
      data,
      { withCredentials: true }
    );

    if (res.data.success) {
      alert(res.data.message);
    }

    dispatch(login(res.data.user));
    navigate("/homepage");
  };

  return (
    <div>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <hr />
        <label htmlFor="">Email</label>
        <input
          type="text"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <label htmlFor="">Passsword</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>

      </form>
      <Link to="/signup">Don't have accound? Register here.</Link>
    </div>
  );
};

export default Login;
