"use client";

import { Trophy, Users, Clock, Gift } from "lucide-react";
import { WEEKLY_REWARDS } from "@/data/yieldData";

export function WeeklyRewards() {
  const currentWeek = WEEKLY_REWARDS.find(week => week.status === "active");
  const lastWeek = WEEKLY_REWARDS.find(week => week.status === "completed");

  if (!currentWeek) return null;

  return (
    <div className="bg-[#1F1A46] border border-[#5CA9DE]/30 rounded-xl p-6 mb-8">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-[#5CA9DE] to-[#4A8BC7] rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
                    <h2 className="text-xl font-bold text-white">Weekly CirclePay Rewards</h2>
        <p className="text-gray-300">5 lucky depositors win 100 CirclePay tokens each week!</p>
          </div>
        </div>
        <div className="text-right">
                      <div className="text-[#5CA9DE] font-bold text-2xl">500 CirclePay</div>
          <div className="text-gray-400 text-sm">Total Prize Pool</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Week Stats */}
        <div className="bg-black/30 border border-[#5CA9DE]/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-5 h-5 text-[#5CA9DE]" />
            <span className="text-[#5CA9DE] font-medium">{currentWeek.week} - Active</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Participants:</span>
              <span className="text-white font-medium">{currentWeek.totalParticipants}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Your Entries:</span>
              <span className="text-[#2EE2CA] font-medium">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Ends In:</span>
              <span className="text-white font-medium">3d 12h</span>
            </div>
          </div>
        </div>

        {/* How to Participate */}
        <div className="bg-black/30 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Gift className="w-5 h-5 text-[#5CA9DE]" />
            <span className="text-white font-medium">How to Enter</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-[#5CA9DE] rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-300">Deposit minimum $10 to any pool</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-[#5CA9DE] rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-300">Each $10 deposited = 1 entry</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-[#5CA9DE] rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-300">Winners selected randomly</span>
            </div>
          </div>
        </div>

        {/* Last Week Winners */}
        <div className="bg-black/30 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Users className="w-5 h-5 text-[#2EE2CA]" />
            <span className="text-white font-medium">Last Week Winners</span>
          </div>
          {lastWeek && lastWeek.winners.length > 0 ? (
            <div className="space-y-2">
              {lastWeek.winners.slice(0, 3).map((winner, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{winner}</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-[#5CA9DE] font-medium">100</span>
                    <span className="text-gray-400">CirclePay</span>
                  </div>
                </div>
              ))}
              {lastWeek.winners.length > 3 && (
                <div className="text-center text-gray-400 text-xs">
                  +{lastWeek.winners.length - 3} more winners
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-400 text-sm">No previous winners</div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300 text-sm">Your Winning Chances</span>
          <span className="text-[#5CA9DE] text-sm font-medium">
            2 / {currentWeek.totalParticipants} entries ({((2 / currentWeek.totalParticipants) * 100).toFixed(1)}%)
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#5CA9DE] to-[#4A8BC7] h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((2 / currentWeek.totalParticipants) * 100 * 5, 100)}%` }}
          />
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Deposit more to increase your chances of winning!
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-6 text-center">
        <button className="bg-gradient-to-r from-[#5CA9DE] to-[#4A8BC7] text-white font-medium px-6 py-2 rounded-lg hover:from-[#4A8BC7] hover:to-[#3A7BB7] transition-all">
          Deposit Now to Enter
        </button>
      </div>
    </div>
  );
}