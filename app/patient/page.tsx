'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LiveMap } from '@/components/live-map'
import { EmergencySosButton } from '@/components/emergency-sos-button'
import { VoiceAssistant } from '@/components/voice-assistant'
import { VitalSignsMonitor } from '@/components/vital-signs-monitor'
import { AIHealthScanner } from '@/components/ai-health-scanner'
import { AiBioscan } from '@/components/ai-bioscan'
import { ArEmergencyGuide } from '@/components/ar-emergency-guide'
import { WearableIntegration } from '@/components/wearable-integration'
import { MapPin, AlertCircle, Phone, Clock, AlertTriangle, Bluetooth, QrCode } from 'lucide-react'

export default function PatientDashboard() {
  const [hasBooked, setHasBooked] = useState(false)
  const [emergencyMode, setEmergencyMode] = useState(false)
  const [ambulanceType, setAmbulanceType] = useState('icu')

  const ambulanceTypes = [
    { id: 'basic', name: 'Basic Ambulance', desc: 'Standard transport', equipment: ['Stretcher', 'First Aid'] },
    { id: 'icu', name: 'ICU Ambulance', desc: 'Advanced life support', equipment: ['Ventilator', 'Monitors', 'Defibrillator'] },
    { id: 'cardiac', name: 'Cardiac Unit', desc: 'Cardiac monitoring', equipment: ['ECG', 'Cardiac Monitor', 'IV Lines'] },
    { id: 'oxygen', name: 'Oxygen Unit', desc: 'Oxygen support', equipment: ['Oxygen Tank', 'Ventilator', 'Masks'] },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header title="Patient Dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {emergencyMode ? (
          // CHANGE: Emergency mode - zero-tap emergency experience
          <EmergencyModeView setEmergencyMode={setEmergencyMode} setHasBooked={setHasBooked} />
        ) : !hasBooked ? (
          // CHANGE: Futuristic booking flow with AI and voice
          <BookingFlow 
            ambulanceType={ambulanceType}
            setAmbulanceType={setAmbulanceType}
            setEmergencyMode={setEmergencyMode}
            setHasBooked={setHasBooked}
            ambulanceTypes={ambulanceTypes}
          />
        ) : (
          // CHANGE: Real-time tracking with advanced features
          <PatientTracking />
        )}
      </div>
    </div>
  )
}

