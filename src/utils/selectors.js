/* User Searches */

export const getUserById = (users, id) => {
  if (typeof id === 'string') {
    id = parseInt(id);
  }

  return users.find((user) => user.id === id);
};

export const getUserByUserId = (users, userId) => {

  return users.find((user) => user.userId === userId);
};

export const getIdByUserId = (users, userId) => {
  
  return users.find((user) => user.userId === userId).id;
};


/* BookClub Searches */

export const getBookClubById = (bookclubs, bookClubId) => {
  console.log({bookclubs, bookClubId})
console.log('func results', bookclubs.find((bookclub) => bookclub.bookClubId === bookClubId))
  return bookclubs.find((bookclub) => bookclub.bookClubId === bookClubId);
};


/* Book Searches */

export const getBooks = (bookArray) => {
  const bookObjects = bookArray.map((book) => ({
    ["bookId"]: book.id ?? null,
    ["authors"]: book.volumeInfo.authors ?? null,
    ["categories"]: book.volumeInfo.categories ?? null,
    ["averageRating"]: book.volumeInfo.averageRating ?? null,
    ["description"]: book.volumeInfo.description ?? null,
    ["imageLinks"]: book.volumeInfo.imageLinks ?? null,
    ["language"]: book.volumeInfo.language ?? null,
    ["pageCount"]: book.volumeInfo.pageCount ?? null,
    ["publisher"]: book.volumeInfo.publisher ?? null,
    ["title"]: book.volumeInfo.title ?? null,
  }));

  return bookObjects;
};
