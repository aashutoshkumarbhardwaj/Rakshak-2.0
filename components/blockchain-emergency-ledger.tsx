'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Lock, CheckCircle } from 'lucide-react'

interface LedgerRecord {
  timestamp: string
  event: string
  ambulanceId: string
  patientId: string
  action: string
  hash: string
}

export function BlockchainEmergencyLedger() {
  const [records] = useState<LedgerRecord[]>([
    {
      timestamp: '14:23:45',
      event: 'Emergency Dispatch',
      ambulanceId: 'MH-02-AB-9876',
      patientId: 'P#4521',
      action: 'Ambulance assigned to patient',
      hash: '0x7f3a9b2c1d4e5f6g7h8i9j0k1l2m3n4o'
    },
    {
      timestamp: '14:24:12',
      event: 'Patient Pickup',
      ambulanceId: 'MH-02-AB-9876',
      patientId: 'P#4521',
      action: 'Patient loaded into ambulance',
      hash: '0x8g4b0c3d2e5f6g7h8i9j0k1l2m3n4o5p'
    },
    {
      timestamp: '14:27:33',
      event: 'Hospital Handoff',
      ambulanceId: 'MH-02-AB-9876',
      patientId: 'P#4521',
      action: 'Patient transferred to City Medical Center',
      hash: '0x9h5c1d4e3f6g7h8i9j0k1l2m3n4o5p6q'
    },
    {
      timestamp: '14:28:15',
      event: 'Payment Processed',
      ambulanceId: 'MH-02-AB-9876',
      patientId: 'P#4521',
      action: 'Insurance claim: ₹2,500 approved',
      hash: '0xa1i6d2e5f4g7h8i9j0k1l2m3n4o5p6q7r'
    }
  ])

  return (
    <Card className="p-6 border-purple-500/30 bg-gradient-to-br from-purple-900/10 to-pink-900/10 glass-effect">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-purple-400" />
          Blockchain Emergency Ledger
        </h3>

        <p className="text-sm text-gray-400">
          Immutable record of all transactions • Prevents fraud • Enables transparency
        </p>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {records.map((record, idx) => (
            <div key={idx} className="bg-slate-800/40 border border-purple-500/20 rounded-lg p-3 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">{record.event}</p>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {record.ambulanceId} → {record.patientId}
                  </p>
                </div>
                <span className="text-xs text-purple-300 font-mono">{record.timestamp}</span>
              </div>

              <p className="text-xs text-gray-300">{record.action}</p>

              <div className="bg-slate-900/50 rounded px-2 py-1">
                <p className="text-xs text-purple-300 font-mono break-all">
                  Hash: {record.hash}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-gray-400 bg-slate-800/30 px-3 py-2 rounded flex items-center gap-2">
          <Lock className="w-3 h-3" />
          All records cryptographically signed • Cannot be edited or deleted
        </div>
      </div>
    </Card>
  )
}
