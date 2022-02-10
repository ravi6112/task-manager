import { useState, useEffect } from 'react';
import About from './components/About';
import AddTask from './components/AddTask';
import Header from './components/Header'
import Tasks from './components/Tasks';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import TaskDetails from './components/TaskDetails';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchData();
      setTask(tasksFromServer);
    }
    getTasks()
  })
  // Fetch data
  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  // update fetch 
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = res.json();
    return data;
  }
  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json();

    setTask([...tasks, data]);
    // console.log(task);
    // const id = Math.floor(Math.random() * 10000);
    // const newTask = { id, ...task };
    // setTask([...tasks, newTask]);
  }
  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });
    console.log(id);
    setTask(tasks.filter((task) => task.id !== id));
  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json();

    setTask(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }


  return (
    <Router>
      <div className="container">
        <Header onShow={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Routes>
          <Route path='/' element={<>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks to Show'}</>} />
          <Route path='/about' element={<About />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;