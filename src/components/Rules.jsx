import React from "react";
import { Users, Disc3, Sparkles, Trophy, ArrowRight, ShieldAlert, Award } from "lucide-react";
import { sounds } from "../utils/audio";

export const Rules = ({ onGoToCategories, onGoToArena }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-indigo-950/40 border border-amber-500/30 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Music Matching Party Game
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            How to Play <span className="text-amber-400">Let It Play</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The ultimate battle of musical taste, secret submissions, and intuition. For up to 8 players, one Bluetooth speaker, and a mountain of bottlecaps!
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => {
                sounds.playClick();
                onGoToCategories();
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all hover:scale-105"
            >
              Draw a Category
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onGoToArena();
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/15 font-bold text-sm transition-all"
            >
              Open Game Arena
            </button>
          </div>
        </div>
        <div className="absolute -right-12 -bottom-12 opacity-10 sm:opacity-20 pointer-events-none">
          <Disc3 className="w-80 h-80 text-amber-300" />
        </div>
      </div>

      {/* Setup & Roles Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white">1. Player Setup</h3>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
              <span>Up to <strong>8 players</strong> choose one assigned color token (Orange, Red, Blue, Yellow, Black, Purple, Green, Teal).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
              <span>Each player starts with <strong>1 Gold "Let It Play" Chip</strong> and a personal bank of bottlecaps.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
              <span>One player is designated as the <strong>DJ</strong> (connects phone to Bluetooth speaker).</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Disc3 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white">2. The DJ & Playlists</h3>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
              <span>All 8 player colors have their own dedicated Spotify playlist in the <strong>Playlists</strong> tab.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
              <span>Players queue songs into the active Judge's playlist <strong>anonymously</strong>.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
              <span>The DJ controls audio playback, skipping, and volume on the Bluetooth speaker.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* The Round Loop */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 font-black">
            3
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">The Round Loop</h3>
            <p className="text-xs text-slate-400">Step-by-step for each round of play</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
            <div className="text-xs font-black uppercase text-amber-400">Step A</div>
            <h4 className="font-bold text-white text-sm">Pick Category</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The active player is the <strong>Judge</strong>. They draw a random category card (or choose a custom one).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
            <div className="text-xs font-black uppercase text-sky-400">Step B</div>
            <h4 className="font-bold text-white text-sm">Secret Song Queue</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every other player secretly adds <strong>1 song</strong> that best fits the theme to the Judge's color playlist.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
            <div className="text-xs font-black uppercase text-purple-400">Step C</div>
            <h4 className="font-bold text-white text-sm">DJ Plays & Auditions</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The DJ hits play! The Judge listens. When the Judge has heard enough to decide, they hit the <strong>Judge's Buzzer</strong>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
            <div className="text-xs font-black uppercase text-emerald-400">Step D</div>
            <h4 className="font-bold text-white text-sm">Award Bottlecap</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The Judge selects the winning track and awards <strong>1 Bottlecap</strong> to that song's submitter!
            </p>
          </div>
        </div>
      </div>

      {/* Special Rule: The Gold Chip */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600/30 via-yellow-500/20 to-amber-700/30 border-2 border-amber-400/50 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Special Rule: The Gold "Let It Play" Chip
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Can't Stop the Groove!
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed max-w-xl">
              Each player gets <strong>1 Gold Chip</strong> per entire game. When ANY song is playing, ANY player can slam down their Gold Chip and scream:
              <br />
              <strong className="text-amber-300 text-base">"LET IT PLAY!"</strong>
            </p>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>The DJ <strong>MUST</strong> play the song all the way to the very last second (no skipping allowed!).</li>
              <li>The player who picked that song is awarded <strong className="text-amber-400 font-black">+5 Bottlecaps</strong> immediately!</li>
              <li>Once you spend your Gold Chip, it is gone for the rest of the game!</li>
            </ul>
          </div>

          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full gold-shimmer flex items-center justify-center p-2 shadow-2xl shadow-amber-500/40 flex-shrink-0">
            <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center text-center p-2 border-2 border-amber-300">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
              <span className="text-[10px] sm:text-xs font-black uppercase text-amber-300 leading-tight">
                5 Caps
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
