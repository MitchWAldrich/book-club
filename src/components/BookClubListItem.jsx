import instance from "../utils/axiosConfig";

import PropTypes from "prop-types";

import { bookMock } from "../mocks/books";

const BookClubListItem = (props) => {
  const { bookClubObj, userId } = props;
  const {
    bookClubId,
    // bookClubHostId,
    hostUserName,
    name,
    members,
    books,
    meetings,
    visibility,
    genre,
  } = bookClubObj;

  const { accepted } = members;
  // const { invited, accepted } = members;

  const { currentBook } = books;

  let { title, authors, thumbnail } = currentBook;
  title = bookMock.title;
  authors = bookMock.authors;
  thumbnail = bookMock.thumbnail;

  const {
    meetingFrequency,
    nextMeetingDate,
    nextMeetingTime,
    nextMeetingLocation,
  } = meetings;

  const { streetNumber, streetName, city, province, country } =
    nextMeetingLocation;

  const joinBookClub = () => {
    instance.patch(`/bookclubs/${bookClubId}`, {
      userId: userId,
      requestStatus: "join",
    });
    instance.patch(`/users/${userId}`, bookClubId);
  };

  const requestBookClub = () => {
    instance.patch(`/bookclubs/${bookClubId}`, {
      userId: userId,
      requestStatus: "request",
    });
    instance.patch(`/users/${userId}`, {
      bookClubId: bookClubId,
      requestStatus: "request",
    });
  };

  return (
    <main className='bookClubItemContainer'>
      <div>
        <h3 className='bookClubItemTitle'>{name}</h3>
      </div>
      <div>
        <p>{`Host: ${hostUserName}`}</p>
        <p>{`Members: ${bookClubObj.members.accepted.length}`}</p>
        {/* Members Icons: Accepted */}
        <p>{`Meetings: ${meetingFrequency}`}</p>
        <p>{`Genre: ${genre}`}</p>
        <p>{`Next Meeting: ${nextMeetingDate} at ${nextMeetingTime}`}</p>
        <p>
          {nextMeetingLocation.online
            ? "Online"
            : `Location: ${streetNumber} ${streetName}, ${city}, ${province}, ${country}`}
        </p>
        <div>
          <p>{`CurrentBook: ${title} by ${authors}`}</p>
          <img src={thumbnail} />
        </div>
        <button type='button' onClick={joinBookClub}>
          Join Book Club
        </button>
        <button type='button' onClick={requestBookClub}>
          Request Invitation
        </button>
      </div>
    </main>
  );
};

BookClubListItem.propTypes = {
  bookClubObj: PropTypes.object,
  userId: PropTypes.string,
};

export default BookClubListItem;
