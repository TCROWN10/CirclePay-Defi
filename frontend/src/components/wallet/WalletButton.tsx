"use client"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/Button"
import { WalletModal } from "./WalletModal"
import { WalletInfo } from "./WalletInfo"
import { useWallet } from "../../contexts/WalletContext"
import { useAccount } from "wagmi"
import { ChevronDown, AlertCircle, CheckCircle, XCircle } from "lucide-react"

export function WalletButton() {
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const { isConnected, address, isWrongNetwork } = useWallet()
  const { status, connector } = useAccount()

  // Debug MetaMask availability
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("🔍 WalletButton Debug Info:", {
        ethereum: !!window.ethereum,
        isMetaMask: window.ethereum?.isMetaMask,
        isCoinbaseWallet: window.ethereum?.isCoinbaseWallet,
        userAgent: navigator.userAgent,
        wagmiStatus: status,
        connector: connector?.name,
        isConnected,
        address: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null,
      })
    }
  }, [status, connector, isConnected, address])

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const handleConnectClick = () => {
    console.log("🔍 Connect button clicked")
    console.log("🔍 MetaMask status:", {
      ethereum: !!window.ethereum,
      isMetaMask: window.ethereum?.isMetaMask,
    })
    
    // Check if MetaMask is available
    if (typeof window !== "undefined" && !window.ethereum) {
      console.error("🔍 No ethereum provider found")
      alert("No Ethereum wallet detected! Please install MetaMask or another wallet extension.")
      return
    }
    
    setShowConnectModal(true)
  }

  const getConnectionStatus = () => {
    if (status === "connecting") return "connecting"
    if (status === "reconnecting") return "reconnecting"
    if (isConnected) return isWrongNetwork ? "wrong-network" : "connected"
    return "disconnected"
  }

  const getStatusIcon = () => {
    const connectionStatus = getConnectionStatus()
    switch (connectionStatus) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "wrong-network":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "connecting":
      case "reconnecting":
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      default:
        return <XCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusText = () => {
    const connectionStatus = getConnectionStatus()
    switch (connectionStatus) {
      case "connected":
        return "Connected"
      case "wrong-network":
        return "Wrong Network"
      case "connecting":
        return "Connecting..."
      case "reconnecting":
        return "Reconnecting..."
      default:
        return "Disconnected"
    }
  }

  if (isConnected && address) {
    return (
      <>
        <Button
          variant={isWrongNetwork ? "outline" : "secondary"}
          className={`${isWrongNetwork ? "border-yellow-500 text-yellow-600" : ""} flex items-center space-x-2`}
          onClick={() => setShowInfoModal(true)}
        >
          {getStatusIcon()}
          <span>{isWrongNetwork ? "Wrong Network" : formatAddress(address)}</span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
        {/* Only render WalletInfo when showInfoModal is true */}
        {showInfoModal && (
          <WalletInfo isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} />
        )}
      </>
    )
  }

  return (
    <>
      <Button 
        onClick={handleConnectClick}
        className="bg-[#1F1A46] hover:bg-[#2A2357] text-white flex items-center space-x-2"
        disabled={status === "connecting" || status === "reconnecting"}
      >
        {getStatusIcon()}
        <span>
          {status === "connecting" || status === "reconnecting" 
            ? "Connecting..." 
            : "Connect Wallet"
          }
        </span>
      </Button>
      
      {/* Only render WalletModal when showConnectModal is true */}
      {showConnectModal && (
        <WalletModal isOpen={showConnectModal} onClose={() => setShowConnectModal(false)} />
      )}
    </>
  )
}