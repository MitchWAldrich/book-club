// import React from "react";
// import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Replies from "./components/Replies";
import './App.scss';

function App() {
  // Axios({
  //   method: "GET",
  //   url: "http://localhost:4000/",
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // }).then(res => {
  //   console.log(res.data.message);
  // });
  // const baseURL = "http://localhost:5173/";

  // React.useEffect(() => {
  //   axios.get(baseURL).then((response) => {
  //     //
  //   });
  // }, []);

  return (
    <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/dashboard' element={<Home />} />
                    <Route path='/:id/replies' element={<Replies />} />
                </Routes>
            </BrowserRouter>
        </div>
);
}

export default App
