import { Card, CardContent, CardHeader } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { STAKING_FEATURES, WEEKLY_REWARDS } from "../../data/staking"
import { Coins, Gift, Zap } from "lucide-react"
import { useScrollAnimation, useStaggeredAnimation } from "../../hooks/use-scroll-animation"

export function StakingSection() {
  const headerAnimation = useScrollAnimation({ animation: "slide-up", duration: 800 })
  const stakingAnimations = useStaggeredAnimation(STAKING_FEATURES.length, {
    animation: "slide-up",
    stagger: 200,
    duration: 600,
  })
  const rewardsAnimation = useScrollAnimation({ animation: "scale-up", duration: 800, delay: 400 })
  const ctaAnimation = useScrollAnimation({ animation: "fade-in", duration: 600, delay: 600 })

  return (
    <section id="staking" className="py-20 bg-[#1F1A46]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerAnimation.ref} className={`text-center mb-16 ${headerAnimation.className}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Stake{" "}
            <span className="bg-gradient-to-r from-[#5CA9DE] to-[#2EE2CA] bg-clip-text text-transparent">CirclePay</span> &
            Earn Rewards
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Maximize your returns with multi-chain staking and weekly random rewards powered by Chainlink VRF
          </p>
        </div>

        {/* Staking Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {STAKING_FEATURES.map((feature, index) => (
            <div key={feature.id} ref={stakingAnimations[index].ref} className={stakingAnimations[index].className}>
              <Card
                className="group hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-[#1F1A46]/20 border-[#E5E9EC] hover:border-[#1F1A46]/30 bg-[#F3F7FA]"
              >
                <CardHeader>
                  <div className="text-4xl mb-4 text-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 text-[#5CA9DE]">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#0C1523] text-center group-hover:text-[#1F1A46] transition-colors duration-300">
                    {feature.title}
                  </h3>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-[#5F7290] mb-4">{feature.description}</p>
                  <div className="bg-[#1F1A46]/10 border border-[#1F1A46]/30 rounded-lg p-3 transform group-hover:scale-105 transition-transform duration-300">
                    <span className="text-[#1F1A46] font-bold text-lg">APY: {feature.apy}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Weekly Rewards Section */}
        <div
          ref={rewardsAnimation.ref}
          className={`bg-[#F3F7FA] border border-[#E5E9EC] rounded-2xl p-8 mb-12 transform hover:scale-[1.02] transition-all duration-500 ${rewardsAnimation.className}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Gift className="w-8 h-8 text-[#5CA9DE]" />
                <h3 className="text-2xl font-bold text-[#0C1523]">Weekly CirclePay Rewards</h3>
              </div>
              <p className="text-[#5F7290] mb-6">
                Use our yield platform and get a chance to win weekly CirclePay token rewards! Every week, Chainlink VRF
                randomly selects lucky winners from our active users.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1F1A46]">{WEEKLY_REWARDS.totalWinners}</div>
                  <div className="text-[#5F7290] text-sm">Winners Weekly</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1F1A46]">{WEEKLY_REWARDS.rewardAmount}</div>
                  <div className="text-[#5F7290] text-sm">Per Winner</div>
                </div>
              </div>
            </div>
            <div className="bg-white border border-[#E5E9EC] rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-[#5CA9DE]" />
                <span className="text-[#0C1523] font-medium">Powered by Chainlink VRF</span>
              </div>
              <ul className="space-y-2 text-[#5F7290] text-sm">
                <li>• Provably random selection</li>
                <li>• Transparent on-chain verification</li>
                <li>• Fair distribution every week</li>
                <li>• Automatic reward distribution</li>
              </ul>
              <Button className="w-full mt-4 transform hover:scale-105 transition-transform duration-300 bg-[#2EE2CA] hover:bg-[#25C4B3] text-white" size="sm">
                <Coins className="w-4 h-4 mr-2" />
                Start Earning Rewards
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div ref={ctaAnimation.ref} className={`text-center ${ctaAnimation.className}`}>
          <Button size="lg" className="mr-4 transform hover:scale-105 transition-transform duration-300 bg-[#2EE2CA] hover:bg-[#25C4B3] text-white">
            Start Staking CirclePay
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="transform hover:scale-105 transition-transform duration-300 bg-transparent border-white text-white hover:bg-white hover:text-[#1F1A46]"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
