
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function ErrorPage() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white p-4 overflow-hidden"
      style={{ backgroundImage: 'url("https://i.ibb.co/kVrmx8Y8/Error-404.gif")' }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-2xl text-center space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 ease-out">
        <h1 className="text-7xl font-extrabold tracking-tight sm:text-8xl md:text-9xl text-red-500 drop-shadow-lg">
          404
        </h1>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-100">Lost in space?</h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          {"It looks like this page doesn't exist. Let's get you back on track!"}
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 px-8 py-3 text-lg font-semibold bg-red-600 hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
        >
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  )
}
