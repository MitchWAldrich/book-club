import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Library from "./components/Library";
import Login from "./components/Login";
import Home from "./components/Home";
import Replies from "./components/Replies";
import './App.scss';

function App() {

  return (
    <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/dashboard' element={<Home />} />
                    <Route path='/my-library' element={<Library />} />
                    <Route path='/:id/replies' element={<Replies />} />
                </Routes>
            </BrowserRouter>
        </div>
);
}

export default App
