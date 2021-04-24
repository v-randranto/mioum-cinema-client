const pattern = /^(a\s|à\sla\s|aux\s|ce\s|ces\s|cet\s|cette\s|de\s|des\s|du\s|de la\s| la\s|le\s|les\s|the\s|this\s|that\s|these\s|un\s|une\s)/i
const articleExtract = (str) => {
  let newStr = str.toLowerCase()
  const matchArray = newStr.match(pattern)  
  if (matchArray) {
   newStr = newStr.replace(matchArray[0], '')
  }
  return newStr
}

export const sortByTitle = (a, b) => {
    let { title: aTitle } = a;
    let { title: bTitle } = b;
    aTitle = articleExtract(aTitle);
    bTitle = articleExtract(bTitle);    
        
    return aTitle < bTitle ? -1 : bTitle < aTitle ? 1 : 0;
  };

export const sortByDirector = (a, b) => {
    let { directors: aDirectors } = a;
    let { directors: bDirectors } = b;
    const aDirectors0 =
      aDirectors.length !== 0 ? aDirectors[0].toLowerCase() : '';
    const bDirectors0 =
      bDirectors.length !== 0 ? bDirectors[0].toLowerCase() : '';
  
    return aDirectors0 < bDirectors0 ? -1 : bDirectors0 < aDirectors0 ? 1 : 0;
  };