'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, ChevronRight } from 'lucide-react'

interface GuideStep {
  title: string
  description: string
  action: string
  icon: string
}

const emergencyGuides: Record<string, GuideStep[]> = {
  bleeding: [
    {
      title: 'Apply Direct Pressure',
      description: 'Use clean cloth or gauze to apply firm, direct pressure on the wound',
      action: 'Press and hold for 5-15 minutes',
      icon: '🩹'
    },
    {
      title: 'Elevate the Wound',
      description: 'Raise the injured area above heart level if possible',
      action: 'Hold elevated position',
      icon: '📈'
    },
    {
      title: 'Apply Tourniquet (if severe)',
      description: 'For life-threatening limb bleeding, apply tourniquet 2-3 inches above wound',
      action: 'Tighten until bleeding stops',
      icon: '🔗'
    }
  ],
  cpr: [
    {
      title: 'Check Responsiveness',
      description: 'Tap shoulders and shout "Are you okay?"',
      action: 'If no response, proceed to CPR',
      icon: '✋'
    },
    {
      title: 'Hand Position',
      description: 'Place heel of one hand on center of chest, other hand on top',
      action: 'Interlock fingers above chest',
      icon: '🤚'
    },
    {
      title: 'Chest Compressions',
      description: 'Push hard and fast at least 2 inches deep at 100-120 compressions per minute',
      action: 'Continue until help arrives',
      icon: '💪'
    }
  ],
  stroke: [
    {
      title: 'Remember F.A.S.T.',
      description: 'Face drooping, Arm weakness, Speech difficulty, Time to call',
      action: 'Identify stroke symptoms immediately',
      icon: '⏱️'
    },
    {
      title: 'Call Emergency Now',
      description: 'Every minute counts in stroke treatment',
      action: 'Don\'t delay - call ambulance immediately',
      icon: '📞'
    }
  ]
}

export function ArEmergencyGuide() {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const guide = selectedGuide ? emergencyGuides[selectedGuide] : null
  const step = guide?.[currentStep]

  return (
    <Card className="p-6 border-yellow-500/30 bg-gradient-to-br from-yellow-900/10 to-orange-900/10">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          AR Emergency Guide
        </h3>
        <p className="text-sm text-gray-400">Visual step-by-step instructions using camera overlay</p>

        {!selectedGuide ? (
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(emergencyGuides).map((key) => (
              <Button
                key={key}
                onClick={() => {
                  setSelectedGuide(key)
                  setCurrentStep(0)
                }}
                className="bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-300 border border-yellow-500/30 justify-between"
              >
                <span className="capitalize">{key} Guide</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-yellow-500/30 aspect-video flex items-center justify-center">
              <div className="text-6xl">{step?.icon}</div>
              <div className="absolute inset-0 border-4 border-yellow-400/30 rounded-lg pointer-events-none" />
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-yellow-300">
                Step {currentStep + 1} of {guide?.length}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg border border-yellow-500/20 p-4 space-y-3">
              <h4 className="font-bold text-yellow-300">{step?.title}</h4>
              <p className="text-sm text-gray-300">{step?.description}</p>
              <div className="bg-yellow-900/30 border-l-2 border-yellow-500 px-3 py-2 rounded text-sm text-yellow-200">
                <strong>Action:</strong> {step?.action}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
              >
                Previous
              </Button>
              {currentStep < guide!.length - 1 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={() => setSelectedGuide(null)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Done
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
