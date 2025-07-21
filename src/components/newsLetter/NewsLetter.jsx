import React from "react";
import AnimatedIllustration from "../animatedIllustration/AnimatedIllustration";
import NewsletterForm from "../newsletterForm/NewsletterForm";
import { Mail, CheckCircle, User } from "lucide-react"

const NewsLetter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left side - Animated Illustration */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg">
              <AnimatedIllustration />
            </div>
          </div>

          {/* Right side - Newsletter Form */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-start">
            <div className="w-full max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Additional content section */}
        <div className="mt-16 lg:mt-24 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Join thousands of subscribers
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get the latest insights, tips, and exclusive content delivered
            straight to your inbox. No spam, just valuable content you'll
            actually want to read.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Weekly Updates
              </h3>
              <p className="text-sm text-gray-600">
                Get curated content every week
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Exclusive Content
              </h3>
              <p className="text-sm text-gray-600">
                Access subscriber-only resources
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Community Access
              </h3>
              <p className="text-sm text-gray-600">
                Join our growing community
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
