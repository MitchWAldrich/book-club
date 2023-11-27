import { useState } from "react";
import instance from "../utils/axiosConfig";

import PropTypes from "prop-types";

import Input from "./Input";

const Address = (props) => {
  const { userId, valueCallback } = props;

  const [meetingStreetNumber, setMeetingStreetNumber] = useState(null);
  const [meetingStreetName, setMeetingStreetName] = useState(null);
  const [meetingUnitNumber, setMeetingUnitNumber] = useState(null);
  const [meetingStreetAddressError, setMeetingStreetAddressError] =
    useState(null);
  const [meetingCity, setMeetingCity] = useState(null);
  const [meetingProvince, setMeetingProvince] = useState(null);
  const [meetingCountry, setMeetingCountry] = useState(null);

  const addressObj = {
    streetNumber: meetingStreetNumber ?? "",
    unitNumber: meetingUnitNumber ?? "",
    streetName: meetingStreetName ?? "",
    city: meetingCity ?? "",
    province: meetingProvince ?? "",
    country: meetingCountry ?? "",
  };

  valueCallback(addressObj);

  const handleStreetNameChange = (e) => {
    setMeetingStreetName(e.target.value);
  };

  const handleStreetNumberChange = (e) => {
    setMeetingStreetNumber(e.target.value);
  };

  const handleUnitNumberChange = (e) => {
    setMeetingUnitNumber(e.target.value);
  };

  const handleCityChange = (e) => {
    setMeetingCity(e.target.value);
  };

  const handleProvinceChange = (e) => {
    setMeetingProvince(e.target.value);
  };

  const handleCountryChange = (e) => {
    setMeetingCountry(e.target.value);
  };

  // const submitAddress = () => {
  // if (!addressObj) {
  //   setMeetingStreetAddressError(true);
  // } else {
  //   setMeetingStreetAddressError(false);
  // }

  // instance
  //   .patch(`/bookclubs/${userId}`, addressObj)
  //   .then((response) => {
  //     console.log("addressresponse", response.data);
  //   })
  //   .catch((error) => console.error("address error", error));
  // };
  console.log;

  return (
    <>
      <Input
        type='number'
        label='Street Number'
        value={meetingStreetNumber}
        name='meetingStreetNumber'
        error={meetingStreetAddressError}
        onChange={handleStreetNumberChange}
        placeholder='Please enter your street number'
      />
      <Input
        type='text'
        label='Street Name'
        value={meetingStreetName}
        name='meetingStreetName'
        error={meetingStreetAddressError}
        onChange={handleStreetNameChange}
        placeholder='Please enter your street name'
      />
      <Input
        type='text'
        label='Unit/Apartment Number'
        value={meetingUnitNumber}
        name='meetingUnitNumber'
        error={meetingStreetAddressError}
        onChange={handleUnitNumberChange}
        placeholder='Please enter your unit/apartment number'
      />
      <Input
        type='text'
        label='City'
        value={meetingCity}
        name='meetingCity'
        error={meetingCity}
        onChange={handleCityChange}
        placeholder='Please enter your city'
      />
      <Input
        type='text'
        label='Province/State'
        value={meetingProvince}
        name='meetingProvince'
        error={meetingProvince}
        onChange={handleProvinceChange}
        placeholder='Please enter your province or state'
      />
      <Input
        type='text'
        label='Country'
        value={meetingCountry}
        name='meetingCountry'
        error={meetingStreetAddressError}
        onChange={handleCountryChange}
        placeholder='Please enter your country'
      />
      {/* <button type='button' onClick={submitAddress}>
        Submit Address
      </button> */}
    </>
  );
};

Address.propTypes = {
  userId: PropTypes.string,
  valueCallback: PropTypes.func,
};

export default Address;
