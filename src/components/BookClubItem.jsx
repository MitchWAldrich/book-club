import { useState } from "react";

import Input from "./Input";
import SearchBar from "./Searchbar";
import Dropdown from "./Dropdown";

const BookClubItem = () => {
  const [ meetingBoolean, setMeetingBoolean ] = useState(true);
  // const [ meetingBoolean, setMeetingBoolean ] = useState(null);
  const [ meetingTransmissionType, setMeetingTransmissionType ] = useState('In Person');
  // const [ meetingTransmissionType, setMeetingTransmissionType ] = useState(null);
  const [ meetingLink, setMeetingLink ] = useState(null);
  const [ meetingLinkError, setMeetingLinkError ] = useState(null);

  const updateBookClub = () => {

  }

  const handleSubmit = () => {

  };

  const handleMeetingLinkChange = (e) => {
    setMeetingLink(e.target.value);
  };

  const meetingUnits = ['Yes', 'No'];
  const meetingTypes = ['In Person', 'Online', 'Both']
  
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
                    <h4>Where is your meeting?</h4>
                    ) : null }
                    {meetingTransmissionType === 'Virtual' ? (
                    <>
                      <h4>What is your meeting link?</h4>
                      <Input
                        type="text"
                        // label="Meeting Link"
                        value={meetingLink}
                        name="username"
                        error={meetingLinkError}
                        onChange={handleMeetingLinkChange}
                        placeholder="Please enter your meeting link"
                      />
                    </>
                    ) : null }
                  </>
                ) : null }
                <button className='btn' onClick={updateBookClub}>UPDATE</button>
            </form>
        </div>
    </main>
  )
};

export default BookClubItem;

// members: {invited: ['62jt*(kj!3'], accepted: ['523dgf*5gn&']},
// books: {
//   currentBook: 'Reese\'s 3rd Favourite Book',
//   nextBook: 'Oprah\'s 3rd Favourite Book',
//   upcomingBooks: ['Three and One Book', 'Books are Fun', 'Anatomy of a Society'],
//   previousBooks: ['Old Book 3', 'Third Old Book', 'A 3rd Graphic Novel'],
// },
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
// isNewBookClub: false