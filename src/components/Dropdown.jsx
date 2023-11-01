import { useState } from 'react';
import PropTypes from 'prop-types';

const Dropdown = (props) => {
  const { category, options } = props;
  
  const menu = options.map((item, id) => ({ ['id']: id, ['title']: item, ['selected']: false, ['key']: category }));

  const [menuItems, setMenuItems] = useState(menu);
  const [ isListOpen, setIsListOpen ] = useState(false);
  const [ titleHeader, setTitleHeader ] = useState(menuItems[0].key);
  

  const resetThenSet = (id) => {
    
    const tempMenu = [...menuItems];
    tempMenu.forEach((item) => item.selected = false);
    tempMenu[id].selected = true;

    setMenuItems(tempMenu);

  }

  const toggleList = () => {
    setIsListOpen(!isListOpen);
 };

 const selectItem = (item) => {
  const { title, id } = item;

  setTitleHeader(title);
  setIsListOpen(false);
  resetThenSet(id);
}

    return (
      <main >
        <button
          type="button"
          className="dropdown-header"
          onClick={toggleList}
        >
          <div className="dropdown-header-title">{titleHeader}</div>
        </button>
        { isListOpen && (
          <div
            role="list"
            className="dropdown-list"
          >
            {menuItems.map((item) => (
              <button
                type="button"
                className="dropdown-list-item"
                key={item.id}
                onClick={() => selectItem(item)}
              >
                {item.title}
                {' '}
                {item.selected}
              </button>
            ))}
          </div>
        )}
      </main>
    )
};

Dropdown.propTypes = {
  category: PropTypes.string,
  options: PropTypes.array,
}

export default Dropdown;