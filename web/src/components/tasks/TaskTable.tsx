import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import type { Task } from "../../types";

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  readOnly?: boolean;
  separateByOwner?: boolean;
};

const priorityTone: Record<Task["priority"], string> = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-rose-100 text-rose-700"
};

const statusTone: Record<Task["status"], string> = {
  pending: "bg-amber-100 text-amber-800",
  completed: "bg-emerald-100 text-emerald-700"
};

export const TaskTable = ({ tasks, onEdit, onDelete, readOnly = false, separateByOwner = false }: Props) => {
  const renderTaskCards = (items: Task[]) => (
    <div className="grid gap-4">
      {items.map((task) => (
        <Card key={task.id} className="border-slate-200">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle>{task.title}</CardTitle>
                <p className="mt-1 text-sm text-slate-500">{task.description || "No description provided."}</p>
                {task.owner ? (
                  <p className="mt-2 text-xs text-slate-500">
                    Owner: {task.owner.name} ({task.owner.email})
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className={statusTone[task.status]}>{task.status}</Badge>
                <Badge className={priorityTone[task.priority]}>{task.priority}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Separator className="mb-4" />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500">Updated {new Date(task.updatedAt).toLocaleString()}</div>
              {!readOnly ? (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(task)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onDelete(task)}>
                    Delete
                  </Button>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (tasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No tasks yet</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-500">Create your first task to get started.</CardContent>
      </Card>
    );
  }

  if (separateByOwner) {
    const groupedTasks = tasks.reduce<Map<string, { label: string; tasks: Task[] }>>((groups, task) => {
      const key = task.owner?.id ?? task.userId;
      const label = task.owner ? `${task.owner.name} (${task.owner.email})` : `User ${task.userId}`;

      if (!groups.has(key)) {
        groups.set(key, { label, tasks: [] });
      }

      groups.get(key)?.tasks.push(task);
      return groups;
    }, new Map());

    return (
      <div className="grid gap-6">
        {Array.from(groupedTasks.entries()).map(([groupKey, group]) => (
          <section key={groupKey} className="grid gap-3">
            <h3 className="text-sm font-semibold text-slate-700">{group.label}</h3>
            {renderTaskCards(group.tasks)}
          </section>
        ))}
      </div>
    );
  }

  return renderTaskCards(tasks);
};
