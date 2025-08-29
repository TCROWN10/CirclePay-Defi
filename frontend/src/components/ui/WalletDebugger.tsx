"use client"

import { useState, useEffect } from "react"
import { useConnect, useAccount, useChainId } from "wagmi"
import { Button } from "./Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card"

export function WalletDebugger() {
  const { connectors, connect, isPending, error } = useConnect()
  const { address, isConnected, status, connector } = useAccount()
  const chainId = useChainId()
  const [debugInfo, setDebugInfo] = useState<any>({})
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const updateDebugInfo = () => {
      const info = {
        timestamp: new Date().toISOString(),
        window: {
          ethereum: typeof window !== "undefined" ? !!window.ethereum : false,
          isMetaMask: typeof window !== "undefined" ? window.ethereum?.isMetaMask : false,
          isCoinbase: typeof window !== "undefined" ? window.ethereum?.isCoinbaseWallet : false,
          userAgent: typeof window !== "undefined" ? navigator.userAgent : "N/A",
        },
        wagmi: {
          status,
          isConnected,
          address: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null,
          chainId,
          connector: connector?.name || "None",
        },
        connectors: connectors.map(c => ({
          name: c.name,
          ready: c.ready,
          type: c.type,
          uid: c.uid,
        })),
        error: error ? {
          message: error.message,
          name: error.name,
          stack: error.stack,
        } : null,
      }
      setDebugInfo(info)
    }

    updateDebugInfo()
    const interval = setInterval(updateDebugInfo, 2000)
    return () => clearInterval(interval)
  }, [connectors, status, isConnected, address, chainId, connector, error])

  const testMetaMaskConnection = async () => {
    try {
      console.log("🧪 Testing MetaMask connection...")
      
      // Check if MetaMask is available
      if (typeof window !== "undefined") {
        console.log("Window ethereum:", !!window.ethereum)
        console.log("Is MetaMask:", window.ethereum?.isMetaMask)
        console.log("Is Coinbase:", window.ethereum?.isCoinbaseWallet)
      }

      // Find MetaMask connector
      const metaMaskConnector = connectors.find(c => c.name === "MetaMask")
      console.log("MetaMask connector:", metaMaskConnector)

      if (metaMaskConnector) {
        console.log("Attempting to connect with MetaMask...")
        const result = await connect({ connector: metaMaskConnector })
        console.log("Connection result:", result)
      } else {
        console.log("MetaMask connector not found")
      }
    } catch (err) {
      console.error("MetaMask test failed:", err)
    }
  }

  const testEthereumObject = () => {
    if (typeof window !== "undefined") {
      console.log("🔍 Testing ethereum object...")
      
      if (window.ethereum) {
        console.log("✅ Ethereum object found")
        console.log("Is MetaMask:", window.ethereum.isMetaMask)
        console.log("Is Coinbase:", window.ethereum.isCoinbaseWallet)
        console.log("Has request method:", !!window.ethereum.request)
        console.log("Has on method:", !!window.ethereum.on)
        
        // Test request method
        if (window.ethereum.request) {
          window.ethereum.request({ method: 'eth_chainId' })
            .then((chainId: any) => console.log("Current chain ID:", chainId))
            .catch((err: any) => console.log("Chain ID request failed:", err))
        }
      } else {
        console.log("❌ No ethereum object found")
      }
    }
  }

  const clearConsole = () => {
    console.clear()
    console.log("🧹 Console cleared")
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>🔍 Wallet Connection Debugger</span>
          <Button 
            onClick={() => setIsExpanded(!isExpanded)}
            size="sm"
            variant="outline"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </CardTitle>
        <CardDescription>Comprehensive debugging for wallet connection issues</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{status}</div>
            <div className="text-sm text-blue-800">Wagmi Status</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{isConnected ? "Yes" : "No"}</div>
            <div className="text-sm text-green-800">Connected</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{connectors.length}</div>
            <div className="text-sm text-purple-800">Connectors</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button onClick={testMetaMaskConnection} disabled={isPending}>
            Test MetaMask
          </Button>
          <Button onClick={testEthereumObject} variant="outline">
            Test Ethereum Object
          </Button>
          <Button onClick={clearConsole} variant="outline">
            Clear Console
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Connection Error:</h4>
            <div className="text-sm text-red-700 space-y-1">
              <div><strong>Message:</strong> {error.message}</div>
              <div><strong>Name:</strong> {error.name}</div>
              {error.stack && (
                <div><strong>Stack:</strong> <pre className="text-xs mt-1">{error.stack}</pre></div>
              )}
            </div>
          </div>
        )}

        {/* Connectors Status */}
        <div>
          <h4 className="font-semibold mb-3">Connectors Status:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {connectors.map((connector) => (
              <div key={connector.uid} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{connector.name}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    connector.ready ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {connector.ready ? "Ready" : "Loading"}
                  </span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Type: {connector.type}</div>
                  <div>UID: {connector.uid.slice(0, 8)}...</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expanded Debug Info */}
        {isExpanded && (
          <div className="space-y-4">
            <h4 className="font-semibold">Detailed Debug Information:</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-xs overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Debugging Steps:</h4>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Check browser console for detailed logs</li>
            <li>Ensure MetaMask extension is installed and unlocked</li>
            <li>Try refreshing the page if connectors show as "Loading"</li>
            <li>Check if you're on the correct network (Sepolia testnet)</li>
            <li>Use the test buttons above to diagnose specific issues</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
} 