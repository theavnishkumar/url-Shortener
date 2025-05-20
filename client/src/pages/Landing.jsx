import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";
import HowWork from "../components/Landing/HowWork";
import Stats from "../components/Landing/Stats";
import CTA from "../components/Landing/CTA";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import Dashboard from "./Dashboard";

const Landing = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="flex-col gap-4 w-full flex items-center justify-center min-h-screen">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!user && (
        <main className="flex-grow">
          {/* Hero Section */}
          <Hero />
          {/* Features Section */}
          <Features />
          {/* How It Works */}
          <HowWork />
          {/* Stats Section */}
          <Stats />
          {/* CTA Section */}
          <CTA />
        </main>
      )}
      {user && <Dashboard />}
    </div>
  );
};

export default Landing;
