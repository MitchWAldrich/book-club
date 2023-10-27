import {useState, useEffect} from 'react';
import axios from 'axios';

const SearchBar = () => {
  // const [searched, setSearched] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchTypeValue, setSearchTypeValue] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const results = {title: 'My Favourite Book', author: 'My Favourite Author'};
  console.log('title', title)
  console.log('STV', searchTypeValue)

  useEffect(() => {
    const searchType = document.getElementById("searchCategory") ?? 'title';
    setSearchTypeValue(searchType.options[searchType.selectedIndex]);
    console.log('*****', searchType);
    // axios.get(`https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyCbCvAB05gA9TWOT7FWCNpJvOTDAPufP_k`)
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTypeValue}+&key=AIzaSyCbCvAB05gA9TWOT7FWCNpJvOTDAPufP_k`)
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
  // setSearched(true);
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
              onSubmit={handleSearch}
              value={searchInput} />
            <select id="searchCategory" name="searchCategory">
                <option value="title">Title</option>
                <option value="author">Author</option>
            </select>
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