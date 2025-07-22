"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Camera, Check, Edit2, Mail, Clock, Save, X, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const roleConfig = {
  admin: {
    label: "Administrator",
    color: "bg-red-500 hover:bg-red-600",
    icon: "👑",
  },
  agent: {
    label: "Support Agent",
    color: "bg-blue-500 hover:bg-blue-600",
    icon: "🎧",
  },
  customer: {
    label: "Customer",
    color: "bg-green-500 hover:bg-green-600",
    icon: "👤",
  },
}

export default function Profile() {
  const { toast } = useToast()
  const [user, setUser] = useState({
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "admin",
    avatar: "/placeholder.svg?height=120&width=120",
    lastLogin: "2024-01-15T10:30:00Z",
  })

  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(user.name)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleNameEdit = () => {
    setTempName(user.name)
    setIsEditingName(true)
  }

  const handleNameSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUser((prev) => ({ ...prev, name: tempName }))
    setIsEditingName(false)
    setIsSaving(false)

    toast({
      title: "Profile Updated",
      description: "Your name has been successfully updated.",
    })
  }

  const handleNameCancel = () => {
    setTempName(user.name)
    setIsEditingName(false)
  }

  const handlePhotoUpload = async () => {
    setIsUploading(true)
    // Simulate photo upload
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newAvatar = "/placeholder.svg?height=120&width=120"
    setUser((prev) => ({ ...prev, avatar: newAvatar }))
    setIsUploading(false)

    toast({
      title: "Photo Updated",
      description: "Your profile photo has been successfully updated.",
    })
  }

  const formatLastLogin = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const roleInfo = roleConfig[user.role]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="overflow-hidden shadow-xl border-0">
          <motion.div
            className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <CardHeader className="relative pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -top-16 left-8"
            >
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl font-bold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePhotoUpload}
                  disabled={isUploading}
                  className="absolute -bottom-1 -right-1 bg-white rounded-full p-2 shadow-lg border-2 border-gray-100 hover:border-indigo-300 transition-colors"
                >
                  <AnimatePresence mode="wait">
                    {isUploading ? (
                      <motion.div
                        key="uploading"
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 180 }}
                      >
                        <Upload className="w-4 h-4 text-indigo-600 animate-pulse" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="camera"
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 180 }}
                      >
                        <Camera className="w-4 h-4 text-indigo-600" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-8 pl-32"
            >
              <Badge className={`${roleInfo.color} text-white px-3 py-1 text-sm font-medium`}>
                <span className="mr-2">{roleInfo.icon}</span>
                {roleInfo.label}
              </Badge>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Name Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <div className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  {isEditingName ? (
                    <motion.div
                      key="editing"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex-1 flex items-center gap-2"
                    >
                      <Input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="flex-1"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        onClick={handleNameSave}
                        disabled={isSaving || tempName.trim() === ""}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isSaving ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Save className="w-4 h-4" />
                          </motion.div>
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleNameCancel} disabled={isSaving}>
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="display"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex-1 flex items-center justify-between group"
                    >
                      <span className="text-lg font-semibold text-gray-900">{user.name}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleNameEdit}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <Separator />

            {/* Email Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-gray-700">Email Address</Label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900 font-medium">{user.email}</span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  Read-only
                </Badge>
              </div>
            </motion.div>

            <Separator />

            {/* Last Login Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-gray-700">Last Login</Label>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-blue-900 font-medium">{formatLastLogin(user.lastLogin)}</span>
                <Badge className="ml-auto bg-blue-100 text-blue-800 text-xs">Firebase Auth</Badge>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex gap-3 pt-4"
            >
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Reset
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
