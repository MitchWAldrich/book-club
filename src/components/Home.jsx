import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axiosConfig";

import Goal from "./Goal";
import Input from "./Input";
import Invitation from "./Invitation";
import Nav from "./Nav";
import SearchBar from "./Searchbar";

import userContext from "../userContext";
import { getBookClubById } from "../utils/selectors";
import { bookClubsMock } from "../mocks/bookClubs";

const Home = () => {
  const user = useContext(userContext);
  const navigate = useNavigate();

  console.log("homeUser", user);

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
      <SearchBar className='searchBar' location='home' dropDown={true} />
      <main className='addBookClubContainer'>
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
