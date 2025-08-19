"use client"

import { useState } from "react"
import { ChainSelector } from "@/components/dashboard/yield/ChainSelector"
import { ProtocolSelector } from "@/components/dashboard/yield/ProtocolSelector"
import { DepositForm } from "@/components/dashboard/yield/DepositForm"
import { PoolStats } from "@/components/dashboard/yield/PoolStats"
import { UserPositions } from "@/components/dashboard/yield/UserPositions"
import { WeeklyRewards } from "@/components/dashboard/yield/WeeklyRewards"
import { SUPPORTED_CHAINS, PROTOCOLS } from "@/data/yieldData"
import { ExternalLink, Coins, TrendingUp } from "lucide-react"

export default function YieldPage() {
  const [selectedChain, setSelectedChain] = useState(SUPPORTED_CHAINS[0])
  const [selectedProtocol, setSelectedProtocol] = useState(PROTOCOLS[0])

  return (
    <div className="text-[#0C1523] p-4 md:p-6 bg-[#F3F7FA] min-h-screen">
      <div className="max-w-7xl mx-auto mb-8">
        {/* Page-specific Header (Deposit & Earn) */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0C1523] mb-2">Deposit & Earn</h1>
          <p className="text-gray-400">Deposit your assets to Aave or Compound and earn competitive yields</p>
        </div>

        {/* USDC Faucet Banner */}
        <div className="mb-8 p-4 sm:p-6 bg-gradient-to-r from-[#2EE2CA]/20 to-[#5CA9DE]/20 border border-[#2EE2CA]/30 rounded-2xl backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2EE2CA]/20 to-[#5CA9DE]/20 rounded-xl flex items-center justify-center border border-[#2EE2CA]/30 flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-[#2EE2CA]" />
              </div>
              <div>
                <h3 className="text-[#2EE2CA] font-semibold text-base sm:text-lg mb-2 flex items-center space-x-2">
                  <span>Start Earning Yield</span>
                  <Coins className="w-4 h-4 text-[#2EE2CA]/70" />
                </h3>
                <p className="text-[#5F7290] text-sm leading-relaxed">
                  Need testnet USDC to start earning yield? Get free tokens for Sepolia, Base Sepolia, and Arbitrum
                  Sepolia to test our yield farming protocols.
                </p>
              </div>
            </div>
            <a
              href="https://faucet.circle.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-[#2EE2CA] to-[#5CA9DE] hover:from-[#2EE2CA]/90 hover:to-[#5CA9DE]/90 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#2EE2CA]/25 whitespace-nowrap"
            >
              <Coins className="w-4 h-4" />
              <span>Get USDC</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Weekly Rewards Banner */}
        <WeeklyRewards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          {/* Left Column - Deposit Form */}
          <div className="lg:col-span-8 space-y-6">
            {/* Chain & Protocol Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChainSelector selectedChain={selectedChain} onChainSelect={setSelectedChain} />
              <ProtocolSelector
                selectedProtocol={selectedProtocol}
                selectedChain={selectedChain}
                onProtocolSelect={setSelectedProtocol}
              />
            </div>

            {/* Pool Statistics */}
            <PoolStats selectedChain={selectedChain} selectedProtocol={selectedProtocol} />

            {/* Deposit Form */}
            <DepositForm selectedChain={selectedChain} selectedProtocol={selectedProtocol} />
          </div>

          {/* Right Column - User Positions */}
          <div className="lg:col-span-4">
            <UserPositions />
          </div>
        </div>
      </div>
    </div>
  )
}
