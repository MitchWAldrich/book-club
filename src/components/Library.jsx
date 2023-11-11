// import { useState } from "react";
// import PropTypes from 'prop-types';
import BookListItem from "./BookListItem";
import Nav from "./Nav";
import SingleBookItem from "./SingleBookItem";

import userContext from './../userContext';
// import instance from "../utils/axiosConfig";
// import { getUserById } from "../utils/selectors";

const Library = () => {
  // const { userObj } = props;
//   const [ user, setUser ] = useState(userObj ?? { 
//     id: 3,
//         email: 'user3@email.com',
//         password: 'password',
//         username: 'user3',
//         library: {
//             haveRead: [{
//                 title: 'title1',
//                 authors: [ 'John Smith', 'Julie Black' ],
//                 categories: [ 'Non-Fiction' ],
//                 averageRating: 5,
//                 description: 'A great book about things',
//                 imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
//                 pageCount: 234,
//                 publisher: 'Clearly'
//               },{
//                 title: 'title2',
//                 authors: [ 'Fred Smith', 'Julie Steinberg' ],
//                 categories: [ 'Fiction' ],
//                 averageRating: 4,
//                 description: 'A great book about stuff',
//                 imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
//                 pageCount: 154,
//                 publisher: 'Smithson'
//               },
//               {
//                 title: 'title3',
//                 authors: [ 'Fred Smith', 'Julie Steinberg' ],
//                 categories: [ 'Fiction' ],
//                 averageRating: 3,
//                 description: 'A great novel about stuff',
//                 imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
//                 pageCount: 200,
//                 publisher: 'Smithly'
//               }],
//               toRead: [{
//                 title: 'title4',
//                 authors: [ 'Whit Merrifield'],
//                 categories: [ 'Biography', 'Sports' ],
//                 averageRating: 5,
//                 description: 'A great book about Whit',
//                 imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
//                 pageCount: 234,
//                 publisher: 'Jays'
//               },
//               {
//                 title: 'title5',
//                 authors: [ 'Fred Smith Black', 'Julie Steinberg' ],
//                 categories: [ 'Fiction' ],
//                 averageRating: 4,
//                 description: 'A great book about stuff',
//                 imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
//                 pageCount: 34,
//                 publisher: 'New'
//               }]
//         }
// });


// const [ libraryUpdated, setLibraryUpdated ] = useState(false);

  // useEffect(() => {
  //   instance
  //     .get("http://localhost:4000/api/users")
  //     .then(function (response) {
  //       const usersResult = response.data.users;
  //       setUser(getUserById(usersResult, 3));
  //       console.log('user has been set');
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  //     .finally(function () {
  //       // always executed
  //     });
  // }, [libraryUpdated]);

// console.log('user', user)
  const sampleBook = {
    authors: ["Daniel Keyes"],
    categories: ["Fiction", "Non-Fiction"],
    averageRating: 4,
    description:
      "Mentally retarded Charlie Gordon participates in an experiment which turns him into a genius, but only temporarily.",
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=NRWlitmahXkC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      thumbnail:
        "http://books.google.com/books/content?id=NRWlitmahXkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    },
    language: "en",
    pageCount: 328,
    publisher: "Houghton Mifflin Harcourt",
    title: "Flowers for Algernon",
  };

  // const haveRead = [sampleBook, sampleBook, sampleBook];
  // const toRead = [sampleBook, sampleBook];

  return (
    <main>
      <userContext.Consumer>
      {({value}) => {
        <>
      <Nav user={value ?? "Guest"} />
      <div>
        <h2>To Read List</h2>
        {value?.library?.toRead.map((book, key) => (
          <BookListItem
            key={key}
            authors={book.authors}
            categories={book.categories}
            averageRating={book.averageRating}
            description={book.description}
            imageLinks={book.imageLinks}
            language={book.language}
            pageCount={book.pageCount}
            publisher={book.publisher}
            title={book.title}
          />
        )) ?? null}
        <h2>Books I've Read</h2>
        {value?.library?.haveRead.map((book, key) => (
          <BookListItem
            key={key}
            authors={book.author}
            categories={book.categories}
            averageRating={book.averageRating}
            description={book.description}
            imageLinks={book.imageLinks}
            language={book.language}
            pageCount={book.pageCount}
            publisher={book.publisher}
            title={book.title}
          />
        )) ?? null}
        <SingleBookItem
            // key={key}
            authors={sampleBook.authors}
            categories={sampleBook.categories}
            averageRating={sampleBook.averageRating}
            description={sampleBook.description}
            imageLinks={sampleBook.imageLinks}
            language={sampleBook.language}
            pageCount={sampleBook.pageCount}
            publisher={sampleBook.publisher}
            title={sampleBook.title}
            userId={3}
          />
      </div>
      </>
      }}
      </userContext.Consumer>
    </main>
  );
};

// Library.propTypes = {
//   userObj: PropTypes.object
// }

export default Library;
