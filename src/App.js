import React from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { AddCircleOutline, Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, toggleTask } from './redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
// TaskInput component for adding tasks
function TaskInput() {
  const dispatch = useDispatch();
  const [task, setTask] = React.useState('');
// Function to handle adding a new task
  const handleAddTask = () => {
    if (task.trim()) { // Check if the task input is not empty
      dispatch(addTask(task)); // Dispatch the addTask action with the task text
      setTask(''); // Clear the task input field
    }
  };

  return (
    <div style={{ marginBottom: '20px' }} >
       {/* Task input field */}
      <TextField
        label="Add Task"
        variant="outlined"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTask()} // Handle Enter key press to add task
      />
       {/* Add button to add task */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutline />}
        onClick={handleAddTask}
        style={{ marginLeft: '10px' }}
      >
        Add
      </Button>
    </div>
  );
}
// TaskList component for displaying tasks
function TaskList() {
  const tasks = useSelector((state) => state.tasks); // Get tasks from Redux store
  const dispatch = useDispatch();
// Function to handle deleting a task
  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));  // Dispatch the deleteTask action with the task ID
  };
  // Function to handle toggling task completion status
  const handleToggleTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId); // Find the task in the tasks array
  if (task) {
    dispatch(toggleTask(taskId)); // Dispatch the toggleTask action with the task ID
    if (!task.completed) {
      toast.success('Task marked as completed!'); // Show success toast
    } else {
      toast.error('Task marked as incomplete!'); // Show error toast
    }
  }
  };
  return (
    <List style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
       {/* Map through tasks to render list items */}
    {tasks.map((task) => (
      <ListItem key={task.id} button onClick={() => handleToggleTask(task.id)} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        <ListItemText primary={task.text} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
);
}

// App component  the main entry point
function App() {

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom style={{  marginBottom: '20px', marginTop:'50px' }}>
      <span className="animated-text">To-Do App</span>
      </Typography>
      <TaskInput />
      <TaskList />
      <ToastContainer />
    </Container>
  );
}

export default App;