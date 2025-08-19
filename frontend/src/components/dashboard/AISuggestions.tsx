"use client";

import { mockAISuggestions } from "../../data/mockData";
import { 
  Brain, 
  TrendingUp, 
  ArrowRight, 
  Sparkles,
  Target,
  ArrowLeftRight,
  Coins
} from "lucide-react";

const getActionIcon = (action: string) => {
  switch (action) {
    case "rebalance":
      return Target;
    case "bridge":
      return ArrowLeftRight;
    case "stake":
      return Coins;
    default:
      return TrendingUp;
  }
};

const getActionColor = (action: string) => {
  switch (action) {
    case "rebalance":
      return "from-[#5CA9DE] to-[#4A8BC7]";
    case "bridge":
      return "from-[#2EE2CA] to-[#25C4B3]";
    case "stake":
      return "from-[#1F1A46] to-[#2A2357]";
    default:
      return "from-[#5CA9DE] to-[#2EE2CA]";
  }
};

export function AISuggestions() {
  return (
    <div className="bg-white backdrop-blur-sm border border-[#E5E9EC] rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#0C1523] flex items-center">
          <Brain className="w-5 h-5 mr-2 text-[#5CA9DE]" />
          AI Suggestions
        </h2>
        <Sparkles className="w-5 h-5 text-[#5CA9DE] animate-pulse" />
      </div>

      <div className="space-y-4">
        {mockAISuggestions.map((suggestion) => {
          const ActionIcon = getActionIcon(suggestion.action);
          const actionColor = getActionColor(suggestion.action);
          
          return (
            <div
              key={suggestion.id}
              className="p-4 bg-gradient-to-r from-[#F3F7FA] to-white rounded-lg border border-[#E5E9EC] hover:border-[#5CA9DE]/30 transition-all duration-200 group"
            >
              <div className="flex items-start space-x-4">
                {/* Action Icon */}
                <div className={`p-2 rounded-lg bg-gradient-to-r ${actionColor} flex-shrink-0`}>
                  <ActionIcon className="w-4 h-4 text-white" />
                </div>

                {/* Suggestion Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#0C1523] font-medium mb-2 group-hover:text-[#5CA9DE] transition-colors">
                    {suggestion.title}
                  </h3>
                  <p className="text-sm text-[#5F7290] mb-3">
                    {suggestion.description}
                  </p>
                  
                  {/* Potential Gain */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-medium text-sm">
                        {suggestion.potentialGain}
                      </span>
                    </div>
                    
                    {/* Action Button */}
                    <button className="flex items-center space-x-1 text-[#5CA9DE] hover:text-[#4A8BC7] text-sm font-medium transition-colors group-hover:translate-x-1 transform duration-200">
                      <span>Execute</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Status */}
      <div className="mt-6 p-3 bg-gradient-to-r from-[#5CA9DE]/10 to-[#2EE2CA]/10 border border-[#5CA9DE]/30 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <div className="text-sm">
            <span className="text-[#5CA9DE] font-medium">AI Agent Active</span>
            <span className="text-[#5F7290] ml-2">
              Analyzing market conditions for optimal strategies
            </span>
          </div>
        </div>
      </div>

      {/* Chat CTA */}
      <div className="mt-4">
        <button className="w-full bg-gradient-to-r from-[#5CA9DE] to-[#2EE2CA] text-white font-medium py-3 px-4 rounded-lg hover:from-[#4A8BC7] hover:to-[#25C4B3] transition-all duration-200 flex items-center justify-center space-x-2">
          <Brain className="w-4 h-4" />
          <span>Chat with AI Assistant</span>
        </button>
      </div>
    </div>
  );
}