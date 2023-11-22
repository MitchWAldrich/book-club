import instance from "./../utils/axiosConfig.js";

import PropTypes from "prop-types";

import MemberListItem from "./MemberListItem";

const MemberList = (props) => {
  const { members, bookClubId } = props;

  const invitee = "34xc98(dfk";

  const inviteMember = (e) => {
    () => e.preventdefault();

    instance
      .patch(`/api/bookclubs/${bookClubId}`, {
        newMembers: members,
        bookClubId: bookClubId,
      })
      .then((response) => {
        console.log("invite response", response.data);
      })
      .catch((error) => console.error("invite error", error));

    instance
      .patch(`/api/users/${invitee}`, {
        userId: invitee,
        bookClubId: bookClubId,
        bookClubApprovalStatus: "invited",
      })
      .then((response) => {
        console.log("invite response", response.data);
      })
      .catch((error) => console.error("invite error", error));
  };

  return (
    <main className='members-container'>
      <h3>Members</h3>
      <div>
        <MemberListItem members={members} />
      </div>
      <button
        type='button'
        className='member-add-button'
        onClick={inviteMember}
      >
        Invite Member
      </button>
    </main>
  );
};

MemberList.propTypes = {
  members: PropTypes.array,
  bookClubId: PropTypes.string || PropTypes.number,
};

export default MemberList;
