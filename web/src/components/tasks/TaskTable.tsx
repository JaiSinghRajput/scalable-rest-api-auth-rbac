import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import type { Task } from "../../types";

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
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

export const TaskTable = ({ tasks, onEdit, onDelete }: Props) => {
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

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <Card key={task.id} className="border-slate-200">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle>{task.title}</CardTitle>
                <p className="mt-1 text-sm text-slate-500">{task.description || "No description provided."}</p>
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
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(task)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(task)}>
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
