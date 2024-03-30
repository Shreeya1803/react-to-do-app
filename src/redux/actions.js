//src/redux/actions.js

// Define action types for adding and deleting tasks
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';


// Action creator function to add a new task
export const addTask = (text) => ({
  type: ADD_TASK,// Action type indicating adding a task
  payload: {// Payload containing task details
    id: new Date().getTime(),// Generate a unique ID for the task using the current timestamp
    text,
  },
});
// Action creator function to delete a task
export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: id,// Payload containing the ID of the task to be deleted
});
// Define action type for toggling task completion status
export const TOGGLE_TASK = 'TOGGLE_TASK';


// Action creator function to toggle the completion status of a task
export const toggleTask = (id) => ({
  type: TOGGLE_TASK,
  payload: id,// Payload containing the ID of the task to be toggled
});