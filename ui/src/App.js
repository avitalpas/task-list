import React, { useState, useEffect } from "react";
import { AddTaskForm } from "./components/AddTaskForm";
import { Task } from "./components/Task";
import axios from "axios";
import { API_URL } from "./utils";

function App() {
  const [tasks, setTasks] = useState({});

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <AddTaskForm fetchTasks={fetchTasks} />
      {tasks.map((task) => (
        <Task task={task} key={task.id} fetchTasks={fetchTasks} />
      ))}
    </div>
  );
}

export default App;
