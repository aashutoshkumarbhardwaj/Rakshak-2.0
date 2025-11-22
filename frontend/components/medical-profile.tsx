'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, AlertCircle, Pill, Heart } from 'lucide-react'

export function MedicalProfile() {
  const [isEditing, setIsEditing] = useState(false)

  const medicalData = {
    bloodType: 'O+',
    allergies: ['Penicillin', 'Sulfa drugs', 'Latex'],
    medications: [
      { name: 'Aspirin', dosage: '100mg', frequency: 'Daily' },
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' }
    ],
    surgeries: [
      { name: 'Appendectomy', date: '2018', hospital: 'City Medical Center' },
      { name: 'Knee Surgery', date: '2021', hospital: 'St. Johns Hospital' }
    ],
    conditions: ['Hypertension', 'Type 2 Diabetes']
  }

  return (
    <Card className="p-6 border-2 border-border">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-secondary" />
          <h3 className="text-xl font-bold text-foreground">Medical Profile</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>

      <div className="space-y-4">
        {/* Blood Type */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Blood Type</p>
          <p className="text-2xl font-bold text-secondary">{medicalData.bloodType}</p>
        </div>

        {/* Allergies */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-destructive" />
            <p className="font-semibold text-foreground">Allergies</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {medicalData.allergies.map((allergy) => (
              <span key={allergy} className="px-3 py-1 bg-destructive/20 text-destructive rounded-full text-sm">
                {allergy}
              </span>
            ))}
          </div>
        </div>

        {/* Current Medications */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Pill className="w-4 h-4 text-primary" />
            <p className="font-semibold text-foreground">Current Medications</p>
          </div>
          <div className="space-y-2">
            {medicalData.medications.map((med) => (
              <div key={med.name} className="p-3 bg-primary/10 rounded-lg">
                <p className="font-semibold text-foreground text-sm">{med.name}</p>
                <p className="text-xs text-muted-foreground">{med.dosage} • {med.frequency}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Conditions */}
        <div className="space-y-2">
          <p className="font-semibold text-foreground">Medical Conditions</p>
          <div className="space-y-1">
            {medicalData.conditions.map((condition) => (
              <p key={condition} className="text-sm text-muted-foreground">• {condition}</p>
            ))}
          </div>
        </div>

        {/* Surgery History */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            <p className="font-semibold text-foreground">Surgery History</p>
          </div>
          <div className="space-y-2">
            {medicalData.surgeries.map((surgery) => (
              <div key={surgery.name} className="p-3 bg-muted/30 rounded-lg">
                <p className="font-semibold text-foreground text-sm">{surgery.name}</p>
                <p className="text-xs text-muted-foreground">{surgery.date} • {surgery.hospital}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
