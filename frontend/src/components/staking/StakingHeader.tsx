"use client"

import { Card, CardContent } from "../../components/ui/Card"
import { Badge } from "../../components/ui/badge"
import { Coins, Users, Gift, Star } from "lucide-react"

interface StakingHeaderProps {
  totalTVL: string
  totalStakers: string
}

export function StakingHeader({ totalTVL, totalStakers }: StakingHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#1F1A46] to-[#0A0A0A] border-b border-[#5CA9DE]/20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#5CA9DE] mb-2">USDC Staking</h1>
            <p className="text-gray-400 text-lg">Earn rewards across multiple chains with cross-chain USDC staking</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Card className="bg-[#5CA9DE]/10 border-[#5CA9DE]/30">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Coins className="h-5 w-5 text-[#5CA9DE]" />
                  <span className="text-sm font-medium">Total TVL</span>
                </div>
                <p className="text-2xl font-bold text-[#5CA9DE]">{totalTVL}</p>
              </CardContent>
            </Card>

            <Card className="bg-[#5CA9DE]/10 border-[#5CA9DE]/30">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="h-5 w-5 text-[#5CA9DE]" />
                  <span className="text-sm font-medium">Total Stakers</span>
                </div>
                <p className="text-2xl font-bold text-[#5CA9DE]">{totalStakers}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Weekly Selection Banner */}
        <Card className="mt-6 bg-gradient-to-r from-[#5CA9DE]/20 to-[#5CA9DE]/10 border-[#5CA9DE]/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Gift className="h-6 w-6 text-[#5CA9DE]" />
              <div>
                <h3 className="font-semibold text-[#5CA9DE]">Weekly Selection: 5 Lucky Stakers</h3>
                <p className="text-sm text-gray-300">
                  Stake any amount to be eligible for weekly bonus rewards. Next draw in 3 days.
                </p>
              </div>
              <Badge className="bg-[#5CA9DE] text-white ml-auto">
                <Star className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
