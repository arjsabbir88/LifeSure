import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Link } from "react-router"

export default function ForbiddenPage() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/jCJthf6/403-forbidden-la-gi-cach-sua-loi-http-error-403288766634346.jpg')", // Your background image URL
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Main content card with animation */}
      <motion.div
        className="relative z-10 bg-white/10 border border-white/30 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-xl text-center max-w-xl w-full text-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl font-extrabold mb-4 drop-shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          403 Forbidden
        </motion.h1>
        <motion.p
          className="text-lg text-gray-200 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Sorry, you don't have permission to access this page.
        </motion.p>
        <Link to="/">
          <Button className="bg-white text-black font-semibold px-6 py-2 rounded-xl hover:bg-gray-200 transition shadow-md">
            ← Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
