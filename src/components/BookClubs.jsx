import { useContext, useState } from "react";
import instance from "../utils/axiosConfig";

import BookClubItem from "./BookClubItem";
import BookClubListItem from "./BookClubListItem";
import BookSearch from "./BookSearch";
import Nav from "./Nav";
import NextMeeting from "./NextMeeting";
import SearchBar from "./Searchbar";
import SingleBookItem from "./SingleBookItem";

import userContext from "../userContext";
import { bookClubMock, bookClubsMock } from "../mocks/bookClubs";
import { bookMock } from "../mocks/books";
import { getBookClubById } from "../utils/selectors";

const BookClubs = () => {
  const user = useContext(userContext);

  const [isAddBooksClicked, setIsAddBooksClicked] = useState(false);
  const [book, setBook] = useState(user.library.currentBook);

  const getBookSearchResults = (searchValue) => {
    setBook(searchValue);
  };

  const getIsNewBookClub = () => {
    setIsNewBookClub(false);
  };

  const isHost = user.bookClubs.host.includes(bookClubMock.bookClubId)
    ? true
    : false;

  const bookClubsIHost = user.bookClubs.host.map((bookClub) =>
    getBookClubById(bookClubsMock, bookClub)
  );
  console.log("I Host", bookClubsIHost);

  const bookClubsImIn = user.bookClubs.accepted.map((bookClub) =>
    getBookClubById(bookClubsMock, bookClub)
  );
  console.log("I'm In", bookClubsImIn);

  const pendingBookClubs = user.bookClubs.requested.map((bookClub) =>
    getBookClubById(bookClubsMock, bookClub)
  );
  console.log("I've requested", pendingBookClubs);

  const bookClubsImInvitedTo = user.bookClubs.invited.map((bookClub) =>
    getBookClubById(bookClubsMock, bookClub)
  );
  console.log("I'm Invited", bookClubsImInvitedTo);

  const [isNewBookClub, setIsNewBookClub] = useState(
    bookClubsIHost.find((bookClub) => bookClub.isNewBookClub === true)
  );

  //set book (and next/future book(s))
  //make it possible to add multiple
  const addBooksToBookClub = (e) => {
    e.preventDefault();
    setIsAddBooksClicked(true);

    instance
      .patch(`/api/bookclubs/${bookClubMock.bookClubId}`, {
        bookClubId: bookClubMock.bookClubId,
        bookObj: bookMock,
      })
      .then((response) => {
        console.log("addBooksToClub response", response.data);
      })
      .catch((error) => console.error("addBooksToClub error", error));
  };

  const getBookClubSearchResults = () => {};

  //archive book

  //schedule meeting

  //first update bookclub

  return (
    <main className='bookClubsDashboard'>
      <Nav user={user ?? "Guest"} />
      <h2 className='homeTitle'>{bookClubMock.name}</h2>
      <div>
        <div>
          <div>
            <h3>Find a Book Club</h3>
            <SearchBar
              className='searchInput'
              location='bookClubSearch'
              dropDown={true}
              id={user.id}
              valueCallback={getBookClubSearchResults}
            />
            {/* <BookClubListItem
                    key={key}
                    bookClubObj={bookClub}
                    userId={user.userId}
                  /> */}
          </div>
          <div>
            {pendingBookClubs?.length ? (
              <>
                <h3>Pending Book Clubs</h3>
                {pendingBookClubs.map((bookclub, key) => (
                  <BookClubListItem bookClubObj={bookclub} key={key} />
                ))}{" "}
              </>
            ) : null}
          </div>
          <div>
            {bookClubsIHost?.length ? (
              <>
                <h3>Book Clubs I Host</h3>
                {bookClubsIHost.map((bookclub, key) => (
                  <BookClubListItem
                    bookClubObj={bookclub}
                    isHost={true}
                    key={key}
                  />
                ))}{" "}
              </>
            ) : null}
          </div>
          <div>
            {bookClubsImIn?.length ? (
              <>
                <h3>My Book Clubs</h3>
                {bookClubsImIn.map((bookclub, key) => (
                  <BookClubListItem bookClubObj={bookclub} key={key} />
                ))}{" "}
              </>
            ) : null}
          </div>
        </div>
        <div>
          <h3>Current Book</h3>
          <SingleBookItem
            authors={bookMock.authors}
            imageLinks={bookMock.imageLinks}
            title={bookMock.title}
            location={"bookClubFeature"}
            isBookInLibrary={false}
          />
        </div>
        <div className='bookClubBookDisplay'>
          <h3>Next Book</h3>
          <SingleBookItem
            authors={bookMock.authors}
            imageLinks={bookMock.imageLinks}
            title={bookMock.title}
            location={"bookClubFeature"}
            isBookInLibrary={false}
          />
        </div>
        {!isHost ? (
          <>
            <div className='bookClubAddBookButton'>
              {isAddBooksClicked && (
                <BookSearch
                  userId={user.userId}
                  valueCallback={getBookSearchResults}
                />
              )}
              <button type='button' onClick={addBooksToBookClub}>
                Add Books
              </button>
            </div>
            {isNewBookClub ? (
              <div className='newBookClubContainer'>
                <BookClubItem
                  userObj={user}
                  bookClubId={isNewBookClub.bookClubId}
                  isNew={true}
                  valueCallback={getIsNewBookClub}
                />
              </div>
            ) : null}
          </>
        ) : null}
        <NextMeeting bookClub={bookClubMock} />
      </div>
    </main>
  );
};

export default BookClubs;
