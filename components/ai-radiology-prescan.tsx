'use client'

import { Card } from '@/components/ui/card'
import { AlertTriangle, Eye } from 'lucide-react'

interface RadiologyFinding {
  finding: string
  confidence: number
  severity: 'critical' | 'high' | 'moderate' | 'low'
  recommendation: string
}

export function AIRadiologyPrescan() {
  const findings: RadiologyFinding[] = [
    {
      finding: 'Potential Fracture - Left Femur',
      confidence: 87,
      severity: 'high',
      recommendation: 'Prepare orthopedic team • X-ray ready'
    },
    {
      finding: 'Internal Bleeding Risk - Abdominal',
      confidence: 72,
      severity: 'critical',
      recommendation: 'Alert trauma surgeon • CT scan priority'
    },
    {
      finding: 'Burn Severity Score: Grade 2B',
      confidence: 91,
      severity: 'high',
      recommendation: 'Burn unit preparation • Fluid management protocol'
    },
    {
      finding: 'Infection Probability (from wound)',
      confidence: 65,
      severity: 'moderate',
      recommendation: 'Antibiotic prophylaxis • Culture collection'
    }
  ]

  return (
    <Card className="p-6 border-purple-500/30 bg-gradient-to-br from-purple-900/10 to-pink-900/10 glass-effect">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-400" />
          AI Radiology Pre-Scan Analysis
        </h3>

        <p className="text-sm text-gray-400">
          Analyzed from patient photos/videos before arrival • AI-generated clinical predictions
        </p>

        <div className="space-y-2">
          {findings.map((item, idx) => (
            <div
              key={idx}
              className={`border-l-4 rounded-lg p-3 space-y-2 ${
                item.severity === 'critical'
                  ? 'border-red-500 bg-red-900/20'
                  : item.severity === 'high'
                  ? 'border-orange-500 bg-orange-900/20'
                  : item.severity === 'moderate'
                  ? 'border-yellow-500 bg-yellow-900/20'
                  : 'border-green-500 bg-green-900/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <p className="font-semibold text-white text-sm">{item.finding}</p>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  item.severity === 'critical' ? 'bg-red-500/30 text-red-300' :
                  item.severity === 'high' ? 'bg-orange-500/30 text-orange-300' :
                  item.severity === 'moderate' ? 'bg-yellow-500/30 text-yellow-300' :
                  'bg-green-500/30 text-green-300'
                }`}>
                  {item.confidence}%
                </span>
              </div>
              <p className="text-xs text-gray-300">{item.recommendation}</p>
            </div>
          ))}
        </div>

        <div className="text-xs text-gray-400 bg-slate-800/30 px-3 py-2 rounded">
          Pre-arrival analysis • Team preparation enabled • 15-20% faster diagnosis
        </div>
      </div>
    </Card>
  )
}
