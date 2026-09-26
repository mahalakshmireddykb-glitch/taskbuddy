import { useEffect, useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskbuddy-tasks');

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('taskbuddy-tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function clearAllTasks() {
    setTasks([]);
  }

  // Priority weights
const priorityWeight = {
  High: 3,
  Medium: 2,
  Low: 1,
};

// Total priority points of all tasks
const totalWeight = tasks.reduce(
  (sum, task) => sum + (priorityWeight[task.priority] || 0),
  0
);

// Priority points of completed tasks
const completedWeight = tasks
  .filter((task) => task.completed)
  .reduce(
    (sum, task) => sum + (priorityWeight[task.priority] || 0),
    0
  );

// Calculate progress percentage
const progress =
  totalWeight === 0
    ? 0
    : Math.round((completedWeight / totalWeight) * 100);

// Normal task count
const completedTasks = tasks.filter(
  (task) => task.completed
).length;

  return (
    <div className="app">
      <Header />

      <main className="dashboard">
        <h2>Task Dashboard</h2>

        <p className="dashboard-description">
          Manage your tasks easily and stay organized.
        </p>

        <TaskForm onAddTask={addTask} />

        <div className="progress-section">
  <div className="progress-text">
    {completedTasks} of {tasks.length} tasks completed
  </div>

  <div className="progress-percentage">
    Progress: {progress}%
  </div>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${progress}%` }}
    ></div>
  </div>

  <div className="progress-points">
    Completed Priority Points: {completedWeight} / {totalWeight}
  </div>
</div>

        {tasks.length > 0 && (
          <div className="clear-section">
            <button onClick={clearAllTasks}>
              Clear All Tasks
            </button>
          </div>
        )}

        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;
