"use client";

import { useState, useEffect } from "react";
import styles from "./toDoList.module.css";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  // Sayfa yenilendiğinde görevleri localStorage'dan yükle
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Görevleri localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className={styles.container}>
    {/*   <h2 className={styles.h2Task}>To-Do List</h2> */}
      <div className={styles.addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className={styles.input}
        />
        <button onClick={addTask} className={styles.addButton}>
          Add
        </button>
      </div>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className={styles.checkbox}
              />
              <span
                className={task.completed ? styles.completed : ""}
              >
                {task.text}
              </span>
            </label>
            <button
              onClick={() => deleteTask(task.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
