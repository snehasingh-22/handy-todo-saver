import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { toast } from "sonner";

const STORAGE_KEY = "todo-tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse tasks from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    toast.success("Task added successfully!");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast.success("Task deleted!");
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  };
}
