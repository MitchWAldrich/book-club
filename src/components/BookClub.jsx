import { useContext } from "react";
import instance from "../utils/axiosConfig";

import MemberList from "./MemberList";
import Nav from "./Nav";
import SearchBar from "./Searchbar";
import SingleBookItem from "./SingleBookItem";

import userContext from "../userContext";
import { bookClubMock } from "../mocks/bookClubs";
import { bookMock } from "../mocks/books";

const BookClub = () => {
  const user = useContext(userContext);

  //set book (and next/future book(s))
  //make it possible to add multiple
  const addBooksToBookClub = (e) => {
    e.preventDefault();
    instance.patch(`/api/bookclubs/${bookClubMock.bookClubId}`, { bookClubId: bookClubMock.bookClubId, bookObj: bookMock })
    .then(response => {
     console.log('addBooksToClub response', response.data)  
   })
   .catch(error => console.error('addBooksToClub error', error));
  }

  //archive book

  //schedule meeting

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
        <div className="bookClubAddBookButton">
          <SearchBar />
          <button type="button" onClick={addBooksToBookClub} >Add Books</button>
        </div>
        <MemberList members={bookClubMock.members.accepted} bookClubId={bookClubMock.bookClubId} />
      </div>
    </>
  );
}

export default BookClub;