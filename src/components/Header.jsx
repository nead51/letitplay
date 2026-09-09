import React from "react";
import { Disc3, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { sounds } from "../utils/audio";

export const Header = ({
  activeTab,
  setActiveTab,
  soundMuted,
  setSoundMuted,
  onResetGame,
}) => {
  const tabs = [
    { id: "rules", label: "Rules", step: "Step 1" },
    { id: "category", label: "Category Deck", step: "Step 2" },
    { id: "arena", label: "Game Arena", step: "Step 3" },
    { id: "playlists", label: "Playlists", step: "Step 4" },
  ];

  const handleToggleMute = () => {
    const isMuted = sounds.toggleMute();
    setSoundMuted(isMuted);
    if (!isMuted) sounds.playClick();
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 bg-slate-950/80">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        {/* Brand / Title */}
        <div
          onClick={() => {
            sounds.playClick();
            setActiveTab("arena");
          }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
              <Disc3 className="w-6 h-6 text-amber-400 vinyl-spin group-hover:text-amber-300 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
                LET IT PLAY
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full">
                Party Companion
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              The Music Matching Game
            </p>
          </div>
        </div>

        {/* Desktop Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(tab.id);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-0.5 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] uppercase tracking-wider ${
                    isActive ? "text-slate-950/80 font-black" : "text-slate-500"
                  }`}
                >
                  {tab.step}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleMute}
            title={soundMuted ? "Unmute sound effects" : "Mute sound effects"}
            className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-colors"
          >
            {soundMuted ? (
              <VolumeX className="w-5 h-5 text-rose-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-emerald-400" />
            )}
          </button>
          <button
            onClick={onResetGame}
            title="Reset Scores & Game"
            className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-amber-400 hover:border-amber-400/30 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden border-t border-white/10 px-2 py-1.5 flex justify-around bg-slate-950/95">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setActiveTab(tab.id);
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                isActive
                  ? "bg-amber-400 text-slate-950 font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
