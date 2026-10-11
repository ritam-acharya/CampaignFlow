"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Send } from "lucide-react";

type User = { name: string } | null;

type HeaderProps = {
  user?: User;
  onLogout?: () => void;
};

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Campaigns", href: "/campaigns" },
];

const outlineBtn =
  "rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50";
const primaryBtn =
  "rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-indigo-500/25 transition hover:opacity-90";

export default function Header({ user = null, onLogout }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const initial = user?.name?.trim().charAt(0).toUpperCase() ?? "";

  const navClass = (href: string) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      pathname?.startsWith(href)
        ? "bg-indigo-50 text-indigo-600"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  // Right side: signup/signin when logged out, avatar + logout when logged in
  const auth = user ? (
    <div className="flex items-center gap-3">
      <div
        title={user.name}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600"
      >
        {initial}
      </div>
      <button
        onClick={() => {
          setOpen(false);
          onLogout?.();
        }}
        className={outlineBtn}
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Link href="/signin" onClick={() => setOpen(false)} className={outlineBtn}>
        Sign in
      </Link>
      <Link href="/signup" onClick={() => setOpen(false)} className={primaryBtn}>
        Sign up
      </Link>
    </div>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Left: brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30">
            <Send size={16} />
          </span>
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            CampaignFlow
          </span>
        </Link>

        {/* Middle: nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={navClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: auth (desktop) */}
        <div className="hidden md:block">{auth}</div>

        {/* Mobile menu toggle */}
        <button
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="space-y-3 border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={navClass(l.href)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-100 pt-3">{auth}</div>
        </div>
      )}
    </header>
  );
}
