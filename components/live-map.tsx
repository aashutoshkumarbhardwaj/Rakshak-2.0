'use client'

import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'

export function LiveMap() {
  const [ambulancePos, setAmbulancePos] = useState({ x: 30, y: 70 })

  useEffect(() => {
    const interval = setInterval(() => {
      setAmbulancePos(prev => ({
        x: Math.min(prev.x + Math.random() * 2, 95),
        y: Math.max(prev.y - Math.random() * 1.5, 20),
      }))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-lg border border-border overflow-hidden">
      {/* Grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Destination marker */}
      <div className="absolute top-8 right-8 z-10">
        <div className="relative">
          <div className="w-6 h-6 bg-secondary rounded-full border-2 border-secondary-foreground animate-pulse"></div>
          <div className="absolute top-2 left-2 w-2 h-2 bg-secondary-foreground rounded-full"></div>
        </div>
      </div>

      {/* Ambulance marker with animation */}
      <div
        className="absolute transition-all duration-500 z-20"
        style={{
          left: `${ambulancePos.x}%`,
          top: `${ambulancePos.y}%`,
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/30 rounded-full animate-pulse" style={{ width: '40px', height: '40px', marginLeft: '-20px', marginTop: '-20px' }}></div>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center border-2 border-primary-foreground shadow-lg">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Route line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line
          x1={`${30}%`}
          y1={`${70}%`}
          x2={`${ambulancePos.x}%`}
          y2={`${ambulancePos.y}%`}
          stroke="url(#routeGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(var(--color-primary))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(var(--color-secondary))" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Map labels */}
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
        <p>Current Location</p>
      </div>
    </div>
  )
}
