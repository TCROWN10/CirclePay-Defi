"use client"

import Image from "next/image"
import { TRUST_INDICATORS, SUPPORTED_CHAINS, DEFI_PROTOCOLS } from "@/data/trustIndicators"
import { useScrollAnimation, useStaggeredAnimation } from "../../hooks/use-scroll-animation"

export function TrustIndicators() {
  const headerAnimation = useScrollAnimation({ animation: "slide-up", duration: 800 })
  const trustCardAnimations = useStaggeredAnimation(TRUST_INDICATORS.length, {
    animation: "slide-up",
    stagger: 200,
    duration: 600,
  })
  const chainSectionAnimation = useScrollAnimation({ animation: "fade-in", duration: 800 })
  const protocolHeaderAnimation = useScrollAnimation({ animation: "slide-up", duration: 600 })
  const protocolAnimations = useStaggeredAnimation(DEFI_PROTOCOLS.length, {
    animation: "scale-up",
    stagger: 100,
    duration: 500,
  })

  return (
    <section className="py-24 bg-[#F3F7FA] overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#5CA9DE]/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(31,26,70,0.03),transparent_70%)] bg-[size:50px_50px]"></div>

      {/* Hero Trust Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
        <div ref={headerAnimation.ref} className={`text-center mb-16 ${headerAnimation.className}`}>
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'linear-gradient(90deg, #5CA9DE 0%, #2EE2CA 100%)' }}
          >
            <span className="w-2 h-2 bg-[#0C1523] rounded-full mr-2 animate-pulse"></span>
            <span className="text-white">Trusted by Thousands</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-[#0C1523] mb-6">
            Built on Trust
          </h2>
          <p className="text-xl text-[#5F7290] max-w-3xl mx-auto leading-relaxed">
            Powered by industry-leading protocols and secured by cutting-edge technology. Your gateway to the future of
            decentralized finance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {TRUST_INDICATORS.map((indicator, index) => (
            <div
              key={indicator.id}
              ref={trustCardAnimations[index].ref}
              className={`group relative bg-[#F3F7FA] backdrop-blur-xl border border-[#E5E9EC] rounded-3xl p-12 hover:border-[#5CA9DE]/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#5CA9DE]/20 ${trustCardAnimations[index].className}`}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#5CA9DE]/5 to-[#2EE2CA]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-start space-x-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#5CA9DE]/20 to-[#2EE2CA]/20 rounded-2xl flex items-center justify-center border border-[#5CA9DE]/40 group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src={indicator.image || "/placeholder.svg"}
                      alt={indicator.text}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain filter brightness-110"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#0C1523] mb-3 group-hover:text-[#1F1A46] transition-colors duration-300">
                      {indicator.text}
                    </h3>
                    <p className="text-[#0C1523]/80 text-lg leading-relaxed">{indicator.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Chain Section */}
      <div ref={chainSectionAnimation.ref} className={`mb-24 relative z-10 ${chainSectionAnimation.className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-[#0C1523] mb-4">
            Multi-Chain Universe
          </h3>
          <p className="text-xl text-[#5F7290] max-w-2xl mx-auto">
            Seamlessly trade across the most popular blockchain networks
          </p>
        </div>

        {/* Floating Chain Cards */}
        <div className="relative h-96 overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <div className="flex animate-float-chains space-x-12 min-w-max hover:animation-pause">
              {[...SUPPORTED_CHAINS, ...SUPPORTED_CHAINS, ...SUPPORTED_CHAINS].map((chain, index) => (
                <div
                  key={`${chain.id}-${index}`}
                  className="group relative bg-[#F3F7FA] backdrop-blur-xl border-2 border-[#E5E9EC] rounded-2xl p-8 min-w-[280px] hover:scale-105 hover:border-[#5CA9DE]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#5CA9DE]/20"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-[#5CA9DE]/15 border-2 border-[#5CA9DE]/30 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#5CA9DE]/25 transition-all duration-500">
                      <Image
                        src={chain.image || "/placeholder.svg"}
                        alt={chain.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-[#0C1523] mb-1 group-hover:text-[#1F1A46] transition-colors">
                        {chain.name}
                      </h4>
                      <p className="text-[#0C1523]/80 text-lg font-medium">{chain.symbol}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DeFi Protocols Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={protocolHeaderAnimation.ref} className={`text-center mb-16 ${protocolHeaderAnimation.className}`}>
          <h3 className="text-4xl md:text-5xl font-bold text-[#0C1523] mb-4">
            DeFi Powerhouse
          </h3>
          <p className="text-xl text-[#5F7290] max-w-2xl mx-auto">
            Integrated with the most trusted protocols in decentralized finance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {DEFI_PROTOCOLS.map((protocol, index) => (
            <div
              key={protocol.id}
              ref={protocolAnimations[index].ref}
              className={`group relative bg-[#F3F7FA] backdrop-blur-xl border border-[#E5E9EC] rounded-2xl p-8 text-center hover:scale-105 hover:border-[#5CA9DE]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#5CA9DE]/20 ${protocolAnimations[index].className}`}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-[#5CA9DE]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 bg-[#5CA9DE]/15 border-2 border-[#5CA9DE]/30 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[#5CA9DE]/25 transition-all duration-500">
                  <Image
                    src={protocol.image || "/placeholder.svg"}
                    alt={protocol.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <h4 className="text-xl font-bold text-[#0C1523] mb-3 group-hover:text-[#1F1A46] transition-colors">
                  {protocol.name}
                </h4>
                <p className="text-[#0C1523]/80 font-medium">{protocol.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float-chains {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-float-chains {
          animation: float-chains 40s linear infinite;
        }
        .animate-float-chains:hover {
          animation-play-state: paused;
        }

      `}</style>
    </section>
  )
}
