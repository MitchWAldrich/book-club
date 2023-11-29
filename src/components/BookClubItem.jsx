import { useState } from "react";
import instance from "../utils/axiosConfig";

import PropTypes from "prop-types";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";

import Address from "./Address";
import Input from "./Input";
import SearchBar from "./Searchbar";
import Dropdown from "./Dropdown";

const BookClubItem = (props) => {
  const { userObj, bookClubId } = props;

  const userId = userObj.userId;

  const [meetingBoolean, setMeetingBoolean] = useState(null);
  const [meetingTransmissionType, setMeetingTransmissionType] = useState(null);
  const [meetingLink, setMeetingLink] = useState(null);
  const [meetingLinkError, setMeetingLinkError] = useState(null);
  const [meetingFrequency, setMeetingFrequency] = useState(null);
  const [meetingDate, setMeetingDate] = useState(null);
  const [meetingTime, setMeetingTime] = useState(null);
  const [firstBook, setFirstBook] = useState(null);
  const [addMembers, setAddMembers] = useState(null);

  const addMeetingDetails = () => {
    instance.patch(`/bookclubs/${bookClubId}`, {
      meetings: {
        meetingFrequency: meetingFrequency,
        nextMeetingDate: meetingDate,
        nextMeetingTime: meetingTime,
        nextMeetingLocation: {
          virtual: meetingTransmissionType === "virtual" ? meetingLink : null,
          inPerson: meetingTransmissionType === "inPerson" ? address : null,
        },
      },
      isNewBookClub: false,
    });
  };

  const addFirstBook = () => {
    instance.patch(`/bookclubs/${bookClubId}`, {
      firstBook: firstBook,
      isNewBookClub: false,
    });
    /* show congratulations screen, then to bookclubs page */
  };

  const getChosenSearchResults = (searchValue) => {
    setFirstBook(searchValue);
  };

  const getChosenMemberResults = (searchValue) => {
    setAddMembers(searchValue);
  };

  const handleSubmit = () => {
    if (!meetingLink) {
      setMeetingLinkError(true);
    } else {
      setMeetingLinkError(false);
    }
  };

  const handleMeetingLinkChange = (e) => {
    setMeetingLink(e.target.value);
  };

  const meetingFrequencyList = ["Weekly", "Bi-weekly", "Monthly", "Custom"];

  const getMeetingBoolean = (bool) => {
    bool ? setMeetingBoolean(true) : setMeetingBoolean(false);
  };

  const getMeetingTransmissionType = (transmissionType) => {
    setMeetingTransmissionType(transmissionType);
  };

  const getMeetingAddress = () => {};

  const updateMembers = (userObj, bookClubId) => {
    instance.patch(`/api/bookclubs/${bookClubId}`, {
      bookClubId: bookClubId,
      newMembers: { invited: addMembers },
      location: "bookClubCreate",
    });
  };

  //make into smaller sections and pages turn to transition
  return (
    <main className='container'>
      <div className='form'>
        <h1 className='newBookClubTitle'>Create a BookClub</h1>
        <form className='newBookClubForm' onSubmit={handleSubmit}>
          {/* Add search functionality */}
          <h4>Search Members</h4>
          <SearchBar
            className='searchInput'
            location='bookClub'
            dropDown={false}
            id={userObj.id}
            valueCallback={getChosenMemberResults}
          />
          {addMembers?.length > 0 ? (
            <button
              type='button'
              onClick={() => updateMembers(addMembers, bookClubId)}
            >
              {addMembers.length > 1 ? "Invite Members" : "Invite Member"}
            </button>
          ) : null}
          <h4>Will your book club have meetings?</h4>
          <div className='buttons-2'>
            <button
              type='button'
              onClick={() => getMeetingBoolean(true)}
              className='buttons-accept'
            >
              Yes
            </button>
            <button
              type='button'
              onClick={() => getMeetingBoolean(false)}
              className='buttons-reject'
            >
              No
            </button>
          </div>
          {meetingBoolean ? (
            <>
              <h4>Will your meetings be in person or online?</h4>
              <div className='buttons-2'>
                <button
                  type='button'
                  onClick={() => getMeetingTransmissionType("inPerson")}
                  className='buttons-accept'
                >
                  In Person
                </button>
                <button
                  type='button'
                  onClick={() => getMeetingTransmissionType("virtual")}
                  className='buttons-reject'
                >
                  Online
                </button>
              </div>
              {meetingTransmissionType === "inPerson" ? (
                <>
                  <h4>Where is your meeting?</h4>
                  <Address valueCallback={getMeetingAddress} />
                </>
              ) : null}
              {meetingTransmissionType === "virtual" ? (
                <>
                  <h4>What is your meeting link?</h4>
                  <Input
                    type='text'
                    // label="Meeting Link"
                    value={meetingLink}
                    name='meetingLink'
                    error={meetingLinkError}
                    onChange={handleMeetingLinkChange}
                    placeholder='Please enter your meeting link'
                  />
                </>
              ) : null}
              <h4>How often will you meet?</h4>
              <Dropdown
                category={"MeetingFrequency"}
                options={meetingFrequencyList}
                valueCallback={setMeetingFrequency}
                dropdownName='NewBookClubMeetingFrequency'
              />
              <h4>When is the first meeting?</h4>
              <Calendar onChange={setMeetingDate} value={meetingDate} />
              <TimePicker onChange={setMeetingTime} value={meetingTime} />
            </>
          ) : null}
          <button className='btn' onClick={addMeetingDetails}>
            SET MEETING
          </button>
          <h4>What book will you read first?</h4>
          <SearchBar
            className='searchInput'
            location='bookClubFirstBook'
            dropDown={true}
            id={userObj.id}
            valueCallback={getChosenSearchResults}
          />
          {firstBook ? <div>First Book: {firstBook}</div> : null}
          <button className='btn' onClick={addFirstBook}>
            ADD BOOK
          </button>
        </form>
      </div>
    </main>
  );
};

BookClubItem.propTypes = {
  userObj: PropTypes.object,
  bookClubId: PropTypes.string,
};

export default BookClubItem;
