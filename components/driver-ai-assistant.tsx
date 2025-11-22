'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Volume2, AlertCircle } from 'lucide-react'

export function DriverAIAssistant() {
  const [messages, setMessages] = useState([
    { type: 'system', text: 'ETA 3 minutes. Patient heart rate low. Activate oxygen support.' },
    { type: 'driver', text: 'Oxygen activated' },
    { type: 'system', text: 'Speed breaker ahead in 200m. Reduce speed to 20 km/h' },
  ])

  return (
    <Card className="p-6 bg-card border-neon-blue/30 glass-effect">
      <div className="flex items-center gap-2 mb-4">
        <Volume2 className="w-5 h-5 text-neon-blue" />
        <h3 className="text-lg font-semibold">AI Co-Pilot</h3>
      </div>

      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg text-sm ${
              msg.type === 'system'
                ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/30'
                : 'bg-muted/50 text-foreground border border-border'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button size="sm" className="flex-1 gap-2 bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30">
          <Volume2 className="w-4 h-4" />
          Listen
        </Button>
        <Button size="sm" variant="outline" className="gap-2">
          <AlertCircle className="w-4 h-4" />
          Report Issue
        </Button>
      </div>
    </Card>
  )
}
