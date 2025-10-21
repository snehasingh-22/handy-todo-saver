import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TaskInput } from "@/components/TaskInput";
import { TaskItem } from "@/components/TaskItem";
import { TaskFilter, FilterType } from "@/components/TaskFilter";
import { useTasks } from "@/hooks/useTasks";

const Index = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-xl shadow-glow">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Tasks</h1>
              <p className="text-sm text-muted-foreground">Stay organized, stay productive</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Main Card */}
        <div className="bg-card rounded-2xl shadow-lg p-6 space-y-6 animate-slide-in">
          {/* Input */}
          <TaskInput onAddTask={addTask} />

          {/* Filter */}
          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />

          {/* Task List */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">No tasks yet!</p>
                <p className="text-sm mt-1">Add one above to get started</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))
            )}
          </div>

          {/* Stats */}
          {tasks.length > 0 && (
            <div className="pt-4 border-t border-border text-center text-sm text-muted-foreground">
              {counts.completed} of {counts.all} tasks completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
