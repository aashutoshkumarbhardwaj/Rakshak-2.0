'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Battery, Wifi, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react'

export function AmbulanceIoTDashboard() {
  const [equipment, setEquipment] = useState({
    oxygenTank: 85,
    defibrillator: 92,
    ventilator: 78,
    medicineBox: 65,
    temperature: 18,
    power: 88,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setEquipment((prev) => ({
        ...prev,
        oxygenTank: Math.max(0, prev.oxygenTank - Math.random() * 2),
        defibrillator: Math.max(0, prev.defibrillator - Math.random() * 0.5),
        ventilator: Math.max(0, prev.ventilator - Math.random() * 1.5),
        medicineBox: Math.max(0, prev.medicineBox - Math.random() * 0.3),
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (value: number) => {
    if (value > 75) return 'text-neon-cyan'
    if (value > 50) return 'text-yellow-400'
    return 'text-neon-red'
  }

  const getStatusBg = (value: number) => {
    if (value > 75) return 'bg-neon-cyan/10'
    if (value > 50) return 'bg-yellow-400/10'
    return 'bg-neon-red/10'
  }

  return (
    <Card className="p-6 bg-card border-neon-blue/30 glass-effect">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Ambulance IoT System</h3>
        <Wifi className="w-5 h-5 text-neon-cyan animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Oxygen Tank */}
        <div className={`p-4 rounded-lg border border-neon-cyan/30 ${getStatusBg(equipment.oxygenTank)}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">Oxygen Tank</h4>
            <AlertCircle className={`w-5 h-5 ${getStatusColor(equipment.oxygenTank)}`} />
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-neon-cyan to-neon-blue transition-all`}
                style={{ width: `${equipment.oxygenTank}%` }}
              />
            </div>
            <span className={`font-bold ${getStatusColor(equipment.oxygenTank)}`}>
              {equipment.oxygenTank.toFixed(0)}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Next refill: 2.5 km</p>
        </div>

        {/* Defibrillator */}
        <div className={`p-4 rounded-lg border border-neon-red/30 ${getStatusBg(equipment.defibrillator)}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">Defibrillator</h4>
            <Battery className={`w-5 h-5 ${getStatusColor(equipment.defibrillator)}`} />
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-neon-red to-red-600 transition-all`}
                style={{ width: `${equipment.defibrillator}%` }}
              />
            </div>
            <span className={`font-bold ${getStatusColor(equipment.defibrillator)}`}>
              {equipment.defibrillator.toFixed(0)}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Ready for emergency</p>
        </div>

        {/* Ventilator */}
        <div className={`p-4 rounded-lg border border-neon-blue/30 ${getStatusBg(equipment.ventilator)}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">Ventilator</h4>
            <CheckCircle2 className={`w-5 h-5 ${getStatusColor(equipment.ventilator)}`} />
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-neon-blue to-primary transition-all`}
                style={{ width: `${equipment.ventilator}%` }}
              />
            </div>
            <span className={`font-bold ${getStatusColor(equipment.ventilator)}`}>
              {equipment.ventilator.toFixed(0)}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Status: Operational</p>
        </div>

        {/* Medicine Box */}
        <div className={`p-4 rounded-lg border border-yellow-400/30 ${getStatusBg(equipment.medicineBox)}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">Medicine Box</h4>
            <AlertTriangle className={`w-5 h-5 ${getStatusColor(equipment.medicineBox)}`} />
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all`}
                style={{ width: `${equipment.medicineBox}%` }}
              />
            </div>
            <span className={`font-bold ${getStatusColor(equipment.medicineBox)}`}>
              {equipment.medicineBox.toFixed(0)}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Low stock alert</p>
        </div>
      </div>

      {/* Environmental Controls */}
      <div className="mt-4 p-4 bg-muted/20 border border-border/50 rounded-lg">
        <h4 className="font-semibold text-foreground mb-3">Environment</h4>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Temperature</p>
            <p className="font-bold text-neon-cyan">{equipment.temperature}°C</p>
            <p className="text-xs text-muted-foreground mt-1">Optimal</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center flex-1">
            <p className="text-xs text-muted-foreground">Power</p>
            <p className="font-bold text-neon-cyan">{equipment.power}%</p>
            <p className="text-xs text-muted-foreground mt-1">Hybrid system</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
