// src/app/layout.tsx (or similar path)

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Web3Provider } from "../providers/Web3Provider"
// --- ADD THESE TWO IMPORTS ---
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// -----------------------------

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CirclePay - Your AI Financial Navigator for DeFi",
  description:
    "Execute sophisticated cross-chain strategies through simple conversations. No technical knowledge required.",
  keywords: ["DeFi", "AI", "Blockchain", "Yield Farming", "Cross-Chain", "CirclePay"],
  authors: [{ name: "CirclePay Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#1F1A46",
  colorScheme: "light dark",
  icons: {
    icon: '/CirclePay-Icon.png', // CirclePay icon
    shortcut: '/CirclePay-Icon.png',
    // for iOS devices
  },
  openGraph: {
    title: "CirclePay - Your AI Financial Navigator for DeFi",
    description: "Execute sophisticated cross-chain strategies through simple conversations. No technical knowledge required.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CirclePay - Your AI Financial Navigator for DeFi",
    description: "Execute sophisticated cross-chain strategies through simple conversations. No technical knowledge required.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#1F1A46" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CirclePay" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={inter.className}>
        <Web3Provider>
          {children}
        </Web3Provider>
        {/* --- ADD THIS COMPONENT --- */}
        <ToastContainer
          position="bottom-right" // You can customize the position
          autoClose={5000}        // Close after 5 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"            // Match your dark theme
        />
        {/* --------------------------- */}
      </body>
    </html>
  )
}