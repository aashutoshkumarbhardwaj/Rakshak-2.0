'use client'

import { useEffect, useState } from 'react'
import { ReactNode } from 'react'

interface EmotionalUIProps {
  children: ReactNode
  userStressLevel?: 'low' | 'medium' | 'high'
}

export function EmotionalUIWrapper({ children, userStressLevel = 'low' }: EmotionalUIProps) {
  const [stressLevel, setStressLevel] = useState(userStressLevel)
  const [colors, setColors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Simulate stress detection - in real app, would use biometric data
    const updateStress = () => {
      const hour = new Date().getHours()
      // Peak stress during emergency hours
      if (hour >= 14 && hour <= 18) {
        setStressLevel('high')
      } else if (hour >= 12 && hour <= 20) {
        setStressLevel('medium')
      } else {
        setStressLevel('low')
      }
    }

    updateStress()
    const interval = setInterval(updateStress, 60000)
    return () => clearInterval(interval)
  }, [])

  // Dynamic color scheme based on stress
  useEffect(() => {
    if (stressLevel === 'high') {
      setColors({
        accent: '#FF4D4D',
        breathing: '1.5s',
        message: 'Take a deep breath. Help is on the way.'
      })
    } else if (stressLevel === 'medium') {
      setColors({
        accent: '#FFD700',
        breathing: '2.5s',
        message: 'Stay calm. Emergency team ready.'
      })
    } else {
      setColors({
        accent: '#63E6BE',
        breathing: '4s',
        message: 'System ready for emergencies.'
      })
    }
  }, [stressLevel])

  return (
    <div className={`emotional-ui stress-level-${stressLevel}`}>
      {children}
      {/* Calming overlay during high stress */}
      {stressLevel === 'high' && (
        <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md">
          <div className="bg-blue-900/20 backdrop-blur border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-blue-200 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              {colors.message}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
