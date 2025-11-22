'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Package, AlertTriangle } from 'lucide-react'

interface InventoryItem {
  name: string
  quantity: number
  expiry: string
  usageRate: string
  status: 'low' | 'normal' | 'expired'
}

export function MedicalInventoryAI() {
  const [inventory] = React.useState<InventoryItem[]>([
    { name: 'Epinephrine Auto-Injector', quantity: 4, expiry: '6 months', usageRate: '2/week', status: 'normal' },
    { name: 'Nitroglycerin Spray', quantity: 1, expiry: '2 months', usageRate: '1/month', status: 'low' },
    { name: 'Oxygen Masks (various)', quantity: 8, expiry: '1 year', usageRate: '3/week', status: 'normal' },
    { name: 'IV Fluids 500ml', quantity: 2, expiry: 'EXPIRED', usageRate: '2/week', status: 'expired' },
    { name: 'Bandages & Gauze', quantity: 50, expiry: '8 months', usageRate: '5/week', status: 'normal' },
    { name: 'Defibrillator Pads', quantity: 3, expiry: '1 year', usageRate: '1/month', status: 'normal' }
  ])

  return (
    <Card className="p-6 border-purple-500/30 bg-gradient-to-br from-purple-900/10 to-pink-900/10 glass-effect">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Package className="w-5 h-5 text-purple-400" />
          Medical Inventory AI
        </h3>
        <p className="text-sm text-gray-400">Auto-tracking expiry dates & usage patterns • Auto-reorder alerts</p>

        <div className="space-y-2">
          {inventory.map((item) => (
            <div key={item.name} className={`p-3 rounded-lg border flex items-center justify-between ${
              item.status === 'expired' ? 'border-red-500/50 bg-red-900/20' :
              item.status === 'low' ? 'border-yellow-500/50 bg-yellow-900/20' :
              'border-green-500/50 bg-green-900/20'
            }`}>
              <div className="flex-1">
                <p className="font-semibold text-sm text-white">{item.name}</p>
                <p className="text-xs text-gray-400">Usage: {item.usageRate} • Expiry: {item.expiry}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-white">{item.quantity}</p>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-purple-900/30 border border-purple-500/30 rounded-lg flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-purple-200">
            <strong>Alert:</strong> IV Fluids expired • Nitroglycerin low stock • Auto-order placed for 5 items
          </p>
        </div>
      </div>
    </Card>
  )
}
