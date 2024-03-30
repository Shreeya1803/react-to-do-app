//src/redux/reducers.js

// Define initial state with an empty array for tasks
import { ADD_TASK, DELETE_TASK, TOGGLE_TASK } from './actions';

const initialState = {
  tasks: [],
};
// Reducer function to handle state updates based on actions
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        // Add the new task to the tasks array using the payload from the action
        tasks: [...state.tasks, action.payload],
      };
       // Action type for deleting a task
    case DELETE_TASK:
      return {
        ...state,
        // Filter out the task with the specified id from the tasks array
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
      case TOGGLE_TASK:
      return {
        ...state,
        // Map through the tasks array and toggle the completed status of the task with the specified id
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
      // Default case returns the current state if the action type is not recognized
    default:
      return state;
  }
};

export default rootReducer;