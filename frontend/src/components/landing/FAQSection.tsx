"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useScrollAnimation, useStaggeredAnimation } from "../../hooks/use-scroll-animation"

// Sample FAQ data for demonstration
const FAQ_DATA = [
  {
    id: "1",
    question: "What is CirclePay and how does it work?",
    answer:
      "CirclePay is a comprehensive financial platform that combines AI-powered insights with traditional investment tools. Our platform analyzes market trends, provides personalized recommendations, and helps you make informed financial decisions through advanced algorithms and real-time data processing.",
  },
  {
    id: "2",
    question: "How secure is my financial data on CirclePay?",
    answer:
      "We employ bank-level security measures including 256-bit SSL encryption, two-factor authentication, and regular security audits. Your data is stored in secure, compliant data centers and we never share your personal information with third parties without your explicit consent.",
  },
  {
    id: "3",
    question: "What fees does CirclePay charge?",
    answer:
      "CirclePay offers transparent pricing with no hidden fees. Our basic plan is free for up to $10,000 in assets, with premium plans starting at $9.99/month. We charge a small management fee of 0.25% annually for managed portfolios, which is significantly lower than traditional financial advisors.",
  },
  {
    id: "4",
    question: "Can I withdraw my funds at any time?",
    answer:
      "Yes, you have complete control over your funds. You can withdraw your money at any time without penalties. Most withdrawals are processed within 1-3 business days, depending on your bank and the type of account you're withdrawing from.",
  },
  {
    id: "5",
    question: "Do you offer customer support?",
    answer:
      "We provide 24/7 customer support through multiple channels including live chat, email, and phone. Our team of financial experts and technical specialists are always ready to help you with any questions or concerns you may have.",
  },
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const headerAnimation = useScrollAnimation({ animation: "slide-up", duration: 800 })
  const faqAnimations = useStaggeredAnimation(FAQ_DATA.length, {
    animation: "slide-up",
    stagger: 100,
    duration: 500,
  })
  const ctaAnimation = useScrollAnimation({ animation: "scale-up", duration: 600, delay: 400 })

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <section id="faq" className="py-20 bg-[#EAEDF0] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reduced max width for better readability */}
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div ref={headerAnimation.ref} className={`text-center mb-16 ${headerAnimation.className}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0C1523] mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-[#5F7290] max-w-2xl mx-auto">
              Everything you need to know about CirclePay and our platform
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {FAQ_DATA.map((item, index) => {
              const isOpen = openItems.includes(item.id)
              return (
                <div
                  key={item.id}
                  ref={faqAnimations[index].ref}
                  className={`bg-white border border-[#E5E9EC] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#1F1A46] hover:bg-[#F3F7FA] transform hover:scale-[1.02] ${faqAnimations[index].className}`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#1F1A46]/50 focus:ring-inset group transition-all duration-200"
                  >
                    <span className="text-[#0C1523] font-semibold text-lg pr-4 group-hover:text-[#1F1A46] transition-colors duration-200">
                      {item.question}
                    </span>
                    <div className="flex-shrink-0 transition-transform duration-300 ease-in-out">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#5CA9DE] transform rotate-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#5F7290] group-hover:text-[#5CA9DE] transition-colors duration-200" />
                      )}
                    </div>
                  </button>

                  {/* Animated content area */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                    style={{
                      overflow: "hidden",
                    }}
                  >
                    <div className="px-6 pb-6">
                                              <div className="border-t border-[#E5E9EC] pt-4">
                        <p className="text-[#5F7290] leading-relaxed text-base">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Contact CTA */}
          <div ref={ctaAnimation.ref} className={`text-center mt-16 ${ctaAnimation.className}`}>
            <div className="bg-white border border-[#E5E9EC] rounded-2xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
              <p className="text-[#5F7290] mb-6 text-lg">Still have questions?</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:support@circlepay.com"
                  className="bg-[#2EE2CA] hover:bg-[#25C4B3] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#2EE2CA]/25"
                >
                  Contact Support
                </a>
                <span className="text-[#5F7290] hidden sm:block">•</span>
                <a
                  href="/docs"
                  className="text-[#1F1A46] hover:text-[#2A2357] transition-colors duration-200 font-medium border border-[#1F1A46]/30 hover:border-[#1F1A46]/50 px-6 py-3 rounded-xl hover:bg-[#1F1A46]/5 hover:scale-105 transform duration-200"
                >
                  Read Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
