'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, Zap, Plane, Package } from 'lucide-react'

interface Drone {
  id: string
  type: string
  status: 'available' | 'active' | 'charging'
  location: string
  eta: string
  payload: string
}

export function DroneDispatchSystem() {
  const [drones, setDrones] = useState<Drone[]>([
    { id: 'D1', type: 'AED Drone', status: 'available', location: 'Base Station A', eta: '2 min', payload: 'Defibrillator' },
    { id: 'D2', type: 'Blood Transport', status: 'active', location: 'En route to Rural Clinic', eta: '8 min', payload: 'Blood Units x10' },
    { id: 'D3', type: 'Medicine Drone', status: 'available', location: 'Base Station B', eta: '3 min', payload: 'Emergency Meds' },
  ])

  const [selectedDrone, setSelectedDrone] = useState<string | null>(null)

  return (
    <Card className="p-6 border-orange-500/30 bg-gradient-to-br from-orange-900/10 to-red-900/10 glass-effect">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Plane className="w-5 h-5 text-orange-400" />
          Drone Emergency Dispatch
        </h3>

        <p className="text-sm text-gray-400">
          Autonomous drones for faster rural emergency response • AED delivery • Blood transport • Medicine delivery
        </p>

        {/* Drone Fleet Status */}
        <div className="space-y-2">
          {drones.map((drone) => (
            <button
              key={drone.id}
              onClick={() => setSelectedDrone(drone.id)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedDrone === drone.id
                  ? 'border-orange-500/50 bg-orange-900/20'
                  : 'border-slate-600/30 hover:border-orange-500/30 bg-slate-800/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">{drone.id} - {drone.type}</p>
                    <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                      drone.status === 'available' ? 'bg-green-500/20 text-green-400' :
                      drone.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {drone.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{drone.location}</p>
                  <p className="text-xs text-orange-300 mt-1 flex items-center gap-1">
                    <Package className="w-3 h-3" /> {drone.payload}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-orange-400">{drone.eta}</p>
                  <p className="text-xs text-gray-400">ETA</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Dispatch Control */}
        {selectedDrone && (
          <div className="space-y-3 p-3 bg-orange-900/30 border border-orange-500/30 rounded-lg">
            <p className="text-sm font-semibold text-white">Quick Dispatch Actions</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white text-xs"
              >
                Dispatch to Rural Clinic
              </Button>
              <Button
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white text-xs"
              >
                Send to Accident Zone
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-400 bg-slate-800/30 px-3 py-2 rounded">
          AI-optimized routes • Emergency protocol integration • Rural coverage enabled
        </div>
      </div>
    </Card>
  )
}
