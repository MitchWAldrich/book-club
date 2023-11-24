import { useState } from "react";
import instance from "./../utils/axiosConfig.js";

import PropTypes from "prop-types";

import MemberListItem from "./MemberListItem";
import Loading from "./Loading.jsx";

const MemberList = (props) => {
  const { members, bookClubId, valueCallback, location } = props;

  const [membersAdd, setMembersAdd] = useState([]);
  const [membersSuggested, setMembersSuggested] = useState(members);
  // const [membersSuggested, setMembersSuggested] = useState([
  //   {
  //     id: 1,
  //     userId: "34xc98(dfk",
  //     email: "user1@email.com",
  //     password: "password",
  //     username: "user1",
  //     image:
  //       "https://www.perfocal.com/blog/content/images/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg",
  //     goals: [],
  //     library: {
  //       haveRead: [],
  //       toRead: [],
  //     },
  //     bookClubs: {
  //       host: ["fdul694*"],
  //       invited: [],
  //       accepted: ["sdfjil234)", "fsqjil$t72"],
  //     },
  //     friends: {
  //       requested: [],
  //       accepted: ["523dgf*5gn&", "62jt*(kj!3"],
  //     },
  //   },
  //   {
  //     id: 2,
  //     userId: "523dgf*5gn&",
  //     email: "user2@email.com",
  //     password: "password",
  //     username: "user2",
  //     image:
  //       "https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture.jpg",
  //     goals: [],
  //     library: {
  //       haveRead: [],
  //       toRead: [],
  //     },
  //     bookClubs: {
  //       host: ["fsqjil$t72"],
  //       invited: ["sdfjil234"],
  //       accepted: ["fdul694*"],
  //     },
  //     friends: {
  //       requested: [],
  //       accepted: ["34xc98(dfk", "62jt*(kj!3"],
  //     },
  // },
  // ]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const invitee = "34xc98(dfk";

  // const inviteMember = (e) => {
  //   () => e.preventdefault();

  //   instance
  //     .patch(`/api/bookclubs/${bookClubId}`, {
  //       newMembers: members,
  //       bookClubId: bookClubId,
  //     })
  //     .then((response) => {
  //       console.log("invite response", response.data);
  //     })
  //     .catch((error) => console.error("invite error", error));

  //   instance
  //     .patch(`/api/users/${invitee}`, {
  //       userId: invitee,
  //       bookClubId: bookClubId,
  //       bookClubApprovalStatus: "invited",
  //     })
  //     .then((response) => {
  //       console.log("invite response", response.data);
  //     })
  //     .catch((error) => console.error("invite error", error));
  // };

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
      <h3>Suggested Members</h3>
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
      {/* <button
        type='button'
        className='member-add-button'
        onClick={inviteMember}
      >
        Invite Member
      </button> */}
    </main>
  );
};

MemberList.propTypes = {
  members: PropTypes.array,
  bookClubId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueCallback: PropTypes.func,
  location: PropTypes.string,
};

export default MemberList;