function EmergencyModeView({ setEmergencyMode, setHasBooked }: any) {
  return (
    <div className="space-y-8">
      {/* Emergency Header */}
      <div className="fixed inset-0 bg-gradient-to-b from-neon-red/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* SOS Status */}
        <Card className="p-8 bg-gradient-to-br from-neon-red/30 via-red-900/20 to-transparent border border-neon-red/50 glass-effect">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-neon-red animate-pulse">EMERGENCY ALERT</h1>
              <p className="text-lg text-red-300">Ambulance dispatched • Emergency services notified</p>
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-red to-red-900 animate-ping" />
          </div>
        </Card>

        {/* Voice Command - Always Active */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VoiceAssistant />
          
          {/* Vital Signs Emergency Display */}
          <Card className="p-6 bg-card border-neon-red/30 glass-effect">
            <h3 className="text-lg font-semibold mb-4 text-neon-red">Vital Signs</h3>
            <VitalSignsMonitor />
          </Card>
        </div>

        {/* Emergency QR Code - Share with First Responders */}
        <Card className="p-6 bg-card border-neon-cyan/30 glass-effect text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <QrCode className="w-5 h-5 text-neon-cyan" />
            <h3 className="font-semibold">Emergency ID Badge</h3>
          </div>
          <div className="w-32 h-32 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center border-2 border-neon-cyan/50">
            <QrCode className="w-16 h-16 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Scan to access medical history, allergies & emergency contacts
          </p>
          <Button variant="outline" size="sm" className="border-neon-cyan text-neon-cyan">
            Display on Watch
          </Button>
        </Card>

        {/* Cancel Emergency */}
        <Button
          onClick={() => setEmergencyMode(false)}
          variant="outline"
          className="w-full border-muted text-muted-foreground hover:bg-muted/20"
        >
          Cancel Emergency Mode
        </Button>
      </div>
    </div>
  )
}

function BookingFlow({ ambulanceType, setAmbulanceType, setEmergencyMode, setHasBooked, ambulanceTypes }: any) {
  const [showAI, setShowAI] = useState(false)

  return (
    <div className="space-y-8">
      {/* Zero-Tap SOS Emergency Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setEmergencyMode(true)}
          className="relative"
        >
          <EmergencySosButton />
        </button>
      </div>

      {/* AI vs Manual Booking Tabs */}
      <div className="flex gap-4 justify-center">
        <Button
          onClick={() => setShowAI(true)}
          className={`gap-2 ${
            showAI
              ? 'bg-neon-blue text-white'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          AI Smart Detection
        </Button>
        <Button
          onClick={() => setShowAI(false)}
          className={`gap-2 ${
            !showAI
              ? 'bg-neon-blue text-white'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Manual Booking
        </Button>
      </div>

      {showAI ? (
        // AI-Powered Booking Flow
        <div className="space-y-6">
          <Card className="p-6 bg-card border-neon-blue/30 glass-effect">
            <h2 className="text-2xl font-bold mb-6 text-foreground">AI Health Analysis</h2>
            <div className="space-y-6">
              <AiBioscan />
              
              <ArEmergencyGuide />
              
              <WearableIntegration />
              
              <VitalSignsMonitor />
              <VoiceAssistant />
              
              <Button
                onClick={() => setHasBooked(true)}
                className="w-full bg-gradient-to-r from-neon-blue to-primary text-white py-6"
              >
                Confirm & Book Ambulance
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        // Manual Booking Flow
        <Card className="p-8 border-2 border-neon-blue/30 glass-effect">
          <h2 className="text-2xl font-bold text-foreground mb-6">Book an Ambulance</h2>

          <div className="space-y-6">
            {/* Ambulance Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-4">
                Select Ambulance Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ambulanceTypes.map((type: any) => (
                  <button
                    key={type.id}
                    onClick={() => setAmbulanceType(type.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      ambulanceType === type.id
                        ? 'border-neon-blue bg-neon-blue/10'
                        : 'border-border bg-card hover:border-neon-blue/50'
                    }`}
                  >
                    <div className="font-semibold text-foreground">{type.name}</div>
                    <div className="text-sm text-muted-foreground mb-2">{type.desc}</div>
                    <div className="flex flex-wrap gap-1">
                      {type.equipment.map((eq: string) => (
                        <span key={eq} className="text-xs px-2 py-1 bg-neon-blue/20 text-neon-cyan rounded">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location Input */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Your Location
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter your address or use GPS"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-blue"
                />
                <Button variant="outline" className="gap-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10">
                  <MapPin className="w-4 h-4" />
                  GPS
                </Button>
              </div>
            </div>

            {/* Bluetooth Device Integration */}
            <div className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Bluetooth className="w-5 h-5 text-neon-cyan" />
                <h4 className="font-semibold">Connected Devices</h4>
              </div>
              <Button variant="outline" size="sm" className="text-neon-cyan border-neon-cyan/50">
                + Connect Apple Watch / Fitness Device
              </Button>
            </div>

            {/* Patient Vitals */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Patient Vitals (Optional)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="text" placeholder="Blood Pressure (120/80)" className="px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground" />
                <input type="number" placeholder="Heart Rate (bpm)" className="px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground" />
                <input type="number" placeholder="Temperature (°F)" className="px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground" />
              </div>
            </div>

            {/* Offline Emergency Mode */}
            <div className="p-4 bg-neon-red/10 border border-neon-red/30 rounded-lg">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded border-neon-red" />
                <span className="text-sm text-foreground">Enable Offline Mode (SMS-based booking)</span>
              </label>
            </div>

            {/* Book Button */}
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-neon-red to-red-700 text-white py-6"
              onClick={() => setHasBooked(true)}
            >
              <Phone className="w-5 h-5 mr-2" />
              Book Ambulance Now
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

function PatientTracking() {
  return (
    <div className="space-y-8">
      {/* Real-time Status */}
      <Card className="p-6 bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 border border-neon-cyan/50 glass-effect">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-neon-cyan mb-1">Ambulance En Route</h3>
            <p className="text-foreground">ETA: <span className="font-semibold text-neon-cyan">3 min 45 sec</span></p>
            <p className="text-sm text-muted-foreground mt-1">Driver: Rahul Kumar • Rating: 4.9★</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-neon-cyan">3.2 km</div>
            <p className="text-sm text-muted-foreground">Distance</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Map - 3D Ambulance Movement */}
        <Card className="lg:col-span-2 p-6 border border-neon-blue/30 glass-effect">
          <h2 className="text-xl font-bold text-foreground mb-4">Real-time Ambulance Tracking</h2>
          <div className="bg-gradient-to-br from-card to-muted rounded-lg p-6 h-96 flex items-center justify-center border border-neon-blue/20">
            <div className="text-center">
              <div className="w-12 h-12 bg-neon-red rounded-full mx-auto mb-3 animate-pulse" />
              <p className="text-neon-red font-semibold">Live GPS Tracking Active</p>
              <p className="text-xs text-muted-foreground mt-1">Updated every 2 seconds</p>
            </div>
          </div>
        </Card>

        {/* Right Sidebar - Information Cards */}
        <div className="space-y-4">
          {/* Ambulance Details */}
          <Card className="p-4 border border-neon-red/30 glass-effect">
            <h3 className="font-bold text-foreground mb-3">Ambulance Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">License Plate</span>
                <span className="font-semibold text-neon-red">MH-02-AB-9876</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-semibold">ICU Ambulance</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Equipment Status</span>
                <span className="font-semibold text-neon-cyan">Ready</span>
              </div>
              <Button size="sm" className="w-full gap-2 mt-2 bg-neon-red/20 text-neon-red hover:bg-neon-red/30">
                <Phone className="w-4 h-4" />
                Call Driver
              </Button>
            </div>
          </Card>

          {/* Hospital Destination */}
          <Card className="p-4 border border-neon-cyan/30 glass-effect">
            <h3 className="font-bold text-foreground mb-3">Destination Hospital</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Hospital</p>
                <p className="font-semibold">City Medical Center</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Distance</p>
                <p className="font-semibold">4.8 km</p>
              </div>
              <Button size="sm" className="w-full gap-2 mt-2 bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30">
                <Phone className="w-4 h-4" />
                Contact Hospital
              </Button>
            </div>
          </Card>

          {/* Emergency Timeline */}
          <Card className="p-4 border border-neon-blue/30 glass-effect">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-neon-blue" />
              Journey
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Pickup</p>
                  <p className="font-semibold text-neon-cyan">Your Location</p>
                </div>
              </div>
              <div className="flex gap-3 ml-1">
                <div className="w-0.5 h-6 bg-neon-blue/30" />
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-neon-red rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Dropoff</p>
                  <p className="font-semibold">City Medical Center</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Vital Signs Monitoring During Transport */}
      <Card className="p-6 border border-neon-cyan/30 glass-effect">
        <h2 className="text-xl font-bold text-foreground mb-4">Real-time Vitals</h2>
        <VitalSignsMonitor />
      </Card>

      {/* Live Doctor Communication */}
      <Card className="p-6 border border-neon-blue/30 glass-effect">
        <h3 className="text-lg font-bold text-foreground mb-4">Telemedicine - Talk to Doctor</h3>
        <div className="flex gap-4">
          <Button className="flex-1 gap-2 bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30">
            <Phone className="w-4 h-4" />
            Voice Call
          </Button>
          <Button className="flex-1 gap-2 bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30">
            <AlertCircle className="w-4 h-4" />
            Video Call
          </Button>
        </div>
      </Card>
    </div>
  )
}
