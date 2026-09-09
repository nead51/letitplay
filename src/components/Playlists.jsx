import React, { useState } from "react";
import { Disc3, ExternalLink, Play, Radio, Info } from "lucide-react";
import { sounds } from "../utils/audio";

export const Playlists = ({ players, activeJudgeId }) => {
  const [embeddedId, setEmbeddedId] = useState(null);

  const toggleEmbed = (spotifyId) => {
    sounds.playClick();
    setEmbeddedId(embeddedId === spotifyId ? null : spotifyId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Playlists Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Disc3 className="w-7 h-7 text-emerald-400" />
            Spotify Color Playlists
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Dedicated playlists for all 8 player colors. Tap to open or add tracks.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
          <Radio className="w-4 h-4 animate-pulse text-emerald-400" />
          <span>All 8 Spotify Playlists Live</span>
        </div>
      </div>

      {/* Info Tip */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 flex items-start gap-3 bg-slate-900/60">
        <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1">
          <p>
            <strong>Party Rule:</strong> When the Judge rolls a category, all other players open that Judge's playlist and anonymously add 1 song.
          </p>
          <p className="text-slate-400">
            Tap <strong>"Open in App"</strong> to launch directly into your native Spotify mobile/desktop app.
          </p>
        </div>
      </div>

      {/* 8 Color Playlist Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {players.map((player) => {
          const isJudge = player.id === activeJudgeId;
          const isEmbedded = embeddedId === player.spotifyId;

          return (
            <div
              key={player.id}
              className={`relative overflow-hidden rounded-3xl border transition-all flex flex-col justify-between ${
                isJudge
                  ? "bg-slate-900/95 border-amber-400 ring-2 ring-amber-400/30 shadow-xl"
                  : "bg-slate-900/80 border-white/10 hover:border-white/20"
              }`}
            >
              {/* Header colored banner */}
              <div
                className={`p-4 flex items-center justify-between text-white ${player.bgClass}`}
              >
                <div className="flex items-center gap-2">
                  <Disc3 className="w-5 h-5 text-white/90" />
                  <span className="text-xs font-black uppercase tracking-wider drop-shadow-sm">
                    {player.colorName} Playlist
                  </span>
                </div>
                {isJudge && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-950/80 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                    Active Judge
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-white truncate">
                    {player.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Spotify ID: <span className="font-mono text-slate-500">{player.spotifyId.slice(0, 10)}...</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  {/* Native App Link */}
                  <a
                    href={player.spotifyUri}
                    onClick={() => sounds.playClick()}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all hover:scale-102"
                  >
                    <Disc3 className="w-4 h-4" />
                    <span>Open in Spotify App</span>
                  </a>

                  {/* Web Player Link */}
                  <a
                    href={player.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sounds.playClick()}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Open Web Player</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>

                  {/* Preview Player Embed Toggle */}
                  <button
                    onClick={() => toggleEmbed(player.spotifyId)}
                    className="w-full py-1.5 text-[11px] font-bold text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1"
                  >
                    <Play className="w-3 h-3" />
                    <span>{isEmbedded ? "Hide Spotify Player" : "Preview Player Here"}</span>
                  </button>
                </div>

                {/* Embedded Spotify IFrame */}
                {isEmbedded && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <iframe
                      src={`https://open.spotify.com/embed/playlist/${player.spotifyId}?utm_source=generator&theme=0`}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="rounded-xl shadow-lg"
                      title={`${player.name} Spotify Preview`}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
