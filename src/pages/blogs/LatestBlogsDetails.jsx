"use client"

import { useState, useEffect, useContext } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, Clock, Share2, Bookmark, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { data, Link, useLoaderData, useParams } from "react-router"
import { AuthContext } from "@/authProvider/AuthProvider"
import useAxiosSecure from "@/hooks/useAxiosSecure"

// const articleData = {
//   title: "5 Tips to Choose the Right Life Insurance Policy",
//   content:
//     "Choosing the right life insurance depends on your financial goals, age, dependents, and long-term plans. Evaluate term vs whole life, check insurer credibility, and always compare policies before buying.",
//   summary:
//     "Confused about which policy to pick? Here are five key tips to guide you in choosing the best life insurance based on your needs.",
//   image: "https://i.ibb.co/8DXgcXyX/Adobe-Stock-163363685-Preview.jpg",
//   createdAt: "2025-07-20T12:42:05.387Z",
//   createdBy: "arjsabbir8@gmail.com",
// }

const tips = [
  {
    number: "01",
    title: "Assess Your Financial Goals",
    content:
      "Consider your current financial situation, future income expectations, and long-term financial objectives. This will help determine the coverage amount you need.",
  },
  {
    number: "02",
    title: "Consider Your Age and Life Stage",
    content:
      "Younger individuals typically benefit from term life insurance, while older adults might prefer whole life policies for their investment component.",
  },
  {
    number: "03",
    title: "Evaluate Your Dependents",
    content:
      "Consider who relies on your income - spouse, children, elderly parents. The more dependents you have, the more coverage you may need.",
  },
  {
    number: "04",
    title: "Compare Term vs Whole Life",
    content:
      "Term life is cheaper and temporary, while whole life is permanent with cash value. Choose based on your budget and long-term needs.",
  },
  {
    number: "05",
    title: "Research Insurer Credibility",
    content:
      "Check financial ratings, customer reviews, and claim settlement ratios. A reliable insurer ensures your beneficiaries receive payouts when needed.",
  },
]

export default function LatestBlogsDetails() {
    // const articleData = useLoaderData();
    
    const {user,loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const [articleData,setArticleData] = useState({})
    const {id} = useParams();
    


    useEffect(()=>{
        axiosSecure.get(`/blogs/details/${id}`)
        .then((res)=>{
          
            setArticleData(res.data)
        }).catch((err)=>{
            
        })
    },[user])



  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
//   const [articleData, setArticleData] = useState([]);


//   blogsData.map((data)=>setArticleData(data))
//   console.log(articleData)

  const { scrollYProgress } = useScroll()
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    const updateReadingProgress = () => {
      const scrolled = window.scrollY
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / maxHeight) * 100
      setReadingProgress(progress)
    }

    window.addEventListener("scroll", updateReadingProgress)
    return () => window.removeEventListener("scroll", updateReadingProgress)
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (email) => {
    return email.split("@")[0].slice(0, 2).toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
        style={{ scaleX: readingProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      {/* Hero Section */}
      <motion.div style={{ y: headerY, opacity: headerOpacity }} className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={articleData.image || "/placeholder.svg"}
            alt={articleData.title}
            className="object-cover w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-4"
            >
              <Badge variant="secondary" className="bg-blue-500/20 text-white border-blue-400/30">
                Life Insurance Guide
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {articleData.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl text-gray-200 mb-8 max-w-2xl"
            >
              {articleData.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex items-center gap-6 text-gray-300"
            >
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-500 text-white text-sm">
                    {/* {getInitials(articleData.createdBy)} */}
                    <img src={user.photoURL} alt="" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{articleData?.createdBy?.split("@")[0]}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(articleData.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">5 min read</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-between mb-12 p-6 bg-white rounded-2xl shadow-lg border"
          >
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  isLiked ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                <span className="text-sm font-medium">Like</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  isBookmarked ? "bg-blue-50 text-blue-500" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                <span className="text-sm font-medium">Save</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Comment</span>
              </motion.button>
            </div>

            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{articleData.content}</p>
            </div>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The 5 Essential Tips</h2>

            {tips.map((tip, index) => (
              <motion.div
                key={tip.number}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
                  >
                    <span className="text-white font-bold text-lg">{tip.number}</span>
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{tip.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{tip.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Conclusion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Final Thoughts</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Choosing the right life insurance policy is a crucial financial decision that requires careful
              consideration of your unique circumstances. Take your time to research, compare options, and consult with
              financial advisors if needed. Remember, the best policy is one that fits your budget and provides adequate
              protection for your loved ones.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/policies" className="btn rounded-lg bg-gradient-to-r from-green-600 to-indigo-400 hover:from-green-600 hover:to-indigo-700 hover:cursor-pointer">
                Get Insurance Quote
              </Link>
              <Link to="/blogs" variant="outline">Read More Articles</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
