'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, AlertTriangle, CheckCircle, Zap } from 'lucide-react'

export function AiSymptomChecker() {
  const [step, setStep] = useState('symptoms')
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [triageLevel, setTriageLevel] = useState<'mild' | 'moderate' | 'critical' | null>(null)

  const symptoms = [
    'Chest Pain', 'Difficulty Breathing', 'Severe Headache', 'Dizziness',
    'Unconsciousness', 'Severe Bleeding', 'Allergic Reaction', 'Fever',
    'Broken Bone', 'Burns', 'Stroke Symptoms', 'Seizure'
  ]

  const criticalConditions = ['Chest Pain', 'Difficulty Breathing', 'Unconsciousness', 'Severe Bleeding', 'Stroke Symptoms', 'Seizure']
  const moderateConditions = ['Severe Headache', 'Dizziness', 'Allergic Reaction', 'Broken Bone', 'Burns']

  const handleAnalyze = () => {
    if (selectedSymptoms.length === 0) return

    const hasCritical = selectedSymptoms.some(s => criticalConditions.includes(s))
    const hasModerate = selectedSymptoms.some(s => moderateConditions.includes(s))

    if (hasCritical) {
      setTriageLevel('critical')
    } else if (hasModerate) {
      setTriageLevel('moderate')
    } else {
      setTriageLevel('mild')
    }
    setStep('result')
  }

  return (
    <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-foreground">AI Symptom Checker</h3>
      </div>

      {step === 'symptoms' ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Select all symptoms you're experiencing:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {symptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => setSelectedSymptoms(prev =>
                  prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
                )}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                  selectedSymptoms.includes(symptom)
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                }`}
              >
                {symptom}
              </button>
            ))}
          </div>
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleAnalyze}
            disabled={selectedSymptoms.length === 0}
          >
            <Zap className="w-4 h-4 mr-2" />
            AI Analysis
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg border-2 ${
            triageLevel === 'critical' ? 'border-destructive/30 bg-destructive/10' :
            triageLevel === 'moderate' ? 'border-yellow-300/30 bg-yellow-100/10' :
            'border-green-300/30 bg-green-100/10'
          }`}>
            <div className="flex items-center gap-3">
              {triageLevel === 'critical' && <AlertTriangle className="w-6 h-6 text-destructive" />}
              {triageLevel === 'moderate' && <AlertTriangle className="w-6 h-6 text-yellow-600" />}
              {triageLevel === 'mild' && <CheckCircle className="w-6 h-6 text-green-600" />}
              <div>
                <p className="font-bold text-foreground capitalize">{triageLevel} Priority</p>
                <p className="text-sm text-muted-foreground">
                  {triageLevel === 'critical' ? 'Call emergency immediately' :
                   triageLevel === 'moderate' ? 'Requires urgent medical attention' :
                   'Can wait for scheduled appointment'}
                </p>
              </div>
            </div>
          </div>
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={() => {
              setStep('symptoms')
              setSelectedSymptoms([])
              setTriageLevel(null)
            }}
          >
            Start Over
          </Button>
        </div>
      )}
    </Card>
  )
}
