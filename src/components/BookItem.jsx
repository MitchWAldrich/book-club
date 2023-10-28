import PropTypes from 'prop-types';

const BookItem = (props) => {
  // const { author, categories, averageRating, description, imageLinks, language, pageCount, publisher, title } = props;
  const { author, categories, description, imageLinks, pageCount, publisher, title } = props;


  //use a symbol for Fiction or Non-Fiction
  //symbols for Rating
  //don't display language?

  return (
    <main>
      <img src={imageLinks.thumbnail} alt="Girl in a jacket" />
      Title: <h2>{title}</h2>
      
      Author: <h2>{author}</h2>
      {categories.map( (category, key) => (<p key={key}>{category}</p>))}
      Description: <p>{description}</p>
      Pages: <p>{pageCount}</p>
      Publisher: <p>{publisher}</p>
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