'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Shield, Wifi, Radio, Zap, TrendingUp } from 'lucide-react'

interface NetworkStatus {
  network: string
  signal: number
  latency: number
  active: boolean
}

export function AmbulanceAutonomousMode() {
  const [autonomousEnabled, setAutonomousEnabled] = useState(true)
  const [networks, setNetworks] = useState<NetworkStatus[]>([
    { network: '5G', signal: 95, latency: 12, active: true },
    { network: '4G LTE', signal: 88, latency: 25, active: true },
    { network: 'Satellite (Starlink)', signal: 72, latency: 45, active: false },
    { network: 'Mesh Network', signal: 60, latency: 80, active: false }
  ])

  const [vehStatus, setVehStatus] = useState({
    smartBraking: 95,
    laneAssistance: 92,
    fogVisibility: 88,
    speedProtection: 98,
    collisionAvoidance: 97,
    nightVision: 85
  })

  return (
    <div className="space-y-6">
      {/* Main Autonomous Control */}
      <Card className="p-6 border-neon-cyan/30 bg-gradient-to-br from-cyan-900/10 to-blue-900/10 glass-effect">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              Autonomous Emergency Assist Mode
            </h3>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              autonomousEnabled 
                ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                : 'bg-slate-500/20 text-slate-400 border border-slate-500/50'
            }`}>
              {autonomousEnabled ? 'ACTIVE' : 'INACTIVE'}
            </div>
          </div>

          {/* Safety Systems Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(vehStatus).map(([system, status]) => (
              <div key={system} className="bg-slate-800/40 border border-cyan-500/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-cyan-300 capitalize">{system.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-xs font-bold text-cyan-400">{status}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                    style={{ width: `${status}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-gray-400 bg-slate-800/30 px-3 py-2 rounded">
            All safety systems operational • Emergency protocols engaged
          </div>
        </div>
      </Card>

      {/* Dual-Network Failover System */}
      <Card className="p-6 border-neon-blue/30 bg-gradient-to-br from-blue-900/10 to-purple-900/10 glass-effect">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Wifi className="w-5 h-5 text-blue-400" />
          Dual-Network Emergency Connection
        </h3>
        
        <div className="space-y-3">
          <p className="text-sm text-gray-300">Auto-switches between networks for zero-drop connectivity</p>
          
          {networks.map((net) => (
            <div key={net.network} className={`border rounded-lg p-3 flex items-center justify-between ${
              net.active 
                ? 'border-blue-500/50 bg-blue-900/20' 
                : 'border-slate-600/30 bg-slate-800/20'
            }`}>
              <div className="flex items-center gap-3 flex-1">
                <Radio className={`w-4 h-4 ${net.active ? 'text-blue-400' : 'text-slate-500'}`} />
                <div>
                  <p className="font-semibold text-sm text-white">{net.network}</p>
                  <p className="text-xs text-gray-400">Latency: {net.latency}ms</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${net.active ? 'bg-blue-500' : 'bg-slate-600'}`}
                    style={{ width: `${net.signal}%` }}
                  />
                </div>
                <span className={`text-xs font-bold w-8 text-right ${net.active ? 'text-blue-400' : 'text-slate-500'}`}>
                  {net.signal}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
          <p className="text-xs text-blue-200">
            <strong>Status:</strong> All networks connected • Primary: 5G • Backup: 4G LTE • Fallback: Satellite
          </p>
        </div>
      </Card>
    </div>
  )
}
