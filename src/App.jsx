import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import BookClub from "./components/BookClub";
import Library from "./components/Library";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Replies from "./components/Replies";

import userContext from "./userContext";
import { userMock } from "./mocks/users";

import "./App.scss";

function App() {
  const [user, setUser] = useState(userMock);

  return (
    <div>
      <userContext.Provider value={user}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Home userObj={user} />} />
            <Route path='/my-library' element={<Library userObj={user} />} />
            <Route path='/bookclubs' element={<BookClub userObj={user} />} />
            <Route path='/:id/replies' element={<Replies />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
