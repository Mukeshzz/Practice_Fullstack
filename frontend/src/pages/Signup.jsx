import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:8000/api/v1/todo/signup",
      user
    );

    if (res.data.success) {
      alert(res.data.message);
    }
    alert("User registered successfully!!!!");
    setUser({
      name: "",
      email: "",
      password: "",
    });
    navigate("/");
  };

  return (
    <div>
      <h1>Signup</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <label htmlFor="">Email</label>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <label htmlFor="">Password</label>
        <input
          type={show ? "text" : "password"}
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="button" onClick={() => setShow(!show)}>
          {show ? <Eye /> : <EyeOff />}
        </button>
        <label htmlFor="">Confirm Password</label>
        <input
          type="password"
          name="confirm_password"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      <Link to="/">Alerady have an account. Login Here.</Link>
    </div>
  );
};

export default Signup;
