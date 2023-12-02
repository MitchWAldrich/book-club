import { useState, useEffect } from "react";
import axios from "axios";
import instance from "../utils/axiosConfig";
import PropTypes from "prop-types";

import { IconContext } from "react-icons";
import { HiOutlineSearchCircle } from "react-icons/hi";

import BookClubsList from "./BookClubsList";
import BookListItem from "./BookListItem";
import Dropdown from "./Dropdown";
import Input from "./Input";

import {
  getBooks,
  getUserByUserId,
  getBookClubsByCategory,
} from "../utils/selectors";
import MemberList from "./MemberList";

import { usersMock } from "../mocks/users";
import { bookClubsMock } from "../mocks/bookClubs";

const SearchBar = (props) => {
  const { className, location, dropDown, id, valueCallback } = props;

  const [bookSearched, setBookSearched] = useState(false);
  const [userSearched, setUserSearched] = useState(
    location === "bookClub" ? true : false
  );
  const [bookClubsSearched, setBookClubsSearched] = useState(false);
  const [error, setError] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchTypeValue, setSearchTypeValue] = useState("title");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [bookResponse, setBookResponse] = useState([]);
  const [userResponse, setUserResponse] = useState([]);
  const [bookClubsResponse, setBookClubsResponse] = useState([]);
  const [bookId, setBookId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const units = ["Title", "Author"];

  const getUnit = (dropdownValue) => {
    setSearchTypeValue(dropdownValue);
  };

  const getClicked = (clickedValue) => {
    setBookId(clickedValue);
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
    // }, [bookSearched, searchTypeValue, searchInput]);
  }, [bookSearched]);

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`/api/users/${id}`)
      .then(function (response) {
        console.log("userResp", response);
        const friendsObjs = response.data.user.friends.accepted.map((friend) =>
          getUserByUserId(usersMock, friend)
        );
        setUserResponse(friendsObjs);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }, [userSearched]);

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`/api/bookClubs/${id}`)
      .then(function (response) {
        console.log("bookClubsResp", response);
        const bookClubsObjs = response.data.bookClubs.map((bookClub) =>
          getBookClubsByCategory(bookClubsMock, bookClub)
        );
        setBookClubsResponse(bookClubsObjs);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }, [bookClubsSearched]);

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

    if (location === "home" || location === "bookClubFirstBook") {
      setTitle(title);
      setAuthor(author);
      setBookSearched(true);
    }

    if (location === "bookClub") setUserSearched(true);
    if (location === "bookClubFirstBook") {
      valueCallback(bookId);
      console.log("bookIdCallback", bookId);
    }
  };

  const handleChooseBook = () => {
    setBookId(bookId);
    setBookSearched(false);
    valueCallback(bookId);
  };

  // add Loading spinner
  return (
    <>
      <div>
        <form onSubmit={handleSearch}>
          <div className={"searchBar"}>
            <Input
              className={className}
              type='text'
              // label="search"
              value={searchInput}
              name='searchInput'
              error={error}
              onChange={handleChange}
              placeholder='Search here'
            />
            {dropDown ? (
              <Dropdown
                category={"Search Type"}
                options={units}
                valueCallback={getUnit}
              />
            ) : null}
            <IconContext.Provider
              // key={key}
              value={{ color: "teal", size: "100%", className: "searchButton" }}
            >
              <HiOutlineSearchCircle onClick={handleSearch} />
            </IconContext.Provider>
          </div>
        </form>
      </div>
      <br></br>

      <br></br>
      {bookSearched ? (
        <>
          {bookResponse.map((book, key) => (
            <BookListItem
              key={key}
              bookId={book.bookId}
              authors={book.authors}
              categories={book.categories}
              averageRating={book.averageRating}
              description={book.description}
              imageLinks={book.imageLinks}
              language={book.language}
              pageCount={book.pageCount}
              publisher={book.publisher}
              title={book.title}
              valueCallback={getClicked}
            />
          ))}
          <button type='button' onClick={handleChooseBook}>
            CHOOSE BOOK
          </button>
        </>
      ) : null}
      {userSearched ? (
        <MemberList
          members={userResponse}
          valueCallback={valueCallback}
          location='bookClubCreate'
        />
      ) : null}
      {bookClubsResponse ? <BookClubsList /> : null}
    </>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string,
  location: PropTypes.string,
  dropDown: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueCallback: PropTypes.func,
};

export default SearchBar;
