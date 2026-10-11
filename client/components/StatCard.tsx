import { MoreVertical, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  change: number;
};

export default function StatCard({ icon: Icon, label, value, change }: StatCardProps) {
  const positive = change >= 0;
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between px-1 pb-3 text-sm text-gray-600">
        <span className="flex items-center gap-2">
          <Icon size={15} className="text-gray-500" />
          {label}
        </span>
        <MoreVertical size={14} className="text-gray-400" />
      </div>
      <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
        <span className="text-2xl font-medium text-gray-900">{value}</span>
        <span
          className={`rounded-md px-2 py-1 text-xs font-medium ${
            positive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
          }`}
        >
          {positive ? "↗ +" : "↘ "}
          {change}%
        </span>
      </div>
    </div>
  );
}
