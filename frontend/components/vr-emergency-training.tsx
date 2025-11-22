'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Headphones, Zap, Users, Award } from 'lucide-react'

interface TrainingScenario {
  id: string
  name: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  participants: number
  description: string
}

export function VREmergencyTraining() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [trainingActive, setTrainingActive] = useState(false)

  const scenarios: TrainingScenario[] = [
    {
      id: 'cardiac',
      name: 'Cardiac Arrest Response',
      difficulty: 'advanced',
      duration: '25 min',
      participants: 4,
      description: 'Real-time cardiac emergency with multiple patient complications'
    },
    {
      id: 'trauma',
      name: 'Multi-Casualty Trauma',
      difficulty: 'advanced',
      duration: '40 min',
      participants: 8,
      description: 'High-impact accident scenario with triage and resource management'
    },
    {
      id: 'stroke',
      name: 'Acute Stroke Protocol',
      difficulty: 'intermediate',
      duration: '20 min',
      participants: 3,
      description: 'Time-sensitive stroke patient management and thrombolytic therapy'
    },
    {
      id: 'mass-casualty',
      name: 'Mass Casualty Event',
      difficulty: 'advanced',
      duration: '60 min',
      participants: 12,
      description: 'Disaster management with coordination across multiple teams'
    },
    {
      id: 'pediatric',
      name: 'Pediatric Emergency',
      difficulty: 'intermediate',
      duration: '20 min',
      participants: 3,
      description: 'Child-specific emergency response and medication dosing'
    }
  ]

  return (
    <Card className="p-6 border-cyan-500/30 bg-gradient-to-br from-cyan-900/10 to-blue-900/10 glass-effect">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Headphones className="w-5 h-5 text-cyan-400" />
          VR Emergency Training Platform
        </h3>

        {trainingActive ? (
          <div className="space-y-4">
            <div className="bg-slate-800/40 border border-cyan-500/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white">{scenarios.find(s => s.id === selectedScenario)?.name}</h4>
                <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  LIVE
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-slate-700/50 rounded p-2 text-center">
                  <p className="text-xs text-gray-400">Duration</p>
                  <p className="font-semibold text-cyan-300">14:32 / 25:00</p>
                </div>
                <div className="bg-slate-700/50 rounded p-2 text-center">
                  <p className="text-xs text-gray-400">Participants</p>
                  <p className="font-semibold text-cyan-300">4 / 4</p>
                </div>
                <div className="bg-slate-700/50 rounded p-2 text-center">
                  <p className="text-xs text-gray-400">Performance</p>
                  <p className="font-semibold text-cyan-300">92%</p>
                </div>
              </div>

              <div className="bg-cyan-900/30 border border-cyan-500/30 rounded p-3">
                <p className="text-sm text-cyan-200">Scenario Events: Patient vitals critical (BP 80/50) → Decision required</p>
              </div>

              <Button
                onClick={() => setTrainingActive(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                End Training Session
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-400">Select a scenario to launch VR training simulation</p>
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => {
                  setSelectedScenario(scenario.id)
                  setTrainingActive(true)
                }}
                className="w-full text-left p-3 bg-slate-800/40 hover:bg-slate-800/60 border border-cyan-500/20 rounded-lg transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-white">{scenario.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{scenario.description}</p>
                  </div>
                  <div className="text-right text-xs text-cyan-300">
                    <div className="font-semibold">{scenario.difficulty}</div>
                    <div className="text-gray-400">{scenario.duration}</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded">{scenario.participants} players</span>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="text-xs text-gray-400 bg-slate-800/30 px-3 py-2 rounded">
          Training logged • Staff certificates issued • Performance analytics tracked
        </div>
      </div>
    </Card>
  )
}
