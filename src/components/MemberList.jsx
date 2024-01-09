import { useState } from "react";

import PropTypes from "prop-types";

import MemberListItem from "./MemberListItem";
import Loading from "./Loading.jsx";

const MemberList = (props) => {
  const { members, userId, valueCallback, location, isLoading } = props;

  const [membersAdd, setMembersAdd] = useState([]);
  // const [membersSuggested, setMembersSuggested] = useState(members);
  const [membersSuggested, setMembersSuggested] = useState(members ?? []);
  // const [friendsSuggested, setFriendsSuggested] = useState(users)

  if (location === "bookClubCreate") {
    valueCallback(membersAdd);
  }

  const updateAddMembers = (memVal) => {
    setMembersAdd([...membersAdd, memVal]);
    setMembersSuggested(
      membersSuggested.filter((member) => member.userId !== memVal.userId)
    );
  };

  const removeAddMembers = (rememVal) => {
    setMembersAdd(
      membersAdd.filter((member) => member.userId !== rememVal.userId)
    );
    setMembersSuggested([...membersSuggested, rememVal]);
  };

  const getMembers = (memberValue, selected, container) => {
    if (container === "addMembers") {
      if (selected) {
        removeAddMembers(memberValue);
        selected = false;
      }
    }

    if (container === "suggestedMembers") {
      if (selected) {
        updateAddMembers(memberValue);
        selected = false;
      }
    }
  };

  return (
    <main className='members-container'>
      {membersAdd.length > 0 ? (
        <>
          <h3>Add Members</h3>
          <div>
            <MemberListItem
              members={membersAdd}
              valueCallback={getMembers}
              container='addMembers'
            />
          </div>
        </>
      ) : null}
      {membersSuggested.length > 0 ? (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <MemberListItem
                members={membersSuggested}
                valueCallback={getMembers}
                container='suggestedMembers'
              />
            </div>
          )}
        </>
      ) : null}
    </main>
  );
};

MemberList.propTypes = {
  members: PropTypes.array,
  bookClubId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  userId: PropTypes.string,
  valueCallback: PropTypes.func,
  location: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default MemberList;
