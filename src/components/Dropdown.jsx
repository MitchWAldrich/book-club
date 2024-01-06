import { useState } from "react";
import PropTypes from "prop-types";

const Dropdown = (props) => {
  const { category, options, defaultValue, valueCallback, dropdownName } =
    props;
  console.log("defaultVal", defaultValue);

  const menu = options.map((item, id) => ({
    ["id"]: id,
    ["title"]: item,
    ["selected"]: false,
    ["key"]: category,
  }));

  const [menuItems, setMenuItems] = useState(menu);
  const [isListOpen, setIsListOpen] = useState(false);
  const [titleHeader, setTitleHeader] = useState(defaultValue);

  const resetThenSet = (id) => {
    const tempMenu = [...menuItems];

    tempMenu.forEach((item) => (item.selected = false));
    tempMenu[id].selected = true;

    setMenuItems(tempMenu);
  };

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const selectItem = (item, event) => {
    const { title, id } = item;

    setTitleHeader(title);
    setIsListOpen(false);
    resetThenSet(id, title, event);

    if (dropdownName === "bookClubSearch") {
      valueCallback(title.toLowerCase());
    } else if (
      dropdownName === "GoalUnitsDropdown" ||
      dropdownName === "GoalTimelineDropdown" ||
      dropdownName === "GoalRecurrenceDropdown"
    ) {
      valueCallback(title.toLowerCase(), dropdownName);
    } else {
      valueCallback(title);
    }
  };

  return (
    <main className='dropdown-container'>
      <button type='button' className='dropdown-header' onClick={toggleList}>
        <div className='dropdown-header-title'>{titleHeader}</div>
      </button>
      {isListOpen && (
        <div role='list' className='dropdown-list'>
          {menuItems.map((item) => (
            <button
              type='button'
              className='dropdown-list-item'
              key={item.id}
              value={item.selected}
              onClick={(event) => selectItem(item, event)}
            >
              {item.title} {item.selected}
            </button>
          ))}
        </div>
      )}
    </main>
  );
};

Dropdown.propTypes = {
  category: PropTypes.string,
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  valueCallback: PropTypes.func,
  dropdownName: PropTypes.string,
};

export default Dropdown;
