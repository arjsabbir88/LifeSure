"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router"

// Simulated data - in real app, this would come from your admin panel/API
// const blogPosts = [
//   {
//     id: "1",
//     title: "The Future of Web Development: Trends to Watch in 2024",
//     summary:
//       "Explore the cutting-edge technologies and methodologies that are shaping the future of web development, from AI integration to advanced frameworks.",
//     category: "Technology",
//     publishedAt: "2024-01-15",
//     readTime: "5 min read",
//     image: "/placeholder.svg?height=200&width=400",
//     slug: "future-web-development-2024",
//   },
//   {
//     id: "2",
//     title: "Building Scalable Applications with Next.js 15",
//     summary:
//       "Learn how to leverage the latest features in Next.js 15 to build performant, scalable applications that can handle millions of users.",
//     category: "Development",
//     publishedAt: "2024-01-12",
//     readTime: "8 min read",
//     image: "/placeholder.svg?height=200&width=400",
//     slug: "scalable-nextjs-applications",
//   },
//   {
//     id: "3",
//     title: "Design Systems: Creating Consistency at Scale",
//     summary:
//       "Discover how to build and maintain design systems that ensure consistency across large-scale applications and teams.",
//     category: "Design",
//     publishedAt: "2024-01-10",
//     readTime: "6 min read",
//     image: "/placeholder.svg?height=200&width=400",
//     slug: "design-systems-consistency",
//   },
//   {
//     id: "4",
//     title: "AI-Powered Development: Tools That Transform Coding",
//     summary:
//       "Explore the revolutionary AI tools that are changing how developers write, debug, and optimize code in modern development workflows.",
//     category: "AI",
//     publishedAt: "2024-01-08",
//     readTime: "7 min read",
//     image: "/placeholder.svg?height=200&width=400",
//     slug: "ai-powered-development-tools",
//   },
// ]

export default function Blogs() {

  const [blogPosts,setBlogPosts] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3000/all-blogs')
    .then((res)=>{
      console.log(res.data)
      setBlogPosts(res.data)
    }).catch((err)=>{
      console.log(err.message);
    })
  },[])


  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Latest Articles</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with our latest insights, tutorials, and industry trends
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {blogPosts.map((post, index) => (
            <Card
              key={post._id}
              className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-slate-800 border-0 shadow-lg overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800 hover:bg-white">
                    {post.category}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-green-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {post.title}
                </h3>
              </CardHeader>

              <CardContent className="pb-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">{post.summary}</p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(post.createdAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full group/btn hover:bg-green-500 dark:hover:bg-blue-900/20 transition-all duration-300"
                >
                  <Link to={`/blogs/details/${post._id}`} className="flex items-center justify-center gap-2">
                    <span className="font-medium">Read More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>


      </div>
    </section>
  )
}
