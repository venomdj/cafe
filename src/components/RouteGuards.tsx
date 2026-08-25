// src/components/RouteGuards.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, Role } from "../context/AuthContext";

// After login, send the user to the dashboard that matches their role.
export const RoleRedirect: React.FC = () => {
  const { profile } = useAuth();
  if (!profile) return <Navigate to="/login" replace />;
  if (!profile.approved) return <Navigate to="/pending-approval" replace />;
  if (profile.role === "admin") return <Navigate to="/admin" replace />;
  if (profile.role === "trainer") return <Navigate to="/trainer" replace />;
  return <Navigate to="/trainee" replace />;
};

// Wrap any dashboard route: only lets in logged-in, approved users of the right role(s).
export const ProtectedRoute: React.FC<{
  allowed: Role[];
  children: React.ReactNode;
}> = ({ allowed, children }) => {
  const { currentUser, profile, loading } = useAuth();

  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!currentUser || !profile) return <Navigate to="/login" replace />;
  if (!profile.approved) return <Navigate to="/pending-approval" replace />;
  if (!allowed.includes(profile.role)) return <Navigate to="/redirect" replace />;

  return <>{children}</>;
};

export const PendingApproval: React.FC = () => {
  const { profile, logout } = useAuth();
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Almost there, {profile?.name?.split(" ")[0]}</h2>
        <p>
          Your account has been created as a <strong>{profile?.role}</strong>. An admin needs to
          approve your account before you can access the dashboard.
        </p>
        <button className="primary-btn" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
};
