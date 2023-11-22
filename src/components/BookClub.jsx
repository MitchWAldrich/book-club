import { useContext, useState } from "react";
import instance from "../utils/axiosConfig";

import BookClubItem from "./BookClubItem";
import MemberList from "./MemberList";
import Nav from "./Nav";
import NextMeeting from "./NextMeeting";
import SearchBar from "./Searchbar";
import SingleBookItem from "./SingleBookItem";

import userContext from "../userContext";
import { bookClubMock } from "../mocks/bookClubs";
import { bookMock } from "../mocks/books";

const BookClub = () => {
  const user = useContext(userContext);

  const [ isAddBooksClicked, setIsAddBooksClicked ] = useState(false);

  const isHost = user.bookClubs.host.includes(bookClubMock.bookClubId) ? true : false;
  // const isNewBookClub = bookClubMock.isNewBookClub;
  const isNewBookClub = true;

  //set book (and next/future book(s))
  //make it possible to add multiple
  const addBooksToBookClub = (e) => {
    e.preventDefault();
    setIsAddBooksClicked(true);
    
    instance.patch(`/api/bookclubs/${bookClubMock.bookClubId}`, { bookClubId: bookClubMock.bookClubId, bookObj: bookMock })
    .then(response => {
     console.log('addBooksToClub response', response.data)  
   })
   .catch(error => console.error('addBooksToClub error', error));
  }

  //archive book

  //schedule meeting

  //first update bookclub

  return (
    <>
      <Nav user={user ?? "Guest"} />
      <h2 className='homeTitle'>{bookClubMock.name}</h2>
      <div>
      <SingleBookItem
            authors={bookMock.authors}
            categories={bookMock.categories}
            averageRating={bookMock.averageRating}
            description={bookMock.description}
            imageLinks={bookMock.imageLinks}
            language={bookMock.language}
            pageCount={bookMock.pageCount}
            publisher={bookMock.publisher}
            title={bookMock.title}
            userId={3}
            location={'expanded'}
          />
        <div>
        <h3>Current Book</h3>
        <SingleBookItem
          authors={bookMock.authors}
          imageLinks={bookMock.imageLinks}
          title={bookMock.title}
          location={'bookClubFeature'}
        />
        </div>
        <div className='bookClubBookDisplay'>
        <h3>Next Book</h3>
        <SingleBookItem
          authors={bookMock.authors}
          imageLinks={bookMock.imageLinks}
          title={bookMock.title}
          location={'bookClubFeature'}
        />
        </div>
        { isHost ? (
          <>
          <div className="bookClubAddBookButton">
            { isAddBooksClicked ? (
              <SearchBar className='searchBar' location='bookClubMain' dropDown={true} />
            ) : null }
            <button type="button" onClick={addBooksToBookClub} >Add Books</button>
          </div>
        { isNewBookClub ? (
          <div>
              <BookClubItem userObj={user} />
          </div>
        ) : null }
        </>
        ) : null }
        <NextMeeting bookClub={bookClubMock} />
        <MemberList members={bookClubMock.members.accepted} bookClubId={bookClubMock.bookClubId} />
      </div>
    </>
  );
}

export default BookClub;