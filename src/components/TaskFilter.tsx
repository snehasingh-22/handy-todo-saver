import { Button } from "@/components/ui/button";

export type FilterType = "all" | "active" | "completed";

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export function TaskFilter({ currentFilter, onFilterChange, counts }: TaskFilterProps) {
  const filters: { value: FilterType; label: string; count: number }[] = [
    { value: "all", label: "All", count: counts.all },
    { value: "active", label: "Active", count: counts.active },
    { value: "completed", label: "Completed", count: counts.completed },
  ];

  return (
    <div className="flex gap-2 p-1 bg-secondary rounded-lg">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={currentFilter === filter.value ? "default" : "ghost"}
          onClick={() => onFilterChange(filter.value)}
          className={`flex-1 transition-all duration-300 ${
            currentFilter === filter.value
              ? "bg-primary text-primary-foreground shadow-md"
              : "hover:bg-background"
          }`}
        >
          {filter.label}
          <span className="ml-2 text-xs opacity-70">({filter.count})</span>
        </Button>
      ))}
    </div>
  );
}
