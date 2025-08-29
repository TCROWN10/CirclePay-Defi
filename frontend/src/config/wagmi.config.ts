"use client"

import { createConfig, http } from "wagmi"
import { sepolia, baseSepolia, arbitrumSepolia } from "wagmi/chains"
import { 
  coinbaseWallet, 
  walletConnect, 
  injected
} from "wagmi/connectors"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""

if (!projectId) {
  console.warn("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set")
}

// Fallback RPC URLs if environment variables are not set
const FALLBACK_RPC_URLS = {
  [sepolia.id]: "https://rpc.sepolia.org",
  [baseSepolia.id]: "https://sepolia.base.org",
  [arbitrumSepolia.id]: "https://sepolia-rollup.arbitrum.io/rpc",
}

export const config = createConfig({
  chains: [sepolia, baseSepolia, arbitrumSepolia],
  connectors: [
    // MetaMask and other injected wallets - improved configuration
    injected({
      target: "metaMask",
      shimDisconnect: true,
      name: (detectedName) => 
        `Injected (${typeof detectedName === 'string' ? detectedName : 'Unknown'})`,
    }),
    
    // Coinbase Wallet
    coinbaseWallet({
      appName: "CirclePay",
      appLogoUrl: "/CirclePay-Icon.png",
      darkMode: false,
    }),
    
    // WalletConnect
    ...(projectId ? [walletConnect({
      projectId,
      metadata: {
        name: "CirclePay",
        description: "Advanced DeFi Trading Platform",
        url: typeof window !== "undefined" ? window.location.origin : "",
        icons: ["/CirclePay-Icon.png"],
      },
      showQrModal: true,
    })] : []),
  ],
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || FALLBACK_RPC_URLS[sepolia.id]),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || FALLBACK_RPC_URLS[baseSepolia.id]),
    [arbitrumSepolia.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC_URL || FALLBACK_RPC_URLS[arbitrumSepolia.id]),
  },
  ssr: true,
})

// Wallet options for the modal
export const walletOptions = [
  {
    id: "metaMask",
    name: "MetaMask",
    icon: "/images/metamask-logo.png",
    description: "Connect using browser wallet",
    installed: typeof window !== "undefined" && window.ethereum?.isMetaMask,
  },
  {
    id: "coinbaseWallet", 
    name: "Coinbase Wallet",
    icon: "/images/coinbase-logo.png",
    description: "Connect using Coinbase Wallet",
    installed: typeof window !== "undefined" && window.ethereum?.isCoinbaseWallet,
  },
  {
    id: "walletConnect",
    name: "WalletConnect",
    icon: "/images/walletconnect-logo.png", 
    description: "Connect using WalletConnect",
    installed: true,
  }
]

// Global type declarations for ethereum object
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      isCoinbaseWallet?: boolean
      request?: (...args: any[]) => Promise<any>
      on?: (event: string, callback: (...args: any[]) => void) => void
      removeListener?: (event: string, callback: (...args: any[]) => void) => void
    }
  }
}