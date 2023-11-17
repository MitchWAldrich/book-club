import PropTypes from 'prop-types';

import { IconContext } from 'react-icons';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';

const BookRating = (props) => {
  const { location, averageRating } = props;
  const stars = [1, 2, 3, 4, 5];

  const starSize = location === 'expanded' ? '2em' : '1em';
  const className = location === 'expanded' ? 'ratingStarsHor' : 'ratingStarsVert';

  return (
    <div className={className}>
      {stars.reverse().map((star, key) =>
        star <= averageRating ? (
          <IconContext.Provider
            key={key}
            value={{ color: "gold", size: {starSize}, className: "review-star" }}
          >
            <AiFillStar />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider
            key={key}
            value={{ size: {starSize}, className: "review-star" }}
          >
            <AiOutlineStar />
          </IconContext.Provider>
        )
      )}
    </div>
  );
};

BookRating.propTypes = {
  location: PropTypes.string,
  averageRating: PropTypes.string || PropTypes.number
}

export default BookRating;