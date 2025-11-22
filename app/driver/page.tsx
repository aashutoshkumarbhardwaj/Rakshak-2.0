'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MapPin, DollarSign, Clock, TrendingUp, AlertCircle, CheckCircle, XCircle, Zap } from 'lucide-react'
import { EmergencyHeatmap } from '@/components/emergency-heatmap'
import { DriverPerformanceScore } from '@/components/driver-performance-score'
import { VehicleStatus } from '@/components/vehicle-status'
import { SmartEarnings } from '@/components/smart-earnings'
import { AmbulanceIoTDashboard } from '@/components/ambulance-iot-dashboard'
import { IntelligentRouting } from '@/components/intelligent-routing'
import { DriverAIAssistant } from '@/components/driver-ai-assistant'
import { AmbulanceAutonomousMode } from '@/components/ambulance-autonomous-mode'
import { AmbulanceMaintenancePredictive } from '@/components/ambulance-maintenance-predictive'
import { MedicalInventoryAI } from '@/components/medical-inventory-ai'

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false)
  const [onRide, setOnRide] = useState(false)
  const [pendingRides, setPendingRides] = useState([
    {
      id: 1,
      patient: 'Amit Sharma',
      location: '123 Main Street, Zone A',
      distance: '2.3 km away',
      pickup: '4 min',
      hospital: 'City Medical Center',
      type: 'ICU Ambulance',
      earnings: '₹850',
      severity: 'High',
      rating: 4.8,
    },
    {
      id: 2,
      patient: 'Priya Desai',
      location: '456 Park Avenue, Zone B',
      distance: '3.1 km away',
      pickup: '6 min',
      hospital: 'Apollo Hospital',
      type: 'Basic Ambulance',
      earnings: '₹450',
      severity: 'Medium',
      rating: 4.9,
    },
  ])

  return (
    <div className="min-h-screen bg-background">
      <Header title="Driver Dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* CHANGE: Futuristic Status Card with glassmorphism */}
          <Card className={`p-6 border-2 glass-effect ${
            isOnline 
              ? 'border-neon-cyan/50 bg-gradient-to-r from-neon-cyan/10 via-neon-blue/10 to-transparent' 
              : 'border-muted/50 bg-muted/10'
          }`}>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Status: {onRide ? 'On Ride' : isOnline ? 'Online' : 'Offline'}
                </h2>
                <p className="text-muted-foreground">
                  {onRide 
                    ? 'Patient in transit - ETA 3 mins' 
                    : isOnline ? 'You are accepting rides' : 'You are not accepting rides'}
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => setIsOnline(!isOnline)}
                disabled={onRide}
                className={`rounded-full px-8 gap-2 ${
                  isOnline
                    ? 'bg-gradient-to-r from-neon-cyan to-neon-blue text-white neon-glow-cyan'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-white animate-pulse' : 'bg-muted-foreground'}`}></div>
                {isOnline ? 'Go Offline' : 'Go Online'}
              </Button>
            </div>
          </Card>

          {onRide ? (
            // CHANGE: Active Ride View with advanced features
            <ActiveRideView />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Heatmap showing demand zones */}
                <EmergencyHeatmap />

                {/* Smart Earnings Predictions */}
                <SmartEarnings />

                {/* Ride Requests Section */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-neon-cyan" />
                    Pending Ride Requests ({pendingRides.length})
                  </h2>

                  {pendingRides.length > 0 ? (
                    <div className="space-y-4">
                      {pendingRides.map((ride) => (
                        <Card
                          key={ride.id}
                          className="p-6 border-2 border-border hover:border-neon-cyan/50 transition-all glass-effect group cursor-pointer"
                        >
                          <div className="space-y-4">
                            {/* Header */}
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-foreground">{ride.patient}</h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                  <MapPin className="w-4 h-4 text-neon-cyan" /> {ride.location}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-3xl font-bold text-neon-cyan">{ride.earnings}</p>
                                <p className="text-sm text-muted-foreground">{ride.type}</p>
                              </div>
                            </div>

                            {/* Severity Badge */}
                            <div className="flex gap-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                ride.severity === 'High' 
                                  ? 'bg-neon-red/20 text-neon-red' 
                                  : 'bg-yellow-400/20 text-yellow-300'
                              }`}>
                                {ride.severity} Severity
                              </span>
                              <span className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan rounded-full text-xs font-semibold">
                                {ride.rating}★ Rating
                              </span>
                            </div>

                            {/* Ride Details Grid */}
                            <div className="grid grid-cols-3 gap-3 py-3 border-y border-border/50">
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Distance</p>
                                <p className="font-semibold text-foreground">{ride.distance}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Pickup in</p>
                                <p className="font-semibold text-foreground flex items-center justify-center gap-1">
                                  <Clock className="w-4 h-4 text-neon-blue" /> {ride.pickup}
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Hospital</p>
                                <p className="font-semibold text-foreground text-sm">{ride.hospital}</p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <Button
                                className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-blue text-white gap-2 neon-glow-cyan"
                                onClick={() => {
                                  setOnRide(true)
                                  setPendingRides(pendingRides.filter((r) => r.id !== ride.id))
                                }}
                              >
                                <CheckCircle className="w-4 h-4" />
                                Accept Ride
                              </Button>
                              <Button variant="outline" className="flex-1 gap-2 border-muted text-muted-foreground hover:bg-muted/20">
                                <XCircle className="w-4 h-4" />
                                Decline
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="p-8 text-center border-2 border-muted/50 glass-effect">
                      <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-muted-foreground">No pending ride requests</p>
                      <p className="text-sm text-muted-foreground mt-2">Stay online to receive ride requests from high-demand zones</p>
                    </Card>
                  )}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                <DriverPerformanceScore />
                <VehicleStatus />

                {/* Quick Stats */}
                <Card className="p-4 border-2 border-border/50 glass-effect">
                  <p className="text-sm text-muted-foreground mb-4 font-semibold">Today's Stats</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Rides Completed</span>
                      <span className="font-bold text-neon-cyan text-lg">5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Distance Covered</span>
                      <span className="font-bold text-neon-blue text-lg">28.5 km</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Earnings Today</span>
                      <span className="font-bold text-neon-cyan text-lg">₹3,850</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Cancellations</span>
                      <span className="font-bold text-foreground text-lg">1</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ActiveRideView() {
  return (
    <div className="space-y-6">
      {/* Active Ride Header */}
      <Card className="p-6 bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 border border-neon-cyan/50 glass-effect">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-neon-cyan mb-1">Amit Sharma</h3>
            <p className="text-foreground">To: City Medical Center • 4.2 km</p>
            <p className="text-sm text-muted-foreground mt-1">ETA: 3 min 45 sec</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-neon-cyan">₹850</div>
            <p className="text-sm text-muted-foreground">ICU Ambulance</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* CHANGE: Added autonomous mode system */}
          <AmbulanceAutonomousMode />
          <IntelligentRouting />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* CHANGE: Added predictive maintenance and inventory tracking */}
          <AmbulanceMaintenancePredictive />
          <MedicalInventoryAI />
          <DriverAIAssistant />
        </div>
      </div>
    </div>
  )
}
