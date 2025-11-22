'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Globe, Zap, Cloud, AlertTriangle, Radio, Wifi } from 'lucide-react'

interface CityData {
  ambulances: number
  activeIncidents: number
  traffic: 'light' | 'moderate' | 'heavy'
  weather: string
  floodZones: number
  pollutionLevel: number
}

export function Admin3DCityMap() {
  const [cityData] = useState<CityData>({
    ambulances: 24,
    activeIncidents: 7,
    traffic: 'moderate',
    weather: 'Partly Cloudy',
    floodZones: 2,
    pollutionLevel: 187
  })

  return (
    <Card className="p-6 vision-glass border border-neon-cyan/40 hover:border-neon-cyan/60 transition-all duration-300">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Globe className="w-5 h-5 text-neon-cyan" />
            3D City Emergency Map
          </h3>
          <div className="flex gap-2">
            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30">
              <Wifi className="w-3 h-3 inline mr-1" /> Live
            </div>
          </div>
        </div>

        {/* 3D Globe Visualization with enhanced VisionOS aesthetics */}
        <div className="relative rounded-2xl overflow-hidden aspect-video flex items-center justify-center depth-3d">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-neon-blue/5 to-slate-900/80 backdrop-blur-sm" />
          <div className="absolute inset-0 hologram opacity-20" />
          <div className="relative z-10 text-center space-y-4">
            <div className="w-24 h-24 rounded-full border-2 border-neon-cyan mx-auto relative floating">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan/30 via-neon-blue/15 to-transparent" />
              <div className="absolute inset-1 rounded-full border border-neon-cyan/40 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-3 rounded-full border border-neon-blue/30" />
            </div>
            <div className="space-y-1">
              <div className="text-neon-cyan font-semibold text-sm tracking-wide">Live 3D Satellite Map</div>
              <div className="text-xs text-muted-foreground">Real-time geo-spatial • AI-powered visualization</div>
            </div>
          </div>
        </div>

        {/* Real-time City Status Grid with Tesla minimalism */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="tesla-dashboard rounded-lg p-4 border border-neon-cyan/30 hover:border-neon-cyan/50 transition-all">
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">Active Units</p>
            <p className="text-3xl font-bold text-neon-cyan">{cityData.ambulances}</p>
            <p className="text-xs text-neon-cyan/70 mt-1">deployed</p>
          </div>
          
          <div className="tesla-dashboard rounded-lg p-4 border border-neon-red/30 hover:border-neon-red/50 transition-all">
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">Emergency</p>
            <p className="text-3xl font-bold text-neon-red pulse-glow">{cityData.activeIncidents}</p>
            <p className="text-xs text-neon-red/70 mt-1">ongoing</p>
          </div>

          <div className="tesla-dashboard rounded-lg p-4 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">Traffic</p>
            <p className="text-lg font-bold text-yellow-400 capitalize">{cityData.traffic}</p>
            <p className="text-xs text-yellow-400/70 mt-1">city-wide</p>
          </div>

          <div className="tesla-dashboard rounded-lg p-4 border border-orange-400/30 hover:border-orange-400/50 transition-all">
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">Air Quality</p>
            <p className="text-3xl font-bold text-orange-400">{cityData.pollutionLevel}</p>
            <p className="text-xs text-orange-400/70 mt-1">AQI</p>
          </div>
        </div>

        {/* Critical Zones with enhanced VisionOS styling */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground uppercase tracking-wider">Critical Zones</p>
          <div className="space-y-2">
            <div className="p-4 vision-glass border border-neon-red/40 rounded-lg text-sm text-neon-red/90 flex items-start gap-3 hover:border-neon-red/60 transition-all">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Flood Zone Alert</p>
                <p className="text-xs text-neon-red/70">North District • 2 active areas • Rerouting units</p>
              </div>
            </div>
            <div className="p-4 vision-glass border border-yellow-400/40 rounded-lg text-sm text-yellow-300/90 flex items-start gap-3 hover:border-yellow-400/60 transition-all">
              <Radio className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Heavy Traffic</p>
                <p className="text-xs text-yellow-300/70">Central Highway • ETA +8 min • Emergency corridor active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status bar with Tesla minimal style */}
        <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border border-border/30 rounded-lg text-xs text-muted-foreground">
          <div className="flex gap-3">
            <span>Satellite data</span>
            <span>•</span>
            <span>Real-time traffic</span>
            <span>•</span>
            <span>Weather integration</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
        </div>
      </div>
    </Card>
  )
}
