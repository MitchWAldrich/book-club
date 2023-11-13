import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./components/Register";
import Library from "./components/Library";
import Login from "./components/Login";
import Home from "./components/Home";
import Replies from "./components/Replies";

import userContext from "./userContext";

import './App.scss';

function App() {
  const [ user, setUser ] = useState({ 
    id: 3,
        email: 'user3@email.com',
        password: 'password',
        username: 'user3',
        library: {
            haveRead: [{
                title: 'title1',
                authors: [ 'John Smith', 'Julie Black' ],
                categories: [ 'Non-Fiction' ],
                averageRating: 5,
                description: 'A great book about things',
                imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
                pageCount: 234,
                publisher: 'Clearly'
              },{
                title: 'title2',
                authors: [ 'Fred Smith', 'Julie Steinberg' ],
                categories: [ 'Fiction' ],
                averageRating: 4,
                description: 'A great book about stuff',
                imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
                pageCount: 154,
                publisher: 'Smithson'
              },
              {
                title: 'title3',
                authors: [ 'Fred Smith', 'Julie Steinberg' ],
                categories: [ 'Fiction' ],
                averageRating: 3,
                description: 'A great novel about stuff',
                imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
                pageCount: 200,
                publisher: 'Smithly'
              }],
              toRead: [{
                title: 'title4',
                authors: [ 'Whit Merrifield'],
                categories: [ 'Biography', 'Sports' ],
                averageRating: 5,
                description: 'A great book about Whit',
                imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
                pageCount: 234,
                publisher: 'Jays'
              },
              {
                title: 'title5',
                authors: [ 'Fred Smith Black', 'Julie Steinberg' ],
                categories: [ 'Fiction' ],
                averageRating: 4,
                description: 'A great book about stuff',
                imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
                pageCount: 34,
                publisher: 'New'
              }]
        }});

  return (
    <div>
      <userContext.Provider value={user}>
          <BrowserRouter>
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<Home userObj={user} />} />
                <Route path='/my-library' element={<Library userObj={user} />} />
                <Route path='/:id/replies' element={<Replies />} />
              </Routes>
          </BrowserRouter>
        </userContext.Provider>
    </div>
)
}

export default App

