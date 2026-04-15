import { useState, type FormEvent } from "react";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import type { Task } from "../../types";
import type { TaskInput } from "../../api/tasks";

type Props = {
  triggerLabel?: string;
  submitLabel: string;
  initialTask?: Partial<Task>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit: (input: TaskInput) => Promise<void>;
  loading?: boolean;
};

const defaultValues: TaskInput = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium"
};

const getInitialValues = (task?: Partial<Task>): TaskInput => ({
  title: task?.title ?? "",
  description: task?.description ?? "",
  status: task?.status ?? "pending",
  priority: task?.priority ?? "medium"
});

export const TaskFormDialog = ({
  triggerLabel,
  submitLabel,
  initialTask,
  open,
  onOpenChange,
  onSubmit,
  loading
}: Props) => {
  const [form, setForm] = useState<TaskInput>(() => getInitialValues(initialTask));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(form);
    if (onOpenChange) {
      onOpenChange(false);
    }
    setForm(defaultValues);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {triggerLabel ? (
        <DialogTrigger asChild>
          <Button>{triggerLabel}</Button>
        </DialogTrigger>
      ) : null}
      <DialogContent className="sm:max-w-130">
        <DialogHeader>
          <DialogTitle>{submitLabel}</DialogTitle>
          <DialogDescription>Keep it short and clear. This form is optimized for quick task management.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="task-title">Title</Label>
            <Input
              id="task-title"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="Write a project brief"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              value={form.description ?? ""}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              placeholder="Add helpful details for the task"
              rows={4}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(value: string) => setForm((current) => ({ ...current, status: value as TaskInput["status"] }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Priority</Label>
              <Select value={form.priority} onValueChange={(value: string) => setForm((current) => ({ ...current, priority: value as TaskInput["priority"] }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
