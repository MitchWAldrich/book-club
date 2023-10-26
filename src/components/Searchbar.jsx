import {useState, useEffect} from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const results = {title: 'My Favourite Book', author: 'My Favourite Author'};
  console.log('title', title)

  useEffect(() => {
    // axios.get(`https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyCbCvAB05gA9TWOT7FWCNpJvOTDAPufP_k`)
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+&key=AIzaSyCbCvAB05gA9TWOT7FWCNpJvOTDAPufP_k`)
        .then(function (response) {
            console.log('bookResp', response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        }); 
  }, [title]);

 const handleChange = (e) => {
  e.preventDefault();
  setSearchInput(e.target.value);
};

const handleSearch = (e) => {
  e.preventDefault();
  setTitle(title);
  console.log('titleSET', title);
  setAuthor(author);
}

  return (
    <>
      <div className="container">
        <form>
          <div className="searchBar">
            <input
              className="searchInput"
              type="text"
              placeholder="Search here"
              onChange={handleChange}
              value={searchInput} />
            <button className="searchButton" type="submit" onSubmit={handleSearch}>?</button>
          </div>  
        </form>  
      </div>
      <div>
        <p>Title: {results.title} Author: {results.author}</p>
      </div>
    </>
  )
}

export default SearchBar;