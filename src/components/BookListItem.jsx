import PropTypes from "prop-types";
import BookRating from "./BookRating";
import { getFontSize, shortenDescription } from "../utils/helpers";

const BookListItem = (props) => {
  // const { author, categories, averageRating, description, imageLinks, language, pageCount, publisher, title } = props;
  const {
    authors,
    categories,
    averageRating,
    description,
    imageLinks,
    pageCount,
    publisher,
    title,
  } = props;

  const boxes = document.querySelectorAll('titleText')
  
  boxes.forEach(box => {
    box.style.fontSize = getFontSize(box.textContent.length, 12)
  })
  
  //use a symbol for Fiction or Non-Fiction
  //don't display language?

  return (
    <main>
      <div className="bookListItem">
        <div className="bookListItemLeft">
          <img
            className="bookImage"
            src={imageLinks?.thumbnail || imageLinks?.smallThumbnail || null}
            alt="Girl in a jacket"
          />
          <div className="ratingDisplay">
            <BookRating averageRating={averageRating} location="listItem" />
          </div>
        </div>
        <div className="bookInformation">
          <div className="titleAndAuthorInfo">
            <div className="titleInfo">
              <p className="smallHeadingText">Title:</p>
              <h4 className="titleText">{title || 'No title available.'}</h4>
            </div>
            <div className="authorInfo">
              <p className="smallHeadingText">Author(s):</p>
              {authors?.map((author, key) => (
                <h4 key={key} className="authorText">
                  {author || 'No author available.'}
                </h4>
              ))}
            </div>
          </div>
          <div className="descriptionInfo">
            <p className="smallHeadingText">Description:</p>
            <p className="descriptionText">
              {description
                ? shortenDescription(description)
                : "No description available."}
            </p>
          </div>
          <div className="bookAdditional">
            <div className="categoryInfo">
              <p className="smallHeadingText">Categories:</p>
              {/* <p className="categoryText"> */}
                {categories
                  ? categories.map((category, key) => <p className="categoryText" key={key}>{category}</p>)
                  : 'No categories available.'}
              {/* </p> */}
            </div>
            <div className="pageInfo">
              <p className="smallHeadingText">Pages:</p>
              <p className="pagesText">{pageCount?.toString() || 'No publisher available.'}</p>
            </div>
            <div className="publisherInfo">
              <p className="smallHeadingText">Publisher:</p>
              <p className="publisherText">{publisher || 'No publisher available.'}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

BookListItem.propTypes = {
  authors: PropTypes.array,
  categories: PropTypes.array,
  averageRating: PropTypes.number,
  description: PropTypes.string,
  imageLinks: PropTypes.object,
  language: PropTypes.string,
  pageCount: PropTypes.number || PropTypes.string,
  publisher: PropTypes.string,
  title: PropTypes.string,
};

export default BookListItem;
