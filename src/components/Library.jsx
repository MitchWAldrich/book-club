import PropTypes from "prop-types";

import BookListItem from "./BookListItem";
import SingleBookItem from "./SingleBookItem";

const Library = (props) => {
  const { userObj } = props;

  return (
    <main>
      <div>
        <h2>What I'm Reading</h2>
        <SingleBookItem
          bookObj={userObj?.library.currentBook}
          userId={userObj.userId}
          location={"expanded"}
          isBookInLibrary={true}
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
