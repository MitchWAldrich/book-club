import PropTypes from 'prop-types';

import MemberItem from './MemberItem';

const MemberListItem = (props) => {
  const { members } = props;

  return (
    <div>
      {members.map( (member, key) => (
        <MemberItem key={key} image={member.image} userName={member.userName} isOnline={member.isOnline}/>
      ))
      }
    </div>
  )
}

MemberListItem.propTypes = {
  members: PropTypes.array
}

export default MemberListItem;