"use client"

import { Button } from "../../components/ui/Button"
import { Play, ArrowRight, Shield, Zap, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useScrollAnimation } from "../../hooks/use-scroll-animation"

export function HeroSection() {
  const titleAnimation = useScrollAnimation({ animation: "slide-up", duration: 800 })
  const subtitleAnimation = useScrollAnimation({ animation: "slide-up", delay: 200, duration: 800 })
  const pillsAnimation = useScrollAnimation({ animation: "slide-up", delay: 400, duration: 600 })
  const buttonsAnimation = useScrollAnimation({ animation: "slide-up", delay: 600, duration: 600 })
  const statsAnimation = useScrollAnimation({ animation: "fade-in", delay: 800, duration: 600 })
  const logoAnimation = useScrollAnimation({ animation: "scale-up", delay: 300, duration: 1000 })
  const floatingAnimation1 = useScrollAnimation({ animation: "bounce-in", delay: 1200, duration: 800 })
  const floatingAnimation2 = useScrollAnimation({ animation: "bounce-in", delay: 1400, duration: 800 })

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#F3F7FA]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(31,26,70,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(31,26,70,0.02),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center min-h-screen py-16 sm:py-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div
                ref={subtitleAnimation.ref}
                className={`inline-flex items-center space-x-2 rounded-full px-4 py-2 ${subtitleAnimation.className}`}
                style={{ background: 'linear-gradient(90deg, #5CA9DE 0%, #2EE2CA 100%)' }}
              >
                <div className="w-2 h-2 bg-[#0C1523] rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Now Live on Testnet</span>
              </div>

              <h1
                ref={titleAnimation.ref}
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight ${titleAnimation.className}`}
              >
                DeFi Made
                <br />
                <span className="text-[#0C1523]">
                  Simple & Secure
                </span>
              </h1>

              <p
                ref={subtitleAnimation.ref}
                className={`text-base sm:text-lg md:text-xl text-[#5F7290] leading-relaxed max-w-lg ${subtitleAnimation.className}`}
                style={{ transitionDelay: "100ms" }}
              >
                Execute complex cross-chain DeFi strategies through intuitive conversations. Professional-grade yields
                without the complexity.
              </p>
            </div>

            {/* Feature Pills */}
            <div ref={pillsAnimation.ref} className={`flex flex-wrap gap-2 sm:gap-3 ${pillsAnimation.className}`}>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-2 sm:px-4">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-[#1F1A46]" />
                <span className="text-gray-700 text-xs sm:text-sm">Secure</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-2 sm:px-4">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#1F1A46]" />
                <span className="text-gray-700 text-xs sm:text-sm">Fast</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-2 sm:px-4">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-[#1F1A46]" />
                <span className="text-gray-700 text-xs sm:text-sm">Multi-Chain</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div ref={buttonsAnimation.ref} className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${buttonsAnimation.className}`}>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-[#5CA9DE] hover:bg-[#4A8BC7] text-white border-0 group font-semibold w-full sm:w-auto transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                >
                  Launch App
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-400 text-gray-600 hover:bg-[#1F1A46] hover:text-white transform hover:scale-105 transition-all duration-300 bg-transparent w-full sm:w-auto text-sm sm:text-base"
                onClick={() => window.open('https://www.youtube.com/watch?v=9uAXSPPLRlE', '_blank')}
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div ref={statsAnimation.ref} className={`space-y-3 pt-4 ${statsAnimation.className}`}>
              <p className="text-gray-500 text-xs sm:text-sm">Trusted by DeFi professionals</p>
              <div className="flex items-center justify-between sm:justify-start sm:space-x-6">
                <div className="text-gray-700 text-center sm:text-left">
                  <span className="text-xl sm:text-2xl font-bold text-[#1F1A46]">$2.1M+</span>
                  <p className="text-xs text-gray-500">Total Volume</p>
                </div>
                <div className="text-gray-700 text-center sm:text-left">
                  <span className="text-xl sm:text-2xl font-bold text-[#1F1A46]">1,200+</span>
                  <p className="text-xs text-gray-500">Active Users</p>
                </div>
                <div className="text-gray-700 text-center sm:text-left">
                  <span className="text-xl sm:text-2xl font-bold text-[#1F1A46]">99.9%</span>
                  <p className="text-xs text-gray-500">Uptime</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Logo & Visual */}
          <div className="relative lg:pl-8 order-first lg:order-last mb-8 lg:mb-0">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1F1A46]/10 via-[#1F1A46]/15 to-[#1F1A46]/10 rounded-full blur-3xl"></div>

              {/* Logo Container */}
              <div
                ref={logoAnimation.ref}
                className={`relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 ${logoAnimation.className}`}
              >
                <div className="flex items-center justify-center">
                  <Image
                    src="/Energy Bill Invoice Icon (1).png"
                    alt="Energy Bill Invoice Icon"
                    width={300}
                    height={300}
                    className="w-full h-auto max-w-xs sm:max-w-sm lg:max-w-md"
                    priority
                  />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#1F1A46]/20 rounded-full animate-pulse"></div>
                <div
                  className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/5 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/2 -left-8 w-6 h-6 bg-[#1F1A46]/10 rounded-full animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>

              {/* Stats Cards */}
              <div
                ref={floatingAnimation1.ref}
                className={`absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg sm:shadow-2xl ${floatingAnimation1.className}`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#1F1A46] rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-[#1F1A46] font-semibold text-xs sm:text-sm">8.7% APY</p>
                    <p className="text-gray-600 text-xs">Average Yield</p>
                  </div>
                </div>
              </div>

              <div
                ref={floatingAnimation2.ref}
                className={`absolute -top-3 -right-3 sm:-top-6 sm:-right-6 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg sm:shadow-2xl ${floatingAnimation2.className}`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#1F1A46] rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-[#1F1A46] font-semibold text-xs sm:text-sm">3 Chains</p>
                    <p className="text-gray-600 text-xs">Supported</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

      <style jsx>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  )
}
