export const getFontSize = ( textLength, size ) => {
  const baseSize = size;

  if (textLength >= baseSize) {
    textLength = baseSize - 2
  }
  const fontSize = baseSize - textLength
  return `${fontSize}vw`
};
//customize further

export const shortenDescription = (descriptionString) => {
  let blurb = descriptionString;

  if (blurb.length >= 150) {
    blurb = blurb.substring(0, 150);
    const lastSpaceIndex = blurb.lastIndexOf(" ");
    blurb = `${blurb.substring(0, lastSpaceIndex || 150)} ...`;
  }

  return blurb;
};

export const formatByLocation = (location) => {
  // for (let i = 0; i < locationsArray.length; i++) {
  // let singleBookClassName = '';
  // let singleBookTitleInfo = '';

  const formattedObj = {
    'className': '',
    'titleInfo': '',
    'titleText': '',
    'authorInfo': '',
    'authorText': '',
    'smallHeadingText': '',
    'titleAndAuthorInfo': '',
    'information': '',
    'left': '',
    'image': ''
  };

  if (location === 'expanded') {
    formattedObj['className'] = 'singleBookItem';
    formattedObj['titleInfo'] = 'singleBookTitleInfo';
    formattedObj['titleText'] = 'singleBookTitleText';
    formattedObj['authorInfo'] = 'singleBookAuthorInfo';
    formattedObj['authorText'] = 'singleBookAuthorText';
    formattedObj['smallHeadingText'] = 'singleBookSmallHeadingText';
    formattedObj['titleAndAuthorInfo'] = 'singleBookTitleAndAuthorInfo';
    formattedObj['information'] = 'singleBookInformation';
    formattedObj['left'] = 'singleBookItemLeft';
    formattedObj['image'] = 'singleBookImage';
  
  } 
  else if (location === 'listItem') {
    formattedObj['className'] = 'singleBookItem';
    formattedObj['titleInfo'] = 'singleBookTitleInfo';
    formattedObj['titleText'] = 'singleBookTitleText';
    formattedObj['authorInfo'] = 'singleBookAuthorInfo';
    formattedObj['authorText'] = 'singleBookAuthorText';
    formattedObj['smallHeadingText'] = 'singleBookSmallHeadingText';
    formattedObj['titleAndAuthorInfo'] = 'singleBookTitleAndAuthorInfo';
    formattedObj['information'] = 'singleBookInformation';
    formattedObj['left'] = 'singleBookItemLeft';
    formattedObj['image'] = 'singleBookImage';
  
  } 
  else if (location === 'bookClubFeature') {
    formattedObj['className'] = 'bookClubFeature';
    formattedObj['titleInfo'] = 'bookClubFeatureTitleInfo';
    formattedObj['titleText'] = 'bookClubFeatureTitleText';
    formattedObj['authorInfo'] = 'bookClubFeatureAuthorInfo';
    formattedObj['authorText'] = 'bookClubFeatureAuthorText';
    formattedObj['smallHeadingText'] = 'bookClubFeatureSmallHeadingText';
    formattedObj['titleAndAuthorInfo'] = 'bookClubFeatureTitleAndAuthorInfo';
    formattedObj['information'] = 'bookClubFeatureInformation';
    formattedObj['left'] = 'bookClubFeatureLeft';
    formattedObj['image'] = 'bookClubFeatureImage';

  }
  // }

  return formattedObj;
}

export const formatStreetAddress = (addressObj) => {
  const { streetNumber, unitNumber, streetName} = addressObj;

  return unitNumber ? `${streetNumber} ${streetName}, Unit ${unitNumber}` : `${streetNumber} ${streetName}`

}

export const filterSuggestedUsers = (usersFull, usersExempt) => {
  if (!usersFull?.length) return;

  const filteredUsers = usersFull?.filter(
    (user) => !usersExempt.includes(user)
  );

  return filteredUsers;
};

export const isBookInLibrary = (myBookId, booksArray1, booksArray2) => {
  const checkOne = booksArray1.find(book => book.bookId === myBookId) 
  const checkTwo = booksArray2.find(book => book.bookId === myBookId) 

  return (!checkOne || !checkTwo) ? false : true;
};

export const formatCategories = (categories) => {
  let formattedCategories = "";

  for (let i = 0; i < categories.length; i++) {
    if (i === 0) {
      formattedCategories = `${categories[i]}`;
    } else {
      formattedCategories = `${formattedCategories}, ${categories[i]}`;
    }
  }

  return formattedCategories;
};
