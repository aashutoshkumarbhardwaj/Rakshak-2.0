'use client'

import { Card } from '@/components/ui/card'
import { Shield, AlertTriangle, CheckCircle2, Lock } from 'lucide-react'

export function MilitarySecurityPanel() {
  const securityStatus = [
    { item: 'Biometric Authentication', status: 'Active', severity: 'Critical' },
    { item: 'GPS Spoof Detection', status: 'Active', severity: 'Enabled' },
    { item: 'Fraud Detection AI', status: 'Monitoring', severity: 'Active' },
    { item: 'Data Encryption', status: 'Hardware Secured', severity: 'Verified' },
    { item: 'Deepfake Detection', status: 'Scanning', severity: 'Real-time' },
    { item: 'Suspicious Behavior Flag', status: '0 Alerts', severity: 'Normal' },
  ]

  return (
    <Card className="p-6 bg-card border-2 border-neon-red/50 glass-effect">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-neon-red" />
        <h3 className="text-lg font-semibold">Military-Grade Security</h3>
      </div>

      <div className="space-y-2">
        {securityStatus.map((sec) => (
          <div key={sec.item} className="flex items-center justify-between p-3 bg-muted/20 border border-border/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-neon-cyan" />
              <span className="text-sm font-semibold text-foreground">{sec.item}</span>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
              sec.status === 'Active' || sec.status === 'Verified'
                ? 'bg-neon-cyan/20 text-neon-cyan'
                : sec.status.includes('0')
                ? 'bg-neon-green/20 text-neon-green'
                : 'bg-yellow-400/20 text-yellow-300'
            }`}>
              {sec.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg flex items-start gap-2">
        <CheckCircle2 className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
        <p className="text-xs text-foreground">All security protocols operational. Zero breaches detected in last 30 days.</p>
      </div>
    </Card>
  )
}
