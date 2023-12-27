import { useContext } from "react";
// import axios from "axios";

import PropTypes from "prop-types";

import MemberList from "./MemberList";
// import SearchBar from "./Searchbar";

import userContext from "../userContext";

import { getUserByUserId } from "../utils/selectors";
import { usersMock } from "../mocks/users";
import { formatStreetAddress } from "../utils/helpers";
import SingleBookItem from "./SingleBookItem";
import BookListItem from "./BookListItem";

const BookClubMain = (props) => {
  const user = useContext(userContext);
  const { bookClubObj, isLoading } = props;

  const {
    bookClubId,
    bookClubHostId,
    hostUserName,
    name,
    members,
    books,
    meetings,
    visibility,
    categories,
  } = bookClubObj;

  const isHost = user.bookClubs.host.includes(bookClubObj.bookClubId)
    ? true
    : false;

  const combineUsers = (users, type) => {
    const combinedUsers = [];

    if (type === "allMembers") {
      combinedUsers.push(getUserByUserId(usersMock, bookClubHostId));

      users?.accepted?.forEach((user) =>
        combinedUsers.push(getUserByUserId(usersMock, user))
      );
      users?.requested?.forEach((user) =>
        combinedUsers.push(getUserByUserId(usersMock, user))
      );
      users?.invited?.forEach((user) =>
        combinedUsers.push(getUserByUserId(usersMock, user))
      );
    }

    return combinedUsers;
  };

  const combinedMembers = combineUsers(members, "allMembers");

  const myFriends =
    members.accepted.map((user) =>
      user?.friends?.accepted?.includes(user.userID)
    ) ?? [];

  // const isMember = combinedMembers.includes(user.userId) ? true : false;
  /* need to implement visibility === private and isMember */

  const filterSuggested = (usersFull, usersExempt) => {
    if (!usersFull?.length) return;

    const filteredUsers = usersFull?.filter(
      (user) => !usersExempt.includes(user)
    );

    return filteredUsers;
  };

  const filteredMembers = filterSuggested(usersMock, combinedMembers);

  const {
    meetingFrequency,
    nextMeetingDate,
    nextMeetingTime,
    nextMeetingLocation,
  } = meetings;
  const { online, inPerson } = nextMeetingLocation;
  const { city, province } = inPerson;

  const streetAddress = formatStreetAddress(inPerson);

  return (
    <main>
      {/* <MemberList members={members} bookClubId={bookClubId} valueCallback={} location={} /> */}
      <div>
        <h3>Name:</h3>
        <p>{name}</p>
      </div>
      <div>
        <h3>Host:</h3>
        <p>{hostUserName}</p>
      </div>
      <div>
        <h3>Categories:</h3>
        <p>{categories.map((category) => `${category}`)}</p>
      </div>
      <h3>Members</h3>
      {visibility === "public" ? (
        <MemberList
          members={combinedMembers}
          bookClubId={bookClubId}
          isLoading={isLoading}
        />
      ) : null}
      {visibility === "friendsCanSee" ? (
        <MemberList
          members={myFriends}
          bookClubId={bookClubId}
          isLoading={isLoading}
        />
      ) : null}
      {visibility === "private" ? (
        <p>Join this book club to see a list of its members</p>
      ) : null}

      {!isHost ? (
        <>
          <h3>Suggested Members</h3>
          <MemberList members={filteredMembers} />
          {/* <SearchBar
            className='searchInput'
            location='bookClub'
            dropDown={false}
            // userId
            // valueCallback={getChosenMemberResults}
          /> */}
        </>
      ) : null}
      <div>
        <h3>Next Meeting:</h3>
        <p>
          {nextMeetingDate} @ {nextMeetingTime}
          {online ? `Meeting Link: ${online}` : null}
          {inPerson ? (
            <div>
              <p>{streetAddress}</p>
              <p>
                {city}, {province}
              </p>
            </div>
          ) : null}
        </p>
        <h3>Meeting Frequency:</h3>
        {meetingFrequency}
      </div>
      <h3>Current Book:</h3>
      <SingleBookItem
        bookObj={books.currentBook}
        userId={user.userId}
        location={"bookClubMain"}
      />
      {/* <SingleBookItem bookObj={} userId={} location={} /> */}
      <h3>Next Book:</h3>
      <SingleBookItem
        bookObj={books.nextBook}
        userId={user.userId}
        location={"bookClubMain"}
      />
      <h3>Past Books:</h3>
      {books.previousBooks.map((book, key) => {
        <BookListItem key={key} bookObj={book} />;
      })}
      {/* <MemberList members={filteredMembers} bookClubId={bookClubId} /> */}
    </main>
  );
};
// books: {
//   currentBook: {title: 'Reese\'s 2nd Favourite Book', author: 'Luna Slink', thumbnail: ''},
//   nextBook: 'Oprah\'s 2nd Favourite Book',
//   upcomingBooks: ['New Book', 'New Odd Book', 'SoCal Dreams'],
//   previousBooks: ['Old Book 2', 'A 2nd Old Book', 'A 2nd Graphic Novel'],
// },

BookClubMain.propTypes = {
  bookClubObj: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default BookClubMain;
