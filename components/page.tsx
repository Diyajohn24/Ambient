"use client";

import { useState } from "react";

import ModeSwitcher from "../components/ModeSwitcher";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import Timeline from "../components/Timeline";
import ChatPanel from "../components/ChatPanel";
import Insights from "../components/Insights";
import Garden from "../components/Garden";
import Settings from "../components/Settings";
import Navbar from "../components/Navbar";

import SignIn from "../components/SignIn";
import CreateAccount from "../components/CreateAccount";

export default function Home() {
  const [activeTab, setActiveTab] = useState("timeline");
  const [mode, setMode] = useState("companion");
  const [showChat, setShowChat] = useState(false);

  // NEW STATES
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("Authentication state:", isAuthenticated);
  const [authScreen, setAuthScreen] = useState("signin");

  // SHOW SIGN IN SCREEN FIRST
  if (!isAuthenticated) {
    return authScreen === "signin" ? (
      <SignIn
        onSignIn={() => setIsAuthenticated(true)}
        goToCreate={() => setAuthScreen("create")}
      />
    ) : (
      <CreateAccount
        onCreateAccount={() => setIsAuthenticated(true)}
        goToSignIn={() => setAuthScreen("signin")}
      />
    );
  }

  // MAIN APP
  return (
    <main
      className={`min-h-screen px-8 py-6 ${
        mode === "venting"
          ? "bg-slate-800"
          : "bg-[#F4F0FF]"
      }`}
    >
      <Header
        mode={mode}
        setShowChat={setShowChat}
      />

      <ModeSwitcher
        mode={mode}
        setMode={setMode}
      />

      <Dashboard mode={mode} />

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {mode === "companion" && (
        <div className="mb-6 text-xl font-semibold text-[#7C3AED]">
          Companion Mode Active
        </div>
      )}

      {mode === "venting" && (
        <div className="mb-6 text-xl font-semibold text-red-500">
          Venting Mode Active
        </div>
      )}

      {showChat && (
        <ChatPanel
          setShowChat={setShowChat}
        />
      )}

      {!showChat && activeTab === "timeline" && (
        <Timeline mode={mode} />
      )}

      {!showChat && activeTab === "insights" && (
        <Insights mode={mode} />
      )}

      {!showChat && activeTab === "garden" && (
        <Garden mode={mode} />
      )}

      {!showChat && activeTab === "settings" && (
        <Settings mode={mode} />
      )}
    </main>
  );
}