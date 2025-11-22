'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, AlertTriangle, CheckCircle2 } from 'lucide-react'

export function AIHealthScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [results, setResults] = useState(null)

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setResults({
        severity: 'Critical',
        conditions: ['Possible Cardiac Event', 'Elevated Heart Rate'],
        recommendedEquipment: ['Oxygen Tank', 'ECG Monitor', 'Defibrillator'],
        ambulanceType: 'Advanced Life Support'
      })
      setIsScanning(false)
    }, 2000)
  }

  return (
    <Card className="p-6 bg-card border-neon-blue/30 glass-effect">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="w-5 h-5 text-neon-blue" />
        <h3 className="text-lg font-semibold">AI Health Analysis</h3>
      </div>

      {!results ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Our AI analyzes your voice, vitals, and symptoms to provide instant triage
          </p>
          <Button
            onClick={handleScan}
            disabled={isScanning}
            className="w-full bg-gradient-to-r from-neon-blue to-primary text-white"
          >
            {isScanning ? 'Analyzing...' : 'Start Analysis'}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-neon-red" />
            <span className="font-semibold text-neon-red">Severity: {results.severity}</span>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Detected Conditions:</h4>
            <ul className="space-y-1">
              {results.conditions.map((cond) => (
                <li key={cond} className="text-sm text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neon-cyan" />
                  {cond}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Required Equipment:</h4>
            <div className="flex flex-wrap gap-2">
              {results.recommendedEquipment.map((eq) => (
                <span
                  key={eq}
                  className="px-3 py-1 bg-neon-blue/20 text-neon-cyan text-xs rounded-full border border-neon-blue/50"
                >
                  {eq}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg">
            <p className="text-sm text-primary font-semibold">
              Recommended: {results.ambulanceType}
            </p>
          </div>
        </div>
      )}
    </Card>
  )
}
