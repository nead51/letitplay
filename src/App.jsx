import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Rules } from "./components/Rules";
import { Categories } from "./components/Categories";
import { Arena } from "./components/Arena";
import { Playlists } from "./components/Playlists";
import { DEFAULT_PLAYERS } from "./data/players";
import { sounds } from "./utils/audio";

function App() {
  // Load initial players from localStorage or default
  const [players, setPlayers] = useState(() => {
    try {
      const saved = localStorage.getItem("lip_players");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 8) return parsed;
      }
    } catch (e) {}
    return DEFAULT_PLAYERS.map((p) => ({
      ...p,
      score: 0,
      hasGoldChip: true,
    }));
  });

  const [activeJudgeId, setActiveJudgeId] = useState(() => {
    try {
      const saved = localStorage.getItem("lip_judge");
      if (saved) return saved;
    } catch (e) {}
    return "orange";
  });

  const [activeCategory, setActiveCategory] = useState(() => {
    try {
      const saved = localStorage.getItem("lip_category");
      if (saved) return saved;
    } catch (e) {}
    return "Classic Rock Radio Staple";
  });

  const [activeTab, setActiveTab] = useState(() => {
    // Check URL path for backwards compatibility
    const path = window.location.pathname.toLowerCase();
    if (path.includes("category")) return "category";
    if (path.includes("step1")) return "rules";
    if (path.includes("step4")) return "playlists";
    if (path.includes("step3")) return "arena";
    return "arena";
  });

  const [soundMuted, setSoundMuted] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("lip_players", JSON.stringify(players));
    } catch (e) {}
  }, [players]);

  useEffect(() => {
    try {
      localStorage.setItem("lip_judge", activeJudgeId);
    } catch (e) {}
  }, [activeJudgeId]);

  useEffect(() => {
    try {
      localStorage.setItem("lip_category", activeCategory);
    } catch (e) {}
  }, [activeCategory]);

  const handleResetScoresOnly = () => {
    sounds.playClick();
    setPlayers((prev) =>
      prev.map((p) => ({
        ...p,
        score: 0,
        hasGoldChip: true,
      }))
    );
    setShowResetConfirm(false);
  };

  const handleFullReset = () => {
    sounds.playClick();
    setPlayers(
      DEFAULT_PLAYERS.map((p) => ({
        ...p,
        score: 0,
        hasGoldChip: true,
      }))
    );
    setActiveJudgeId("orange");
    setActiveCategory("Classic Rock Radio Staple");
    setShowResetConfirm(false);
  };

  const handleSendCategoryToArena = (categoryText) => {
    setActiveCategory(categoryText);
    setActiveTab("arena");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundMuted={soundMuted}
        setSoundMuted={setSoundMuted}
        onResetGame={() => {
          sounds.playClick();
          setShowResetConfirm(true);
        }}
      />

      {/* Main Screen Content */}
      <main className="flex-1 pb-16">
        {activeTab === "rules" && (
          <Rules
            onGoToCategories={() => setActiveTab("category")}
            onGoToArena={() => setActiveTab("arena")}
          />
        )}

        {activeTab === "category" && (
          <Categories
            onSendCategoryToArena={handleSendCategoryToArena}
          />
        )}

        {activeTab === "arena" && (
          <Arena
            players={players}
            setPlayers={setPlayers}
            activeJudgeId={activeJudgeId}
            setActiveJudgeId={setActiveJudgeId}
            activeCategory={activeCategory}
            onGoToCategories={() => setActiveTab("category")}
            onGoToPlaylists={() => setActiveTab("playlists")}
          />
        )}

        {activeTab === "playlists" && (
          <Playlists
            players={players}
            activeJudgeId={activeJudgeId}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 px-4 text-center text-xs text-slate-500 space-y-1">
        <p>
          <strong>Let It Play</strong> &bull; Music Matching Party Game Companion
        </p>
        <p className="text-slate-600">
          Created by Dustin &bull; 8 Spotify Color Playlists &bull; Netlify Live
        </p>
      </footer>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-sm rounded-3xl p-6 border border-amber-400/30 space-y-4 shadow-2xl bg-slate-900 text-center">
            <h3 className="text-xl font-black text-white">Reset Game?</h3>
            <p className="text-xs text-slate-300">
              Choose how you want to reset for your next round:
            </p>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleResetScoresOnly}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-md shadow-amber-400/20 transition-all"
              >
                Reset Scores & Gold Chips Only
                <span className="block text-[10px] font-normal text-slate-900/80">
                  (Keeps player custom names)
                </span>
              </button>

              <button
                onClick={handleFullReset}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
              >
                Full Reset (Reset Everything)
              </button>

              <button
                onClick={() => setShowResetConfirm(false)}
                className="w-full py-2 text-xs text-slate-500 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
