'use client'

import { Card } from '@/components/ui/card'
import { Ambulance, MapPin, Clock, Users, AlertCircle } from 'lucide-react'

export function AmbulancePreparation() {
  const ambulance = {
    id: 'MH-02-AB-9876',
    driver: 'Rahul Kumar',
    eta: 4,
    severity: 'Critical',
    estimatedArrival: '14:32',
    requiredTeam: [
      { role: 'Cardiologist', status: 'Standby' },
      { role: 'Anesthesiologist', status: 'In-room' },
      { role: 'Nursing Staff (2)', status: 'Ready' },
    ]
  }

  return (
    <Card className="p-6 border-2 border-destructive/20 bg-gradient-to-br from-destructive/10 to-destructive/5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Ambulance className="w-5 h-5 text-destructive" />
          <h3 className="text-xl font-bold text-foreground">Incoming Ambulance Gate</h3>
        </div>
        <span className="px-3 py-1 bg-destructive text-destructive-foreground rounded-full text-sm font-bold">
          {ambulance.severity}
        </span>
      </div>

      <div className="space-y-4">
        {/* Ambulance Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Ambulance ID</p>
            <p className="font-bold text-foreground">{ambulance.id}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> ETA
            </p>
            <p className="font-bold text-foreground">{ambulance.eta} minutes ({ambulance.estimatedArrival})</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Users className="w-3 h-3" /> Driver
            </p>
            <p className="font-bold text-foreground">{ambulance.driver}</p>
          </div>
        </div>

        {/* Required Team */}
        <div>
          <p className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Required Medical Team
          </p>
          <div className="space-y-2">
            {ambulance.requiredTeam.map((member, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <span className="text-sm font-medium text-foreground">{member.role}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  member.status === 'In-room'
                    ? 'bg-green-100 text-green-800'
                    : member.status === 'Standby'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Checklist */}
        <div className="p-4 bg-primary/10 rounded-lg">
          <p className="font-semibold text-foreground mb-3">Pre-Arrival Checklist</p>
          <div className="space-y-2">
            {[
              { item: 'ER-01 bed prepared', done: true },
              { item: 'Cardiac monitor ready', done: true },
              { item: 'Oxygen supply verified', done: false },
              { item: 'Emergency cart positioned', done: true },
            ].map((check, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={check.done} readOnly className="w-4 h-4" />
                <span className={`text-sm ${check.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                  {check.item}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
