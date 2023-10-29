import PropTypes from 'prop-types';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { IconContext } from 'react-icons';

const BookItem = (props) => {
  // const { author, categories, averageRating, description, imageLinks, language, pageCount, publisher, title } = props;
  const { author, categories, averageRating, description, imageLinks, pageCount, publisher, title } = props;

  const ratingDisplay = ( rating ) => {
    const stars = [1, 2, 3, 4, 5];
    
    return (
      <div className='ratingStars'>
      {stars.map( (star, key) => star <= rating ? 
    (
      <IconContext.Provider key={key} value={{color: 'gold', size: '1.5em', className: 'review-star' }}>
        <AiFillStar />
      </IconContext.Provider>
    ) : (
      <IconContext.Provider key={key}value={{size: '1.5em', className: 'review-star' }}>
        <AiOutlineStar />
      </IconContext.Provider>
    ))}
    </div>
    )
  }

  //use a symbol for Fiction or Non-Fiction
  //don't display language?

  return (
    <main>
      <div className='bookItem'>
        <div className='bookItemLeft'>
          <img src={imageLinks.thumbnail} alt="Girl in a jacket" />
          {ratingDisplay(averageRating)}
        </div>
        <div className='bookInformation'>
          <div className='titleInfo'>
            <div>
              <h2>{title}</h2>
            </div>
            <div className='authorInfo'>
              {/* <p className='incidentalText'>By</p> */}
              <h2 className='authorText'>{author}</h2>
            </div>
          </div>
          <div className='bookDescription'>
            <p>{description}</p>
          </div>
          <div>
            {categories.map( (category, key) => (<p key={key}>{category}</p>))}
            <p>{pageCount}</p>
            <p>{publisher}</p>
          </div>
        </div>
      </div>
    </main>
  )
}

BookItem.propTypes = {
  author: PropTypes.string,
  categories: PropTypes.array,
  averageRating: PropTypes.number,
  description: PropTypes.string,
  imageLinks: PropTypes.object,
  language: PropTypes.string,
  pageCount: PropTypes.number,
  publisher: PropTypes.string,
  title: PropTypes.string
}

export default BookItem;