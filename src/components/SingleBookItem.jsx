import axios from 'axios';

import PropTypes from 'prop-types';

import BookRating from './BookRating';

import { formatByLocation, shortenDescription } from '../utils/helpers';

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
    userId,
    location
  } = props;
  //Style the whole thing to look like an open book

const bookObj = {
      title: 'title',
      authors: ['Fred Smith', 'Julie Steinberg'],
      categories: ['Fiction'],
      averageRating: 4,
      description: 'A great book about stuff',
      imageLinks: {
        smallThumbnail:
          "http://books.google.com/books/content?id=NRWlitmahXkC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        thumbnail:
          "http://books.google.com/books/content?id=NRWlitmahXkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      },
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

  // const singleBookClassName
  // const locationStatuses = ['expanded', 'listItem', 'bookClubFeature'];
  // const locationStatuses = ['expanded', 'bookClubFeature'];

  const locationsObject = formatByLocation(location);
  console.log('locationsObj', locationsObject);

  return (
    <main>
      <div className={locationsObject.className}>
        <div className={locationsObject.left}>
          <img
            className={locationsObject.image}
            src={imageLinks?.thumbnail || imageLinks?.smallThumbnail || null}
            alt="Girl in a jacket"
          />
          { location === 'expanded' ? (
            <div className="singleBookRatingDisplay">
              <BookRating averageRating={averageRating} location={'expanded'} />
            </div>
          ) : null }
        </div>
        <div className={locationsObject.information}>
          <div className={locationsObject.titleAndAuthorInfo}>
            <div className={locationsObject.titleInfo}>
              <p className={locationsObject.smallHeadingText}>Title:</p>
              <h4 className={locationsObject.titleText}>{title || 'No title available.'}</h4>
            </div>
            <div className={locationsObject.authorInfo}>
              <p className={locationsObject.smallHeadingText}>Author(s):</p>
              {authors?.map((author, key) => (
                <h4 key={key} className={locationsObject.authorText}>
                  {author || 'No author available.'}
                </h4>
              ))}
            </div>
          </div>
          { location === 'expanded' ? (
            <>
            <div className="singleBookDescription">
              <p className="singleBookSmallHeadingText">Description:</p>
              <p className="singleBookDescriptionText">
                {description
                  ? shortenDescription(description)
                  : "No description available."}
              </p>
            </div>
            <div className="singleBookAdditional">
              <div className="singleBookCategoryInfo">
                <p className={locationsObject.smallHeadingText}>Categories:</p>
                  {categories
                    ? categories.map((category, key) => <p className="singleBookCategoryText" key={key}>{category}</p>)
                    : 'No categories available.'}
              </div>
              <div className="singleBookPageInfo">
                <p className={locationsObject.smallHeadingText}>Pages:</p>
                <p className="singleBookPagesText">{pageCount?.toString() || 'No publisher available.'}</p>
              </div>
              <div className="singleBookPublisherInfo">
                <p className={locationsObject.smallHeadingText}>Publisher:</p>
                <p className="singleBookPublisherText">{publisher || 'No publisher available.'}</p>
              </div>
            </div>
            <div className="singleBookButtonsContainer">
              <button className="singleBookButton" type="button" onClick={() => addToToRead()}>I want to read this</button>
              <br></br>
              <button className="singleBookButton" type="button" onClick={() => addToHaveRead()}>I have read this</button>
            </div>
            </> 
            ) : null }
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
  userId: PropTypes.number,
  location: PropTypes.string
};

export default SingleBookItem;