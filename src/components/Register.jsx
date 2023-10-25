import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)

    const navigate = useNavigate();

    const signUp = () => {
        fetch("http://localhost:4000/api/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                username,
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
                    alert("Account created successfully!");
                    navigate(("/dashboard"));
                }
                console.log(data);
            })
            .catch((err) => console.error(err));
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ username, email, password });
        if (!email.trim()) {
            setError(true)
        } else {
            setError(false)
        }
        if (!password.trim()) {
            setError(true)
        } else {
            setError(false)
        }
        if (!username.trim()) {
            setError(true)
        } else {
            setError(false)
        }
        signUp();
        setEmail("");
        setUsername("");
        setPassword("");
    };
    return (
        <div className='container'>
        <div className='form'>
            <h1 className='registerTitle'>Create an account</h1>
            <form className='register-form' onSubmit={handleSubmit}>
                <Input
                    type="text"
                    label="Username"
                    value={username}
                    name="username"
                    error={error}
                    onChange={handleUsernameChange}
                    placeholder="Please enter your username"
                />
                <Input
                    type="email"
                    label="Email Address"
                    value={email}
                    name="email"
                    error={error}
                    onChange={handleEmailChange}
                    placeholder="Please enter your e-mail address"
                />
                <Input
                    type="password"
                    label="Password"
                    value={password}
                    name="password"
                    error={error}
                    onChange={handlePasswordChange}
                    placeholder="Please enter your password"
                />
                <button className='btn' onClick={signUp}>REGISTER</button>
                <p className='message'>
                    Have an account? <Link to='/'>Sign in</Link>
                </p>
            </form>
        </div>
        </div>
    );
};

export default Register;