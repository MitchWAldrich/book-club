import { useContext } from "react";

import BookListItem from "./BookListItem";
import Nav from "./Nav";
import SingleBookItem from "./SingleBookItem";

import userContext from "./../userContext";
import { bookMock } from "../mocks/books";

const Library = () => {
  const user = useContext(userContext);

  return (
    <main>
      <Nav user={user ?? "Guest"} />
      <div>
        <h2>To Read List</h2>
        {user?.library?.toRead.map((book, key) => (
          <BookListItem
            key={key}
            bookObj={book}
            // bookId={book.bookId}
            // authors={book.authors}
            // categories={book.categories}
            // averageRating={book.averageRating}
            // description={book.description}
            // imageLinks={book.imageLinks}
            // language={book.language}
            // pageCount={book.pageCount}
            // publisher={book.publisher}
            // title={book.title}
          />
        )) ?? null}
        <h2>Books I've Read</h2>
        {user?.library?.haveRead.map((book, key) => (
          <BookListItem
            key={key}
            bookObj={book}
            // bookId={book.bookId}
            // authors={book.authors}
            // categories={book.categories}
            // averageRating={book.averageRating}
            // description={book.description}
            // imageLinks={book.imageLinks}
            // language={book.language}
            // pageCount={book.pageCount}
            // publisher={book.publisher}
            // title={book.title}
          />
        )) ?? null}
        <br></br>
        <SingleBookItem
          // key={key}
          bookObj={bookMock}
          // bookId={bookMock.bookId}
          // authors={bookMock.authors}
          // categories={bookMock.categories}
          // averageRating={bookMock.averageRating}
          // description={bookMock.description}
          // imageLinks={bookMock.imageLinks}
          // language={bookMock.language}
          // pageCount={bookMock.pageCount}
          // publisher={bookMock.publisher}
          // title={bookMock.title}
          userId={3}
          location={"expanded"}
        />
      </div>
    </main>
  );
};

export default Library;
