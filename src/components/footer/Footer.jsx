"use client"; // Still needed for framer-motion to work

import { MountainIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { Link } from "react-router";
import logo from '../../assets/logo.svg'

export default function Footer() {
  const linkVariants = {
    initial: { y: 0, opacity: 0.8 },
    hover: {
      y: -3,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  };

  const socialIconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-gradient-to-r from-green-900 to-cyan-900 text-gray-300 py-16 md:py-20"
    >
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Branding and Social Media */}
        <div className="col-span-1 lg:col-span-2 flex flex-col items-start space-y-6">
          <Link to="/">
            <div className="flex items-center cursor-pointer">
              <div className="w-9 h-9 mr-3">
                <img src={logo} alt="" />
              </div>
              <h1 className="text-2xl font-bold animate__animated animate__fadeInUp bg-gradient-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent">
                LifeSure
              </h1>
            </div>
          </Link>
          <p className="text-base text-gray-400 leading-relaxed max-w-md">
            Innovating the future with cutting-edge solutions and a commitment
            to excellence. Join us on our journey.
          </p>
          <div className="flex space-x-4 mt-4">
            <motion.a
              to="https://www.facebook.com/arj.sabbir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              variants={socialIconVariants}
              initial="initial"
              whileHover="hover"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-6 w-6" />
            </motion.a>
            <motion.a
              to="https://x.com/arj_sabbir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              variants={socialIconVariants}
              initial="initial"
              whileHover="hover"
              aria-label="Twitter"
            >
              <TwitterIcon className="h-6 w-6" />
            </motion.a>
            <motion.a
              to="https://www.instagram.com/mdtariqulislamkhan9/#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              variants={socialIconVariants}
              initial="initial"
              whileHover="hover"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-6 w-6" />
            </motion.a>
            <motion.a
              to="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              variants={socialIconVariants}
              initial="initial"
              whileHover="hover"
              aria-label="YouTube"
            >
              <YoutubeIcon className="h-6 w-6" />
            </motion.a>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 col-span-1 lg:col-span-3 gap-8 md:gap-12">
          {/* Products Column */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">Polices</h3>
            <nav className="space-y-3 text-base">
              <motion.div
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Health
                </Link>
              </motion.div>
              <motion.div
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Disability
                </Link>
              </motion.div>
              <motion.div
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Term-life
                </Link>
              </motion.div>
              <motion.div
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Whole-life
                </Link>
              </motion.div>
            </nav>
          </div>

          {/* Company Column */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">Company</h3>
            <nav className="space-y-3 text-base">
              <motion.div
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </motion.div>
              <motion.div
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link
                  to="https://lifesure-57740.web.app/agents"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </motion.div>
              <motion.div
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link
                  to="https://lifesure-57740.web.app/blogs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </motion.div>
              <motion.div
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </motion.div>
            </nav>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">Resources</h3>
            <nav className="space-y-3 text-base">
              <motion.div
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </motion.div>
              <motion.div
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Support
                </Link>
              </motion.div>
              <motion.div
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Community
                </Link>
              </motion.div>
              <motion.div
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </motion.div>
            </nav>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Acme Inc. All rights reserved.</p>
        <p>Sabbir</p>
      </div>
    </motion.footer>
  );
}
