'use client'

import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Brand } from './brand'
import { InfoDialog } from './info-dialog'

const links = [
  { label: 'Nasıl çalışır?', href: '#nasil-calisir' },
  { label: 'Kimler için?', href: '#ornekler' },
  { label: 'Fiyatlar', href: '#fiyatlar' },
  { label: 'Yorumlar', href: '#yorumlar' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="site-container">
        <div className="flex h-20 items-center justify-between">
          <a href="#top" aria-label="PAKET AT ana sayfa" onClick={() => setMenuOpen(false)}><Brand /></a>
          <nav aria-label="Ana menü" className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <InfoDialog kind="login">Giriş yap <ArrowUpRight data-icon="inline-end" className="hidden sm:block" aria-hidden="true" /></InfoDialog>
            <Button variant="ghost" size="icon-lg" className="lg:hidden" aria-expanded={menuOpen} aria-controls="mobil-menu" aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobil-menu" aria-label="Mobil menü" className="border-t border-border py-4 lg:hidden" onKeyDown={(event) => { if (event.key === 'Escape') setMenuOpen(false) }}>
            <div className="flex flex-col gap-1">
              {links.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-card hover:text-foreground">{link.label}</a>)}
              <a href="#sss" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-base text-muted-foreground hover:bg-card hover:text-foreground">Sık sorulanlar</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
