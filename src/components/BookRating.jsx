import PropTypes from 'prop-types';

import { IconContext } from 'react-icons';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';

const BookRating = (rating) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="ratingStars">
      {stars.map((star, key) =>
        star <= rating ? (
          <IconContext.Provider
            key={key}
            value={{ color: "gold", size: "1.3em", className: "review-star" }}
          >
            <AiFillStar />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider
            key={key}
            value={{ size: "1.3em", className: "review-star" }}
          >
            <AiOutlineStar />
          </IconContext.Provider>
        )
      )}
    </div>
  );
};

BookRating.propTypes = {
  rating: PropTypes.string | PropTypes.number
}

export default BookRating;