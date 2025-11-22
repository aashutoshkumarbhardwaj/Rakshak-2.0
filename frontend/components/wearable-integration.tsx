'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Activity, Zap, TrendingDown, AlertTriangle } from 'lucide-react'

interface WearableData {
  device: string
  heartRate: number
  oxygenSaturation: number
  bloodPressure: string
  glucose?: number
  temperature?: number
  lastSync: string
}

interface HealthPrediction {
  risk: string
  severity: 'low' | 'medium' | 'high'
  message: string
  recommendation: string
}

export function WearableIntegration() {
  const [devices, setDevices] = useState<WearableData[]>([
    {
      device: 'Apple Watch Series 9',
      heartRate: 78,
      oxygenSaturation: 98,
      bloodPressure: '128/82',
      temperature: 37.1,
      lastSync: 'Just now'
    },
    {
      device: 'Fitbit Premium',
      heartRate: 76,
      oxygenSaturation: 97,
      bloodPressure: '126/80',
      lastSync: '2 min ago'
    },
    {
      device: 'Smart Glucose Monitor',
      heartRate: 0,
      oxygenSaturation: 0,
      bloodPressure: 'N/A',
      glucose: 145,
      lastSync: '5 min ago'
    }
  ])

  const [predictions, setPredictions] = useState<HealthPrediction[]>([
    {
      risk: 'Asthma Attack',
      severity: 'high',
      message: 'High pollution levels detected in your area (AQI: 187)',
      recommendation: 'Keep inhaler nearby. Consider staying indoors.'
    },
    {
      risk: 'Cardiac Irregularity',
      severity: 'medium',
      message: 'Your heart rate variability shows 15% increase compared to baseline',
      recommendation: 'Reduce stress. Avoid strenuous activities today.'
    },
    {
      risk: 'Hypoglycemia',
      severity: 'medium',
      message: 'Blood glucose trending down: 180 → 145 mg/dL (45-min trend)',
      recommendation: 'Eat quick carbs. Monitor glucose every 15 minutes.'
    }
  ])

  return (
    <Card className="p-6 border-cyan-500/30 bg-gradient-to-br from-cyan-900/10 to-blue-900/10">
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          Connected Wearables & IoT Devices
        </h3>

        {/* Connected Devices */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-cyan-300">Live Device Sync</h4>
          {devices.map((device) => (
            <div key={device.device} className="bg-slate-800/40 border border-cyan-500/20 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white text-sm">{device.device}</span>
                <div className="flex items-center gap-1 text-xs text-cyan-400">
                  <Zap className="w-3 h-3" />
                  {device.lastSync}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                <div>HR: <span className="text-cyan-400 font-semibold">{device.heartRate} bpm</span></div>
                <div>O₂: <span className="text-cyan-400 font-semibold">{device.oxygenSaturation}%</span></div>
                <div>BP: <span className="text-cyan-400 font-semibold">{device.bloodPressure}</span></div>
                {device.glucose && <div>Glucose: <span className="text-cyan-400 font-semibold">{device.glucose} mg/dL</span></div>}
                {device.temperature && <div>Temp: <span className="text-cyan-400 font-semibold">{device.temperature}°C</span></div>}
              </div>
            </div>
          ))}
        </div>

        {/* AI Health Predictions */}
        <div className="space-y-3 pt-4 border-t border-slate-700">
          <h4 className="text-sm font-semibold text-yellow-300">AI Health Predictions</h4>
          {predictions.map((prediction) => (
            <div
              key={prediction.risk}
              className={`border-l-4 rounded-lg p-3 space-y-2 ${
                prediction.severity === 'high'
                  ? 'border-red-500 bg-red-900/20'
                  : 'border-yellow-500 bg-yellow-900/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className={`font-semibold text-sm ${
                  prediction.severity === 'high' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {prediction.risk}
                </span>
              </div>
              <p className="text-xs text-gray-300">{prediction.message}</p>
              <p className="text-xs text-cyan-300 bg-cyan-900/30 px-2 py-1 rounded">
                <strong>Recommendation:</strong> {prediction.recommendation}
              </p>
            </div>
          ))}
        </div>

        <div className="text-xs text-gray-400 bg-slate-800/30 px-3 py-2 rounded">
          Hospital receives live health data • Digital twin model created • Risk patterns analyzed in real-time
        </div>
      </div>
    </Card>
  )
}
