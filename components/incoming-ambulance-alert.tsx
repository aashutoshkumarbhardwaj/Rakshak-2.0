'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, AlertCircle, MapPin, Clock, Heart } from 'lucide-react'

export function IncomingAmbulanceAlert() {
  const incomingCases = [
    {
      id: 1,
      patient: 'Amit Sharma',
      severity: 'Critical',
      eta: '3:45',
      condition: 'Possible Cardiac Event',
      vitals: { hr: 110, o2: 92, bp: '95/60' },
      ambulance: 'MH-02-AB-9876',
      driver: 'Rahul Kumar',
    },
  ]

  return (
    <div className="space-y-4">
      {incomingCases.map((item) => (
        <Card
          key={item.id}
          className="p-6 border-2 border-neon-red/50 bg-gradient-to-br from-neon-red/20 via-card to-card glass-effect"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-5 h-5 text-neon-red animate-pulse" />
                <h3 className="text-xl font-bold text-neon-red">{item.patient}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{item.condition}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-neon-red">{item.severity}</div>
              <p className="text-sm text-muted-foreground">ETA: {item.eta}</p>
            </div>
          </div>

          {/* Live Vitals */}
          <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-muted/20 border border-border/50 rounded-lg">
            <div className="text-center">
              <Heart className="w-4 h-4 text-neon-red mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">HR</p>
              <p className="font-bold text-neon-red">{item.vitals.hr} bpm</p>
            </div>
            <div className="text-center">
              <AlertCircle className="w-4 h-4 text-neon-cyan mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">SpO2</p>
              <p className="font-bold text-neon-cyan">{item.vitals.o2}%</p>
            </div>
            <div className="text-center">
              <MapPin className="w-4 h-4 text-neon-blue mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">BP</p>
              <p className="font-bold text-neon-blue">{item.vitals.bp}</p>
            </div>
          </div>

          {/* Ambulance Info */}
          <div className="flex justify-between items-center mb-4 p-3 bg-muted/10 border border-border/50 rounded-lg text-sm">
            <div>
              <p className="text-muted-foreground">Ambulance</p>
              <p className="font-semibold text-foreground">{item.ambulance}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Driver</p>
              <p className="font-semibold text-foreground">{item.driver}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button className="flex-1 bg-gradient-to-r from-neon-red to-red-700 text-white gap-2">
              <AlertTriangle className="w-4 h-4" />
              Prepare ER
            </Button>
            <Button className="flex-1 bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 gap-2">
              <Clock className="w-4 h-4" />
              Set Timer
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
