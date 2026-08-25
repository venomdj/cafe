// src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import DashboardShell from "../components/DashboardShell";

interface UserRow {
  uid: string;
  name: string;
  email: string;
  role: string;
  approved: boolean;
}

interface Course {
  id: string;
  title: string;
  enrolledUids?: string[];
}

const NAV = ["Overview", "Approvals", "Users", "Announcements"];

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [active, setActive] = useState("Overview");
  const [users, setUsers] = useState<UserRow[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [announcement, setAnnouncement] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
      setUsers(snap.docs.map((d) => d.data() as UserRow));
    });
    const unsubCourses = onSnapshot(collection(db, "courses"), (snap) => {
      setCourses(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    });
    return () => {
      unsubUsers();
      unsubCourses();
    };
  }, []);

  const approve = async (uid: string) => {
    await updateDoc(doc(db, "users", uid), { approved: true });
  };

  const totalEnrollments = courses.reduce((sum, c) => sum + (c.enrolledUids?.length || 0), 0);
  const pending = users.filter((u) => !u.approved);

  const postAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcement.trim()) return;
    setPosting(true);
    await addDoc(collection(db, "announcements"), {
      text: announcement,
      postedBy: profile?.name,
      createdAt: serverTimestamp(),
    });
    setAnnouncement("");
    setPosting(false);
  };

  return (
    <DashboardShell title="Admin" navItems={NAV} activeItem={active} onNavigate={setActive}>
      {active === "Overview" && (
        <div>
          <h1>Admin Overview</h1>
          <div className="stat-grid">
            <div className="stat-card"><span>{users.length}</span>Total users</div>
            <div className="stat-card"><span>{courses.length}</span>Courses</div>
            <div className="stat-card"><span>{totalEnrollments}</span>Enrollments</div>
            <div className="stat-card"><span>{pending.length}</span>Pending approvals</div>
          </div>
        </div>
      )}

      {active === "Approvals" && (
        <div>
          <h1>Pending Approvals</h1>
          {pending.length === 0 && <p>Nothing pending — all caught up.</p>}
          <table className="data-table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th></th></tr></thead>
            <tbody>
              {pending.map((u) => (
                <tr key={u.uid}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td><button className="primary-btn" onClick={() => approve(u.uid)}>Approve</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active === "Users" && (
        <div>
          <h1>All Users</h1>
          <table className="data-table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.uid}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.approved ? "Approved" : "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active === "Announcements" && (
        <div>
          <h1>Post Announcement</h1>
          <form onSubmit={postAnnouncement} className="inline-form">
            <textarea
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="New content, achievements, or updates for the homepage..."
            />
            <button className="primary-btn" disabled={posting}>
              {posting ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      )}
    </DashboardShell>
  );
}
