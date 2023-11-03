import { useState, useEffect } from "react";
import axios from "axios";
import BookListItem from "./BookListItem";
import Dropdown from "./Dropdown";
import Input from "./Input";
import { getBooks } from "../utils/selectors";

const SearchBar = () => {
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchTypeValue, setSearchTypeValue] = useState("title");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [bookResponse, setBookResponse] = useState([]);

  // const results = {title: 'My Favourite Book', author: 'My Favourite Author'};

  const units = ["Title", "Author"];

  const getUnit = (dropdownValue) => {
    setSearchTypeValue(dropdownValue);
  };

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${`in${searchTypeValue}:${searchInput}`}+&key=AIzaSyCbCvAB05gA9TWOT7FWCNpJvOTDAPufP_k`
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
  }, [searched]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      setError(true);
    } else {
      setError(false);
    }
    setTitle(title);
    setAuthor(author);
    setSearched(true);
  };

  // add Loading spinner
  return (
    <>
      <div className="container">
        <form onSubmit={handleSearch}>
          <div className="searchBar">
            <Input
              className="searchInput"
              type="text"
              label="search"
              value={searchInput}
              name="searchInput"
              error={error}
              onChange={handleChange}
              placeholder="Search here"
            />
            <Dropdown
              category={"Search Type"}
              options={units}
              valueCallback={getUnit}
            />
            <button
              className="searchButton"
              type="text"
              onSubmit={() => handleSearch()}
            >
              ?
            </button>
          </div>
        </form>
      </div>
      <br></br>

      <br></br>
      {searched
        ? bookResponse.map((book, key) => (
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
          ))
        : null}
    </>
  );
};

export default SearchBar;
