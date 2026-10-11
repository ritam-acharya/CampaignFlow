"use client";

import { useState } from "react";
import { Search, Plus, SlidersHorizontal, ChevronDown, Mail, CircleCheck, Clock, TrendingUp } from "lucide-react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import CampaignCard from "../components/CampaignCard";

const STATS = [
  { icon: Mail, label: "Total Campaigns", value: "24", change: 12 },
  { icon: CircleCheck, label: "Active", value: "8", change: 23 },
  { icon: Clock, label: "Scheduled", value: "3", change: -5 },
  { icon: TrendingUp, label: "Avg. Open Rate", value: "42.8%", change: 5.2 },
];

const CAMPAIGNS = [
  {
    id: 1, title: "Spring Sale Launch", subtitle: "Spring Sale! Up to 50% off!", time: "2 hours ago",
    status: "Active", tags: ["Promotional", "Sale"],
    sent: 2450, opens: 1089, clicks: 432, openRate: 44.4, clickRate: 17.6,
  },
  {
    id: 2, title: "Abandoned Cart Recovery", subtitle: "You left something behind.", time: "5 hours ago",
    status: "Active", tags: ["Automated", "E-commerce"],
    sent: 890, opens: 412, clicks: 167, openRate: 46.3, clickRate: 18.8,
  },
];

export default function CampaignsPage() {
  // Replace with your real auth state (NextAuth, Clerk, context, etc.)
  const [user, setUser] = useState<{ name: string } | null>({ name: "John" }); // set to null to see the logged-out header
  const [page, setPage] = useState<number>(1);
  const totalPages = 15;
  const pages = [1, 2, 3, 4, 5, totalPages];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header user={user} onLogout={() => setUser(null)} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* Title row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Campaigns</h1>
            <p className="mt-1 text-sm text-gray-500">Welcome back! Here&apos;s what&apos;s happening today.</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-500/25 transition hover:opacity-90">
            <Plus size={16} /> New Campaign
          </button>
        </div>

        {/* Stats */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => <StatCard key={s.label} {...s} />)}
        </section>

        {/* Recent campaigns */}
        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Recent Campaigns</h2>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Search Campaigns..."
                  className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-64"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex flex-1 items-center justify-between gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:flex-none">
                  All Status <ChevronDown size={14} />
                </button>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 sm:flex-none">
                  <SlidersHorizontal size={14} /> More Filters
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {CAMPAIGNS.map((c) => <CampaignCard key={c.id} campaign={c} />)}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-gray-600 sm:flex-row">
            <span>Page {page} of {totalPages}</span>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50 disabled:opacity-40"
              >
                ‹ Previous
              </button>
              {pages.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 rounded-lg border text-xs ${
                    page === p
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {String(p).padStart(2, "0")}
                </button>
              ))}
              <span className="px-1 text-gray-400">…</span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-lg border border-gray-200 px-3 py-1.5 hover:bg-gray-50 disabled:opacity-40"
              >
                Next ›
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
