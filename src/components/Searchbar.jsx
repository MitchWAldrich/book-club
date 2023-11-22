import { useState, useEffect } from "react";
import axios from "axios";
import instance from "../utils/axiosConfig";
import PropTypes from 'prop-types';

import { IconContext } from 'react-icons';
import { HiOutlineSearchCircle } from "react-icons/hi";

import BookListItem from "./BookListItem";
import Dropdown from "./Dropdown";
import Input from "./Input";

import { getBooks, getUserByUserId } from "../utils/selectors";
import MemberList from "./MemberList";

import { usersMock } from "../mocks/users";

const SearchBar = (props) => {
  const { className, location, dropDown, id, valueCallback } = props;

  const [ bookSearched, setBookSearched ] = useState(false);
  const [ userSearched, setUserSearched ] = useState(location === 'bookClub' ? true : false);
  const [ error, setError ] = useState(false);
  const [ searchInput, setSearchInput ] = useState("");
  const [ searchTypeValue, setSearchTypeValue ] = useState("title");
  const [ title, setTitle ] = useState("");
  const [ author, setAuthor ] = useState("");
  const [ bookResponse, setBookResponse ] = useState([]);
  const [ userResponse, setUserResponse ] = useState([]);
  // const [ searchResult, setSearchResult ] = useState(null);
  const [ bookId, setBookId ] = useState(null);

  const units = ["Title", "Author"];

  const getUnit = (dropdownValue) => {
    setSearchTypeValue(dropdownValue);
  };

  const getClicked = (clickedValue) => {
    setBookId(clickedValue)
  };
console.log('clickedBookId', bookId)
// console.log('bookSearched', bookSearched);
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
    instance
      .get(`/api/users/${id}`)
      .then(function (response) {
        console.log("userResp", response);
        const friendsObjs = response.data.user.friends.accepted.map((friend) => getUserByUserId(usersMock, friend))
        setUserResponse(friendsObjs);
        //Set up Book Item response
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [userSearched]);

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
    console.log('**SEARCHED**')
  
    if ( location === 'home' || location === 'bookClubFirstBook') {
      setTitle(title);
      setAuthor(author);
      setBookSearched(true);
    }

    if ( location === 'bookClub' ) setUserSearched(true);
    if ( location === 'bookClubFirstBook') {
      () => valueCallback(bookId)
      console.log('bookIdCallback', bookId);
    }
  };

  // add Loading spinner
  return (
    <>
      <div>
        <form onSubmit={handleSearch}>
          <div className={"searchBar"}>
            <Input
              className={className}
              type="text"
              // label="search"
              value={searchInput}
              name="searchInput"
              error={error}
              onChange={handleChange}
              placeholder="Search here"
            />
            {dropDown ? (
              <Dropdown
              category={"Search Type"}
              options={units}
              valueCallback={getUnit}
            />
            ) : null }
            <IconContext.Provider
            // key={key}
            value={{ color: 'teal', size: "100%", className: "searchButton" }}
            >
              <HiOutlineSearchCircle onClick={handleSearch} />
            </IconContext.Provider>
          </div>
        </form>
      </div>
      <br></br>

      <br></br>
      {bookSearched
        ? bookResponse.map((book, key) => (
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
          ))
        : null}
      {userSearched ? <MemberList members={userResponse} /> : null}
    </>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string,
  location: PropTypes.string,
  dropDown: PropTypes.bool,
  id: PropTypes.string,
  valueCallback: PropTypes.func,
}

export default SearchBar;
