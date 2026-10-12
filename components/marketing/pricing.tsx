'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, Sparkles, Wallet } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'
import { formatMoney } from '@/lib/earnings'

const plans = [
  {
    name: 'İlk Kontak', description: 'Hesabını bilmek için ilk adım.', monthly: 0, yearly: 0, popular: false,
    features: ['Günlük net kazanç hesaplama', 'Tüm temel gider kategorileri', 'Saatlik kazanç hesabı', 'Gün özetini indirme'],
    button: 'Ücretsiz hesapla', note: 'Her zaman ücretsiz. Üyelik gerektirmez.',
  },
  {
    name: 'Yol Arkadaşı', description: 'İşini ciddiye alanların yol arkadaşı.', monthly: 99, yearly: 79, popular: true,
    features: ['İlk Kontak planındaki her şey', 'Sınırsız gelir ve gider kaydı', 'Haftalık ve aylık raporlar', 'Bakım ve sigorta hatırlatmaları', 'Birden fazla platform takibi'],
    button: 'Yol Arkadaşı’nı keşfet', note: 'Lansman için planlanıyor.',
  },
  {
    name: 'Tam Gaz', description: 'Birden fazla araç, daha fazla kontrol.', monthly: 249, yearly: 199, popular: false,
    features: ['Yol Arkadaşı planındaki her şey', '5 araca kadar ayrı takip', 'Araç bazında kazanç karşılaştırması', 'Dışa aktarılabilir dönem raporları', 'Öncelikli destek'],
    button: 'Tam Gaz’ı keşfet', note: 'Lansman için planlanıyor.',
  },
]

export function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[number] | null>(null)

  return (
    <section id="fiyatlar" aria-labelledby="pricing-title" className="section-space">
      <div className="site-container">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="eyebrow">Küçük bir gider. Büyük bir netlik.</p>
          <h2 id="pricing-title" className="section-title">Sana uyan bir yol var.</h2>
          <p className="section-description">Ücretsiz başla, hesabınla tanış. İşin büyüdükçe<br className="hidden sm:block" /> yanında olacak planı şimdiden keşfet.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 py-9">
          <ToggleGroup value={[billing]} onValueChange={(value) => { if (value[0] === 'monthly' || value[0] === 'yearly') setBilling(value[0]) }} variant="chip" size="lg" spacing={0} aria-label="Ödeme dönemi">
            <ToggleGroupItem value="monthly">Aylık</ToggleGroupItem>
            <ToggleGroupItem value="yearly">Yıllık</ToggleGroupItem>
          </ToggleGroup>
          <span className="text-sm text-primary">Yıllıkta daha avantajlı</span>
        </div>
        <div className="grid items-stretch gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className={cn('price-card flex flex-col', plan.popular && 'price-card-featured')}>
              <div className="flex min-h-7 items-center justify-between gap-2"><h3 className="text-xl font-semibold tracking-tight">{plan.name}</h3>{plan.popular && <Badge><Sparkles data-icon="inline-start" aria-hidden="true" />En popüler</Badge>}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
              <div className="py-7">
                <p className="flex items-baseline gap-1.5"><span className="font-heading text-[44px] font-semibold leading-tight tracking-[-0.055em]" data-testid={`price-${plan.monthly}`}>{formatMoney(billing === 'yearly' ? plan.yearly : plan.monthly)}</span><span className="text-sm text-muted-foreground">/ ay</span></p>
                <p className="mt-2 min-h-5 text-sm text-muted-foreground">{plan.monthly === 0 ? 'Bir kuruş ödemeden.' : billing === 'yearly' ? `Yıllık toplam ${formatMoney(plan.yearly * 12)} · KDV dahil` : 'Önerilen lansman fiyatı · KDV dahil'}</p>
              </div>
              <Separator />
              <div className="flex-1 py-7"><ul className="flex flex-col gap-4">{plan.features.map((feature) => <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><span>{feature}</span></li>)}</ul></div>
              {plan.monthly === 0 ? <a href="#hesapla" className={buttonVariants({ variant: 'outline', size: 'cta' })}>{plan.button}<ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a> : <Button variant={plan.popular ? 'default' : 'outline'} size="cta" className="w-full" onClick={() => setSelectedPlan(plan)}>{plan.button}<ArrowUpRight data-icon="inline-end" aria-hidden="true" /></Button>}
              <p className="mt-4 text-center text-sm text-muted-foreground">{plan.note}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">Ücretli paketler ve özellikleri lansman önerisidir; henüz satışa açık değildir. Bu sayfada abonelik başlatılmaz veya ödeme alınmaz.</p>
      </div>
      <Dialog open={selectedPlan !== null} onOpenChange={(open) => { if (!open) setSelectedPlan(null) }}>
        <DialogContent className="sm:max-w-md">
          {selectedPlan && <>
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Wallet className="size-6" aria-hidden="true" /></div>
            <DialogHeader><DialogTitle>{selectedPlan.name} ile bir adım öteye.</DialogTitle><DialogDescription>Bu paket lansman için hazırlanıyor. Henüz abonelik başlatılmaz veya ödeme alınmaz. Şimdilik ücretsiz hesaplayıcıyla tanışabilirsin.</DialogDescription></DialogHeader>
            <p className="font-heading text-3xl font-semibold tracking-tight">{formatMoney(billing === 'yearly' ? selectedPlan.yearly : selectedPlan.monthly)}<span className="text-base font-normal text-muted-foreground"> / ay · önerilen fiyat</span></p>
            {billing === 'yearly' && <p className="text-sm text-muted-foreground">Yıllık toplam {formatMoney(selectedPlan.yearly * 12)} · KDV dahil</p>}
            <ul className="flex flex-col gap-3">{selectedPlan.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-sm"><Check className="size-4 shrink-0 text-primary" aria-hidden="true" />{feature}</li>)}</ul>
            <a href="#hesapla" onClick={() => setSelectedPlan(null)} className={buttonVariants({ size: 'cta' })}>Ücretsiz hesaplayıcıya git<ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a>
          </>}
        </DialogContent>
      </Dialog>
    </section>
  )
}
