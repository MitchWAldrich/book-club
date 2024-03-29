import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axiosConfig";

import BookClubListItem from "./BookClubListItem";
import Goal from "./Goal";
import GoalListItem from "./GoalListItem";
import Input from "./Input";
import Invitation from "./Invitation";
import Library from "./Library";
import MemberList from "./MemberList";
import Nav from "./Nav";

import userContext from "../userContext";
import {
  getBookClubByBookClubId,
  getBookClubById,
  getGoalByGoalId,
  getUserByUserId,
} from "../utils/selectors";

import { bookClubsMock } from "../mocks/bookClubs";
import { goalsMock } from "../mocks/goals";
import { usersMock } from "../mocks/users";
import { filterSuggestedUsers } from "../utils/helpers";
import AddMember from "./AddMember";

const Home = () => {
  const user = useContext(userContext);
  const navigate = useNavigate();

  console.log("homeUser", user);

  const [bookClubName, setBookClubName] = useState("");
  const [createGoal, setCreateGoal] = useState(false);
  const [updateGoalBool, setUpdateGoalBool] = useState(false);
  const [updateGoalObj, setUpdateGoalObj] = useState({});
  const [openAddFriends, setOpenAddFriends] = useState(false);
  const [error, setError] = useState(false);

  const updateGoal = (goalId, goalButton) => {
    if (goalButton === "updateGoal") {
      setUpdateGoalObj(getGoalByGoalId(goalsMock, goalId));
      setUpdateGoalBool(true);
    }
  };

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

  const clickToAdd = () => {
    setOpenAddFriends(true);
  };

  const friendObjs = user.friends.accepted.map((member) =>
    getUserByUserId(usersMock, member)
  );

  const filteredOutFriends = filterSuggestedUsers(usersMock, friendObjs);

  const getChosenUser = (val) => {
    return val;
  };

  const isInvited = true;

  return (
    <main className='homeContainer'>
      <Nav user={user} />
      {isInvited ?? (
        <Invitation
          bookClubObj={getBookClubById(
            bookClubsMock,
            user?.bookClubs?.invited[0] ?? {}
          )}
          userId={user.userId}
        />
      )}
      <h2>My Reading Goals</h2>
      {user.goals.map((goal, key) => (
        <GoalListItem
          goalObj={getGoalByGoalId(goalsMock, goal)}
          valueCallback={updateGoal}
          userId={user.userId}
          key={key}
        />
      ))}
      {updateGoalBool && <Goal goalObj={updateGoalObj} location='update' />}
      <button className='btn' onClick={() => setCreateGoal(true)}>
        CREATE GOAL
      </button>
      {createGoal && <Goal location='add' />}
      <h2>My BookClubs</h2>
      {user.bookClubs.accepted.map((bookClubId, key) => (
        <BookClubListItem
          bookClubObj={getBookClubByBookClubId(bookClubsMock, bookClubId)}
          userId={user.userId}
          isSearch={false}
          key={key}
        />
      ))}
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
        <button type='button' className='btn' onClick={handleCreateBookClub}>
          CREATE BOOK CLUB
        </button>
      </div>
      <h2>My Library</h2>
      <Library userObj={user} />
      <h2>My Friends</h2>
      <button type='button' onClick={clickToAdd}>
        Add Friends
      </button>
      {openAddFriends && (
        <AddMember members={filteredOutFriends} user={user.userId} />
      )}
      <br></br>
      <MemberList
        members={friendObjs}
        userId={user.userId}
        // bookClubId={bookClubId}
        // location=""
        // isLoading={isLoading}
      />
    </main>
  );
};

export default Home;
