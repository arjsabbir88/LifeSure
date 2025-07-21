"use client"

import { useActionState, useEffect, useState } from "react"
// import { subscribeToNewsletter } from "../actions/newsletter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail, User } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"

export default function NewsletterForm() {
  const [state, action, isPending] = useActionState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleFormSubmit=(e)=>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const convertedData = Object.fromEntries(formData.entries())
        // console.log(convertedData)



    axios.post('http://localhost:3000/subscription',convertedData)
    .then((res)=>{
        // console.log(res.data)
        if(res.data.insertedId){
            toast.success("Thanks for Subscription request!!")
            form.reset();
        }
    }).catch((err)=>{
        console.log(err);
        toast.error(err.message)
    })

  }

  return (
    <Card
      className={`w-full max-w-md transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Stay Updated
        </CardTitle>
        <CardDescription className="text-gray-600">
          Subscribe to our LifeSure and never miss our latest updates, tips, and exclusive content.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {state?.success ? (
          <div className="text-center space-y-4 py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Welcome aboard! 🎉</h3>
              <p className="text-green-600">{state.message}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isPending}
                  />
                </div>
              </div>
            </div>

            {state?.message && !state.success && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{state.message}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-green-600 to-indigo-600 hover:from-green-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
            >
              {isPending ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Subscribing...</span>
                </div>
              ) : (
                "Subscribe to LifeSure"
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By subscribing, you agree to receive our LifeSure and promotional emails. You can unsubscribe at any
              time.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
