import { useEffect, useState } from "react";
import { toast } from "sonner";

import { userApi } from "../api/users";
import { AppShell } from "../components/layout/AppShell";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../components/ui/table";
import { useAuth } from "../context/auth-context";
import { getErrorMessage } from "../lib/error";
import type { User } from "../types";

export const UsersPage = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);

    try {
      const items = await userApi.list();
      setUsers(items);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  const handleDelete = async (targetUser: User) => {
    if (targetUser.id === currentUser?.id) {
      toast.error("You cannot delete your own account from here");
      return;
    }

    if (!confirm(`Delete user ${targetUser.name}?`)) {
      return;
    }

    setDeletingId(targetUser.id);

    try {
      await userApi.remove(targetUser.id);
      toast.success("User deleted");
      await loadUsers();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AppShell>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center text-sm text-slate-500">Loading users...</div>
            ) : users.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-500">No users found.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        <Badge variant={item.role === "ADMIN" ? "default" : "outline"}>{item.role}</Badge>
                      </TableCell>
                      <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item)}
                          disabled={deletingId === item.id || item.id === currentUser?.id}
                        >
                          {item.id === currentUser?.id ? "Current user" : deletingId === item.id ? "Deleting..." : "Delete"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};