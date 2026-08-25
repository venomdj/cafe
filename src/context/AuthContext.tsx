// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export type Role = "trainee" | "trainer" | "admin";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: Role;
  approved: boolean; // admins approve trainers/trainees before they get full access
  qualifications?: string;
  experience?: string;
  skills?: string[];
  interests?: string[];
  createdAt?: any;
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signup: (name: string, email: string, password: string, role: Role) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (name: string, email: string, password: string, role: Role) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const newProfile: UserProfile = {
      uid: cred.user.uid,
      name,
      email,
      role,
      // Admin accounts created via signup still start unapproved for safety;
      // seed your first admin manually in Firestore console.
      approved: role === "trainee", // trainees can browse immediately; trainers/admins need approval
      skills: [],
      interests: [],
      createdAt: serverTimestamp(),
    };
    await setDoc(doc(db, "users", cred.user.uid), newProfile);
    setProfile(newProfile);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setProfile(null);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) setProfile(snap.data() as UserProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, profile, loading, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
