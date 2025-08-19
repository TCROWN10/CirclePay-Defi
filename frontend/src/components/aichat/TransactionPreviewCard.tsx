"use client"

import { Button } from "../../components/ui/Button"
import { Card, CardContent } from "../../components/ui/Card"

interface TransactionPreview {
  id: string
  protocol: string
  action: string
  amount: string
  token: string
  apy: string
  gasEstimate: string
  logo: string
}

interface TransactionPreviewCardProps {
  transaction: TransactionPreview
}

export function TransactionPreviewCard({ transaction }: TransactionPreviewCardProps) {
  return (
    <Card className="bg-[#0A0A0A] border-[#5CA9DE]/30">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{transaction.logo}</span>
            <div>
              <p className="font-semibold text-[#5CA9DE]">{transaction.protocol}</p>
              <p className="text-sm text-gray-400">{transaction.action}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold">
              {transaction.amount} {transaction.token}
            </p>
            <p className="text-sm text-green-400">{transaction.apy} APY</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <span>Gas Estimate: {transaction.gasEstimate}</span>
          <span>Expected Return: ~$42/month</span>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 bg-[#5CA9DE] hover:bg-[#5CA9DE]/90 text-white">Confirm Transaction</Button>
          <Button variant="outline" className="border-[#5CA9DE]/30 text-[#5CA9DE] hover:bg-[#5CA9DE]/10">
            Simulate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
