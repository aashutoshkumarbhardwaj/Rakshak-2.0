'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, AlertTriangle, TrendingUp, Zap } from 'lucide-react'

export function IntelligentRouting() {
  const [activeRoute, setActiveRoute] = useState('optimal')

  const routes = [
    {
      id: 'optimal',
      name: 'AI Optimized Route',
      distance: '4.2 km',
      time: '6 min',
      features: ['Zero speed breakers', 'Minimal traffic', 'Emergency lane ready'],
      color: 'neon-cyan',
    },
    {
      id: 'fastest',
      name: 'Fastest Route',
      distance: '5.1 km',
      time: '7 min',
      features: ['Highway access', 'Fewer turns', 'Higher speed'],
      color: 'neon-blue',
    },
    {
      id: 'safest',
      name: 'Safest Route',
      distance: '4.8 km',
      time: '8 min',
      features: ['Well-lit roads', 'Low accident zone', 'Wide lanes'],
      color: 'neon-red',
    },
  ]

  return (
    <Card className="p-6 bg-card border-neon-cyan/30 glass-effect">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-neon-cyan" />
        <h3 className="text-lg font-semibold">Intelligent Navigation</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {routes.map((route) => (
          <button
            key={route.id}
            onClick={() => setActiveRoute(route.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              activeRoute === route.id
                ? `border-${route.color} bg-${route.color}/10`
                : 'border-border hover:border-border/80'
            }`}
          >
            <h4 className="font-semibold text-foreground mb-2">{route.name}</h4>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-muted-foreground">{route.distance}</span>
              <span className="font-bold text-primary">{route.time}</span>
            </div>
            <ul className="space-y-1">
              {route.features.map((feature) => (
                <li key={feature} className="text-xs text-muted-foreground flex items-center gap-1">
                  <div className="w-1 h-1 bg-current rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      {/* Real-time Reroute Alert */}
      <div className="p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-lg flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-foreground text-sm">Dynamic Reroute Available</p>
          <p className="text-xs text-muted-foreground mt-1">
            New emergency lane detected on Main St. Updated ETA: 5 min 30 sec
          </p>
          <Button size="sm" className="mt-2 text-xs bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30">
            Accept Reroute
          </Button>
        </div>
      </div>
    </Card>
  )
}
