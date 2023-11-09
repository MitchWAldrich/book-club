import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BookRating from './BookRating';
import instance from '../utils/axiosConfig';

import { shortenDescription } from '../utils/helpers';
// import { getUserById } from '../utils/selectors';

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

  const [ savedBook, setSavedBook ] = useState(null);

  const book = {
    title,
    authors,
    categories,
    averageRating,
    description,
    imageLinks,
    pageCount,
    publisher,
  };

  useEffect(() => {
    instance.patch(`/api/users/${userId}`, {
      book: book
  })
  .then(response => {
    console.log(response.data)  
  })
  .catch(error => console.error(error));

    // instance.get('http://localhost:4000/api/users')
    //     .then(function (response) {
    //         const usersResult = response.data.users;
    //         setUser(ById(usersResult, 1));
    //         // console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    //     .finally(function () {
    //         // always executed
    //     }); 
}, [savedBook]);

  // const addToLibrary = (event, bookObject) => {
  const addToLibrary = (event) => {
    event.preventDefault(); 
    setSavedBook('book')
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
              <button type="button" onClick={addToLibrary}>Add to my library</button>
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
  pageCount: PropTypes.number | PropTypes.string,
  publisher: PropTypes.string,
  title: PropTypes.string,
  userId: PropTypes.number
};

export default SingleBookItem;