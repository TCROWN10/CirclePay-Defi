"use client"

import { useState, useEffect } from "react"
import { useWallet } from "../../contexts/WalletContext"
import { WalletButton } from "../wallet/WalletButton"
import { Button } from "../ui/Button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const NAVIGATION_ITEMS = [
  { name: "Features", href: "#features" },
  { name: "How it Works", href: "#how-it-works" },
  { name: "Security", href: "#security" },
  { name: "Docs", href: "/docs" },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isConnected, address, isWrongNetwork } = useWallet()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/CirclePay-Logo.png"
              alt="CirclePay Logo"
              width={160}
              height={160}
              className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#5CA9DE] transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Wallet Connection Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                isConnected 
                  ? isWrongNetwork 
                    ? 'bg-yellow-500' 
                    : 'bg-green-500'
                  : 'bg-gray-400'
              }`} />
              <span className="text-xs text-gray-600 font-medium">
                {isConnected 
                  ? isWrongNetwork 
                    ? 'Wrong Network' 
                    : 'Connected'
                  : 'Disconnected'
                }
              </span>
            </div>

            <WalletButton />
            
            <Link href="/dashboard">
              <Button className="bg-[#1F1A46] hover:bg-[#2A2357] text-white transition-all duration-300 transform hover:scale-105">
                Launch App
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center space-x-4">
            {/* Wallet Connection Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                isConnected 
                  ? isWrongNetwork 
                    ? 'bg-yellow-500' 
                    : 'bg-green-500'
                  : 'bg-gray-400'
              }`} />
              <span className="text-xs text-gray-600 font-medium">
                {isConnected 
                  ? isWrongNetwork 
                    ? 'Wrong Network' 
                    : 'Connected'
                  : 'Disconnected'
                }
              </span>
            </div>

            <WalletButton />

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-4 space-y-3">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:text-[#5CA9DE] hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Launch App Button */}
              <div className="px-4 py-2 border-t border-gray-100 mt-4">
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#1F1A46] hover:bg-[#2A2357] text-white transition-all duration-300">
                    Launch App
                  </Button>
                </Link>
              </div>
              
              {/* Mobile Wallet Status */}
              <div className="px-4 py-2 border-t border-gray-100 mt-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    isConnected 
                      ? isWrongNetwork 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                      : 'bg-gray-400'
                  }`} />
                  <span className="text-sm text-gray-600">
                    Wallet: {isConnected 
                      ? isWrongNetwork 
                        ? 'Wrong Network' 
                        : `Connected (${address?.slice(0, 6)}...)`
                      : 'Disconnected'
                    }
                  </span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
