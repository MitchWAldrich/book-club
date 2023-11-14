import PropTypes from 'prop-types';

import { IconContext } from 'react-icons';
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";

const MemberItem = (props) => {
  const { image, userName, isOnline } = props;

  return (
    <main>
      <div>
        <img src={image} />
        <p>{userName}</p>
        { isOnline ? (
          <IconContext.Provider
            value={{ color: "green", size: "1.3em", className: "online-display" }}
          >
            <FaCircle />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider
            value={{ size: "1.3em", className: "online-display" }}
          >
            <FaRegCircle />
          </IconContext.Provider>
        )}
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