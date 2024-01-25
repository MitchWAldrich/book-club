import { useState } from "react";

import PropTypes from "prop-types";

import BookListItem from "./BookListItem";
import SingleBookItem from "./SingleBookItem";
import BookSearch from "./BookSearch";

const Library = (props) => {
  const { userObj } = props;

  const [book, setBook] = useState(userObj?.library.currentBook);

  const getChosenSearchResults = (searchValue) => {
    setBook(searchValue);
  };

  return (
    <main>
      <div>
        <h2>What I'm Reading</h2>
        <SingleBookItem
          bookObj={book}
          userId={userObj.userId}
          location={"expanded"}
          isBookInLibrary={true}
        />
        <h2>Change Book?</h2>
        <BookSearch
          userId={userObj.userId}
          valueCallback={getChosenSearchResults}
        />
        <h2>To Read List</h2>
        {userObj?.library?.toRead.map((book, key) => (
          <BookListItem key={key} bookObj={book} />
        )) ?? null}
        <h2>Books I've Read</h2>
        {userObj?.library?.haveRead.map((book, key) => (
          <BookListItem key={key} bookObj={book} />
        )) ?? null}
      </div>
    </main>
  );
};

Library.propTypes = {
  userObj: PropTypes.object,
};

export default Library;
