"use client";

import { useState, useEffect } from "react";
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
  { label: "Mobile Test", href: "/mobile-test" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  const handleNavigation = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#F3F7FA]/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg' 
        : 'bg-[#F3F7FA] backdrop-blur-md border-b border-gray-200'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={handleNavigation}>
            <Image
              src="/CirclePay-Logo.png"
              alt="CirclePay Logo"
              width={80}
              height={80}
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg drop-shadow-md transition-transform duration-300 hover:scale-105 object-contain"
              priority
              style={{
                imageRendering: 'crisp-edges',
                WebkitImageRendering: 'crisp-edges'
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-[#1F1A46] transition-colors duration-200 font-medium text-sm lg:text-base relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1F1A46] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <WalletButton />
            <Link href="/dashboard">
              <Button className="bg-[#1F1A46] hover:bg-[#2A2357] text-white transition-all duration-300 transform hover:scale-105">
                Launch App
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-[#1F1A46] transition-colors duration-200 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t border-gray-200/50 mobile-menu">
            <nav className="flex flex-col space-y-4">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-[#1F1A46] transition-colors duration-200 px-4 py-3 rounded-lg hover:bg-gray-50 font-medium"
                  onClick={handleNavigation}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200/50">
                <div className="px-4">
                  <WalletButton />
                </div>
                <div className="px-4">
                  <Link href="/dashboard" onClick={handleNavigation}>
                    <Button className="w-full bg-[#1F1A46] hover:bg-[#2A2357] text-white transition-all duration-300">
                      Launch App
                    </Button>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
