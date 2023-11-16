import instance from './../utils/axiosConfig.js'

import PropTypes from 'prop-types';

import MemberListItem from "./MemberListItem";

const MemberList = (props) => {
  const { members, bookClubId } = props;

  const invitee = 'userId1xxx';

    //invite members
    //2 statuses: invited, accepted
    const inviteMember = (e) => {
      () => e.preventdefault();
      instance.patch(`/api/bookclubs/${bookClubId}`, { userId: invitee, bookClubId: bookClubId })
     .then(response => {
      console.log('invite response', response.data)  
    })
    .catch(error => console.error('invite error', error)); 
    }

  return (
    <main className="members-container">
      <h3>Members</h3>
      <div>
        <MemberListItem members={members}/>
      </div>
      <button type="button" className="member-add-button" onClick={inviteMember}>Invite Member</button>
    </main>
  )
}

MemberList.propTypes = {
  members: PropTypes.array,
  bookClubId: PropTypes.string || PropTypes.number
}

export default MemberList;