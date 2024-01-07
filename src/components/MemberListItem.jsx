import PropTypes from "prop-types";

import MemberItem from "./MemberItem";

const MemberListItem = (props) => {
  const { members, valueCallback, container, location } = props;

  const renderMembers = (membersArray) => {
    if (!membersArray?.length && membersArray) {
      <MemberItem
        user={membersArray}
        image={membersArray.image}
        userId={membersArray.userId}
        userName={membersArray.username}
        isOnline={membersArray.isOnline}
        location={location}
      />;
    } else null;

    if (membersArray?.length >= 1) {
      return members?.map((member, key) => (
        <MemberItem
          key={key}
          user={member ?? {}}
          userId={member?.userId ?? ""}
          image={member?.image ?? ""}
          username={member?.username ?? ""}
          isOnline={member?.isOnline ?? null}
          valueCallback={valueCallback}
          container={container}
          location={location}
        />
      ));
    }
  };

  const memberDisplay = renderMembers(members) ?? null;

  return <div className='member-list'>{memberDisplay}</div>;
};

MemberListItem.propTypes = {
  members: PropTypes.array,
  valueCallback: PropTypes.func,
  container: PropTypes.string,
  location: PropTypes.string,
};

export default MemberListItem;
