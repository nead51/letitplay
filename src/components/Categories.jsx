import React, { useState, useEffect } from "react";
import { Dices, Sparkles, Plus, History, Check, Filter, Volume2, ArrowRight } from "lucide-react";
import { CATEGORIES, VIBE_TABS } from "../data/categories";
import { sounds } from "../utils/audio";

export const Categories = ({ onSendCategoryToArena }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [categoriesList, setCategoriesList] = useState(CATEGORIES);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customText, setCustomText] = useState("");
  const [customTag, setCustomTag] = useState("fun");
  const [copied, setCopied] = useState(false);

  // Initialize with a default random category
  useEffect(() => {
    if (!currentCategory && categoriesList.length > 0) {
      const initial = categoriesList[Math.floor(Math.random() * categoriesList.length)];
      setCurrentCategory(initial);
      setHistory([initial]);
    }
  }, []);

  const filteredCategories = categoriesList.filter((cat) => {
    if (activeTab === "all") return true;
    return cat.tag === activeTab;
  });

  const rollCategory = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    sounds.playClick();

    const pool = filteredCategories.length > 0 ? filteredCategories : categoriesList;
    let ticks = 0;
    const maxTicks = 12;

    const interval = setInterval(() => {
      ticks++;
      sounds.playShuffleTick();
      const randomIdx = Math.floor(Math.random() * pool.length);
      setCurrentCategory(pool[randomIdx]);

      if (ticks >= maxTicks) {
        clearInterval(interval);
        // Final pick
        const finalCategory = pool[Math.floor(Math.random() * pool.length)];
        setCurrentCategory(finalCategory);
        setHistory((prev) => [finalCategory, ...prev.filter((c) => c.id !== finalCategory.id)]);
        setIsShuffling(false);
        sounds.playBottlecap();
      }
    }, 70);
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customText.trim()) return;

    const newCat = {
      id: Date.now(),
      text: customText.trim(),
      tag: customTag,
      isCustom: true,
    };

    setCategoriesList((prev) => [newCat, ...prev]);
    setCurrentCategory(newCat);
    setHistory((prev) => [newCat, ...prev]);
    setCustomText("");
    setShowCustomModal(false);
    sounds.playGoldFanfare();
  };

  const copyToClipboard = () => {
    if (!currentCategory) return;
    navigator.clipboard.writeText(`Let It Play Category: ${currentCategory.text}`);
    setCopied(true);
    sounds.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Dices className="w-7 h-7 text-amber-400" />
            Category Wheel
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Draw a music category for the Judge's turn
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              setShowHistory(!showHistory);
            }}
            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
              showHistory
                ? "bg-amber-400/20 text-amber-300 border-amber-400/40"
                : "bg-slate-900 border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <History className="w-4 h-4" />
            <span>History ({history.length})</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setShowCustomModal(true);
            }}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-amber-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Custom Category</span>
          </button>
        </div>
      </div>

      {/* Vibe Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
        {VIBE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sounds.playClick();
              setActiveTab(tab.id);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20 scale-105"
                : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* The Active Category Card */}
      <div className="relative">
        <div
          className={`relative overflow-hidden rounded-3xl p-8 sm:p-14 text-center border transition-all duration-300 ${
            isShuffling
              ? "scale-98 border-amber-400/60 bg-slate-900 shadow-2xl shadow-amber-500/20"
              : "border-white/15 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-900 shadow-2xl"
          }`}
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-indigo-500/10 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-white/10 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>
                {currentCategory?.isCustom
                  ? "Custom Card"
                  : currentCategory?.tag?.toUpperCase() || "THEME"}
              </span>
            </div>

            <div className="min-h-[140px] flex items-center justify-center px-4">
              <h3
                className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight text-transparent bg-clip-text transition-all duration-150 ${
                  isShuffling
                    ? "opacity-60 blur-xs bg-gradient-to-r from-amber-300 to-rose-400"
                    : "bg-gradient-to-r from-white via-slate-100 to-amber-200"
                }`}
              >
                {currentCategory ? currentCategory.text : "Tap Draw to Begin!"}
              </h3>
            </div>

            {/* Draw Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={rollCategory}
                disabled={isShuffling}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-lg sm:text-xl shadow-xl shadow-amber-500/30 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
              >
                <Dices className={`w-6 h-6 ${isShuffling ? "animate-spin" : ""}`} />
                <span>{isShuffling ? "Rolling..." : "Draw Next Category"}</span>
              </button>

              <button
                onClick={copyToClipboard}
                className="px-4 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white font-bold text-sm transition-colors flex items-center gap-2"
                title="Copy category to share with players"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <span>Share Prompt</span>
                )}
              </button>

              {onSendCategoryToArena && currentCategory && (
                <button
                  onClick={() => {
                    sounds.playClick();
                    onSendCategoryToArena(currentCategory.text);
                  }}
                  className="px-4 py-4 rounded-2xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-sm border border-indigo-400/30 transition-colors flex items-center gap-1.5"
                >
                  <span>Play in Arena</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Session History Drawer */}
      {showHistory && (
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4 text-amber-400" />
              Cards Drawn in This Session ({history.length})
            </h4>
            <button
              onClick={() => setHistory([])}
              className="text-xs text-rose-400 hover:underline"
            >
              Clear History
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
            {history.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => {
                  sounds.playClick();
                  setCurrentCategory(item);
                }}
                className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors flex items-center justify-between ${
                  currentCategory?.id === item.id
                    ? "bg-amber-400/20 border-amber-400/40 text-amber-300 font-bold"
                    : "bg-slate-900/60 border-white/5 text-slate-300 hover:bg-white/5"
                }`}
              >
                <span className="truncate pr-2">{item.text}</span>
                <span className="text-[10px] uppercase text-slate-500 flex-shrink-0">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Custom Category Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 border border-amber-400/30 space-y-4 shadow-2xl bg-slate-900">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" />
              Add Custom Category
            </h3>
            <p className="text-xs text-slate-400">
              Create an inside-joke, local theme, or wild house rule for tonight!
            </p>

            <form onSubmit={handleAddCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase">
                  Category Prompt
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Songs our host would play on first date"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase">
                  Category Vibe
                </label>
                <select
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="fun">Party & Laughs</option>
                  <option value="energy">High Energy</option>
                  <option value="vibe">Moods & Seasons</option>
                  <option value="genre">Genres & Artists</option>
                  <option value="wildcard">Wildcards</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-lg shadow-amber-400/20"
                >
                  Add & Draw Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
