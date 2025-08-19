"use client"

import { Button } from "../../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { cn } from "../../lib/utils"

interface StakePosition {
  id: string
  network: string
  amount: string
  apy: number
  rewards: string
  duration: string
  status: "active" | "unstaking" | "completed"
  startDate: string
}

interface ActiveStakesTableProps {
  positions: StakePosition[]
  onClaim: (positionId: string) => void
  onUnstake: (positionId: string) => void
}

export function ActiveStakesTable({ positions, onClaim, onUnstake }: ActiveStakesTableProps) {
  return (
    <Card className="bg-[#1F1A46] border-[#5CA9DE]/20">
      <CardHeader>
        <CardTitle className="text-xl text-[#5CA9DE]">Your Active Stakes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#5CA9DE]/20">
              <TableHead className="text-gray-400">Network</TableHead>
              <TableHead className="text-gray-400">Amount</TableHead>
              <TableHead className="text-gray-400">APY</TableHead>
              <TableHead className="text-gray-400">Rewards</TableHead>
              <TableHead className="text-gray-400">Duration</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position) => (
              <TableRow key={position.id} className="border-[#5CA9DE]/10">
                <TableCell className="font-medium">{position.network}</TableCell>
                <TableCell>${position.amount}</TableCell>
                <TableCell className="text-green-400">{position.apy}%</TableCell>
                <TableCell className="text-[#5CA9DE]">${position.rewards}</TableCell>
                <TableCell>{position.duration}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      position.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-[#5CA9DE]/20 text-[#5CA9DE]",
                    )}
                  >
                    {position.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onClaim(position.id)}
                      className="border-[#5CA9DE]/30 text-[#5CA9DE] hover:bg-[#5CA9DE]/10"
                    >
                      Claim
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUnstake(position.id)}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      Unstake
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
