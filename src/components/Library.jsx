import { useContext } from "react";

import BookListItem from "./BookListItem";
import Nav from "./Nav";
import SingleBookItem from "./SingleBookItem";

import userContext from './../userContext';

const Library = () => {
  const user = useContext(userContext);

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

  return (
    <main>
      <Nav user={user ?? "Guest"} />
      <div>
        <h2>To Read List</h2>
        {user?.library?.toRead.map((book, key) => (
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
        {user?.library?.haveRead.map((book, key) => (
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
        <br></br>
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
            location={'expanded'}
          />
          <SingleBookItem
            authors={sampleBook.authors}
            imageLinks={sampleBook.imageLinks}
            title={sampleBook.title}
            location={'bookClubFeature'}
          />
      </div>
    </main>
  );
};

export default Library;
