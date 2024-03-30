//src/redux/store.js
import { createStore } from 'redux';
import rootReducer from './reducers';

// Function to load state from local storage
const loadState = () => {
  try {
    // Attempt to retrieve serialized state from local storage
    const serializedState = localStorage.getItem('tasks');
    // If no serialized state is found, return undefined
    if (serializedState === null) {
      return undefined;
    }
    // Parse and return the serialized state
    return JSON.parse(serializedState);
  } catch (err) {
    // If an error occurs during parsing or retrieval, return undefined
    return undefined;
  }
};
// Function to save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    // Save the serialized state to local storage under the key 'tasks'
    localStorage.setItem('tasks', serializedState);
  } catch (err) {
    // Handle errors when saving state to local storage
    console.error('Error saving state to local storage:', err);
  }
};
// Load persisted state from local storage
const persistedState = loadState();

// Create the Redux store with the root reducer and persisted state
const store = createStore(
  rootReducer,
  persistedState,
  // Enable Redux DevTools extension for debugging purposes
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// Subscribe to store changes and save the tasks part of the state to local storage
store.subscribe(() => {
  saveState({
    tasks: store.getState().tasks,
  });
});

export default store;
