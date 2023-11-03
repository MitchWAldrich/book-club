import { useEffect, useState } from "react";
import BookListItem from "./BookListItem";
import Nav from "./Nav";
import instance from "../utils/axiosConfig";
import { getUser } from "../utils/selectors";

const Library = () => {
  const [user, setUser] = useState("loading");

  useEffect(() => {
    instance
      .get("http://localhost:4000/api/users")
      .then(function (response) {
        const usersResult = response.data.users;
        setUser(getUser(usersResult, 1));
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const sampleBook = {
    author: "Daniel Keyes",
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

  const haveRead = [sampleBook, sampleBook, sampleBook];
  const toRead = [sampleBook, sampleBook];

  return (
    <main>
      <Nav user={user ?? "Guest"} />
      <div>
        <h2>To Read List</h2>
        {toRead.map((book, key) => (
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
        ))}
        <h2>Books I've Read</h2>
        {haveRead.map((book, key) => (
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
        ))}
      </div>
    </main>
  );
};

export default Library;
