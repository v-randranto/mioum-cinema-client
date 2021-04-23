const sortByTitle = (a, b) => {
  let { title: aTitle } = a;
  let { title: bTitle } = b;
  aTitle = aTitle.toLowerCase();
  bTitle = bTitle.toLowerCase();

  return aTitle < bTitle ? -1 : bTitle < aTitle ? 1 : 0;
};
const sortByDirector = (a, b) => {
  let { directors: aDirectors } = a;
  let { directors: bDirectors } = b;
  const aDirectors0 =
    aDirectors.length !== 0 ? aDirectors[0].toLowerCase() : '';
  const bDirectors0 =
    bDirectors.length !== 0 ? bDirectors[0].toLowerCase() : '';

  return aDirectors0 < bDirectors0 ? -1 : bDirectors0 < aDirectors0 ? 1 : 0;
};

const useSortFilms = (sortCriterion, films) => {
  switch (sortCriterion) {
    case 0:
    case 11:
    case 21:
    case 31:
      films.reverse();
      return;
    case 10:
      films.sort(sortByTitle);
      return;
    case 20:
      films.sort(sortByDirector);
      return;
    case 30:
      films.sort((a, b) => a.year - b.year);
      return;
    default:
      return;
  }
};

export default useSortFilms;
