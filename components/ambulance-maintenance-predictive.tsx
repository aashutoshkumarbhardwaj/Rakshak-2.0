'use client'

import { Card } from '@/components/ui/card'
import { AlertCircle, Wrench, BarChart3 } from 'lucide-react'

interface MaintenanceAlert {
  system: string
  status: 'critical' | 'warning' | 'normal'
  nextServiceDue: string
  healthScore: number
}

export function AmbulanceMaintenancePredictive() {
  const [systems] = React.useState<MaintenanceAlert[]>([
    { system: 'Engine Oil', status: 'warning', nextServiceDue: '2 days', healthScore: 65 },
    { system: 'Tire Pressure', status: 'normal', nextServiceDue: '14 days', healthScore: 92 },
    { system: 'Battery', status: 'normal', nextServiceDue: '30 days', healthScore: 88 },
    { system: 'Brake Pads', status: 'critical', nextServiceDue: 'TODAY', healthScore: 40 },
    { system: 'Oxygen Tank Leakage', status: 'normal', nextServiceDue: '7 days', healthScore: 95 },
    { system: 'Medical Equipment Calibration', status: 'warning', nextServiceDue: '3 days', healthScore: 72 }
  ])

  const overallHealth = Math.round(systems.reduce((acc, s) => acc + s.healthScore, 0) / systems.length)

  return (
    <Card className="p-6 border-yellow-500/30 bg-gradient-to-br from-yellow-900/10 to-orange-900/10 glass-effect">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-yellow-400" />
            Predictive Maintenance AI
          </h3>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-yellow-400" />
            <span className="text-lg font-bold text-yellow-400">{overallHealth}% Health</span>
          </div>
        </div>

        <div className="space-y-2">
          {systems.map((sys) => (
            <div key={sys.system} className={`p-3 rounded-lg border flex items-center justify-between ${
              sys.status === 'critical' ? 'border-red-500/50 bg-red-900/20' :
              sys.status === 'warning' ? 'border-yellow-500/50 bg-yellow-900/20' :
              'border-green-500/50 bg-green-900/20'
            }`}>
              <div className="flex-1">
                <p className="font-semibold text-sm text-white">{sys.system}</p>
                <p className="text-xs text-gray-400">Service: {sys.nextServiceDue}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      sys.status === 'critical' ? 'bg-red-500' :
                      sys.status === 'warning' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${sys.healthScore}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-white w-6 text-right">{sys.healthScore}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
