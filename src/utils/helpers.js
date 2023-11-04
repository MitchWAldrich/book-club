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