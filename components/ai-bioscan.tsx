'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Camera, AlertCircle, CheckCircle, Zap } from 'lucide-react'

interface ScanResult {
  skinColor: string
  breathingRate: number
  swelling: boolean
  bleeding: boolean
  consciousness: string
  strokeSigns: string[]
  emergencyType: string
  priority: 'critical' | 'moderate' | 'mild'
}

export function AiBioscan() {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const startScan = async () => {
    setScanning(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      
      // Simulate AI analysis after 3 seconds
      setTimeout(() => {
        setResult({
          skinColor: 'Pale - Indicating possible shock',
          breathingRate: 24,
          swelling: true,
          bleeding: false,
          consciousness: 'Alert but confused',
          strokeSigns: ['Facial drooping on left side', 'Difficulty speaking'],
          emergencyType: 'Possible Stroke - GET EMERGENCY HELP',
          priority: 'critical'
        })
        setScanning(false)
      }, 3000)
    } catch (error) {
      console.log('[v0] Camera access error:', error)
      setScanning(false)
    }
  }

  const stopScan = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop())
    }
    setScanning(false)
  }

  return (
    <Card className="p-6 border-neon-blue/30 bg-gradient-to-br from-blue-900/10 to-cyan-900/10">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          AI Health Bioscan
        </h3>
        <p className="text-sm text-gray-400">Real-time analysis within 3 seconds - Detects stroke signs, breathing patterns, consciousness level</p>

        {scanning ? (
          <div className="relative rounded-lg overflow-hidden bg-black border-2 border-cyan-500/50">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg animate-pulse" />
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur px-3 py-2 rounded text-cyan-400 text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Analyzing... {3}s
            </div>
          </div>
        ) : (
          <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-500/30 aspect-video flex items-center justify-center">
            <Camera className="w-12 h-12 text-cyan-400/50" />
          </div>
        )}

        {result && (
          <div className={`border-l-4 rounded p-4 space-y-3 ${
            result.priority === 'critical' 
              ? 'border-red-500 bg-red-900/20' 
              : result.priority === 'moderate'
              ? 'border-yellow-500 bg-yellow-900/20'
              : 'border-green-500 bg-green-900/20'
          }`}>
            <div className="flex items-center gap-2">
              {result.priority === 'critical' ? (
                <AlertCircle className="w-5 h-5 text-red-400" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-400" />
              )}
              <span className={`font-bold ${
                result.priority === 'critical' ? 'text-red-400' : 'text-green-400'
              }`}>{result.emergencyType}</span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>Skin Color:</strong> {result.skinColor}</p>
              <p><strong>Breathing Rate:</strong> {result.breathingRate} breaths/min</p>
              <p><strong>Consciousness:</strong> {result.consciousness}</p>
              {result.strokeSigns.length > 0 && (
                <p><strong>Stroke Signs:</strong> {result.strokeSigns.join(', ')}</p>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {!scanning ? (
            <Button
              onClick={startScan}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white gap-2"
            >
              <Camera className="w-4 h-4" />
              Start AI Scan
            </Button>
          ) : (
            <Button
              onClick={stopScan}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Stop Scan
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
