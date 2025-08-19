// src/app/dashboard/page.tsx
"use client";

// REMOVE DashboardHeader and DashboardSidebar imports here
// import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
// import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

import { PortfolioOverview } from "@/components/dashboard/PortfolioOverview";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { AISuggestions } from "@/components/dashboard/AISuggestions";

export default function DashboardOverviewPage() { // Renamed for clarity, though `DashboardPage` is fine too
  return (
    // This div now only contains the page-specific content
    <div> {/* Removed min-h-screen, bg-black, and flex from here as they are in the layout */}
      {/* Header - Not needed here, it's in the layout */}
      {/* Sidebar - Not needed here, it's in the layout */}
      
      {/* No need for max-w-7xl mx-auto on the outer div if the layout's main already has it,
          but if you want *this page's* content to be centered, keep it. 
          I've kept it as it implies the inner content's max width. */}
      <div>
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0C1523] mb-2">
            Welcome back to CirclePay
          </h1>
          <p className="text-[#5F7290]">
            Your AI-powered DeFi dashboard for cross-chain yield optimization
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Portfolio Overview - Takes full width on mobile, 2 columns on desktop */}
          <div className="lg:col-span-2">
            <PortfolioOverview />
          </div>
          
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Suggestions */}
          <AISuggestions />
          
          {/* Recent Activity */}
          <RecentActivity />
        </div>

        {/* Mobile Sidebar Toggle Button - Moved to the layout */}
        {/* <div className="lg:hidden fixed bottom-4 right-4">
          <button className="bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div> */}
      </div>
    </div>
  );
}