'use client'

import { Card } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

export function VisionOSThemeShowcase() {
  return (
    <div className="space-y-6">
      {/* Apple VisionOS Layered Glass Effect */}
      <Card className="vision-glass p-8">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-white" />
          <h3 className="text-lg font-semibold text-white">Apple VisionOS Style</h3>
        </div>
        <p className="text-sm text-gray-200">Ultra-smooth glassmorphism with 20px blur, frosted transparency, and zero hard edges</p>
      </Card>

      {/* Tesla Dashboard Minimalist */}
      <Card className="tesla-dashboard p-8">
        <h3 className="text-lg font-semibold text-white mb-3 font-mono tracking-widest">TESLA DASHBOARD</h3>
        <div className="grid grid-cols-3 gap-4">
          {['SPEED', 'DISTANCE', 'EFFICIENCY'].map((metric) => (
            <div key={metric} className="thin-border-neon p-3 text-center">
              <p className="text-xs text-gray-400 font-mono tracking-wider">{metric}</p>
              <p className="text-2xl font-bold text-white mt-2">--:--</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Hologram UI with Floating Elements */}
      <div className="hologram p-6 rounded-lg">
        <p className="text-sm text-cyan-200">Floating holographic ambulance icons with light particle effects</p>
        <div className="flex justify-center mt-4 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="floating w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400/30 to-purple-400/30 border border-cyan-400/50" />
          ))}
        </div>
      </div>
    </div>
  )
}
