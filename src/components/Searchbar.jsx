import { useState, useEffect } from "react";
// import axios from "axios";
import instance from "../utils/axiosConfig";

import PropTypes from "prop-types";

import { IconContext } from "react-icons";
import { HiOutlineSearchCircle } from "react-icons/hi";

import BookClubsList from "./BookClubsList";
import Dropdown from "./Dropdown";
import Input from "./Input";
// import Loading from "./Loading";

import {
  getUserByUserId,
  getBookClubsByCategory,
  getBookClubsByName,
  getBookClubsByLocation,
} from "../utils/selectors";
import MemberList from "./MemberList";

import { usersMock } from "../mocks/users";

const SearchBar = (props) => {
  const {
    className,
    location,
    dropDown,
    id,
    valueCallback,
    userId,
    searchTitle,
  } = props;

  const [userSearched, setUserSearched] = useState(
    location === "bookClub" ? true : false
  );
  const [bookClubsSearched, setBookClubsSearched] = useState(false);
  const [error, setError] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchTypeValue, setSearchTypeValue] = useState("title");
  const [userResponse, setUserResponse] = useState([]);
  const [bookClubsResponse, setBookClubsResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState(null);

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Romance",
    "Mystery",
    "Fantasy",
  ];

  const bookClubDropdown = ["Name", "Category", "Location"];

  const getUnit = (dropdownValue) => {
    setSearchTypeValue(dropdownValue);
  };

  const getSearchType = (searchType) => {
    setSearchType(searchType);
  };

  /* User Search */
  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`/api/users/${id}`)
      .then(function (response) {
        console.log("userResp", response);
        const friendsObjs = response?.data?.user?.friends?.accepted.map(
          (friend) => getUserByUserId(usersMock, friend)
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

  /* Book Clubs Search */
  const searchBookClubs = (bookClubsArray, searchType, searchValue) => {
    let bookClubObject = {};
    if (searchType === "category")
      bookClubObject = getBookClubsByCategory(bookClubsArray, searchValue);
    if (searchType === "name")
      bookClubObject = getBookClubsByName(bookClubsArray, searchValue);
    if (searchType === "location")
      bookClubObject = getBookClubsByLocation(bookClubsArray, searchValue);
    return bookClubObject;
  };

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`/api/bookClubs/`)
      .then(function (response) {
        console.log("bookClubsResp", response);
        const bookClubsObjs = response?.data
          ? searchBookClubs(response.data, searchType, searchInput)
          : {};
        setBookClubsResponse(bookClubsObjs);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setIsLoading(false);
        console.log("FINbcres", bookClubsResponse);
      });
  }, [bookClubsSearched]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (!valueCallback) return;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      setError(true);
    } else {
      setError(false);
    }

    if (location === "bookClub") setUserSearched(true);

    /* reformat to use BookSearch */
    // if (location === "bookClubFirstBook") {
    //   valueCallback(bookId);
    //   console.log("bookIdCallback", bookId);
    // }

    if (location === "bookClubSearch") {
      setSearchType(searchType);
      setBookClubsSearched(true);
      // For the bookClub selected
      // valueCallback(searchType);
    }
  };

  // add Loading spinner
  return (
    <>
      <div>
        <form onSubmit={handleSearch}>
          <div className={"searchBar"}>
            <h3>{searchTitle}</h3>
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
              location === "bookClubSearch" ? (
                <Dropdown
                  category={"Search Type"}
                  options={bookClubDropdown}
                  valueCallback={getSearchType}
                  dropdownName={"bookClubSearch"}
                />
              ) : (
                <Dropdown
                  category={"Search Type"}
                  options={categories}
                  valueCallback={getUnit}
                />
              )
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
      {userSearched ? (
        <MemberList
          members={userResponse}
          valueCallback={valueCallback}
          location='bookClubCreate'
          isLoading={isLoading}
        />
      ) : null}
      {bookClubsSearched ? (
        <BookClubsList
          bookClubObjs={bookClubsResponse}
          userId={userId}
          isSearch={true}
        />
      ) : null}
    </>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string,
  location: PropTypes.string,
  dropDown: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueCallback: PropTypes.func,
  userId: PropTypes.string,
  searchTitle: PropTypes.string,
};

export default SearchBar;
