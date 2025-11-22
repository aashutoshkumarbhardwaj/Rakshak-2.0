'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, Phone, Loader2 } from 'lucide-react'

export function EmergencySosButton() {
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSOS = async () => {
    setIsLoading(true)
    setIsActive(true)
    // Simulate emergency alert
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleSOS}
        disabled={isLoading}
        className="relative w-32 h-32 rounded-full bg-gradient-to-br from-neon-red via-red-600 to-red-900 flex items-center justify-center text-white font-bold text-2xl neon-glow emergency-pulse hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-8 h-8 animate-spin" />
        ) : (
          <Phone className="w-8 h-8" />
        )}
        <span className="absolute bottom-2 text-xs font-semibold">HOLD TO CALL</span>
      </button>

      {isActive && (
        <div className="text-center">
          <div className="flex items-center gap-2 text-neon-red mb-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">Emergency Alert Sent</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Ambulance dispatched to your location
          </p>
        </div>
      )}
    </div>
  )
}
