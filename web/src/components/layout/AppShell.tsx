import { Link, NavLink } from "react-router-dom";
import { Badge, BadgeCheck, LogOut, Menu, LayoutDashboard, Users } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/auth-context";

const navItems = [
  { to: "/dashboard", label: "My Tasks", icon: LayoutDashboard },
  { to: "/users", label: "Users", icon: Users, adminOnly: true }
];

export const AppShell = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const visibleNavItems = navItems.filter((item) => !item.adminOnly || user?.role === "ADMIN");

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] text-slate-950">
      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-slate-950 text-white">
              <BadgeCheck className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">TaskPilot</p>
              <p className="text-xs text-slate-500">Simple task admin console</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-slate-600 sm:flex">
              <Badge className="size-3" />
              {user?.name}
            </div>
            <Button variant="outline" size="sm" onClick={logout} className="hidden sm:inline-flex">
              <LogOut className="size-4" />
              Logout
            </Button>
            <Button variant="outline" size="icon-sm" className="sm:hidden" onClick={logout}>
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="rounded-2xl border bg-white p-4 shadow-sm lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-slate-100">
              <Menu className="size-5" />
            </div>
            <div>
              <p className="font-medium">Navigation</p>
              <p className="text-sm text-slate-500">{user?.role ?? "USER"}</p>
            </div>
          </div>
          <Separator className="mb-4" />
          <nav className="grid gap-2">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                      isActive ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    )
                  }
                >
                  <Icon className="size-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
};
