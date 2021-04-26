import {sortByTitle, sortByDirector} from '../../utils/sortHandler'

const useSortFilms = (sortCriteria, films) => {
  switch (sortCriteria) {
    case "":
    case "TITLE_DESC":
    case "DIRECTOR_DESC":
    case "YEAR_DESC":
      films.reverse();
      return;
    case "TITLE_ASC":
      films.sort(sortByTitle);
      return;
    case "DIRECTOR_ASC":
      films.sort(sortByDirector);
      return;
    case "YEAR_ASC":
      films.sort((a, b) => a.year - b.year);
      return;
    default:
      return;
  }
};

export default useSortFilms;
