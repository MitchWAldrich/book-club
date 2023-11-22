import { useState } from 'react';
import instance from '../utils/axiosConfig';

import PropTypes from 'prop-types';

import Input from "./Input";

const Address = (props) => {
  const { userId } = props;

  const [ meetingStreetNumber, setMeetingStreetNumber ] = useState(null);
  const [ meetingStreetName, setMeetingStreetName ] = useState(null);
  const [ meetingUnitNumber, setMeetingUnitNumber ] = useState(null);
  const [ meetingStreetAddressError, setMeetingStreetAddressError ] = useState(null);
  const [ meetingCity, setMeetingCity ] = useState(null);
  const [ meetingProvince, setMeetingProvince ] = useState(null);
  const [ meetingCountry, setMeetingCountry ] = useState(null);

  const addressObj = {
    'streetNumber': meetingStreetNumber,
    'unitNumber': meetingUnitNumber,
    'streetName': meetingStreetName,
    'city': meetingCity,
    'province': meetingProvince,
    'country': meetingCountry
  }

  const submitAddress = () => {
    if (!addressObj) {
      setMeetingStreetAddressError(true);
    } else {
      setMeetingStreetAddressError(false);
    }
    
    instance.patch(`/bookclubs/${userId}`, addressObj)
    .then(response => {
      console.log('addressresponse', response.data)  
    })
    .catch(error => console.error('address error', error));
  };


  return (
    <>
    <Input
      type="number"
      label="Street Number"
      value={meetingStreetNumber}
      name="meetingStreetNumber"
      error={meetingStreetAddressError}
      onChange={setMeetingStreetNumber}
      placeholder="Please enter your street number"
  />
  <Input
      type="text"
      label="Street Name"
      value={meetingStreetName}
      name="meetingStreetName"
      error={meetingStreetAddressError}
      onChange={setMeetingStreetName}
      placeholder="Please enter your street name"
  />
  <Input
      type="text"
      label="Unit/Apartment Number"
      value={meetingUnitNumber}
      name="meetingUnitNumber"
      error={meetingStreetAddressError}
      onChange={setMeetingUnitNumber}
      placeholder="Please enter your unit/apartment number"
  />
  <Input
      type="text"
      label="City"
      value={meetingCity}
      name="meetingCity"
      error={meetingCity}
      onChange={setMeetingCity}
      placeholder="Please enter your city"
  />
  <Input
      type="text"
      label="Province/State"
      value={meetingProvince}
      name="meetingProvince"
      error={meetingProvince}
      onChange={setMeetingProvince}
      placeholder="Please enter your province or state"
  />
  <Input
      type="text"
      label="Country"
      value={meetingCountry}
      name="meetingCountry"
      error={meetingStreetAddressError}
      onChange={setMeetingCountry}
      placeholder="Please enter your country"
  />
  <button type="button" onClick={submitAddress}>Submit Address</button>
  </>
  )
}

Address.propTypes = {
  userId: PropTypes.string
}

export default Address;