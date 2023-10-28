const Library = () => {
  const books = [1, 2, 3, 4, 5];
  const wishlist = [1, 2, 3, 4, 5];
  return (
    <main>
      {books.map((book, key) => (<p key={key}>{books[book]}</p>))}
      {wishlist.map((book, key) => (<p key={key}>{wishlist[book]}</p>))}
    </main>
  )
  //Want to Read List

  //Read List
}

export default Library;