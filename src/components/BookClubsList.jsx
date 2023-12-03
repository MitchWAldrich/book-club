import PropTypes from "prop-types";

import BookClubListItem from "./BookClubListItem";

const BookClubsList = (props) => {
  const { bookClubObj, userId } = props;
  return (
    <main>
      <BookClubListItem
        // key={key}
        bookClubObj={bookClubObj}
        userId={userId}
      />
    </main>
  );
};

BookClubsList.propTypes = {
  bookClubObj: PropTypes.object,
  userId: PropTypes.string,
};

export default BookClubsList;
