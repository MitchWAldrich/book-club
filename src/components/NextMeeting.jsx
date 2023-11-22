import PropTypes from "prop-types";

const NextMeeting = (props) => {
  const { bookClub } = props;

  return (
    <>
      <div className='bookClubNextMeeting'>
        <h3 className='bookClubNextMeetingHeading'>Next Meeting</h3>
        <p className='bookClubNextMeetingTitle'>Date:</p>
        <p className='bookClubNextMeetingText'>
          {bookClub.meetings.nextMeetingDate}
        </p>
        <p className='bookClubNextMeetingTitle'>Time:</p>
        <p className='bookClubNextMeetingText'>
          {bookClub.meetings.nextMeetingTime}
        </p>
        {/* Add formatting for address object */}
        <p className='bookClubNextMeetingTitle'>Location:</p>
        <p className='bookClubNextMeetingText'>
          {bookClub.meetings.nextMeetingLocation?.online}
        </p>
      </div>
    </>
  );
};

NextMeeting.propTypes = {
  bookClub: PropTypes.object,
};

export default NextMeeting;
