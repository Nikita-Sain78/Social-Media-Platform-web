"use client";

import { useState } from "react";

const skills = ["Diseño visual", "UX", "UI", "Branding", "HTML", "CSS", "JS"];
const recentTags = [
  "UX",
  "Diseño gráfico",
  "React",
  "UX/UI",
  "React Native",
  "UI Design",
];

const socialLinks = [
  {
    name: "GitHub",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Behance",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.69.75-.63.147-1.29.222-1.98.222H0V4.502h6.938zm-.412 5.935c.55 0 1-.13 1.35-.39.35-.26.52-.67.52-1.22 0-.3-.05-.55-.15-.75-.1-.2-.24-.36-.42-.48-.18-.12-.39-.2-.63-.25-.24-.04-.5-.06-.79-.06H3.5v3.15h3.026zm.2 6.2c.32 0 .62-.03.9-.09s.52-.17.73-.32c.21-.15.37-.35.49-.61.12-.26.18-.59.18-.99 0-.78-.22-1.33-.67-1.64-.45-.31-1.04-.47-1.77-.47H3.5v4.12h3.226zM17.45 8.49c1.07 0 2 .2 2.79.6.79.4 1.44.93 1.95 1.58.51.65.88 1.4 1.12 2.25.23.84.34 1.72.34 2.62H14.9c.06.96.36 1.68.9 2.16.54.48 1.23.72 2.07.72.58 0 1.08-.14 1.5-.42.43-.28.71-.58.84-.9h2.87c-.46 1.38-1.17 2.38-2.14 3-.96.62-2.13.93-3.5.93-1 0-1.9-.17-2.7-.5-.8-.33-1.48-.8-2.04-1.4-.55-.6-.97-1.32-1.26-2.15-.29-.83-.43-1.74-.43-2.73 0-.97.15-1.86.46-2.68.3-.82.74-1.53 1.3-2.13.56-.6 1.24-1.07 2.04-1.4.8-.33 1.69-.5 2.67-.5zm.06 2.22c-.75 0-1.37.2-1.86.6-.48.4-.78 1-.9 1.8h5.35c-.07-.76-.33-1.36-.78-1.77-.44-.42-1-.63-1.81-.63zM15.27 4.5h5.47v1.5h-5.47V4.5z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function ProfileCard() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xs">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-lg overflow-hidden">
          {/* Cover */}
          <div className="h-20 bg-gradient-to-br from-blue-100 via-purple-100 to-emerald-100" />

          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative -mt-9">
              <div className="w-[72px] h-[72px] rounded-full border-[3px] border-white bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center text-white text-xl font-semibold shadow-md">
                MB
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-400 text-white text-[8px] font-semibold tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                PREMIUM
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 pb-5 pt-3">
            {/* Name & Bio */}
            <h2 className="text-center text-lg font-semibold text-stone-800 mt-2">
              Matias Bejas
            </h2>
            <p className="text-center text-[11px] text-stone-400 leading-relaxed mt-1 mb-4 font-light">
              Fusion Agency Founder · UX/UI expert —<br />
              Visual & Product Designer —<br />
              Brand Strategist — Teacher at IEO Madrid
            </p>

            {/* Stats */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 bg-stone-50 border border-stone-100 rounded-xl py-3 text-center hover:bg-stone-100 transition-colors cursor-default">
                <div className="text-base font-semibold text-stone-800">
                  1,141
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5">
                  connections
                </div>
              </div>
              <div className="flex-1 bg-stone-50 border border-stone-100 rounded-xl py-3 text-center hover:bg-stone-100 transition-colors cursor-default">
                <div className="text-base font-semibold text-stone-800">26</div>
                <div className="text-[10px] text-stone-400 mt-0.5">
                  profile views
                </div>
              </div>
            </div>

            <hr className="border-stone-100 mb-4" />

            {/* Skills */}
            <p className="text-[9px] text-stone-300 tracking-widest uppercase mb-2.5 font-medium">
              Skills
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {skills.map((s) => (
                <span
                  key={s}
                  className="text-[11px] text-stone-500 bg-stone-50 border border-stone-200 rounded-full px-3 py-0.5 hover:bg-stone-100 hover:text-stone-700 transition-colors cursor-default"
                >
                  {s}
                </span>
              ))}
            </div>

            <hr className="border-stone-100 mb-4" />

            {/* Socials */}
            <p className="text-[9px] text-stone-300 tracking-widest uppercase mb-2.5 font-medium">
              Connect
            </p>
            <div className="flex gap-2 mb-4">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  title={s.name}
                  className="w-9 h-9 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-400 hover:bg-stone-800 hover:text-white hover:border-stone-800 hover:-translate-y-0.5 hover:shadow-md transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Saved Items */}
            <button
              onClick={() => setSaved(!saved)}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl hover:bg-stone-100 transition-colors mb-4 cursor-pointer"
            >
              <span
                className={`text-sm transition-transform duration-200 ${saved ? "scale-125" : "scale-100"}`}
              >
                🔖
              </span>
              <span className="text-[13px] text-stone-500">Saved items</span>
            </button>

            <hr className="border-stone-100 mb-3" />

            {/* Recent Tags */}
            <p className="text-[9px] text-stone-300 tracking-widest uppercase mb-2 font-medium">
              Recent tags
            </p>
            <div>
              {recentTags.map((tag, i) => (
                <div
                  key={tag}
                  className="flex items-center gap-3 py-1.5 border-b border-stone-50 last:border-none hover:pl-1.5 transition-all duration-150 cursor-default"
                >
                  <span className="text-[11px] text-stone-300 w-3.5 text-right shrink-0">
                    {i + 1}.
                  </span>
                  <span className="text-xs text-stone-500">{tag}</span>
                </div>
              ))}
            </div>

            {/* Create Company */}
            <button className="w-full flex items-center gap-2.5 pt-3 mt-3 border-t border-stone-100 hover:opacity-60 transition-opacity cursor-pointer">
              <div className="w-7 h-7 rounded-full border border-dashed border-stone-300 flex items-center justify-center text-stone-300 text-base leading-none shrink-0">
                +
              </div>
              <span className="text-xs text-stone-400">
                Create a company page
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
