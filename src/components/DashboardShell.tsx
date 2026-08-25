// src/components/DashboardShell.tsx
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function DashboardShell({
  title,
  navItems,
  activeItem,
  onNavigate,
  children,
}: {
  title: string;
  navItems: string[];
  activeItem: string;
  onNavigate: (item: string) => void;
  children: React.ReactNode;
}) {
  const { profile, logout } = useAuth();

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand">CapacityConnect</div>
        <div className="role-badge">{title}</div>
        <nav>
          {navItems.map((item) => (
            <button
              key={item}
              className={activeItem === item ? "nav-item active" : "nav-item"}
              onClick={() => onNavigate(item)}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div>{profile?.name}</div>
          <button className="link-btn" onClick={logout}>
            Log out
          </button>
        </div>
      </aside>
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
