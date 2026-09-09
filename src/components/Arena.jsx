import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Bell,
  Sparkles,
  Trophy,
  Crown,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  Users,
  ChevronRight,
  Disc3,
  Award,
} from "lucide-react";
import confetti from "canvas-confetti";
import { sounds } from "../utils/audio";

export const Arena = ({
  players,
  setPlayers,
  activeJudgeId,
  setActiveJudgeId,
  activeCategory,
  onGoToCategories,
  onGoToPlaylists,
}) => {
  // Timer State
  const [timerSeconds, setTimerSeconds] = useState(45);
  const [initialSeconds, setInitialSeconds] = useState(45);
  const [timerRunning, setTimerRunning] = useState(false);
  const [buzzerTriggered, setBuzzerTriggered] = useState(false);

  // Gold Chip Modal State
  const [showGoldModal, setShowGoldModal] = useState(false);
  const [goldCallerId, setGoldCallerId] = useState("");
  const [goldSongSubmitterId, setGoldSongSubmitterId] = useState("");

  // Award Bottlecap Modal State
  const [showAwardModal, setShowAwardModal] = useState(false);
  const [selectedWinnerId, setSelectedWinnerId] = useState("");

  // Timer Tick Effect
  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      triggerBuzzer();
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const toggleTimer = () => {
    sounds.playClick();
    setTimerRunning(!timerRunning);
  };

  const resetTimer = (newDuration) => {
    sounds.playClick();
    setTimerRunning(false);
    const duration = newDuration !== undefined ? newDuration : initialSeconds;
    setInitialSeconds(duration);
    setTimerSeconds(duration);
    setBuzzerTriggered(false);
  };

  const triggerBuzzer = () => {
    sounds.playBuzzer();
    setTimerRunning(false);
    setBuzzerTriggered(true);
    setTimeout(() => {
      setBuzzerTriggered(false);
    }, 4000);
  };

  const currentJudge =
    players.find((p) => p.id === activeJudgeId) || players[0];

  const nextJudge = () => {
    sounds.playClick();
    const currentIndex = players.findIndex((p) => p.id === activeJudgeId);
    const nextIndex = (currentIndex + 1) % players.length;
    setActiveJudgeId(players[nextIndex].id);
    resetTimer(initialSeconds);
  };

  const updateScore = (playerId, delta) => {
    sounds.playBottlecap();
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === playerId
          ? { ...p, score: Math.max(0, (p.score || 0) + delta) }
          : p
      )
    );
  };

  const handleUpdateName = (playerId, newName) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, name: newName } : p))
    );
  };

  // Launch Gold Chip celebration
  const handleConfirmGoldChip = () => {
    if (!goldCallerId || !goldSongSubmitterId) return;

    sounds.playGoldFanfare();

    // Trigger full screen confetti shower
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#fbbf24", "#f59e0b", "#fde047", "#ffffff", "#ca8a04"],
    });

    // Mark caller's gold chip as used and award 5 bottlecaps to song submitter
    setPlayers((prev) =>
      prev.map((p) => {
        let updated = { ...p };
        if (p.id === goldCallerId) {
          updated.hasGoldChip = false;
        }
        if (p.id === goldSongSubmitterId) {
          updated.score = (updated.score || 0) + 5;
        }
        return updated;
      })
    );

    setShowGoldModal(false);
    setGoldCallerId("");
    setGoldSongSubmitterId("");
  };

  // Award 1 Bottlecap to round winner
  const handleConfirmAward = () => {
    if (!selectedWinnerId) return;

    sounds.playGoldFanfare();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#10b981", "#3b82f6", "#f59e0b"],
    });

    updateScore(selectedWinnerId, 1);
    setShowAwardModal(false);
    setSelectedWinnerId("");
  };

  // Sort players for leader ranking
  const maxScore = Math.max(...players.map((p) => p.score || 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner: Active Judge & Current Theme */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 bg-slate-900/90 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl ${currentJudge.bgClass} ${currentJudge.glowClass} flex-shrink-0`}
            >
              <Crown className="w-8 h-8 text-white drop-shadow-md" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-wider text-amber-300">
                  Current Turn
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  Round Judge:
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {currentJudge.name}
              </h3>
              <p className="text-xs text-slate-400">
                Playing color:{" "}
                <strong className={currentJudge.textClass}>
                  {currentJudge.colorName}
                </strong>
              </p>
            </div>
          </div>

          {/* Current Category & Next Judge Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950/80 px-4 py-3 rounded-2xl border border-white/10 flex-1 min-w-[240px]">
              <div className="text-[10px] uppercase font-black tracking-wider text-amber-400 flex items-center justify-between">
                <span>Active Category</span>
                <button
                  onClick={onGoToCategories}
                  className="text-slate-400 hover:text-white underline text-[10px]"
                >
                  Change
                </button>
              </div>
              <div className="text-sm font-bold text-white truncate mt-0.5">
                {activeCategory || "No category chosen yet"}
              </div>
            </div>

            <button
              onClick={nextJudge}
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/15 text-xs font-black flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <span>Next Judge</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick link to Judge's playlist */}
        <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-400">
            Players add songs to:{" "}
            <strong className="text-white">{currentJudge.name}'s Playlist</strong>
          </span>
          <div className="flex gap-2">
            <a
              href={currentJudge.spotifyUri}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold hover:bg-emerald-500/30 transition-colors flex items-center gap-1.5"
            >
              <Disc3 className="w-3.5 h-3.5" />
              <span>Open Spotify App</span>
            </a>
            <a
              href={currentJudge.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white font-bold transition-colors"
            >
              Web Player
            </a>
          </div>
        </div>
      </div>

      {/* Main Interactive Controls: DJ Timer & Judge Buzzer & Gold Chip */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* DJ Listening Timer */}
        <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4 bg-slate-900/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Disc3 className="w-5 h-5 text-indigo-400" />
              <h4 className="font-black text-white text-sm uppercase tracking-wider">
                DJ Song Timer
              </h4>
            </div>
            <button
              onClick={() => resetTimer(initialSeconds)}
              title="Reset Timer"
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center py-3">
            <div className="text-6xl font-black tracking-tight text-white font-mono">
              {Math.floor(timerSeconds / 60)}:
              {(timerSeconds % 60).toString().padStart(2, "0")}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {timerRunning ? "Audition in progress..." : "Timer paused"}
            </p>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={toggleTimer}
              className={`flex-1 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                timerRunning
                  ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
              }`}
            >
              {timerRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Audition</span>
                </>
              )}
            </button>
          </div>

          {/* Duration Presets */}
          <div className="flex items-center justify-between gap-1 pt-1">
            {[30, 45, 60, 90].map((sec) => (
              <button
                key={sec}
                onClick={() => resetTimer(sec)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  initialSeconds === sec && !timerRunning
                    ? "bg-white/20 text-white"
                    : "bg-slate-800/60 text-slate-400 hover:text-white"
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>
        </div>

        {/* Judge's Buzzer ("I've Heard Enough!") */}
        <div
          className={`relative rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
            buzzerTriggered
              ? "bg-rose-950/80 border-rose-500 shadow-2xl shadow-rose-500/40 animate-pulse"
              : "glass-panel border-white/10 bg-slate-900/60"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-rose-400" />
              <h4 className="font-black text-white text-sm uppercase tracking-wider">
                Judge's Buzzer
              </h4>
            </div>
            {buzzerTriggered && (
              <span className="text-[10px] font-black uppercase text-rose-400 animate-bounce">
                STOP MUSIC!
              </span>
            )}
          </div>

          <div className="my-auto py-4 flex flex-col items-center text-center space-y-3">
            <button
              onClick={triggerBuzzer}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-rose-500 via-rose-600 to-rose-800 border-4 border-rose-300/40 shadow-2xl shadow-rose-600/50 active:scale-95 transition-all flex flex-col items-center justify-center p-2 group hover:scale-105"
            >
              <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:animate-wiggle" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white mt-1">
                BUZZ!
              </span>
            </button>
            <p className="text-xs text-slate-300 font-bold">
              Hit when you've heard enough!
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setShowAwardModal(true);
            }}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Trophy className="w-4 h-4" />
            <span>Award Bottlecap to Winner</span>
          </button>
        </div>

        {/* Gold "Let It Play" Chip Activator */}
        <div className="relative overflow-hidden rounded-3xl p-6 border border-amber-400/50 bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-950 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h4 className="font-black text-amber-300 text-sm uppercase tracking-wider">
                Special Chip
              </h4>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded-full border border-amber-400/30">
              +5 Points
            </span>
          </div>

          <div className="my-auto py-4 flex flex-col items-center text-center space-y-3">
            <button
              onClick={() => {
                sounds.playClick();
                setShowGoldModal(true);
              }}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full gold-shimmer p-1.5 shadow-2xl shadow-amber-500/40 active:scale-95 transition-all flex items-center justify-center hover:scale-105 group"
            >
              <div className="w-full h-full rounded-full bg-slate-950 border-2 border-amber-300 flex flex-col items-center justify-center p-2 text-center">
                <Award className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] sm:text-xs font-black uppercase text-amber-300 mt-1 leading-tight">
                  LET IT PLAY!
                </span>
              </div>
            </button>
            <p className="text-xs text-amber-200/90 max-w-[200px] leading-snug">
              Play the full song! Winner gets 5 bottlecaps!
            </p>
          </div>

          <div className="text-[10px] text-center text-slate-400">
            {players.filter((p) => p.hasGoldChip !== false).length} of{" "}
            {players.length} chips remaining
          </div>
        </div>
      </div>

      {/* Bottlecap Scoreboard */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">
                Bottlecap Scoreboard
              </h3>
              <p className="text-xs text-slate-400">
                Track points and Gold Chip availability
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                onGoToPlaylists();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
            >
              View All 8 Playlists
            </button>
          </div>
        </div>

        {/* Player Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {players.map((player) => {
            const isLeading =
              maxScore > 0 && (player.score || 0) === maxScore;
            const isJudge = player.id === activeJudgeId;
            const hasGold = player.hasGoldChip !== false;

            return (
              <div
                key={player.id}
                className={`relative rounded-2xl p-4 border transition-all ${
                  isJudge
                    ? "bg-slate-800/90 border-amber-400/60 ring-2 ring-amber-400/20 shadow-lg"
                    : "bg-slate-900/80 border-white/10 hover:border-white/20"
                }`}
              >
                {/* Top Badge: Color Indicator & Leader Crown */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3.5 h-3.5 rounded-full ${player.bgClass} shadow-md`}
                    />
                    <span
                      className={`text-[11px] font-black uppercase tracking-wider ${player.textClass}`}
                    >
                      {player.colorName}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {isJudge && (
                      <span className="px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[9px] font-black uppercase">
                        Judge
                      </span>
                    )}
                    {isLeading && (
                      <span
                        title="Scoreboard Leader"
                        className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1 text-[9px] font-black"
                      >
                        <Crown className="w-2.5 h-2.5" />
                        <span>Lead</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Player Name Input */}
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => handleUpdateName(player.id, e.target.value)}
                  className="w-full bg-transparent text-sm font-black text-white border-b border-transparent hover:border-white/20 focus:border-amber-400 focus:outline-none transition-colors pb-0.5 mb-3"
                  placeholder="Player Name"
                />

                {/* Score & Controls */}
                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">
                      Bottlecaps
                    </div>
                    <div className="text-3xl font-black text-white tracking-tight">
                      {player.score || 0}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateScore(player.id, -1)}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                      title="Subtract 1 Bottlecap"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => updateScore(player.id, 1)}
                      className="w-8 h-8 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black flex items-center justify-center transition-colors shadow-md shadow-amber-400/20"
                      title="Add 1 Bottlecap"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Gold Chip Status */}
                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Gold Chip
                  </span>
                  {hasGold ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400">
                      <Sparkles className="w-3 h-3" />
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500">
                      Used
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Activate Gold "Let It Play" Chip */}
      {showGoldModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8 border-2 border-amber-400 space-y-5 shadow-2xl bg-slate-900">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full gold-shimmer mx-auto p-1 shadow-lg shadow-amber-500/40 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                  <Award className="w-7 h-7 text-amber-400" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white">
                "LET IT PLAY!"
              </h3>
              <p className="text-xs text-slate-300">
                Play the full track! The submitter wins 5 Bottlecaps.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-amber-300 mb-1.5">
                  1. Who is using their Gold Chip?
                </label>
                <select
                  value={goldCallerId}
                  onChange={(e) => setGoldCallerId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="">Select player using chip...</option>
                  {players
                    .filter((p) => p.hasGoldChip !== false)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.colorName})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-amber-300 mb-1.5">
                  2. Who submitted this song? (+5 Bottlecaps)
                </label>
                <select
                  value={goldSongSubmitterId}
                  onChange={(e) => setGoldSongSubmitterId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="">Select song submitter...</option>
                  {players.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.colorName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowGoldModal(false)}
                className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmGoldChip}
                disabled={!goldCallerId || !goldSongSubmitterId}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-400/20 disabled:opacity-40"
              >
                Cash In Chip (+5)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Award Bottlecap to Winner */}
      {showAwardModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8 border border-emerald-500/40 space-y-5 shadow-2xl bg-slate-900">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white">
                Award 1 Bottlecap
              </h3>
              <p className="text-xs text-slate-300">
                The Judge selects the song that best matched the category!
              </p>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-emerald-400 mb-2">
                Select Round Winner
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {players.map((p) => {
                  const isSelected = selectedWinnerId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setSelectedWinnerId(p.id);
                      }}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        isSelected
                          ? "bg-emerald-500/20 border-emerald-400 text-white font-bold"
                          : "bg-slate-950 border-white/10 text-slate-300 hover:border-white/20"
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${p.bgClass}`} />
                      <span className="text-xs truncate">{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAwardModal(false)}
                className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAward}
                disabled={!selectedWinnerId}
                className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 disabled:opacity-40"
              >
                Award +1 Bottlecap
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
