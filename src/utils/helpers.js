export const getFontSize = ( textLength, size ) => {
  const baseSize = size;

  if (textLength >= baseSize) {
    textLength = baseSize - 2
  }
  const fontSize = baseSize - textLength
  return `${fontSize}vw`
};
//customize further