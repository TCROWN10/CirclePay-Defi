"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  MessageSquare,
  Coins,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const NAVIGATION_ITEMS = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Portfolio overview",
  },
  {
    label: "Cross-Chain",
    href: "/dashboard/crosschain",
    icon: ArrowLeftRight,
    description: "Transfer & deposit",
  },
  {
    label: "AI Assistant",
    href: "/aichat",
    icon: MessageSquare,
    description: "Best yield finder",
  },
  {
    label: "Staking",
    href: "/staking",
    icon: Coins,
            description: "Stake CirclePay tokens",
  },
  {
    label: "Yield Farming",
    href: "/dashboard/yield",
    icon: TrendingUp,
    description: "Aave & Compound pools",
  },
];

interface DashboardSidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`bg-[#1F1A46] backdrop-blur-sm border-r border-[#2A2357] transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } ${className}`}
    >
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/10"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 pb-4">
          <div className="space-y-2">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-white/20 text-white border border-white/30"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        {!isCollapsed && (
          <div className="p-4 border-t border-[#2A2357]">
            <div className="bg-gradient-to-r from-[#5CA9DE]/20 to-[#2EE2CA]/20 p-3 rounded-lg border border-[#5CA9DE]/30">
              <div className="text-sm font-medium text-[#5CA9DE] mb-1">
                Weekly Selection
              </div>
              <div className="text-xs text-gray-300">
                5 lucky depositors win CirclePay tokens every week!
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}