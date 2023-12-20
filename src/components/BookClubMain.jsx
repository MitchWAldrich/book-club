import { useContext } from "react";
// import axios from "axios";

import PropTypes from "prop-types";

import MemberList from "./MemberList";
import SearchBar from "./Searchbar";

import userContext from "../userContext";

import { getUserByUserId } from "../utils/selectors";
import { usersMock } from "../mocks/users";

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

  const combinedUsers = (users) => {
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
  };

  const combinedMembers = combinedUsers(members);

  const filterSuggested = (usersFull, usersExempt) => {
    if (!usersFull?.length) return;

    const filteredUsers = usersFull?.filter(
      (user) => !usersExempt.includes(user)
    );

    return filteredUsers;
  };

  const filteredMembers = filterSuggested(usersMock, combinedMembers);

  // meetings: {
  //   meetingFrequency: 'bi-weekly',
  //   nextMeetingDate: '11/24/2023',
  //   nextMeetingTime: '7:00pm',
  //   nextMeetingLocation: {
  //     online: 'Zoom.otherLink',
  //     inPerson: {
  //       'streetNumber': 12,
  //       'unitNumber': 'N/A',
  //       'streetName': 'Dundas St. W',
  //       'city': 'Toronto',
  //       'province': 'ON',
  //       'country': 'CA'
  //     }
  //   }
  // },

  const {
    meetingFrequency,
    nextMeetingDate,
    nextMeetingTime,
    nextMeetingLocation,
  } = meetings;
  const { online, inPerson } = nextMeetingLocation;
  const { streetNumber, unitNumber, streetName, city, province, country } =
    inPerson;

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
            // id={userObj.id}
            // valueCallback={getChosenMemberResults}
          />
        </>
      ) : null}
      <div>
        <h3>Next Meeting:</h3>
        <p>
          {nextMeetingDate} @ {nextMeetingTime}
        </p>
      </div>
      {/* <MemberList members={filteredMembers} bookClubId={bookClubId} /> */}
    </main>
  );
};

BookClubMain.propTypes = {
  bookClubObj: PropTypes.object,
};

export default BookClubMain;
