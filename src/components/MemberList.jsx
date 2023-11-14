import PropTypes from 'prop-types';

import MemberListItem from "./MemberListItem";

const MemberList = (props) => {
  const { members } = props;

  return (
    <main>
      <MemberListItem members={members}/>
    </main>
  )
}

MemberList.propTypes = {
  members: PropTypes.array
}

export default MemberList;