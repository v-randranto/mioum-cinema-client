import {sortByTitle, sortByDirector} from '../../utils/sortHandler'

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
