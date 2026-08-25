// src/pages/TrainerDashboard.tsx
import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, query, where, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import DashboardShell from "../components/DashboardShell";

interface Course {
  id: string;
  title: string;
  description: string;
  enrolledUids?: string[];
}

const NAV = ["Overview", "My Courses", "Create Course", "Trainer Library"];

export default function TrainerDashboard() {
  const { profile } = useAuth();
  const [active, setActive] = useState("Overview");
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    const q = query(collection(db, "courses"), where("trainerUid", "==", profile.uid));
    const unsub = onSnapshot(q, (snap) => {
      setCourses(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    });
    return unsub;
  }, [profile]);

  const createCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    await addDoc(collection(db, "courses"), {
      title,
      description,
      trainerUid: profile.uid,
      trainerName: profile.name,
      enrolledUids: [],
      createdAt: serverTimestamp(),
    });
    setTitle("");
    setDescription("");
    setSaving(false);
    setActive("My Courses");
  };

  return (
    <DashboardShell title="Trainer" navItems={NAV} activeItem={active} onNavigate={setActive}>
      {active === "Overview" && (
        <div>
          <h1>Welcome, {profile?.name}</h1>
          <p>You have {courses.length} course(s) live, with{" "}
            {courses.reduce((sum, c) => sum + (c.enrolledUids?.length || 0), 0)} total enrollments.
          </p>
        </div>
      )}

      {active === "My Courses" && (
        <div>
          <h1>My Courses</h1>
          <div className="card-grid">
            {courses.map((c) => (
              <div className="card" key={c.id}>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <p className="muted">{c.enrolledUids?.length || 0} trainees enrolled</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {active === "Create Course" && (
        <div>
          <h1>Create Course</h1>
          <form onSubmit={createCourse} className="inline-form">
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            {/* TODO: add deadline field + questionnaire builder (list of MCQs) */}
            <button className="primary-btn" disabled={saving}>
              {saving ? "Publishing..." : "Publish Course"}
            </button>
          </form>
        </div>
      )}

      {active === "Trainer Library" && (
        <div>
          <h1>Trainer Library</h1>
          <p>Upload recorded lectures, slides, and study material here.</p>
          {/* TODO: file input -> Firebase Storage upload -> save download URL to "materials" collection */}
          <input type="file" disabled />
          <p className="muted">Wire this to Firebase Storage — see README.</p>
        </div>
      )}
    </DashboardShell>
  );
}
