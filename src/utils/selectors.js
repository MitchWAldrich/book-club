export const getUserById = (users, id) => {
  if (typeof id === 'string') {
    id = parseInt(id);
  }

  return users.find((user) => user.id === id);
};

export const getBookClubById = (bookclubs, bookClubId) => {
  if (typeof bookClubId === 'string') {
    bookClubId = parseInt(bookClubId);
  }

  return bookclubs.find((bookclub) => bookclub.bookClubId === bookClubId);
};

export const getBooks = (bookArray) => {
  const bookObjects = bookArray.map((book) => ({
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
