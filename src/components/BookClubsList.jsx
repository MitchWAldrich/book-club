import PropTypes from "prop-types";

import BookClubListItem from "./BookClubListItem";

const BookClubsList = (props) => {
  const { bookClubObjs, userId } = props;
  console.log("bookCObjs", bookClubObjs);
  return (
    <main>
      {bookClubObjs.length ? (
        bookClubObjs.map((bookClub, key) => (
          <BookClubListItem key={key} bookClubObj={bookClub} userId={userId} />
        ))
      ) : bookClubObjs ? (
        <BookClubListItem bookClubObj={bookClubObjs} userId={userId} />
      ) : null}
    </main>
  );
};

BookClubsList.propTypes = {
  bookClubObjs: PropTypes.object,
  userId: PropTypes.string,
};

export default BookClubsList;
