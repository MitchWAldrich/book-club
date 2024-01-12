import PropTypes from "prop-types";

import MemberList from "./MemberList";
import SearchBar from "./Searchbar";

// import { usersMock } from "../mocks/users";

const AddMember = (props) => {
  const { members, user } = props;

  return (
    <div className='form'>
      <h3>Add Members</h3>
      <SearchBar
        className='searchBar'
        location='addUser'
        dropDown={true}
        id={user.userId}
        // valueCallback={getChosenSearchResults}
      />
      <h3>Suggested Friends</h3>
      <MemberList members={members} userId={user.userId} location='friends' />
    </div>
  );
};

AddMember.propTypes = {
  members: PropTypes.array,
  user: PropTypes.object,
};

export default AddMember;
