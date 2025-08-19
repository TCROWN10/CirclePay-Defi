"use client";

import { mockTransactions } from "../../data/mockData";
import { 
  Clock, 
  ArrowDown, 
  ArrowUp, 
  ArrowLeftRight, 
  Coins,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader
} from "lucide-react";

const getTransactionIcon = (type: string) => {
  switch (type) {
    case "deposit":
      return ArrowDown;
    case "withdraw":
      return ArrowUp;
    case "transfer":
      return ArrowLeftRight;
    case "stake":
      return Coins;
    default:
      return Clock;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return CheckCircle;
    case "pending":
      return Loader;
    case "failed":
      return AlertCircle;
    default:
      return Clock;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "text-green-400";
    case "pending":
      return "text-[#5CA9DE]";
    case "failed":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }
};

export function RecentActivity() {
  return (
    <div className="bg-white backdrop-blur-sm border border-[#E5E9EC] rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#0C1523] flex items-center">
          <Clock className="w-5 h-5 mr-2 text-[#5CA9DE]" />
          Recent Activity
        </h2>
        <button className="text-[#5CA9DE] hover:text-[#4A8BC7] text-sm transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {mockTransactions.slice(0, 5).map((transaction) => {
          const TransactionIcon = getTransactionIcon(transaction.type);
          const StatusIcon = getStatusIcon(transaction.status);
          const statusColor = getStatusColor(transaction.status);
          
          return (
            <div
              key={transaction.id}
              className="flex items-center space-x-4 p-3 bg-[#F3F7FA] rounded-lg border border-[#E5E9EC] hover:border-[#5CA9DE]/30 transition-colors"
            >
              {/* Transaction Type Icon */}
              <div className="p-2 bg-[#E5E9EC] rounded-lg">
                <TransactionIcon className="w-4 h-4 text-[#5CA9DE]" />
              </div>

              {/* Transaction Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#0C1523] font-medium capitalize">
                      {transaction.type} {transaction.asset}
                    </div>
                    <div className="text-sm text-[#5F7290]">
                      {transaction.amount.toLocaleString()} {transaction.asset}
                      {transaction.protocol && (
                        <span className="ml-2 capitalize">
                          • {transaction.protocol}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#0C1523] font-medium">
                      {transaction.chain}
                    </div>
                    <div className="text-xs text-[#5F7290]">
                      {formatTimeAgo(transaction.timestamp)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status & Link */}
              <div className="flex items-center space-x-2">
                <StatusIcon className={`w-4 h-4 ${statusColor} ${
                  transaction.status === "pending" ? "animate-spin" : ""
                }`} />
                {transaction.hash && (
                  <a
                    href={`https://sepolia.etherscan.io/tx/${transaction.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5F7290] hover:text-[#5CA9DE] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}