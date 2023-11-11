// import { useEffect, useState } from "react";
import { useState } from "react";
// import PropTypes from 'prop-types';
import Goal from "./Goal";
import Nav from "./Nav";
import SearchBar from "./Searchbar";
import userContext from "../userContext";
// import instance from "../utils/axiosConfig";
// import { getUserById } from "../utils/selectors";

const Home = () => {
    // const { userObj } = props;
    // const [user, setUser] = useState(userObj);

    // useEffect(() => {
    //     instance.get('http://localhost:4000/api/users')
    //         .then(function (response) {
    //             const usersResult = response.data.users;
    //             setUser(getUserById(usersResult, 1));
    //             // console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    //         .finally(function () {
    //             // always executed
    //         }); 
    // }, []);

    const [club, setClub] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ club });
        setClub("");
    };

    return (
        <userContext.Consumer>
        {({value}) => {
            <>
            <Nav user={value} />
            {/* <Nav user={{ 
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
            }} || {}} /> */}
            <Goal />
            <SearchBar />
            <main className='container'>
                <h2 className='homeTitle'>Create a Book Club</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='thread'>Title</label>
                        <input
                            type='text'
                            name='thread'
                            required
                            value={club}
                            onChange={(e) => setClub(e.target.value)}
                        />
                    </div>
                    <button className='btn'>CREATE CLUB</button>
                </form>
            </main>
            </>
      }}
      </userContext.Consumer>
    );
};

// Home.propTypes = {
//     userObj: PropTypes.object
// }

export default Home;
