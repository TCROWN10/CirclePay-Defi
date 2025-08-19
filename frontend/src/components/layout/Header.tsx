"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../../components/ui/Button";
import { WalletButton } from "../../components/wallet/WalletButton";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const NAVIGATION_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "Docs", href: "/docs" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#F3F7FA] backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/CirclePay-Logo.png"
              alt="CirclePay Logo"
              width={150}
              height={150}
              className="rounded-lg drop-shadow-lg"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <WalletButton />
            <Link href="/dashboard">
              <Button className="bg-[#1F1A46] hover:bg-[#2A2357] text-white">Launch App</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              {NAVIGATION_ITEMS.map((item) => (
                              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <WalletButton />
                <Button className="bg-[#1F1A46] hover:bg-[#2A2357] text-white">Launch App</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
