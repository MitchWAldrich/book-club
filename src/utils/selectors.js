export const getUser = (users, id) => {
  return users.find((user) => user.id === id);
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
