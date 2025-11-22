'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Bed, Clock, Users, TrendingUp } from 'lucide-react'

export function HospitalSuggestions() {
  const hospitals = [
    {
      name: 'City Medical Center',
      distance: '3.2 km',
      eta: '7 min',
      availableBeds: 5,
      specialization: 'General',
      waitTime: '15 min',
      rating: 4.8,
      hasTrauma: true,
      hasCardiac: true,
    },
    {
      name: 'St. Johns Hospital',
      distance: '5.1 km',
      eta: '12 min',
      availableBeds: 3,
      specialization: 'Cardiac',
      waitTime: '25 min',
      rating: 4.9,
      hasTrauma: false,
      hasCardiac: true,
    },
    {
      name: 'Emergency Care Unit',
      distance: '2.8 km',
      eta: '6 min',
      availableBeds: 8,
      specialization: 'Trauma',
      waitTime: '10 min',
      rating: 4.6,
      hasTrauma: true,
      hasCardiac: false,
    },
  ]

  return (
    <Card className="p-6 border-2 border-border">
      <h3 className="text-xl font-bold text-foreground mb-4">AI-Recommended Hospitals</h3>
      <div className="space-y-3">
        {hospitals.map((hospital) => (
          <div
            key={hospital.name}
            className="p-4 border-2 border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-foreground">{hospital.name}</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" /> {hospital.distance} • ETA: {hospital.eta}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-secondary">{hospital.rating} ⭐</p>
                <p className="text-xs text-muted-foreground">{hospital.specialization}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
              <div className="bg-primary/10 p-2 rounded text-center">
                <Bed className="w-4 h-4 mx-auto text-primary" />
                <p className="font-semibold text-foreground">{hospital.availableBeds} beds</p>
              </div>
              <div className="bg-secondary/10 p-2 rounded text-center">
                <Clock className="w-4 h-4 mx-auto text-secondary" />
                <p className="font-semibold text-foreground">{hospital.waitTime}</p>
              </div>
              <div className="bg-accent/10 p-2 rounded text-center">
                <TrendingUp className="w-4 h-4 mx-auto text-accent" />
                <p className="font-semibold text-foreground">
                  {hospital.hasCardiac ? '✓ Cardiac' : 'General'}
                </p>
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Select & Book
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
