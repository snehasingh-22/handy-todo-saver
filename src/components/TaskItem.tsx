import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="group flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-all duration-300 animate-fade-in">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="data-[state=checked]:bg-success data-[state=checked]:border-success animate-check-bounce"
      />
      <span
        className={`flex-1 text-base transition-all duration-300 ${
          task.completed
            ? "line-through text-muted-foreground"
            : "text-foreground"
        }`}
      >
        {task.title}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
        aria-label="Delete task"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
