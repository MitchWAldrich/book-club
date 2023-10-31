import PropTypes from 'prop-types';

const Dropdown = () => {
  // let { title, list, isListOpen } = props;

  //     list = [
  //       {
  //           id: 0,
  //           title: 'New York',
  //           selected: false,
  //           key: 'location'
  //       },
  //       {
  //           id: 1,
  //           title: 'Dublin',
  //           selected: false,
  //           key: 'location'
  //       },
  //       {
  //           id: 2,
  //           title: 'California',
  //           selected: false,
  //           key: 'location'
  //       },
  //       {
  //           id: 3,
  //           title: 'Istanbul',
  //           selected: false,
  //           key: 'location'
  //       },
  //       {
  //           id: 4,
  //           title: 'Izmir',
  //           selected: false,
  //           key: 'location'
  //       },
  //       {
  //           id: 5,
  //           title: 'Oslo',
  //           selected: false,
  //           key: 'location'
  //       }
  //     ]

  //   return (
  //     <div className="dropdown-wrapper">
  //       <button
  //         type="button"
  //         className="dropdown-header"
  //         onClick={this.toggleList}
  //       >
  //         <div className="dropdown-header-title">{headerTitle}</div>
  //         {isListOpen
  //           ? <p>Hold</p>
  //           : <p>Hold2</p>}
  //       </button>
  //       {isListOpen && (
  //         <div
  //           role="list"
  //           className="dropdown-list"
  //         >
  //           {list.map((item) => (
  //             <button
  //               type="button"
  //               className="dropdown-list-item"
  //               key={item.id}
  //               onClick={() => this.selectItem(item)}
  //             >
  //               {item.title}
  //               {' '}
  //               {item.selected}
  //             </button>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   )

  return (
    <div className="dropdown-wrapper">
      <div className="dropdown-header">
        <div className="dropdown-header-title"></div>
      </div>
      <div className="dropdown-list">
        <button className="dropdown-list-item"></button>
        <button className="dropdown-list-item"></button>
        <button className="dropdown-list-item"></button>
      </div>
    </div>
  )
};

Dropdown.propTypes = {
  title: PropTypes.string,
  list: PropTypes.object,
}

export default Dropdown;