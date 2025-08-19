"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Badge } from "../../components/ui/badge"
import { cn } from "../../lib/utils"

interface NetworkData {
  id: string
  name: string
  logo: string
  apy: number
  tvl: string
  userStake: string
  gasEstimate: string
  color: string
  chainId: number
}

interface NetworkCardProps {
  network: NetworkData
  isSelected: boolean
  onSelect: (networkId: string) => void
}

export function NetworkCard({ network, isSelected, onSelect }: NetworkCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 hover:scale-105",
        isSelected
          ? "bg-[#5CA9DE]/20 border-[#5CA9DE] shadow-lg shadow-[#5CA9DE]/20"
          : "bg-[#1F1A46] border-[#5CA9DE]/20 hover:border-[#5CA9DE]/40",
      )}
      onClick={() => onSelect(network.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-r ${network.color} flex items-center justify-center text-white font-bold`}
          >
            {network.logo}
          </div>
          <div>
            <CardTitle className="text-lg">{network.name}</CardTitle>
            <Badge variant="outline" className="text-xs border-[#5CA9DE]/30 text-[#5CA9DE]">
              Chain ID: {network.chainId}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">APY</span>
          <span className="text-xl font-bold text-green-400">{network.apy}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">TVL</span>
          <span className="font-semibold">{network.tvl}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Your Stake</span>
          <span className="font-semibold text-[#5CA9DE]">{network.userStake}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Gas Est.</span>
          <span className="text-sm">{network.gasEstimate}</span>
        </div>
      </CardContent>
    </Card>
  )
}
