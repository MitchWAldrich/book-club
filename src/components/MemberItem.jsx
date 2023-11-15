import PropTypes from 'prop-types';

import { IconContext } from 'react-icons';
import { IoBookOutline } from "react-icons/io5";
import { IoBook } from "react-icons/io5";

const MemberItem = (props) => {
  const { image, userName, isOnline } = props;

  return (
    <main>
      <div className="member-item">
        <img src={image} className="member-image"/>
        <div className="member-online">
          { isOnline ? (
            <IconContext.Provider
              value={{ color: "green", size: "1.3em", className: "online-display" }}
            >
              <IoBook />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{ size: "1.3em", className: "online-display" }}
            >
              <IoBookOutline />
            </IconContext.Provider>
          )}
        </div>
        <div className="member-name">
          <p>{userName}</p>
        </div>
      </div>
    </main>
  )
}

MemberItem.propTypes = {
  image: PropTypes.string,
  isOnline: PropTypes.bool,
  userName: PropTypes.string,
}

export default MemberItem;