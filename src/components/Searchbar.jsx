import {useState} from 'react'

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [country, setCountry] = useState('');

  const countries = [
    { name: "Belgium", continent: "Europe" },
    { name: "India", continent: "Asia" },
    { name: "Bolivia", continent: "South America" },
    { name: "Ghana", continent: "Africa" },
    { name: "Japan", continent: "Asia" },
    { name: "Canada", continent: "North America" },
    { name: "New Zealand", continent: "Australasia" },
    { name: "Italy", continent: "Europe" },
    { name: "South Africa", continent: "Africa" },
    { name: "China", continent: "Asia" },
    { name: "Paraguay", continent: "South America" },
    { name: "Usa", continent: "North America" },
    { name: "France", continent: "Europe" },
    { name: "Botswana", continent: "Africa" },
    { name: "Spain", continent: "Europe" },
    { name: "Senegal", continent: "Africa" },
    { name: "Brazil", continent: "South America" },
    { name: "Denmark", continent: "Europe" },
    { name: "Mexico", continent: "South America" },
    { name: "Australia", continent: "Australasia" },
    { name: "Tanzania", continent: "Africa" },
    { name: "Bangladesh", continent: "Asia" },
    { name: "Portugal", continent: "Europe" },
    { name: "Pakistan", continent: "Asia" },
  ];

  const updateSearch = (searchInput) => {
    const filtered = countries.filter(country => {
     return country.name.includes(searchInput);
    })
    setSearchInput(searchInput);
    setCountry(filtered);
 }

 const handleChange = (e) => {
  e.preventDefault();
  setSearchInput(e.target.value);
};

if (searchInput.length > 0) {
    countries.filter((country) => {
    return country.name.match(searchInput);
});
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
            <button className="searchButton" type="submit" onSubmit={updateSearch}>?</button>
          </div>  
        </form>  
      </div>
      <div>
        <p>{country}</p>
      </div>
    </>
  )
}

export default SearchBar;