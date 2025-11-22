'use client'

import { Card } from '@/components/ui/card'
import { Brain, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

export function AiClinicalAssistant() {
  const case_ = {
    patient: 'Amit Sharma',
    age: 45,
    vitals: { bp: '160/100', hr: '98', spo2: '94%', temp: '98.6' },
    symptoms: 'Severe chest pain, difficulty breathing, nausea',
    aiAnalysis: {
      likelyCondition: 'Acute Coronary Syndrome (ACS)',
      confidence: 94,
      suggestedActions: [
        { action: 'Administer aspirin 325mg', priority: 'Critical' },
        { action: 'Connect to cardiac monitoring', priority: 'Critical' },
        { action: 'Call cardiologist', priority: 'High' },
        { action: 'Prepare for angiography', priority: 'High' },
        { action: 'Insert IV cannula', priority: 'High' },
      ]
    }
  }

  return (
    <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-foreground">AI Clinical Decision Assistant</h3>
      </div>

      <div className="space-y-6">
        {/* Patient Summary */}
        <div className="p-4 bg-background rounded-lg">
          <p className="text-sm text-muted-foreground mb-3">Current Case</p>
          <div className="space-y-2">
            <p className="font-semibold text-foreground">{case_.patient}, {case_.age} years old</p>
            <p className="text-sm text-muted-foreground italic">{case_.symptoms}</p>
          </div>
        </div>

        {/* Vitals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(case_.vitals).map(([key, value]) => (
            <div key={key} className="p-3 bg-muted/30 rounded-lg text-center">
              <p className="text-xs text-muted-foreground capitalize">{key}</p>
              <p className="font-semibold text-foreground text-sm">{value}</p>
            </div>
          ))}
        </div>

        {/* AI Diagnosis */}
        <div className="p-4 bg-accent/10 border-2 border-accent/20 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-foreground">AI Prediction</p>
            <p className="text-sm font-bold text-accent">{case_.aiAnalysis.confidence}% confidence</p>
          </div>
          <p className="text-foreground font-semibold">{case_.aiAnalysis.likelyCondition}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Based on vitals, symptoms, and medical history analysis
          </p>
        </div>

        {/* Recommended Actions */}
        <div>
          <p className="font-semibold text-foreground mb-3">Recommended Immediate Actions</p>
          <div className="space-y-2">
            {case_.aiAnalysis.suggestedActions.map((action, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border-l-4 flex items-start gap-3 ${
                  action.priority === 'Critical'
                    ? 'bg-destructive/10 border-l-destructive'
                    : 'bg-yellow-100/20 border-l-yellow-600'
                }`}
              >
                {action.priority === 'Critical' ? (
                  <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                ) : (
                  <Clock className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">{action.action}</p>
                  <p className={`text-xs font-semibold ${
                    action.priority === 'Critical' ? 'text-destructive' : 'text-yellow-600'
                  }`}>
                    {action.priority} Priority
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
