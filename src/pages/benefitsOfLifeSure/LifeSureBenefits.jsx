"use client"

import { useEffect, useRef, useState } from "react"
import { Calculator, Users, Globe, Shield, Activity, LayoutDashboard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  {
    icon: Calculator,
    title: "Instant Quote Calculation",
    description: "Get personalized insurance quotes in seconds with our advanced calculation engine.",
    delay: 0,
  },
  {
    icon: Users,
    title: "Expert Agent Support",
    description: "Connect with certified insurance professionals for personalized guidance and support.",
    delay: 100,
  },
  {
    icon: Globe,
    title: "100% Online Application",
    description: "Complete your entire insurance application process from the comfort of your home.",
    delay: 200,
  },
  {
    icon: Shield,
    title: "Secure Online Payments",
    description: "Bank-level security ensures your payment information is always protected.",
    delay: 300,
  },
  {
    icon: Activity,
    title: "Real-Time Claim Tracking",
    description: "Monitor your claims status 24/7 with instant updates and notifications.",
    delay: 400,
  },
  {
    icon: LayoutDashboard,
    title: "Personalized Dashboard Access",
    description: "Manage all your policies, documents, and account details in one secure location.",
    delay: 500,
  },
]

export default function LifeSureBenefits() {
  const [visibleCards, setVisibleCards] = useState(new Array(benefits.length).fill(false))
  const cardRefs = useRef([])

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }, benefits[index].delay)
          }
        },
        { threshold: 0.1 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Benefits of{" "}
            <span className="bg-gradient-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent">LifeSure</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of insurance with our comprehensive digital platform designed to make your life easier
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 hover:cursor-pointer">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <div
                key={benefit.title}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`transform transition-all duration-700 ease-out ${
                  visibleCards[index] ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
                }`}
              >
                <Card className="h-full group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    {/* Icon */}
                    <div className="mb-6 relative">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      {/* Animated ring */}
                      <div className="absolute inset-0 w-16 h-16 mx-auto rounded-2xl border-2 border-blue-200 group-hover:border-green-400 transition-colors duration-300 animate-pulse" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>

                    {/* Hover effect line */}
                    <div className="mt-6 h-1 bg-gradient-to-r from-green-500 to-indigo-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-blue-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-700 font-medium">Join thousands of satisfied customers</span>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </section>
  )
}
