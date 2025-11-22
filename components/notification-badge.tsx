'use client'

import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'

export function NotificationBadge({ count = 1 }: { count?: number }) {
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <div className={`transition-all duration-500 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
        <Bell className="w-5 h-5 text-muted-foreground" />
      </div>
      {count > 0 && (
        <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
          {count}
        </div>
      )}
    </div>
  )
}
