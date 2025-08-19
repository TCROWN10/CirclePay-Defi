"use client"

import { Button } from "../../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Progress } from "../../components/ui/progress"
import { ArrowUpRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PortfolioSummaryProps {
  totalUserStake: string
  totalRewards: string
  onClaimAll: () => void
}

export function PortfolioSummary({ totalUserStake, totalRewards, onClaimAll }: PortfolioSummaryProps) {
  return (
    <Card className="bg-[#1F1A46] border-[#5CA9DE]/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 hover:bg-[#5CA9DE]/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#5CA9DE]" />
          </Link>
          <CardTitle className="text-xl text-[#5CA9DE]">Your Portfolio</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total Staked</span>
          <span className="text-xl font-bold text-[#5CA9DE]">{totalUserStake}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Claimable Rewards</span>
          <span className="text-lg font-semibold text-green-400">${totalRewards}</span>
        </div>
        <Progress value={65} className="h-2 bg-[#0A0A0A]" />
        <p className="text-xs text-gray-400">65% of positions are actively earning</p>

        <Button onClick={onClaimAll} className="w-full bg-[#5CA9DE] hover:bg-[#4A8BC7] text-white">
          <ArrowUpRight className="h-4 w-4 mr-2" />
          Claim All Rewards
        </Button>
      </CardContent>
    </Card>
  )
}
