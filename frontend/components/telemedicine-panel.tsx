'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, MessageCircle, Mic, Video } from 'lucide-react'

export function TelemedicinePanel() {
  const [activeTab, setActiveTab] = useState<'call' | 'chat'>('call')
  const [messages, setMessages] = useState([
    { role: 'driver', text: 'I am 3 minutes away', time: '14:32' },
    { role: 'you', text: 'Thank you, patient is ready', time: '14:33' }
  ])

  return (
    <Card className="p-6 border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
      <h3 className="text-xl font-bold text-foreground mb-4">Live Communication</h3>

      <div className="flex gap-2 mb-4 border-b border-border">
        <button
          onClick={() => setActiveTab('call')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'call'
              ? 'text-secondary border-b-2 border-secondary'
              : 'text-muted-foreground'
          }`}
        >
          <Phone className="w-4 h-4 inline mr-2" />
          Call with Driver
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 font-semibold transition-colors ${
            activeTab === 'chat'
              ? 'text-secondary border-b-2 border-secondary'
              : 'text-muted-foreground'
          }`}
        >
          <MessageCircle className="w-4 h-4 inline mr-2" />
          Chat
        </button>
      </div>

      {activeTab === 'call' && (
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <p className="text-muted-foreground text-sm mb-2">Connected with Rahul Kumar</p>
            <p className="text-2xl font-bold text-secondary">03:45</p>
          </div>
          <div className="flex gap-2 justify-center">
            <Button size="lg" className="gap-2 bg-secondary hover:bg-secondary/90 rounded-full">
              <Mic className="w-5 h-5" />
              Mute
            </Button>
            <Button size="lg" variant="outline" className="gap-2 rounded-full">
              <Video className="w-5 h-5" />
              Video
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="space-y-3">
          <div className="h-48 bg-muted/20 rounded-lg p-4 space-y-3 overflow-y-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'you' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-lg ${
                  msg.role === 'you'
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-primary/20 text-foreground'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type message..."
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-input"
            />
            <Button className="bg-secondary hover:bg-secondary/90">Send</Button>
          </div>
        </div>
      )}
    </Card>
  )
}
