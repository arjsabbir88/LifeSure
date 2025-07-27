"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router"
import { useQuery } from "@tanstack/react-query"
import useAxios from "@/hooks/useAxios"


export default function Blogs() {

  const axiosInstance = useAxios()

  const {data :blogPosts=[], isLoading} = useQuery({
        queryKey: ['Blogs'],
        queryFn:async ()=>{
          const res = await axiosInstance.get('/all-blogs');
          return res.data
        }
      })


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
