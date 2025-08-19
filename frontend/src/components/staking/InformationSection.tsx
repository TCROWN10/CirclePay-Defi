"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Shield, TrendingUp, Gift } from "lucide-react"

export function InformationSection() {
  return (
    <Card className="bg-[#1F1A46] border-[#5CA9DE]/20">
      <CardHeader>
        <CardTitle className="text-lg text-[#5CA9DE]">How It Works</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex gap-3">
          <Shield className="h-5 w-5 text-[#5CA9DE] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold mb-1">Secure Staking</h4>
            <p className="text-gray-400">
              Your USDC is secured by battle-tested smart contracts across multiple chains.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <TrendingUp className="h-5 w-5 text-[#5CA9DE] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold mb-1">Cross-Chain Benefits</h4>
            <p className="text-gray-400">Diversify across networks to optimize yields and reduce single-chain risk.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Gift className="h-5 w-5 text-[#5CA9DE] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold mb-1">Weekly Selection</h4>
            <p className="text-gray-400">5 random stakers receive bonus rewards every week. Minimum stake: 100 USDC.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
