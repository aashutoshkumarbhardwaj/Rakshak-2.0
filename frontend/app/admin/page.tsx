'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RealTimeCounter } from '@/components/real-time-counter'
import { Users, Ambulance, Building2, TrendingUp, AlertCircle, BarChart3, Zap, Shield } from 'lucide-react'
import { EmergencyMapAnalytics } from '@/components/emergency-map-analytics'
import { AiDemandPrediction } from '@/components/ai-demand-prediction'
import { SystemCompliance } from '@/components/system-compliance'
import { CityEmergencyMap } from '@/components/city-emergency-map'
import { MilitarySecurityPanel } from '@/components/military-security-panel'
import { Admin3DCityMap } from '@/components/admin-3d-city-map'
import { BlockchainEmergencyLedger } from '@/components/blockchain-emergency-ledger'
import { AIDemandForecast } from '@/components/ai-demand-forecast'

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Bookings', value: 1234, icon: AlertCircle, color: 'primary' },
    { label: 'Active Ambulances', value: 156, icon: Ambulance, color: 'secondary' },
    { label: 'Registered Hospitals', value: 42, icon: Building2, color: 'accent' },
    { label: 'Active Users', value: 5678, icon: Users, color: 'destructive' },
  ]

  const revenueData = [
    { day: 'Mon', amount: '₹18,400', percent: 63 },
    { day: 'Tue', amount: '₹21,200', percent: 73 },
    { day: 'Wed', amount: '₹19,800', percent: 68 },
    { day: 'Thu', amount: '₹24,100', percent: 83 },
    { day: 'Fri', amount: '₹26,500', percent: 91 },
    { day: 'Sat', amount: '₹28,900', percent: 100 },
    { day: 'Sun', amount: '₹22,300', percent: 77 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header title="Admin Dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* CHANGE: Futuristic header with military briefing aesthetic */}
          <div className="glass-effect p-6 rounded-2xl border border-neon-red/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-red/5 via-transparent to-neon-blue/5 pointer-events-none" />
            <div className="relative z-10">
              <h1 className="text-4xl font-bold text-foreground">City Emergency Command Center</h1>
              <p className="text-muted-foreground mt-2">Military-grade control system for unified ambulance operations</p>
            </div>
          </div>

          {/* CHANGE: Enhanced Stats Grid with neon styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const IconComponent = stat.icon
              const colorClass = stat.color === 'primary' ? 'neon-blue' :
                                stat.color === 'secondary' ? 'neon-cyan' :
                                stat.color === 'accent' ? 'neon-red' : 'yellow-400'
              return (
                <Card key={stat.label} className={`p-6 border-2 border-${colorClass}/30 glass-effect hover:border-${colorClass}/50 transition-all neon-glow`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className={`text-3xl font-bold text-${colorClass} mt-2`}>
                        <RealTimeCounter startValue={0} endValue={stat.value} duration={1500} />
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${colorClass}/20`}>
                      <IconComponent className={`w-6 h-6 text-${colorClass}`} />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* City-wide Emergency Map */}
            <CityEmergencyMap />

            {/* AI Demand Prediction */}
            <AiDemandPrediction />
          </div>

          {/* CHANGE: Added 3D City Emergency Map with satellite data */}
          <Admin3DCityMap />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CHANGE: Added AI Demand Forecast for 24-hour prediction */}
            <AIDemandForecast />

            {/* CHANGE: Added Blockchain Emergency Ledger for immutable records */}
            <BlockchainEmergencyLedger />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Emergency Map Analytics */}
            <EmergencyMapAnalytics />

            {/* Military Security Panel */}
            <MilitarySecurityPanel />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Revenue Chart */}
            <Card className="lg:col-span-2 p-6 border-2 border-neon-cyan/30 glass-effect">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-neon-cyan" />
                Weekly Revenue & Operations
              </h2>
              <div className="space-y-4">
                {revenueData.map((data) => (
                  <div key={data.day} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-semibold text-foreground">{data.day}</div>
                    <div className="flex-1 bg-muted rounded-full h-8 flex items-center overflow-hidden border border-neon-cyan/30">
                      <div
                        className="bg-gradient-to-r from-neon-cyan to-neon-blue h-full flex items-center justify-end pr-3 transition-all duration-700"
                        style={{ width: `${data.percent}%` }}
                      >
                        <span className="text-xs font-semibold text-foreground">{data.amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* System Health */}
            <Card className="p-6 border-2 border-neon-blue/30 glass-effect">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-neon-blue" />
                System Status
              </h2>
              <div className="space-y-4">
                {[
                  { name: 'Server Load', value: 68, color: 'neon-blue' },
                  { name: 'API Uptime', value: 99.9, color: 'neon-cyan' },
                  { name: 'Database', value: 45, color: 'neon-green' },
                ].map((metric) => (
                  <div key={metric.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{metric.name}</span>
                      <span className={`font-semibold text-${metric.color}`}>{metric.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 border border-border/50">
                      <div 
                        className={`bg-gradient-to-r from-${metric.color} to-${metric.color === 'neon-blue' ? 'primary' : metric.color === 'neon-cyan' ? 'neon-blue' : 'neon-cyan'} h-2 rounded-full`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <SystemCompliance />

          {/* User Management & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Management */}
            <Card className="p-6 border-2 border-neon-cyan/30 glass-effect">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-neon-cyan" />
                User Management
              </h2>
              <div className="space-y-3">
                {[
                  { name: 'Rahul Kumar', role: 'Driver', status: 'Active', rating: 4.9 },
                  { name: 'Amit Sharma', role: 'Patient', status: 'Active', rating: 0 },
                  { name: 'City Medical', role: 'Hospital', status: 'Active', rating: 4.8 },
                  { name: 'Dr. Patel', role: 'Doctor', status: 'Active', rating: 4.95 },
                ].map((user) => (
                  <div key={user.name} className="flex items-center justify-between p-3 bg-muted/20 border border-border/50 rounded-lg hover:border-neon-cyan/50 transition-colors">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full font-semibold bg-neon-cyan/20 text-neon-cyan">
                        {user.status}
                      </span>
                      {user.rating > 0 && <span className="text-xs font-bold text-neon-cyan">{user.rating}★</span>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 border-2 border-neon-blue/30 glass-effect">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-neon-blue" />
                System Activity
              </h2>
              <div className="space-y-3">
                {[
                  { action: 'Emergency dispatch - Downtown', time: '1 min ago', type: 'Critical' },
                  { action: 'New ambulance registered', time: '5 min ago', type: 'Normal' },
                  { action: 'Hospital bed capacity alert', time: '12 min ago', type: 'Warning' },
                  { action: 'Driver shift change detected', time: '28 min ago', type: 'Normal' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/20 border border-border/50 rounded-lg hover:border-neon-blue/50 transition-colors">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      activity.type === 'Critical' ? 'bg-neon-red animate-pulse' :
                      activity.type === 'Warning' ? 'bg-yellow-400' : 'bg-neon-cyan'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* CHANGE: Enhanced grid layout with vision-glass styling and proper VisionOS spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Demand Forecast */}
            <div className="vision-transition">
              <AIDemandForecast />
            </div>

            {/* Blockchain Emergency Ledger */}
            <div className="vision-transition">
              <BlockchainEmergencyLedger />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
