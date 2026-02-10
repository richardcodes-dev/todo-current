import React, { useState, useEffect } from 'react';

export function useTasks() {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [draggingEl, setDraggingEl] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
    setInput('');
  };

  const cleanUp = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter((task) => task.id !== id));
  };

  const onDragStart = (e, i) => {
    setDraggingEl(i);
  };

  const onDragOver = (e, i) => {
    e.preventDefault();
    if (draggingEl === i) return;

    const updatedTasks = [...tasks];
    const removedItems = updatedTasks.splice(draggingEl, 1); // take out the task being dragged
    updatedTasks.splice(i, 0, removedItems[0]); // put it back at the new position
    setTasks(updatedTasks);


    setDraggingEl(i);
    setTasks(updatedTasks);
  };

  const onDragEnd = (e) => {
    setDraggingEl(null);
  };

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateTaskText = (id, newText) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  return {
    tasks,
    input,
    setInput,
    addTask,
    deleteTask,
    draggingEl,
    onDragStart,
    onDragOver,
    onDragEnd,
    toggleComplete,
    updateTaskText,
    editMode,
    setEditMode,
    cleanUp
  };
}