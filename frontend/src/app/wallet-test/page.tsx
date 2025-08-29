"use client";

import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { WalletDebugger } from "../../components/ui/WalletDebugger";

export default function WalletTestPage() {
  return (
    <main className="min-h-screen bg-[#F3F7FA]">
      <Header />
      <div className="pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Wallet Connection Debugger
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive debugging for wallet connection issues. Check the browser console for detailed information.
            </p>
          </div>
          <WalletDebugger />
        </div>
      </div>
      <Footer />
    </main>
  );
} 