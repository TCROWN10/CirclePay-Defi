'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useState, useEffect } from 'react'
import { config } from '@/config/wagmi.config'
import { WalletProvider } from '@/contexts/WalletContext'

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  // Debug wagmi configuration
  useEffect(() => {
    console.log("🔍 Web3Provider Debug Info:", {
      config,
      chains: config.chains.map(chain => ({ id: chain.id, name: chain.name })),
      connectors: config.connectors.map(connector => ({ 
        name: connector.name, 
        ready: connector.ready,
        type: connector.type,
        uid: connector.uid
      })),
      rpcUrls: {
        sepolia: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "Using fallback",
        baseSepolia: process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || "Using fallback",
        arbitrumSepolia: process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC_URL || "Using fallback",
      }
    })

    // Test ethereum object availability
    if (typeof window !== "undefined") {
      console.log("🔍 Window ethereum object:", {
        exists: !!window.ethereum,
        isMetaMask: window.ethereum?.isMetaMask,
        isCoinbaseWallet: window.ethereum?.isCoinbaseWallet,
        hasRequest: !!window.ethereum?.request,
        hasOn: !!window.ethereum?.on,
      })

      // Listen for ethereum object changes
      let ethereumCheckInterval: NodeJS.Timeout
      if (!window.ethereum) {
        console.log("🔍 No ethereum object found, setting up detection...")
        ethereumCheckInterval = setInterval(() => {
          if (window.ethereum) {
            console.log("🔍 Ethereum object detected!")
            clearInterval(ethereumCheckInterval)
          }
        }, 1000)
      }

      return () => {
        if (ethereumCheckInterval) {
          clearInterval(ethereumCheckInterval)
        }
      }
    }
  }, [])

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}