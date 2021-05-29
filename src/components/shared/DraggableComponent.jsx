import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';

const DraggableComponent = (props) => {
    return (
      <Draggable handle="#draggable-component-title">
        <Paper {...props} />
      </Draggable>
    );
  }
 export default DraggableComponent