'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle, MapPin, Clock, Phone, User, Activity, AlertTriangle, Brain, Users } from 'lucide-react'
import { HospitalCapacityManagement } from '@/components/hospital-capacity-management'
import { AiClinicalAssistant } from '@/components/ai-clinical-assistant'
import { AmbulancePreparation } from '@/components/ambulance-preparation'
import { HospitalBedRealtime } from '@/components/hospital-bed-realtime'
import { IncomingAmbulanceAlert } from '@/components/incoming-ambulance-alert'
import { VREmergencyTraining } from '@/components/vr-emergency-training'
import { DroneDispatchSystem } from '@/components/drone-dispatch-system'
import { AIRadiologyPrescan } from '@/components/ai-radiology-prescan'

export default function HospitalDashboard() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      patient: 'Amit Sharma',
      age: 45,
      condition: 'Chest Pain',
      ambulance: 'MH-02-AB-9876',
      driver: 'Rahul Kumar',
      eta: '4 min',
      vitals: { bp: '160/100', hr: '98', temp: '98.6' },
      status: 'incoming',
    },
  ])

  return (
    <div className="min-h-screen bg-background">
      <Header title="Hospital Dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* CHANGE: Futuristic header with glassmorphism */}
          <div className="glass-effect p-6 rounded-2xl border border-neon-cyan/30">
            <h1 className="text-4xl font-bold text-foreground">AI Emergency Command Center</h1>
            <p className="text-muted-foreground mt-2">Real-time ambulance alerts, bed management & clinical intelligence</p>
          </div>

          {/* CHANGE: Live Status Cards with futuristic styling */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 border-2 border-neon-red/30 glass-effect text-center">
              <div className="text-xs text-muted-foreground mb-2">Incoming Critical</div>
              <p className="text-3xl font-bold text-neon-red">{alerts.length}</p>
              <div className="w-2 h-2 bg-neon-red rounded-full mx-auto mt-2 animate-pulse" />
            </Card>
            <Card className="p-4 border-2 border-neon-cyan/30 glass-effect text-center">
              <div className="text-xs text-muted-foreground mb-2">Average ETA</div>
              <p className="text-3xl font-bold text-neon-cyan">4 min</p>
              <div className="text-xs text-muted-foreground mt-2">All units</div>
            </Card>
            <Card className="p-4 border-2 border-neon-blue/30 glass-effect text-center">
              <div className="text-xs text-muted-foreground mb-2">ER Availability</div>
              <p className="text-3xl font-bold text-neon-blue">3/8 Beds</p>
              <div className="text-xs text-muted-foreground mt-2">64% Occupied</div>
            </Card>
            <Card className="p-4 border-2 border-yellow-400/30 glass-effect text-center">
              <div className="text-xs text-muted-foreground mb-2">Staff Alert</div>
              <p className="text-3xl font-bold text-yellow-400">12</p>
              <div className="text-xs text-muted-foreground mt-2">On duty</div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* CHANGE: Incoming Ambulance Alerts with live vitals */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-neon-red" />
                  Incoming Ambulances
                </h2>
                <IncomingAmbulanceAlert />
              </div>

              {/* CHANGE: Added AI Radiology Pre-scan Analysis */}
              <AIRadiologyPrescan />

              {/* Hospital Capacity Management */}
              <HospitalCapacityManagement />

              {/* CHANGE: Added VR Emergency Training Platform */}
              <VREmergencyTraining />

              {/* AI Clinical Assistant */}
              <div className="p-6 bg-card border-2 border-neon-blue/30 glass-effect rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-neon-blue" />
                  <h3 className="text-lg font-semibold">AI Clinical Decision Support</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-neon-red/10 border border-neon-red/30 rounded-lg">
                    <p className="text-sm font-semibold text-neon-red mb-1">Incoming Patient Alert</p>
                    <p className="text-sm text-foreground">Amit Sharma - Probable Acute Coronary Syndrome based on chest pain + elevated HR + low BP</p>
                  </div>
                  <div className="p-3 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg">
                    <p className="text-sm font-semibold text-neon-cyan mb-1">Recommended Action</p>
                    <p className="text-sm text-foreground">Reserve Cardiology ER with ECG + Troponin test setup. Notify Cardiologist on standby.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Real-time Bed Status */}
              <HospitalBedRealtime />

              {/* CHANGE: Added Drone Dispatch System */}
              <DroneDispatchSystem />

              {/* Staff Management */}
              <Card className="p-6 bg-card border-2 border-neon-cyan/30 glass-effect">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-neon-cyan" />
                  <h3 className="text-lg font-semibold">Staff On Duty</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { role: 'Cardiologist', name: 'Dr. Mehta', status: 'Available', color: 'neon-cyan' },
                    { role: 'Trauma Surgeon', name: 'Dr. Patel', status: 'In Surgery', color: 'yellow-400' },
                    { role: 'Emergency MD', name: 'Dr. Singh', status: 'Available', color: 'neon-cyan' },
                  ].map((staff) => (
                    <div key={staff.name} className="p-3 bg-muted/20 border border-border/50 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{staff.role}</p>
                        <p className="text-xs text-muted-foreground">{staff.name}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-bold rounded-full bg-${staff.color}/20 text-${staff.color}`}>
                        {staff.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Emergency Protocols */}
              <Card className="p-6 bg-card border-2 border-neon-red/30 glass-effect">
                <h3 className="text-lg font-semibold mb-4">Active Protocols</h3>
                <div className="space-y-2">
                  {[
                    { protocol: 'STEMI Protocol', active: true },
                    { protocol: 'Sepsis Bundle', active: true },
                    { protocol: 'Trauma Activation', active: false },
                  ].map((proto) => (
                    <div key={proto.protocol} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${proto.active ? 'bg-neon-cyan animate-pulse' : 'bg-muted'}`} />
                      <span className="text-sm text-foreground">{proto.protocol}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Ambulance Preparation Details */}
          <AmbulancePreparation />

          {/* ER Status Grid */}
          <Card className="p-6 border-2 border-neon-blue/30 glass-effect">
            <h2 className="text-xl font-bold text-foreground mb-6">Emergency Room Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { bed: 'ER-01', status: 'Available', color: 'bg-neon-cyan/20', textColor: 'text-neon-cyan' },
                { bed: 'ER-02', status: 'Occupied', color: 'bg-neon-red/20', textColor: 'text-neon-red' },
                { bed: 'ER-03', status: 'Preparing', color: 'bg-yellow-400/20', textColor: 'text-yellow-400' },
                { bed: 'ER-04', status: 'Available', color: 'bg-neon-cyan/20', textColor: 'text-neon-cyan' },
              ].map((item) => (
                <div key={item.bed} className={`p-4 rounded-lg border-2 border-border/50 ${item.color}`}>
                  <p className="font-semibold text-foreground">{item.bed}</p>
                  <p className={`text-sm font-semibold mt-2 ${item.textColor}`}>{item.status}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
