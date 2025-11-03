'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const Navbar = () => {
  const [isTutorialsOpen, setIsTutorialsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    // Close tutorials dropdown when mobile menu opens
    if (!isMobileMenuOpen) {
      setIsTutorialsOpen(false)
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsTutorialsOpen(false)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        closeMobileMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMobileMenuOpen])

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-blue-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
            onClick={closeMobileMenu}
          >
            BboyyShredder
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
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
                  <Link
                    href="/tutorials/tabs"
                    className="block px-4 py-2 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                  >
                    🎼 Tabs
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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
            aria-label="Toggle mobile menu"
            ref={hamburgerRef}
          >
            <span 
              className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span 
              className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span 
              className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          ref={mobileMenuRef}
        >
          <div className="py-4 space-y-2 border-t border-gray-700">
            <Link 
              href="/" 
              className="block px-4 py-3 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg transition-colors"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              href="/covers" 
              className="block px-4 py-3 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg transition-colors"
              onClick={closeMobileMenu}
            >
              Covers
            </Link>
            
            {/* Mobile Tutorials Section */}
            <div className="px-4">
              <button
                onClick={() => setIsTutorialsOpen(!isTutorialsOpen)}
                className="w-full text-left px-4 py-3 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg transition-colors flex items-center justify-between"
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
              <div 
                className={`ml-4 mt-2 space-y-1 transition-all duration-300 overflow-hidden ${
                  isTutorialsOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <Link
                  href="/tutorials"
                  className="block px-4 py-2 text-gray-400 hover:text-blue-400 transition-colors"
                  onClick={closeMobileMenu}
                >
                  All Tutorials
                </Link>
                <Link
                  href="/tutorials#technique"
                  className="block px-4 py-2 text-gray-400 hover:text-blue-400 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Technique
                </Link>
                <Link
                  href="/tutorials#recording"
                  className="block px-4 py-2 text-gray-400 hover:text-blue-400 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Recording
                </Link>
                <Link
                  href="/tutorials#gear"
                  className="block px-4 py-2 text-gray-400 hover:text-blue-400 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Gear Setup
                </Link>
                <Link
                  href="/tutorials/tabs"
                  className="block px-4 py-2 text-gray-400 hover:text-blue-400 transition-colors"
                  onClick={closeMobileMenu}
                >
                  🎼 Tabs
                </Link>
              </div>
            </div>
            
            <Link 
              href="/gear" 
              className="block px-4 py-3 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg transition-colors"
              onClick={closeMobileMenu}
            >
              Gear
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-3 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg transition-colors"
              onClick={closeMobileMenu}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 