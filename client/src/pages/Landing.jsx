import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";
import HowWork from "../components/Landing/HowWork";
import Stats from "../components/Landing/Stats";
import CTA from "../components/Landing/CTA";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import Dashboard from "./Dashboard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AdsComponent } from "../components/AdsComponent";

const Landing = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!user && (
        <main className="flex-grow">
          {/* Hero Section */}
          <Hero />
          {/* Features Section */}
          <Features />
          <div className="max-w-7xl mx-auto p-2">
            <AdsComponent dataAdSlot="6040347430"/>
          </div>
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
