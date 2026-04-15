import { useEffect, useState } from "react";
import { toast } from "sonner";

import { taskApi, type TaskInput } from "../api/tasks";
import { AppShell } from "../components/layout/AppShell";
import { TaskFormDialog } from "../components/tasks/TaskFormDialog";
import { TaskTable } from "../components/tasks/TaskTable";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useAuth } from "../context/auth-context";
import { getErrorMessage } from "../lib/error";
import type { Task } from "../types";

export const DashboardPage = () => {
  const { user, refreshProfile } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [taskSaving, setTaskSaving] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const items = await taskApi.list();
      setTasks(items);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTasks();
    void refreshProfile();
  }, [refreshProfile]);

  const handleCreate = async (input: TaskInput) => {
    setTaskSaving(true);
    try {
      await taskApi.create(input);
      toast.success("Task created");
      await loadTasks();
      setCreateOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setTaskSaving(false);
    }
  };

  const handleUpdate = async (input: TaskInput) => {
    if (!editingTask) return;
    setTaskSaving(true);
    try {
      await taskApi.update(editingTask.id, input);
      toast.success("Task updated");
      setEditingTask(null);
      await loadTasks();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setTaskSaving(false);
    }
  };

  const handleDelete = async (task: Task) => {
    if (!confirm(`Delete "${task.title}"?`)) return;

    try {
      await taskApi.remove(task.id);
      toast.success("Task deleted");
      await loadTasks();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <AppShell>
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-500">{user?.name} ({user?.role})</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total tasks</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">{tasks.length}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick action</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setCreateOpen(true)}>New task</Button>
              <TaskFormDialog
                key={createOpen ? "create-open" : "create-closed"}
                submitLabel="Create task"
                open={createOpen}
                onOpenChange={setCreateOpen}
                onSubmit={handleCreate}
                loading={taskSaving}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle>My Tasks</CardTitle>
            <Button variant="outline" onClick={loadTasks} disabled={loading}>
              Refresh
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center text-sm text-slate-500">Loading tasks...</div>
            ) : (
              <TaskTable tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
            )}
          </CardContent>
        </Card>

        {editingTask ? (
          <TaskFormDialog
            key={editingTask.id}
            submitLabel="Update task"
            initialTask={editingTask}
            open={Boolean(editingTask)}
            onOpenChange={(open) => !open && setEditingTask(null)}
            onSubmit={handleUpdate}
            loading={taskSaving}
          />
        ) : null}
      </div>
    </AppShell>
  );
};
