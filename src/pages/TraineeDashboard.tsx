// src/pages/TraineeDashboard.tsx
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import DashboardShell from "../components/DashboardShell";

interface Course {
  id: string;
  title: string;
  description: string;
  trainerName: string;
  enrolledUids?: string[];
}

const NAV = ["Overview", "Courses", "My Profile", "Assessments"];

export default function TraineeDashboard() {
  const { profile } = useAuth();
  const [active, setActive] = useState("Overview");
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "courses"), (snap) => {
      setCourses(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    });
    return unsub;
  }, []);

  const enroll = async (courseId: string) => {
    if (!profile) return;
    await updateDoc(doc(db, "courses", courseId), {
      enrolledUids: arrayUnion(profile.uid),
    });
  };

  return (
    <DashboardShell title="Trainee" navItems={NAV} activeItem={active} onNavigate={setActive}>
      {active === "Overview" && (
        <div>
          <h1>Welcome back, {profile?.name}</h1>
          <p>You're enrolled in {courses.filter((c) => c.enrolledUids?.includes(profile?.uid || "")).length} course(s).</p>
        </div>
      )}

      {active === "Courses" && (
        <div>
          <h1>Available Courses</h1>
          <div className="card-grid">
            {courses.length === 0 && <p>No courses published yet. Check back soon.</p>}
            {courses.map((c) => {
              const isEnrolled = c.enrolledUids?.includes(profile?.uid || "");
              return (
                <div className="card" key={c.id}>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <p className="muted">Trainer: {c.trainerName}</p>
                  <button
                    className="primary-btn"
                    disabled={isEnrolled}
                    onClick={() => enroll(c.id)}
                  >
                    {isEnrolled ? "Enrolled" : "Enroll"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {active === "My Profile" && (
        <div>
          <h1>My Profile</h1>
          <p><strong>Name:</strong> {profile?.name}</p>
          <p><strong>Email:</strong> {profile?.email}</p>
          <p><strong>Skills:</strong> {profile?.skills?.join(", ") || "Not added yet"}</p>
          {/* TODO: build an edit form here (qualifications, experience, certs upload) */}
        </div>
      )}

      {active === "Assessments" && (
        <div>
          <h1>Assessments</h1>
          <p>MCQ assessments assigned by trainers will appear here.</p>
          {/* TODO: query "questionnaires" collection where courseId in enrolledCourses */}
        </div>
      )}
    </DashboardShell>
  );
}
