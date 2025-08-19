import { Card, CardContent } from "../../components/ui/Card"
import { FEATURES } from "../../data/features"
import { useScrollAnimation, useStaggeredAnimation } from "../../hooks/use-scroll-animation"
import {
  Sparkles,
  Shield,
  Zap,
  Brain,
  TrendingUp,
  Globe,
  Lock,
  Rocket,
  Target,
  Layers,
  BarChart3,
  Coins,
} from "lucide-react"

// Enhanced icon mapping - you can customize these based on your actual features
const iconMap: { [key: string]: any } = {
  ai: Brain,
  security: Shield,
  speed: Zap,
  analytics: BarChart3,
  yield: TrendingUp,
  multichain: Globe,
  defi: Coins,
  smart: Sparkles,
  protection: Lock,
  performance: Rocket,
  precision: Target,
  integration: Layers,
  // Add more mappings as needed
}

export function FeatureGrid() {
  const headerAnimation = useScrollAnimation({ animation: "slide-up", duration: 800 })
  const featureAnimations = useStaggeredAnimation(FEATURES.length, {
    animation: "slide-up",
    stagger: 150,
    duration: 600,
  })

  // Function to get icon component based on feature
  const getIconComponent = (feature: any, index: number) => {
    // Try to match by feature title/id, fallback to default icons
    const titleLower = feature.title?.toLowerCase() || ""

    if (titleLower.includes("ai") || titleLower.includes("smart")) return Brain
    if (titleLower.includes("security") || titleLower.includes("safe")) return Shield
    if (titleLower.includes("speed") || titleLower.includes("fast")) return Zap
    if (titleLower.includes("yield") || titleLower.includes("earn")) return TrendingUp
    if (titleLower.includes("chain") || titleLower.includes("multi")) return Globe
    if (titleLower.includes("analytics") || titleLower.includes("data")) return BarChart3
    if (titleLower.includes("defi") || titleLower.includes("finance")) return Coins
    if (titleLower.includes("protect")) return Lock
    if (titleLower.includes("performance")) return Rocket
    if (titleLower.includes("target") || titleLower.includes("precision")) return Target
    if (titleLower.includes("integration")) return Layers

    // Fallback icons based on index
    const fallbackIcons = [Sparkles, Shield, Zap, Brain, TrendingUp, Globe, Lock, Rocket, Target]
    return fallbackIcons[index % fallbackIcons.length]
  }

  return (
    <section id="features" className="py-20 bg-[#F3F7FA] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(31,26,70,0.03),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(31,26,70,0.02),transparent_70%)]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headerAnimation.ref} className={`text-center mb-16 ${headerAnimation.className}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0C1523] mb-6">
            Powerful Features for Modern DeFi
          </h2>
          <p className="text-xl text-[#5F7290] max-w-3xl mx-auto">
            Experience the future of decentralized finance with our AI-powered platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const IconComponent = getIconComponent(feature, index)

            return (
              <div key={feature.id} ref={featureAnimations[index].ref} className={featureAnimations[index].className}>
                <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-xl border border-gray-200 hover:border-[#1F1A46]/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#1F1A46]/20">
                  {/* Glass overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1F1A46]/[0.03] via-transparent to-[#5CA9DE]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#1F1A46]/20 via-[#5CA9DE]/20 to-[#1F1A46]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                  <CardContent className="relative z-10 p-8 text-center">
                    {/* Enhanced Icon Container */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#1F1A46]/20 via-[#1F1A46]/10 to-[#5CA9DE]/20 rounded-2xl flex items-center justify-center border border-[#1F1A46]/30 group-hover:border-[#1F1A46]/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        {/* Icon glow effect */}
                        <div className="absolute inset-0 bg-[#1F1A46]/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <IconComponent className="w-8 h-8 text-[#1F1A46] group-hover:text-[#5CA9DE] transition-all duration-300 relative z-10" />
                      </div>

                      {/* Floating particles */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#1F1A46]/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                      <div
                        className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#5CA9DE]/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                    </div>

                    <h3 className="text-xl font-bold text-[#0C1523] mb-4 group-hover:text-[#1F1A46] transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-[#0C1523]/80 mb-4 group-hover:text-[#0C1523] transition-colors duration-300">
                      {feature.description}
                    </p>

                    <p className="text-sm text-[#5F7290] group-hover:text-[#0C1523]/80 transition-colors duration-300">
                      {feature.details}
                    </p>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#1F1A46]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
