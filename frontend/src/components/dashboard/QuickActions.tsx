"use client";

import Link from "next/link";
import { 
  ArrowLeftRight, 
  MessageSquare, 
  Coins, 
  TrendingUp,
  Zap,
  Target
} from "lucide-react";

const QUICK_ACTIONS = [
  {
    title: "Cross-Chain Transfer",
    description: "Move assets between chains",
    icon: ArrowLeftRight,
    href: "/dashboard/crosschain",
    color: "from-[#5CA9DE] to-[#4A8BC7]",
    bgColor: "bg-[#5CA9DE]/10 hover:bg-[#5CA9DE]/20",
    borderColor: "border-[#5CA9DE]/30",
  },
  {
    title: "AI Yield Optimizer",
    description: "Find best yields automatically",
    icon: MessageSquare,
    href: "/dashboard/ai-chat",
    color: "from-[#2EE2CA] to-[#25C4B3]",
    bgColor: "bg-[#2EE2CA]/10 hover:bg-[#2EE2CA]/20",
    borderColor: "border-[#2EE2CA]/30",
  },
  {
            title: "Stake CirclePay",
    description: "Earn rewards & win prizes",
    icon: Coins,
    href: "/dashboard/staking",
    color: "from-[#1F1A46] to-[#2A2357]",
    bgColor: "bg-[#1F1A46]/10 hover:bg-[#1F1A46]/20",
    borderColor: "border-[#1F1A46]/30",
  },
  {
    title: "Deposit & Earn",
    description: "Aave & Compound pools",
    icon: TrendingUp,
    href: "/dashboard/yield",
    color: "from-[#5CA9DE] to-[#2EE2CA]",
    bgColor: "bg-[#5CA9DE]/10 hover:bg-[#5CA9DE]/20",
    borderColor: "border-[#5CA9DE]/30",
  },
];

export function QuickActions() {
  return (
    <div className="bg-white backdrop-blur-sm border border-[#E5E9EC] rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#0C1523] flex items-center">
          <Zap className="w-5 h-5 mr-2 text-[#5CA9DE]" />
          Quick Actions
        </h2>
        <Target className="w-5 h-5 text-[#5F7290]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          
          return (
            <Link
              key={action.title}
              href={action.href}
              className={`group ${action.bgColor} ${action.borderColor} border rounded-lg p-4 transition-all duration-200 hover:scale-105`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#0C1523] font-medium group-hover:text-[#5CA9DE] transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-[#5F7290] mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Featured Action */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#5CA9DE]/10 to-[#2EE2CA]/10 border border-[#5CA9DE]/30 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-[#5CA9DE] rounded-full animate-pulse" />
          <div>
            <div className="text-[#5CA9DE] font-medium text-sm">
              Weekly Selection Active
            </div>
            <div className="text-[#5F7290] text-xs">
              Deposit to any pool for a chance to win CirclePay tokens
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}