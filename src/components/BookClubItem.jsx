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
  const { userObj, bookClubId, isNew, valueCallback } = props;

  const userId = userObj.userId;

  const [meetingBoolean, setMeetingBoolean] = useState(null);
  const [meetingTransmissionType, setMeetingTransmissionType] = useState(null);
  const [meetingLink, setMeetingLink] = useState(null);
  const [meetingLinkError, setMeetingLinkError] = useState(null);
  const [meetingFrequency, setMeetingFrequency] = useState(null);
  const [meetingAddress, setMeetingAddress] = useState(null);
  const [meetingDate, setMeetingDate] = useState(null);
  const [meetingTime, setMeetingTime] = useState(null);
  const [firstBook, setFirstBook] = useState(null);
  const [addMembers, setAddMembers] = useState(null);
  const [bookClubSetupState, setBookClubSetupState] = useState(
    // isNew ? "membersState" : null
    isNew ? "membersState" : null
  );

  const addMeetingDetails = () => {
    instance.patch(`/bookclubs/${bookClubId}`, {
      meetings: {
        meetingFrequency: meetingFrequency,
        nextMeetingDate: meetingDate,
        nextMeetingTime: meetingTime,
        nextMeetingLocation: {
          virtual: meetingTransmissionType === "virtual" ? meetingLink : null,
          inPerson:
            meetingTransmissionType === "inPerson" ? meetingAddress : null,
        },
      },
      isNewBookClub: false,
    });
    setBookClubSetupState("firstBookState");
  };

  const addFirstBook = () => {
    instance.patch(`/bookclubs/${bookClubId}`, {
      firstBook: firstBook,
      isNewBookClub: false,
    });
    setBookClubSetupState("congratulationsState");
  };

  const getChosenSearchResults = (searchValue) => {
    setFirstBook(searchValue);
  };

  const getChosenMemberResults = (searchValue) => {
    setAddMembers(searchValue);
  };

  const handleMeetingLinkChange = (e) => {
    if (!meetingLink) {
      setMeetingLinkError(true);
    } else {
      setMeetingLinkError(false);
    }

    setMeetingLink(e.target.value);
  };

  const meetingFrequencyList = ["Weekly", "Bi-weekly", "Monthly", "Custom"];

  const getMeetingBoolean = (bool) => {
    bool ? setMeetingBoolean(true) : setMeetingBoolean(false);
  };

  const getMeetingTransmissionType = (transmissionType) => {
    setMeetingTransmissionType(transmissionType);
  };

  const getMeetingAddress = (addressObj) => {
    setMeetingAddress(addressObj);
  };

  const updateMembers = (userObj, bookClubId) => {
    instance.patch(`/api/bookclubs/${bookClubId}`, {
      bookClubId: bookClubId,
      newMembers: { invited: addMembers },
      location: "bookClubCreate",
    });
    setBookClubSetupState("meetingState");
  };

  const closeBookClubSetup = () => {
    setBookClubSetupState("");
    valueCallback(false);
  };
  //make into smaller sections and pages turn to transition
  return (
    <main>
      <div className='bookClubSetUp'>
        <h1 className='newBookClubTitle'>Create a BookClub</h1>
        {bookClubSetupState === "membersState" ? (
          <div className='newBookClubMembers'>
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
          </div>
        ) : null}
        {bookClubSetupState === "meetingState" ? (
          <div>
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
                    <Address valueCallback={() => getMeetingAddress} />
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
                {meetingTransmissionType ? (
                  <>
                    <h4>How often will you meet?</h4>
                    <Dropdown
                      category={"MeetingFrequency"}
                      options={meetingFrequencyList}
                      valueCallback={setMeetingFrequency}
                      dropdownName='NewBookClubMeetingFrequency'
                    />
                    {meetingFrequency ? (
                      <>
                        <h4>When is the first meeting?</h4>
                        <Calendar
                          className='meetingCal'
                          onChange={setMeetingDate}
                          value={meetingDate}
                        />
                        <TimePicker
                          className='meetingTime'
                          onChange={setMeetingTime}
                          name='Meeting Time'
                          value={meetingTime}
                          clockClassName={"meetingClock"}
                          format='h:m a'
                        />
                      </>
                    ) : null}
                  </>
                ) : null}
              </>
            ) : null}
            <button className='btn' onClick={addMeetingDetails}>
              SET MEETING
            </button>
          </div>
        ) : null}
        {bookClubSetupState === "firstBookState" ? (
          <div className='newBookClubFirstBook'>
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
          </div>
        ) : null}
        {bookClubSetupState === "congratulationsState" ? (
          <div className='newBookClubCongratulations'>
            <h4>Congratulations! You've set up your Book Club!</h4>
            <button className='btn' type='button' onClick={closeBookClubSetup}>
              CLOSE
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
};

BookClubItem.propTypes = {
  userObj: PropTypes.object,
  bookClubId: PropTypes.string,
  isNew: PropTypes.bool,
  valueCallback: PropTypes.func,
};

export default BookClubItem;
