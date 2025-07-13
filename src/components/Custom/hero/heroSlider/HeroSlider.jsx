"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Shield, Lock, Users, TrendingUp, Play, Pause } from "lucide-react"


const slides = [
  {
    id: 1,
    title: "Complete Protection",
    subtitle: "Comprehensive coverage for your family's future",
    description: "Protect what matters most with our comprehensive insurance solutions designed for modern families.",
    image: "https://i.ibb.co/sJFmFvxS/top-view-hands-with-paper-cut-family.jpg",
    icon: Shield,
    color: "from-blue-600 to-purple-600",
  },
  {
    id: 2,
    title: "Secure Investments",
    subtitle: "Smart financial planning for tomorrow",
    description: "Build wealth and secure your financial future with our expert investment guidance and tools.",
    image: "https://i.ibb.co/Gv2nDb1c/happy-parents-their-small-daughter-having-fun-while-coloring-paper.jpg",
    icon: Lock,
    color: "from-emerald-600 to-teal-600",
  },
  {
    id: 3,
    title: "Family First",
    subtitle: "Coverage that grows with your family",
    description: "Flexible insurance solutions that adapt to your changing needs and protect your loved ones.",
    image: "https://i.ibb.co/C5JG7SgB/happy-family-going-through-housing-plans-while-moving-into-new-home.jpg",
    icon: Users,
    color: "from-orange-600 to-red-600",
  },
  {
    id: 4,
    title: "Growth & Security",
    subtitle: "Balance protection with prosperity",
    description: "Achieve the perfect balance between security and growth with our innovative financial products.",
    image: "https://i.ibb.co/4gXqKXBh/close-up-family-discussing-with-therapist.jpg",
    icon: TrendingUp,
    color: "from-indigo-600 to-blue-600",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const currentSlideData = slides[currentSlide]
  const IconComponent = currentSlideData.icon

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-gray-900">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-90`} />
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-pulse" />
        <div
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-white/5 rounded-full animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full animate-ping"
          style={{ animationDuration: "4s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              <span className="block animate-fade-in-up">Secure Your</span>
              <span
                className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                Tomorrow Today
              </span>
            </h1>
            <div
              className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            />
          </div>

          {/* Slide Content */}
          <div
            className={`transition-all duration-700 transform ${
              isAnimating ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <IconComponent className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{currentSlideData.title}</h2>

            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-6 font-medium">{currentSlideData.subtitle}</p>

            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              {currentSlideData.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Get a Free Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {/* <div className="absolute inset-y-0 left-4 flex items-center">
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 disabled:opacity-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div> */}

      {/* <div className="absolute inset-y-0 right-4 flex items-center">
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 disabled:opacity-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div> */}

      {/* Bottom Controls */}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
        {/* Slide Indicators */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Auto-play Toggle */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
        >
          {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Custom Animations */}
      <style >{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
