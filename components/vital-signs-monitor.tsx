'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Heart, Zap, Droplets, Thermometer } from 'lucide-react'

export function VitalSignsMonitor() {
  const [vitals, setVitals] = useState({
    heartRate: 72,
    oxygen: 98,
    bloodPressure: '120/80',
    temperature: 36.8
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals({
        heartRate: Math.floor(Math.random() * 40 + 60),
        oxygen: Math.floor(Math.random() * 10 + 95),
        bloodPressure: `${Math.floor(Math.random() * 30 + 110)}/${Math.floor(Math.random() * 20 + 70)}`,
        temperature: (Math.random() * 2 + 36).toFixed(1)
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        {
          label: 'Heart Rate',
          value: `${vitals.heartRate}`,
          unit: 'BPM',
          icon: Heart,
          color: 'text-neon-red'
        },
        {
          label: 'Oxygen',
          value: vitals.oxygen,
          unit: '%',
          icon: Droplets,
          color: 'text-neon-cyan'
        },
        {
          label: 'Blood Pressure',
          value: vitals.bloodPressure,
          unit: 'mmHg',
          icon: Zap,
          color: 'text-neon-blue'
        },
        {
          label: 'Temperature',
          value: vitals.temperature,
          unit: '°C',
          icon: Thermometer,
          color: 'text-yellow-400'
        }
      ].map((vital) => {
        const Icon = vital.icon
        return (
          <Card key={vital.label} className="p-4 bg-card border-border/50 glass-effect">
            <div className="flex items-start justify-between mb-2">
              <Icon className={`w-5 h-5 ${vital.color}`} />
              <span className="text-xs text-muted-foreground">{vital.unit}</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{vital.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{vital.label}</div>
          </Card>
        )
      })}
    </div>
  )
}
