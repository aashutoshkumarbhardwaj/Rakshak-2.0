'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Ambulance, LogOut } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()

  const isPatient = pathname.startsWith('/patient')
  const isDriver = pathname.startsWith('/driver')
  const isHospital = pathname.startsWith('/hospital')
  const isAdmin = pathname.startsWith('/admin')

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Ambulance className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-primary">OneCall</h1>
        </Link>

        <div className="flex items-center gap-2">
          {(isPatient || isDriver || isHospital || isAdmin) && (
            <>
              <span className="text-sm text-muted-foreground px-4 py-2 bg-muted rounded-lg">
                {isPatient && 'Patient Mode'}
                {isDriver && 'Driver Mode'}
                {isHospital && 'Hospital Mode'}
                {isAdmin && 'Admin Mode'}
              </span>
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Exit
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
