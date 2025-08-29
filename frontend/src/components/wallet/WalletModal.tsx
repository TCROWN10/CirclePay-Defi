"use client"
import { useConnect, useAccount } from "wagmi"
import { Connector } from "wagmi"
import { Modal } from "../../components/ui/Modal"
import { useWallet } from "../../contexts/WalletContext"
import Image from "next/image"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

// Enhanced wallet configuration with better detection
const walletConfig = {
  "MetaMask": {
    icon: "/images/metamask-logo.png",
    emoji: "🦊",
    description: "Connect using browser wallet",
    installed: typeof window !== "undefined" && window.ethereum?.isMetaMask,
    installUrl: "https://metamask.io/download/",
  },
  "Coinbase Wallet": {
    icon: "/images/coinbase-logo.png", 
    emoji: "🔵",
    description: "Connect using Coinbase Wallet",
    installed: typeof window !== "undefined" && window.ethereum?.isCoinbaseWallet,
    installUrl: "https://www.coinbase.com/wallet/downloads",
  },
  "WalletConnect": {
    icon: "/images/walletconnect-logo.png",
    emoji: "🔗", 
    description: "Scan with WalletConnect to connect",
    installed: true,
    installUrl: null,
  },
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connectors, connect, isPending, error } = useConnect()
  const { connectWeb3Auth } = useWallet()
  const { isConnected } = useAccount()
  const [connectionAttempts, setConnectionAttempts] = useState<Record<string, number>>({})
  const [connectionErrors, setConnectionErrors] = useState<Record<string, string>>({})
  const [isRetrying, setIsRetrying] = useState(false)

  // Reset connection attempts when modal opens
  useEffect(() => {
    if (isOpen) {
      setConnectionAttempts({})
      setConnectionErrors({})
    }
  }, [isOpen])

  // Close modal when successfully connected
  useEffect(() => {
    if (isConnected) {
      onClose()
    }
  }, [isConnected, onClose])

  // Enhanced MetaMask detection
  const detectMetaMask = () => {
    if (typeof window === "undefined") return false
    
    // Check for ethereum object
    if (!window.ethereum) return false
    
    // Check if it's MetaMask
    if (window.ethereum.isMetaMask) return true
    
    // Check if it's a different wallet that might be compatible
    if (window.ethereum.isCoinbaseWallet || window.ethereum.isBraveWallet) {
      return false // These are different wallets
    }
    
    // Generic ethereum provider (could be MetaMask or compatible)
    return true
  }

  const handleConnect = async (connector: Connector) => {
    try {
      console.log("🔍 Attempting to connect with:", connector.name)
      
      // Enhanced MetaMask detection and guidance
      if (connector.name === "MetaMask") {
        if (!detectMetaMask()) {
          const errorMsg = "MetaMask not detected! Please install the MetaMask extension."
          setConnectionErrors(prev => ({ ...prev, [connector.name]: errorMsg }))
          toast.error(errorMsg)
          
          // Offer to redirect to MetaMask download
          if (confirm("Would you like to install MetaMask?")) {
            window.open(walletConfig.MetaMask.installUrl, '_blank')
          }
          return
        }
      }

      // Track connection attempts
      const attemptKey = connector.name
      const currentAttempts = connectionAttempts[attemptKey] || 0
      setConnectionAttempts(prev => ({ ...prev, [attemptKey]: currentAttempts + 1 }))

      // Clear any previous errors for this connector
      setConnectionErrors(prev => ({ ...prev, [connector.name]: "" }))

      console.log("🔍 Connection attempt:", currentAttempts + 1, "for", connector.name)

      const result = await connect({ connector })
      console.log("🔍 Connection result:", result)
      
      if (result.error) {
        console.error("🔍 Connection error:", result.error)
        const errorMessage = `Connection failed: ${result.error.message}`
        setConnectionErrors(prev => ({ ...prev, [connector.name]: errorMessage }))
        toast.error(errorMessage)
        return
      }
      
      toast.success(`Connected with ${connector.name}!`)
      onClose()
    } catch (err: any) {
      console.error("🔍 Connection error:", err)
      const errorMessage = err?.message || "Connection failed"
      setConnectionErrors(prev => ({ ...prev, [connector.name]: errorMessage }))
      toast.error(`Connection failed: ${errorMessage}`)
    }
  }

  // Retry connection with exponential backoff
  const handleRetry = async (connector: Connector) => {
    if (isRetrying) return
    
    setIsRetrying(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second
      await handleConnect(connector)
    } finally {
      setIsRetrying(false)
    }
  }

  const handleWeb3AuthConnect = async () => {
    try {
      await connectWeb3Auth()
      onClose()
    } catch (error) {
      console.error("Web3Auth connection failed:", error)
      toast.error("Web3Auth connection failed")
    }
  }

  const getWalletInfo = (name: string) => {
    return walletConfig[name as keyof typeof walletConfig] || {
      icon: null,
      emoji: "💼",
      description: "Connect with wallet",
      installed: true,
      installUrl: null,
    }
  }

  // Log available connectors for debugging
  useEffect(() => {
    if (isOpen) {
      console.log("🔍 Available connectors:", connectors.map(c => ({ 
        name: c.name, 
        ready: c.ready, 
        type: c.type,
        uid: c.uid 
      })))
      
      console.log("🔍 Enhanced MetaMask detection:", {
        ethereum: typeof window !== "undefined" ? !!window.ethereum : false,
        isMetaMask: typeof window !== "undefined" ? window.ethereum?.isMetaMask : false,
        isCoinbase: typeof window !== "undefined" ? window.ethereum?.isCoinbaseWallet : false,
        isBrave: typeof window !== "undefined" ? window.ethereum?.isBraveWallet : false,
        detected: detectMetaMask(),
      })
    }
  }, [isOpen, connectors])

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Connect Wallet"
      subtitle="Choose how you want to connect"
      className="max-w-md"
    >
      <div className="p-6 space-y-4">
        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              Global error: {error.message}
            </p>
          </div>
        )}

        {/* Debug Info (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-600 font-mono">
              Debug: {connectors.length} connectors available
            </p>
            <p className="text-xs text-blue-600 font-mono">
              MetaMask: {detectMetaMask() ? "Detected" : "Not found"}
            </p>
            <p className="text-xs text-blue-600 font-mono">
              Ethereum: {typeof window !== "undefined" ? !!window.ethereum : false}
            </p>
          </div>
        )}

        {/* Main Wallet Options */}
        <div className="space-y-3">
          {connectors.map((connector) => {
            const walletInfo = getWalletInfo(connector.name)
            const attempts = connectionAttempts[connector.name] || 0
            const connectorError = connectionErrors[connector.name]
            
            return (
              <div key={connector.uid} className="space-y-2">
                <button
                  onClick={() => handleConnect(connector)}
                  disabled={isPending || !connector.ready || isRetrying}
                  className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-gray-200 hover:border-[#5CA9DE] hover:bg-[#5CA9DE]/10 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-[#5CA9DE]/20 transition-colors">
                      {walletInfo.icon ? (
                        <Image
                          src={walletInfo.icon}
                          alt={connector.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <span className="text-2xl">{walletInfo.emoji}</span>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{connector.name}</span>
                        {connector.name === "MetaMask" && walletInfo.installed && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            Installed
                          </span>
                        )}
                        {!connector.ready && (
                          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                            Loading
                          </span>
                        )}
                        {attempts > 0 && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {attempts} attempt{attempts > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5">{walletInfo.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!walletInfo.installed && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        Install
                      </span>
                    )}
                    <div className="w-2 h-2 bg-[#5CA9DE] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>

                {/* Error Display for this connector */}
                {connectorError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 mb-2">{connectorError}</p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleRetry(connector)}
                        disabled={isRetrying}
                        className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                      >
                        {isRetrying ? "Retrying..." : "Retry"}
                      </button>
                      {walletInfo.installUrl && (
                        <button
                          onClick={() => window.open(walletInfo.installUrl, '_blank')}
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          Install
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
          </div>
        </div>

        {/* Web3Auth Option */}
        <button
          onClick={handleWeb3AuthConnect}
          disabled={isPending}
          className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-gray-200 hover:border-[#5CA9DE] hover:bg-[#5CA9DE]/10 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-2xl">🔐</span>
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">Sign in with Google</div>
              <p className="text-sm text-gray-600 mt-0.5">Easy onboarding with social login</p>
            </div>
          </div>
          <div className="w-2 h-2 bg-[#5CA9DE] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              New to Ethereum wallets?
            </p>
            <button 
              className="text-sm font-semibold text-[#5CA9DE] hover:text-[#4A8BC7] transition-colors"
              onClick={() => window.open('https://ethereum.org/en/wallets/', '_blank')}
            >
              Learn more about wallets →
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isPending && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-[#5CA9DE] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-700 font-medium">Connecting...</span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}