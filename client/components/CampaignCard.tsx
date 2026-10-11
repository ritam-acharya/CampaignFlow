import { Mail, Eye, Copy, Pencil, MoreVertical } from "lucide-react";

const STATUS_STYLES = {
  Active: "bg-green-50 text-green-600",
  Scheduled: "bg-amber-50 text-amber-600",
  Draft: "bg-gray-100 text-gray-500",
};

export default function CampaignCard({ campaign }) {
  const { title, subtitle, time, status, tags, sent, opens, clicks, openRate, clickRate } = campaign;

  const metrics = [
    ["Sent", sent.toLocaleString()],
    ["Opens", opens.toLocaleString()],
    ["Clicks", clicks.toLocaleString()],
    ["Open Rate", `${openRate}%`],
    ["Click Rate", `${clickRate}%`],
  ];

  return (
    <div className="rounded-2xl border border-gray-200/70 bg-white p-4 shadow-sm sm:p-5">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Mail size={16} />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 flex items-center gap-2 text-xs text-gray-500">
              <span className="truncate">{subtitle}</span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-gray-400" />
              <span className="shrink-0">{time}</span>
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-gray-500 sm:gap-3">
          <button aria-label="View" className="hidden hover:text-gray-800 sm:block"><Eye size={15} /></button>
          <button aria-label="Duplicate" className="hidden hover:text-gray-800 sm:block"><Copy size={15} /></button>
          <button aria-label="Edit" className="hidden hover:text-gray-800 sm:block"><Pencil size={15} /></button>
          <span className={`rounded-md px-2 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}>{status}</span>
          <button aria-label="More" className="hover:text-gray-800"><MoreVertical size={15} /></button>
        </div>
      </div>

      {/* Tags + metrics */}
      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-md bg-gray-100 px-3 py-1.5 text-xs text-gray-600">{t}</span>
          ))}
        </div>

        <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 lg:max-w-xl lg:grid-cols-5">
          {metrics.map(([label, value]) => (
            <div key={label} className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-xs text-gray-500">{label}</p>
              <p className="mt-1 text-lg font-medium text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
