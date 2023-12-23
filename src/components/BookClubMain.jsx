import { useContext } from "react";
// import axios from "axios";

import PropTypes from "prop-types";

import MemberList from "./MemberList";
import SearchBar from "./Searchbar";

import userContext from "../userContext";

import { getUserByUserId } from "../utils/selectors";
import { usersMock } from "../mocks/users";
import { formatStreetAddress } from "../utils/helpers";

const BookClubMain = (props) => {
  const user = useContext(userContext);
  const { bookClubObj } = props;

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

  const combinedUsers = (users, type) => {
    if (type === "allMembers") {
      const combinedUsers = [getUserByUserId(usersMock, bookClubHostId)];

      users?.accepted?.forEach((user) =>
        combinedUsers.push(getUserByUserId(usersMock, user))
      );
      users?.requested?.forEach((user) =>
        combinedUsers.push(getUserByUserId(usersMock, user))
      );
      users?.invited?.forEach((user) =>
        combinedUsers.push(getUserByUserId(usersMock, user))
      );

      return combinedUsers;
    }
  };

  const combinedMembers = combinedUsers(members, "allMembers");

  const isMember = combinedMembers.includes(user.userId) ? true : false;

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
      <h3>Members</h3>
      <MemberList members={combinedMembers} bookClubId={bookClubId} />

      {isHost ? (
        <>
          <h3>Suggested Members</h3>
          <SearchBar
            className='searchInput'
            location='bookClub'
            dropDown={false}
            // userId
            // valueCallback={getChosenMemberResults}
          />
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
      <h3>Next Book:</h3>
      <h3>Past Books:</h3>
      {/* <MemberList members={filteredMembers} bookClubId={bookClubId} /> */}
    </main>
  );
};

BookClubMain.propTypes = {
  bookClubObj: PropTypes.object,
};

export default BookClubMain;
