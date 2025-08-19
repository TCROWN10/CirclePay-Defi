import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, DiscIcon as Discord } from "lucide-react"

const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Security", href: "#security" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Pricing", href: "/pricing" },
  ],
  developers: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/api" },
    { label: "SDKs", href: "/sdks" },
    { label: "GitHub", href: "https://github.com/circlepay" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
}

const SOCIAL_LINKS = [
      { icon: Twitter, href: "https://twitter.com/circlepay", label: "Twitter" },
    { icon: Discord, href: "https://discord.gg/circlepay", label: "Discord" },
    { icon: Github, href: "https://github.com/circlepay", label: "GitHub" },
]

export function Footer() {
  return (
    <footer className="bg-[#EAEDF0] text-[#0C1523]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Image src="/CirclePay-Logo.png" alt="CirclePay Logo" width={180} height={180} className="rounded-lg drop-shadow-lg" />
            </div>
            <p className="text-[#5F7290] text-sm mb-4">
              Your AI Financial Navigator for DeFi. Execute sophisticated cross-chain strategies through simple
              conversations.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5F7290] hover:text-[#0C1523] transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-[#0C1523] mb-4 capitalize">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#5F7290] hover:text-[#0C1523] transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#E5E9EC] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#5F7290] text-sm">© 2025 CirclePay. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-[#5F7290] text-sm">Built with</span>
              <div className="flex items-center space-x-2">
                <span className="text-[#5CA9DE] font-medium text-sm">Chainlink</span>
                <div className="w-1 h-1 bg-[#5F7290] rounded-full"></div>
                <span className="text-[#5F7290] text-sm">Powered by AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
