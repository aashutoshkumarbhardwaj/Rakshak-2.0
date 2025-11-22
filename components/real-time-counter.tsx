'use client'

import { useEffect, useState } from 'react'

interface RealTimeCounterProps {
  startValue: number
  endValue: number
  duration?: number
  prefix?: string
  suffix?: string
}

export function RealTimeCounter({
  startValue,
  endValue,
  duration = 1000,
  prefix = '',
  suffix = '',
}: RealTimeCounterProps) {
  const [count, setCount] = useState(startValue)

  useEffect(() => {
    if (startValue === endValue) return

    const steps = 50
    const stepDuration = duration / steps
    const increment = (endValue - startValue) / steps
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      setCount(Math.round(startValue + increment * currentStep))

      if (currentStep >= steps) {
        setCount(endValue)
        clearInterval(interval)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [startValue, endValue, duration])

  return (
    <>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </>
  )
}
