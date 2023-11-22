import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import instance from "../utils/axiosConfig";

const Invitation = (props) => {
  const { bookClubObj, userId } = props;

  const [acceptanceState, setAcceptanceState] = useState("");

  useEffect(() => {
    instance
      .patch(`/api/bookclubs/${bookClubObj.bookClubId}`, {
        bookClubId: bookClubObj.bookClubId,
        newMembers: [userId],
        acceptanceStatus: acceptanceState,
      })
      .then((response) => {
        console.log("invite response", response.data);
      })
      .catch((error) => console.error("invite error", error));

    instance
      .patch(`/api/users/${userId}`, {
        bookClubId: bookClubObj.bookClubId,
        userId: userId,
        bookClubApprovalStatus: acceptanceState,
      })
      .then((response) => {
        console.log("invite response", response.data);
      })
      .catch((error) => console.error("invite error", error));
  }, [acceptanceState]);

  const handleAcceptInvitation = (e) => {
    e.preventDefault();
    setAcceptanceState("accepted");
  };

  const handleRejectInvitation = (e) => {
    e.preventDefault();
    setAcceptanceState("rejected");
  };

  return (
    <main>
      You are invited to {bookClubObj.name}
      <div className='invitation-buttons'>
        <button
          className='invitation-buttons-accept'
          type='button'
          onClick={handleAcceptInvitation}
        >
          Accept Invitation
        </button>
        <button
          className='invitation-buttons-reject'
          type='button'
          onClick={handleRejectInvitation}
        >
          Reject Invitation
        </button>
      </div>
    </main>
  );
};

Invitation.propTypes = {
  bookClubObj: PropTypes.object,
  userId: PropTypes.string,
};

export default Invitation;
