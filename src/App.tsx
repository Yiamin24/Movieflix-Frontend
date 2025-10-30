import { useState, useEffect } from "react";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader"; 
import { generateMockData } from "./lib/mockData";
import { User } from "./types";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import "./styles/globals.css";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [mockData] = useState(() => generateMockData(50));
  const [showIntroLoader, setShowIntroLoader] = useState(true); 

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntroLoader(false); 
    }, 2500); 

    return () => clearTimeout(timer);
  }, []);

  
  useEffect(() => {
    if (!showIntroLoader) {
      const storedUser = localStorage.getItem("movieflix-user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [showIntroLoader]);

  const handleLogin = (email: string, name: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
    };
    setUser(newUser);
    localStorage.setItem("movieflix-user", JSON.stringify(newUser));
    toast.success(`Welcome back, ${name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("movieflix-user");
    toast.success("You've been logged out");
  };

  
  if (showIntroLoader) {
    return <Loader />;
  }

  
  if (!user) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster position="top-right" theme="dark" />
      </>
    );
  }

  
  return (
    <div className="dark min-h-screen h-screen bg-background overflow-hidden flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="flex-1 overflow-hidden">
        <Dashboard initialData={mockData} />
      </div>
      <Toaster position="top-right" theme="dark" />
    </div>
  );
}
