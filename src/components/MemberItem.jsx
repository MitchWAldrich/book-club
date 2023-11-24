import { useState } from "react";
import PropTypes from "prop-types";

import { IconContext } from "react-icons";
import { IoBookOutline } from "react-icons/io5";
import { IoBook } from "react-icons/io5";

const MemberItem = (props) => {
  const { user, valueCallback, container, location } = props;
  const { image, username, isOnline } = user;

  const [selected, setSelected] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    valueCallback(user, !selected, container, location);
    setSelected(selected);
  };

  return (
    <main>
      <button
        type='button'
        onClick={handleClick}
        className={selected ? "member-item-selected" : "member-item"}
      >
        <img src={image} className='member-image' />
        <div className='member-online'>
          {isOnline ? (
            <IconContext.Provider
              value={{
                color: "green",
                size: "1.3em",
                className: "online-display",
              }}
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
        <div className='member-name'>
          <p>{username}</p>
        </div>
      </button>
    </main>
  );
};

MemberItem.propTypes = {
  user: PropTypes.object,
  valueCallback: PropTypes.func,
  container: PropTypes.string,
  location: PropTypes.string,
};

export default MemberItem;
