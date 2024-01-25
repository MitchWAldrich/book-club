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

export const getBookClubById = (bookclubs, id) => {
  return bookclubs.find((bookclub) => bookclub.bookClubId === id);
};

export const getBookClubByBookClubId = (bookclubs, bookClubId) => {
  return bookclubs.find((bookclub) => bookclub.bookClubId === bookClubId);
};

export const getBookClubsByCategory = (bookclubs, category) => {
  return bookclubs.find((bookclub) => bookclub.categories.includes(category));
};

export const getBookClubsByName = (bookclubs, name) => {
  return bookclubs.find((bookclub) => bookclub.name === name);
};

export const getBookClubsByLocation = (bookclubs, location) => {
  return bookclubs.find((bookclub) => bookclub.meetings.nextMeetingLocation.inPerson.city === location);
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

export const getBookObjByBookId = (books, bookId) => {
  return books.find( book => book.bookId === bookId);
}

/* Goal Searches */

export const getGoalByGoalId = (goalsArray, goalId) => {
  return goalsArray.find((goal) => goal.goalId === goalId)
}
