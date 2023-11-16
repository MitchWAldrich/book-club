import axios from 'axios';
import PropTypes from 'prop-types';
import BookRating from './BookRating';

import { shortenDescription } from '../utils/helpers';

const SingleBookItem = (props) => {
  const {
    authors,
    categories,
    averageRating,
    description,
    imageLinks,
    pageCount,
    publisher,
    title,
    userId
  } = props;

const bookObj = {
      title: 'title',
      authors: ['Fred Smith', 'Julie Steinberg'],
      categories: ['Fiction'],
      averageRating: 4,
      description: 'A great book about stuff',
      imageLinks: {smallThumbnail: 'http:', thumbnail: 'https:'},
      pageCount: 234,
      publisher: 'Smith',
    };

  // const addToLibrary = (event, bookObject) => {
  const addToToRead = () => {
    const status = "toRead";

    axios.patch(`http://localhost:4000/api/users/${userId}`, {userId: userId, bookObj: bookObj, status: status })
  .then(response => {
    console.log(response.data)  
  })
  .catch(error => console.error(error)); 
    // add book object to user object
  };

  const addToHaveRead = () => {
    const status = "haveRead";

    axios.patch(`http://localhost:4000/api/users/${userId}`, {userId: userId, bookObj: bookObj, status: status })
  .then(response => {
    console.log(response.data)  
  })
  .catch(error => console.error(error)); 
    // add book object to user object
  };


  return (
    <main>
      <div className="singleBookItem">
        <div className="singleBookItemLeft">
          <img
            className="singleBookImage"
            src={imageLinks?.thumbnail || imageLinks?.smallThumbnail || null}
            alt="Girl in a jacket"
          />
          <div className="singleBookRatingDisplay">
            {BookRating(averageRating) || null}
          </div>
        </div>
        <div className="singleBookInformation">
          <div className="singleBookTitleAndAuthorInfo">
            <div className="singleBookTitleInfo">
              <p className="singleBookSmallHeadingText">Title:</p>
              <h4 className="singleBookTitleText">{title || 'No title available.'}</h4>
            </div>
            <div className="singleBookAuthorInfo">
              <p className="singleBookSmallHeadingText">Author(s):</p>
              {authors?.map((author, key) => (
                <h4 key={key} className="singleBookAuthorText">
                  {author || 'No author available.'}
                </h4>
              ))}
            </div>
          </div>
          <div className="singleBookTitleInfo">
            <p className="singleBookSmallHeadingText">Description:</p>
            <p className="singleBookDescriptionText">
              {description
                ? shortenDescription(description)
                : "No description available."}
            </p>
          </div>
          <div className="singleBookAdditional">
            <div className="singleBookCategoryInfo">
              <p className="singleBookSmallHeadingText">Categories:</p>
              {/* <p className="categoryText"> */}
                {categories
                  ? categories.map((category, key) => <p className="singleBookCategoryText" key={key}>{category}</p>)
                  : 'No categories available.'}
              {/* </p> */}
            </div>
            <div className="singleBookPageInfo">
              <p className="singleBookSmallHeadingText">Pages:</p>
              <p className="singleBookPagesText">{pageCount?.toString() || 'No publisher available.'}</p>
            </div>
            <div className="singleBookPublisherInfo">
              <p className="singleBookSmallHeadingText">Publisher:</p>
              <p className="singleBookPublisherText">{publisher || 'No publisher available.'}</p>
            </div>
          </div>
              <button type="button" onClick={() => addToToRead()}>I want to read this</button>
              <br></br>
              <button type="button" onClick={() => addToHaveRead()}>I have read this</button>
        </div>
      </div>
    </main>
  )
}

SingleBookItem.propTypes = {
  authors: PropTypes.array,
  categories: PropTypes.array,
  averageRating: PropTypes.number,
  description: PropTypes.string,
  imageLinks: PropTypes.object,
  language: PropTypes.string,
  pageCount: PropTypes.number || PropTypes.string,
  publisher: PropTypes.string,
  title: PropTypes.string,
  userId: PropTypes.number
};

export default SingleBookItem;