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
  const { userId } = props;

  const [ meetingBoolean, setMeetingBoolean ] = useState(true);
  // const [ meetingBoolean, setMeetingBoolean ] = useState(null);
  const [ meetingTransmissionType, setMeetingTransmissionType ] = useState('In Person');
  // const [ meetingTransmissionType, setMeetingTransmissionType ] = useState(null);
  const [ meetingLink, setMeetingLink ] = useState(null);
  const [ meetingLinkError, setMeetingLinkError ] = useState(null);
  const [ meetingFrequency, setMeetingFrequency ] = useState(null);
  const [ meetingDate, setMeetingDate ] = useState(null);
  const [ meetingTime, setMeetingTime ] = useState(null);
  const [ firstBook, setFirstBook ] = useState(null);

console.log('meetingDate', meetingDate);

  const updateBookClub = () => {
    instance.patch(`/bookclubs/${userId}`, {
      'members': {invited: ['62jt*(kj!3'], accepted: ['523dgf*5gn&']},
      'firstBook': firstBook,
      'meetings': {
        'meetingFrequency': meetingFrequency,
        'nextMeetingDate': meetingDate,
        'nextMeetingTime': meetingTime,
        'nextMeetingLocation': {
          'online': meetingTransmissionType === 'Online' ? meetingLink : null
          }
      },
      'isNewBookClub': false
    })
  }

  const handleSubmit = () => {

  };

  const handleMeetingLinkChange = (e) => {
    setMeetingLink(e.target.value);
  };

  const meetingUnits = ['Yes', 'No'];
  const meetingTypes = ['In Person', 'Online', 'Both'];
  const meetingFrequencyList = ['Weekly', 'Bi-weekly', 'Monthly', 'Custom'];
  
  const getResult = (dropdownValue) => {
    if (dropdownValue === 'Yes') {
      setMeetingBoolean(true);
    }

    if (dropdownValue === 'No') {
      setMeetingBoolean(false);
    }

    if (dropdownValue === 'In Person') {
      setMeetingTransmissionType(dropdownValue);
    }

    if (dropdownValue === 'Virtual') {
      setMeetingTransmissionType(dropdownValue);
    }
  }

  //make into smaller sections and pages turn to transition
  return (
    <main className='container'>
        <div className='form'>
            <h1 className='newBookClubTitle'>Create a BookClub</h1>
            <form className='newBookClubForm' onSubmit={handleSubmit}>
                <h4>Add Members</h4>
                <SearchBar />
                <h4>Will your book club have meetings?</h4>
                <Dropdown category={'Meetings'} options={meetingUnits} valueCallback={getResult} dropdownName='NewBookClubMeeting' />
                { meetingBoolean ? (
                  <>
                    <h4>Will your meetings be in person or online?</h4>
                    <Dropdown category={'MeetingTransmissionType'} options={meetingTypes} valueCallback={getResult} dropdownName='NewBookClubMeetingTransmissionType' />  
                    {meetingTransmissionType === 'In Person' ? (
                      <>
                        <h4>Where is your meeting?</h4>
                       <Address />
                      </>
                    ) : null }
                    {meetingTransmissionType === 'Virtual' ? (
                    <>
                      <h4>What is your meeting link?</h4>
                      <Input
                        type="text"
                        // label="Meeting Link"
                        value={meetingLink}
                        name="meetingLink"
                        error={meetingLinkError}
                        onChange={handleMeetingLinkChange}
                        placeholder="Please enter your meeting link"
                      />
                    </>
                    ) : null }
                    <h4>How often will you meet?</h4>
                    <Dropdown category={'MeetingFrequency'} options={meetingFrequencyList} valueCallback={setMeetingFrequency} dropdownName='NewBookClubMeetingFrequency' />  
                    <h4>When is the first meeting?</h4>
                    <Calendar onChange={setMeetingDate} value={meetingDate} />
                  <TimePicker onChange={setMeetingTime} value={meetingTime} />
                  <h4>What book will you read first?</h4>
                  <SearchBar />
                  </>
                ) : null }
                <button className='btn' onClick={updateBookClub}>UPDATE</button>
            </form>
        </div>
    </main>
  )
};

BookClubItem.propTypes = {
  userId: PropTypes.string
}

export default BookClubItem;