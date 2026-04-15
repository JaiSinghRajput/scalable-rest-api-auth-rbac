import { Navigate, Route, Routes } from "react-router-dom";

import { AuthGate, GuestGate, RoleGate } from "./components/route-guards";
import { DashboardPage } from "./pages/DashboardPage";
import { AdminRegisterPage } from "./pages/AdminRegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RegisterPage } from "./pages/RegisterPage";
import { UsersPage } from "./pages/UsersPage";
import { TasksPage } from "./pages/TasksPage";

function App() {
  return (
    <Routes>
      <Route element={<GuestGate />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-register" element={<AdminRegisterPage />} />
      </Route>

      <Route element={<AuthGate />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Route>

      <Route element={<RoleGate allowedRoles={["ADMIN"]} />}>
        <Route path="/users" element={<UsersPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;