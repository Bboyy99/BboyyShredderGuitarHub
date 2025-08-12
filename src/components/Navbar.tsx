'use client'

import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
  const [isTutorialsOpen, setIsTutorialsOpen] = useState(false)

  return (
    <nav className="bg-gray-900/80 backdrop-blur-sm shadow-lg border-b border-blue-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
            BboyyShredder
          </Link>
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md transition-colors">
              Home
            </Link>
            <Link href="/covers" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md transition-colors">
              Covers
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsTutorialsOpen(!isTutorialsOpen)}
                className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md transition-colors flex items-center space-x-1"
              >
                <span>Tutorials</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isTutorialsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isTutorialsOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-blue-500/20 py-2 z-50">
                  <Link
                    href="/tutorials"
                    className="block px-4 py-2 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                  >
                    All Tutorials
                  </Link>
                  <Link
                    href="/tutorials#technique"
                    className="block px-4 py-2 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                  >
                    Technique
                  </Link>
                  <Link
                    href="/tutorials#recording"
                    className="block px-4 py-2 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                  >
                    Recording
                  </Link>
                  <Link
                    href="/tutorials#gear"
                    className="block px-4 py-2 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                  >
                    Gear Setup
                  </Link>
                </div>
              )}
            </div>
            <Link href="/gear" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md transition-colors">
              Gear
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 