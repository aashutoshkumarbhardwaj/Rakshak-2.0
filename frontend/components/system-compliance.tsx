'use client'

import { Card } from '@/components/ui/card'
import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

export function SystemCompliance() {
  const metrics = [
    { metric: 'Average Response Time', target: '< 7 min', current: '6.2 min', status: 'green' },
    { metric: 'SLA Compliance', target: '> 95%', current: '94.8%', status: 'yellow' },
    { metric: 'System Uptime', target: '99.9%', current: '99.95%', status: 'green' },
    { metric: 'Fraud Detection Rate', target: '< 0.5%', current: '0.3%', status: 'green' },
  ]

  const issues = [
    { type: 'Warning', msg: 'Response time SLA at 94.8% - 1 violation detected', time: '2h ago' },
    { type: 'Alert', msg: 'Fake booking attempt detected and blocked', time: '15m ago' },
    { type: 'Notice', msg: 'Ambulance stock low in zone 3 - restock recommended', time: '1h ago' },
  ]

  return (
    <Card className="p-6 border-2 border-border">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-foreground">Compliance & Security</h3>
      </div>

      <div className="space-y-6">
        {/* KPI Metrics */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Service Level Metrics</p>
          <div className="space-y-3">
            {metrics.map((item) => (
              <div key={item.metric} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.metric}</p>
                  <p className="text-xs text-muted-foreground">Target: {item.target}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{item.current}</p>
                  <div className={`w-3 h-3 rounded-full mt-1 ${
                    item.status === 'green' ? 'bg-green-500' :
                    item.status === 'yellow' ? 'bg-yellow-500' :
                    'bg-destructive'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Alerts */}
        <div className="border-t border-border pt-6">
          <p className="text-sm font-semibold text-foreground mb-3">Recent Issues & Alerts</p>
          <div className="space-y-3">
            {issues.map((issue, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border-l-4 ${
                  issue.type === 'Warning' ? 'border-l-yellow-500 bg-yellow-50/50' :
                  issue.type === 'Alert' ? 'border-l-destructive bg-destructive/10' :
                  'border-l-blue-500 bg-blue-50/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium text-foreground">{issue.msg}</p>
                  <p className="text-xs text-muted-foreground">{issue.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
