import { makeStyles } from '@material-ui/core/styles';
import { blueGrey, brown } from '@material-ui/core/colors';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '15px',
    maxHeight: '100%',
    position: 'relative',
    
  },
  cardHeader: {
    backgroundColor: blueGrey[300],
    color: 'white',
  },
  cardContent: {
    backgroundColor: '#FAFAFA',
    paddingBottom: 0,
  },
  cardActions: {
    padding: '0 8px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
  },
  paper: {
    backgroundColor: brown[100],
    height: '80%',
  },
  grid: {
    display: 'flex',
  },
  details: {
    margin: '12px',
  },
  details2: {
    margin: '7px',
  },
  summary: {
    fontStyle: 'italic',
  },
  title: {
    padding: '0 14px',
    justifyContent: "center"
  },
  title2: {
    padding: '0 7px',
  },
  backHomeBtn: {
    marginBottom: '20px',
  },
});
