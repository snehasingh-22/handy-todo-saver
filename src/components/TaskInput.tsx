import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface TaskInputProps {
  onAddTask: (title: string) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 h-12 bg-card border-border focus:ring-2 focus:ring-primary transition-all"
      />
      <Button
        type="submit"
        disabled={!title.trim()}
        className="h-12 px-6 bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-glow"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add
      </Button>
    </form>
  );
}
