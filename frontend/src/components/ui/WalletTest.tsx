"use client"

import { useConnect, useAccount } from "wagmi"
import { Button } from "./Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card"

export function WalletTest() {
  const { connectors, connect, isPending, error } = useConnect()
  const { address, isConnected, status } = useAccount()

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

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Wallet Connection Test</CardTitle>
        <CardDescription>Debug wallet connection issues</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Connection Status:</h4>
          <div className="text-sm space-y-1">
            <div>Status: <span className="font-mono">{status}</span></div>
            <div>Connected: <span className="font-mono">{isConnected ? "Yes" : "No"}</span></div>
            {address && <div>Address: <span className="font-mono">{address.slice(0, 10)}...</span></div>}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Available Connectors:</h4>
          <div className="text-sm space-y-1">
            {connectors.map((connector) => (
              <div key={connector.uid} className="flex justify-between">
                <span>{connector.name}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  connector.ready ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {connector.ready ? "Ready" : "Loading"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">MetaMask Test:</h4>
          <Button 
            onClick={testMetaMaskConnection}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Connecting..." : "Test MetaMask Connection"}
          </Button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              Error: {error.message}
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500">
          Check browser console for detailed debug information
        </div>
      </CardContent>
    </Card>
  )
} 