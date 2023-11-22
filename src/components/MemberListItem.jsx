import PropTypes from "prop-types";

import MemberItem from "./MemberItem";

const MemberListItem = (props) => {
  const { members } = props;

  const renderMembers = (membersArray) => {
    if (!membersArray.length && membersArray) {
      <MemberItem
        image={membersArray.image}
        userName={membersArray.username}
        isOnline={membersArray.isOnline}
      />;
    } else null;

    if (membersArray.length === 1) {
      return (
        <MemberItem
          image={membersArray[0].image}
          userName={membersArray[0].username}
          isOnline={membersArray[0].isOnline}
        />
      );
    }

    if (membersArray.length > 1) {
      return members.map((member, key) => (
        <MemberItem
          key={key}
          image={member.image}
          userName={member.username}
          isOnline={member.isOnline}
        />
      ));
    }
  };

  const memberDisplay = renderMembers(members);

  return <div className='member-list'>{memberDisplay}</div>;
};

MemberListItem.propTypes = {
  members: PropTypes.array,
};

export default MemberListItem;
