'use client'

import Link from 'next/link'
import { Ambulance, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useState } from 'react'

interface HeaderProps {
  title?: string
  showLogo?: boolean
}

export function Header({ title = 'OneCall', showLogo = true }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/50 backdrop-blur-md supports-backdrop-filter:bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
            {showLogo && (
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Ambulance className="w-6 h-6 text-primary-foreground" />
              </div>
            )}
            <h1 className="text-2xl font-bold text-primary hidden sm:block">{title}</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="text-foreground hover:bg-secondary/20 transition-colors"
              asChild
            >
              <Link href="/">Home</Link>
            </Button>
            <Button 
              variant="ghost" 
              className="text-foreground hover:bg-secondary/20 transition-colors"
            >
              Contact
            </Button>
            <Button 
              variant="ghost" 
              className="text-foreground hover:bg-secondary/20 transition-colors"
            >
              About
            </Button>
            
            {/* Divider */}
            <div className="w-px h-6 bg-border mx-2"></div>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border pt-4 animate-slide-in-down">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-foreground hover:bg-secondary/20"
              asChild
            >
              <Link href="/">Home</Link>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-foreground hover:bg-secondary/20"
            >
              Contact
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-foreground hover:bg-secondary/20"
            >
              About
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
