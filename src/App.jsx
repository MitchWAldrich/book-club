// import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import BookClubMain from "./components/BookClubMain";
import BookClubs from "./components/BookClubs";
import Library from "./components/Library";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Replies from "./components/Replies";

import userContext from "./userContext";
import { userMock2 } from "./mocks/users";

import "./App.scss";
import { bookClubMock } from "./mocks/bookClubs";

function App() {
  const user = userMock2;
  const bookClub = bookClubMock;

  /* Implement Login
  const [user, setUser] = useState({});
  const [bookClub, setBookClub] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setUser(userMock2);
    setBookClub(bookClubMock);
  }, [loggedIn]);
*/

  return (
    <div>
      <userContext.Provider value={user}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Home userObj={user} />} />
            <Route path='/my-library' element={<Library userObj={user} />} />
            <Route path='/bookclubs' element={<BookClubs userObj={user} />} />
            <Route
              path='/bookclubs/:id'
              element={<BookClubMain bookClubObj={bookClub} />}
            />
            <Route path='/:id/replies' element={<Replies />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
