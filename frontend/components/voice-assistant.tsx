'use client'

import { useState } from 'react'
import { Mic, MicOff, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')

  const voiceCommands = [
    'I need help',
    'Heart attack',
    'Call ambulance',
    'Send my location',
    'Traffic accident'
  ]

  return (
    <div className="space-y-6 p-6 bg-card border border-border rounded-2xl glass-effect">
      <div className="flex items-center gap-3 mb-4">
        <Volume2 className="w-5 h-5 text-neon-blue" />
        <h3 className="text-lg font-semibold">Voice Commands</h3>
      </div>

      <button
        onClick={() => setIsListening(!isListening)}
        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all mx-auto ${
          isListening
            ? 'bg-gradient-to-br from-neon-red to-red-900 text-white neon-glow pulse-glow'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        }`}
      >
        {isListening ? (
          <Mic className="w-8 h-8" />
        ) : (
          <MicOff className="w-8 h-8" />
        )}
      </button>

      {isListening && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Listening...</p>
          <p className="text-primary font-semibold">{transcript || 'Waiting for command...'}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {voiceCommands.map((cmd) => (
          <Button
            key={cmd}
            variant="outline"
            size="sm"
            className="text-xs border-neon-blue text-neon-blue hover:bg-neon-blue/10"
            onClick={() => setTranscript(cmd)}
          >
            {cmd}
          </Button>
        ))}
      </div>
    </div>
  )
}
