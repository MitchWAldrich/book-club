import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const loginUser = () => {
    fetch("http://localhost:4000/api/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error_message) {
          alert(data.error_message);
        } else {
          alert(data.message);
          console.log("data", data);
          navigate("/dashboard");
          localStorage.setItem("_id", data.id);
        }
      })
      .catch((err) => console.error(err));
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    if (!email.trim()) {
      setError(true);
    } else {
      setError(false);
    }
    if (!password.trim()) {
      setError(true);
    } else {
      setError(false);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className='container'>
      <div className='form'>
        <h1 className='loginTitle'>Log into your account</h1>
        <form className='login-form' onSubmit={handleSubmit}>
          <Input
            type='email'
            label='Email Address'
            value={email}
            name='email'
            error={error}
            onChange={handleEmailChange}
            placeholder='Please enter your e-mail address'
          />
          <Input
            type='password'
            label='Password'
            value={password}
            name='password'
            error={error}
            onChange={handlePasswordChange}
            placeholder='Please enter your password'
          />
          <button className='btn' onClick={loginUser}>
            SIGN IN
          </button>
          <p className='message'>
            Don't have an account? <Link to='/register'>Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
