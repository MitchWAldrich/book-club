import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axiosConfig";

import BookListItem from "./BookListItem";
import BookClubListItem from "./BookClubListItem";
import Goal from "./Goal";
import GoalListItem from "./GoalListItem";
import Input from "./Input";
import Invitation from "./Invitation";
import MemberList from "./MemberList";
import Nav from "./Nav";
import SearchBar from "./Searchbar";

import userContext from "../userContext";
import {
  getBookClubByBookClubId,
  getBookClubById,
  getGoalByGoalId,
} from "../utils/selectors";

import { bookClubsMock } from "../mocks/bookClubs";
import { goalsMock } from "../mocks/goals";

const Home = () => {
  const user = useContext(userContext);
  const navigate = useNavigate();

  console.log("homeUser", user);

  const [book, setBook] = useState({});
  const [bookClubName, setBookClubName] = useState("");
  const [error, setError] = useState(false);

  const handleCreateBookClub = (e) => {
    e.preventDefault();

    if (!bookClubName) {
      setError(true);
    }

    console.log({ bookClubName });

    // setBookClubName(e.target.value);
    instance
      .post("/api/bookclubs", {
        bookClubHost: user.userId,
        bookClubName: bookClubName,
      })
      .then((response) => {
        console.log("create Book Club response", response.data);
        navigate("/bookClubs");
      })
      .catch((error) => console.error("create Book Club error", error));
  };

  const getChosenSearchResults = (searchValue) => {
    setBook(searchValue);
  };

  const isInvited = true;

  return (
    <>
      <Nav user={user} />
      <Goal />
      {isInvited ? (
        <Invitation
          bookClubObj={getBookClubById(
            bookClubsMock,
            user.bookClubs.invited[0]
          )}
          userId={user.userId}
        />
      ) : null}
      <SearchBar
        className='searchBar'
        location='home'
        dropDown={true}
        id={user.userId}
        valueCallback={getChosenSearchResults}
      />
      <main className='addBookClubContainer'>
        <h2>My Reading Goals</h2>
        {user.goals.map((goal, key) => (
          <GoalListItem goalObj={getGoalByGoalId(goalsMock, goal)} key={key} />
        ))}
        <h2>My BookClubs</h2>
        {user.bookClubs.accepted.map((bookClubId, key) => (
          <BookClubListItem
            bookClubObj={getBookClubByBookClubId(bookClubsMock, bookClubId)}
            userId={user.userId}
            isSearch={false}
            key={key}
          />
        ))}
        <h2>My Library</h2>
        <h3>Have Read</h3>
        {user.library.haveRead.map((book, key) => (
          <BookListItem bookObj={book} key={key} />
        ))}
        <h3>To Read</h3>
        {user.library.toRead.map((book, key) => (
          <BookListItem bookObj={book} key={key} />
        ))}
        <h2>My Friends</h2>

        <MemberList
          members={user.friends.accepted}
          // bookClubId={bookClubId}
          // isLoading={isLoading}
        />
        <h2 className='homeTitle'>Create a Book Club</h2>
        <div className='addBookClub'>
          <Input
            type='text'
            label='Book Club Name'
            value={bookClubName}
            name='bookClubName'
            error={error}
            onChange={(e) => setBookClubName(e.target.value)}
            placeholder='Book Club Name'
          />
        </div>
        <div>
          <button className='btn' onClick={handleCreateBookClub}>
            CREATE BOOK CLUB
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
