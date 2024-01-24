import { useEffect, useState } from "react";
import axios from "axios";

import PropTypes from "prop-types";

import BookListItem from "./BookListItem";
import Input from "./Input";
import Loading from "./Loading";

import { getBooks } from "../utils/selectors";

const BookSearch = (props) => {
  const { valueCallback } = props;
  const [bookSearched, setBookSearched] = useState(false);
  const [error, setError] = useState(false);
  const [searchTypeValue, setSearchTypeValue] = useState("title");
  const [bookResponse, setBookResponse] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [bookId, setBookId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getClicked = (clickedValue) => {
    setBookId(clickedValue);
  };

  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    e.preventDefault();
    setAuthor(e.target.value);
  };

  const handleChooseBook = () => {
    setBookId(bookId);
    setBookSearched(false);
    valueCallback(bookId);
  };

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${`${title}+inauthor:${author}`}+&key=AIzaSyCbCvAB05gA9TWOT7FWCNpJvOTDAPufP_k`
      )
      .then(function (response) {
        console.log("bookResp", response);
        setBookResponse(getBooks(response.data.items));
        //Set up Book Item response
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    // }, [bookSearched, searchTypeValue, searchInput]);
  }, [bookSearched]);

  if (!valueCallback) return;

  const handleSearch = (e) => {
    e.preventDefault();

    if (!title.trim() && !author.trim()) {
      setError(true);
    } else {
      setError(false);
    }

    setBookSearched(true);
    valueCallback(bookId);
  };

  // add Loading spinner
  // add bookSearch to stylesheet
  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className='bookSearch'>
          <h3>Title</h3>
          <Input
            className='searchBar'
            type='text'
            // label="search"
            value={title}
            name='searchInput'
            error={error}
            onChange={handleTitleChange}
            placeholder='Title'
          />
          <h3>Author</h3>
          <Input
            className='searchBar'
            type='text'
            // label="search"
            value={author}
            name='searchInput'
            error={error}
            onChange={handleAuthorChange}
            placeholder='Author'
          />
          <button type='button' onClick={handleSearch}>
            Search
          </button>
        </div>
      </form>
      {bookSearched ? (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            bookResponse.map((book, key) => (
              <BookListItem
                key={key}
                bookId={book.bookId ?? ""}
                authors={book.authors ?? []}
                categories={book.categories ?? []}
                averageRating={book.averageRating ?? ""}
                description={book.description ?? ""}
                imageLinks={book.imageLinks ?? {}}
                language={book.language ?? ""}
                pageCount={book.pageCount ?? ""}
                publisher={book.publisher ?? ""}
                title={book.title ?? ""}
                valueCallback={getClicked}
              />
            ))
          )}
          <button type='button' onClick={handleChooseBook}>
            CHOOSE BOOK
          </button>
        </>
      ) : null}
    </div>
  );
};

BookSearch.propTypes = {
  valueCallback: PropTypes.func,
};

export default BookSearch;
