'use client'

import { Card } from '@/components/ui/card'
import { DollarSign, TrendingUp, Clock, Zap } from 'lucide-react'

export function SmartEarnings() {
  const earnings = {
    base: 450,
    bonus: 120,
    surge: 85,
    efficiency: 55,
    total: 710,
  }

  const suggestions = [
    'Surge pricing active in Downtown (1.5x multiplier). Consider relocating.',
    'You are on track to earn 15% more than yesterday. Maintain current route efficiency.',
  ]

  return (
    <Card className="p-6 border-2 border-secondary/20 bg-gradient-to-br from-secondary/10 to-transparent">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="w-5 h-5 text-secondary" />
        <h3 className="text-xl font-bold text-foreground">Smart Earnings Breakdown</h3>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center p-3 bg-background rounded-lg">
          <span className="text-sm text-foreground">Base Fare</span>
          <span className="font-bold text-foreground">₹{earnings.base}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-background rounded-lg">
          <span className="text-sm text-foreground">Fast Response Bonus</span>
          <span className="font-bold text-green-600">+₹{earnings.bonus}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-background rounded-lg">
          <span className="text-sm text-foreground">Surge Pricing (1.5x)</span>
          <span className="font-bold text-yellow-600">+₹{earnings.surge}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-background rounded-lg">
          <span className="text-sm text-foreground">Route Efficiency Bonus</span>
          <span className="font-bold text-blue-600">+₹{earnings.efficiency}</span>
        </div>
      </div>

      <div className="border-t-2 border-border pt-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-foreground">Total This Ride</span>
          <span className="text-2xl font-bold text-secondary">₹{earnings.total}</span>
        </div>
      </div>

      <div className="space-y-2">
        {suggestions.map((suggestion, i) => (
          <div key={i} className="p-3 bg-primary/10 rounded-lg flex gap-2">
            <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">{suggestion}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
