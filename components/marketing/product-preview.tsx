'use client'

import { useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Bike, BusFront, Calculator, CarTaxiFront, CircleHelp, Clock3, Download, Fuel, LayoutDashboard, Package, ReceiptText, ShieldCheck, Utensils, Wallet, Wrench } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { calculateDay, formatMoney, makeDayReport, professions, type DayNumbers, type Profession } from '@/lib/earnings'
import { Brand } from './brand'
import { CalculationDialog } from './calculation-dialog'
import { EarningsChart } from './earnings-chart'

const profileOptions = [
  { value: 'moto', label: 'Moto-kurye', icon: Package },
  { value: 'kurye', label: 'Bisikletli kurye', icon: Bike },
  { value: 'taksi', label: 'Taksi', icon: CarTaxiFront },
  { value: 'minibus', label: 'Minibüs', icon: BusFront },
] as const

const expenses = [
  { key: 'fuel', label: 'Yakıt', icon: Fuel },
  { key: 'maintenance', label: 'Bakım payı', icon: Wrench },
  { key: 'insurance', label: 'Sigorta payı', icon: ShieldCheck },
  { key: 'food', label: 'Yemek', icon: Utensils },
  { key: 'other', label: 'Diğer giderler', icon: ReceiptText },
] as const

export function ProductPreview() {
  const [profession, setProfession] = useState<Profession>('moto')
  const [values, setValues] = useState<DayNumbers>(professions.moto.example)
  const [editorOpen, setEditorOpen] = useState(false)
  const [isOwnCalculation, setIsOwnCalculation] = useState(false)
  const [downloadMessage, setDownloadMessage] = useState('')
  const result = calculateDay(values)
  const profile = professions[profession]

  function changeProfession(selected: string[]) {
    const next = selected[0] as Profession | undefined
    if (!next || !(next in professions)) return
    setProfession(next)
    setValues(professions[next].example)
    setIsOwnCalculation(false)
    setDownloadMessage('')
  }

  function downloadReport() {
    const blob = new Blob(['\uFEFF', makeDayReport(values, profession)], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'paket-at-gun-sonu.txt'
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setDownloadMessage('Gün özeti dosyan hazırlandı.')
  }

  return (
    <section id="hesapla" aria-labelledby="preview-title" className="pb-8 pt-6 md:pb-12 md:pt-10">
      <div className="site-container">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="eyebrow">Hesap açık. Kafan rahat.</p>
          <h2 id="preview-title" className="section-title">Ciro başka. <span className="text-muted-foreground">Cebinde kalan başka.</span></h2>
          <p className="section-description">Kazandığın, harcadığın, sana kalan. Hepsi tek ekranda.<br className="hidden md:block" /> Çalışma şeklini seç, kendi rakamlarınla hemen dene.</p>
        </div>
        <div className="flex justify-center py-8">
          <ToggleGroup value={[profession]} onValueChange={changeProfession} variant="chip" size="lg" spacing={2} className="flex-wrap justify-center" aria-label="Çalışma şeklini seç">
            {profileOptions.map(({ value, label, icon: Icon }) => <ToggleGroupItem key={value} value={value}><Icon data-icon="inline-start" aria-hidden="true" />{label}</ToggleGroupItem>)}
          </ToggleGroup>
        </div>
        <div className="product-shell">
          <div className="flex min-h-12 items-center justify-between border-b border-border bg-background/40 px-5">
            <div className="flex items-center gap-1.5" aria-hidden="true"><span className="size-2 rounded-full bg-muted-foreground/35" /><span className="size-2 rounded-full bg-muted-foreground/25" /><span className="size-2 rounded-full bg-muted-foreground/15" /></div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><ShieldCheck className="size-3.5" aria-hidden="true" /> PAKET AT / Canlı önizleme</div>
            <span className="size-5" aria-hidden="true" />
          </div>
          <div className="flex">
            <aside aria-label="Ürün önizlemesi araçları" className="hidden w-52 shrink-0 border-r border-border bg-background/70 p-5 xl:block">
              <Brand compact />
              <div className="pt-9">
                <div className="flex flex-col gap-2">
                  <span className="dashboard-link" aria-current="page"><LayoutDashboard className="size-4" aria-hidden="true" /> Genel bakış</span>
                  <button type="button" className="dashboard-link" onClick={() => setEditorOpen(true)}><Wallet className="size-4" aria-hidden="true" /> Gelir & gider</button>
                  <button type="button" className="dashboard-link" onClick={downloadReport}><Download className="size-4" aria-hidden="true" /> Gün özeti</button>
                </div>
              </div>
              <div className="mt-24 rounded-xl border border-border p-3.5">
                <p className="text-sm font-medium">Emeğinin hesabı sende.</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Daha çok değil, daha bilinçli çalış.</p>
                <a href="#sss" className="mt-4 flex items-center gap-2 text-sm text-primary"><CircleHelp className="size-4" aria-hidden="true" /> Bir sorun mu var?</a>
              </div>
            </aside>
            <div className="min-w-0 flex-1 p-5 md:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2.5"><h3 className="text-xl font-semibold tracking-tight">Günün nasıl geçti?</h3><Badge variant="outline">{isOwnCalculation ? 'Senin hesabın' : 'Örnek çalışma günü'}</Badge></div>
                  <p className="text-sm text-muted-foreground">{profile.label} · {values.jobs} {profile.unit} · {values.hours.toLocaleString('tr-TR')} saat</p>
                </div>
                <Button size="nav" onClick={() => setEditorOpen(true)}><Calculator data-icon="inline-start" aria-hidden="true" />Rakamlarını gir</Button>
              </div>
              <div className="py-6">
                <div className="grid gap-3 sm:grid-cols-3" aria-live="polite" aria-atomic="true">
                  <div className="dashboard-stat">
                    <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground"><span>Toplam gelir</span><ArrowDownLeft className="size-4" aria-hidden="true" /></div>
                    <p className="mt-2 break-words font-heading text-[27px] font-semibold leading-tight tracking-tight" data-testid="revenue-total">{formatMoney(result.revenue, 2)}</p>
                    <p className="mt-2 text-sm text-muted-foreground">Gün boyu kazandığın</p>
                  </div>
                  <div className="dashboard-stat">
                    <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground"><span>Toplam gider</span><ArrowUpRight className="size-4" aria-hidden="true" /></div>
                    <p className="mt-2 break-words font-heading text-[27px] font-semibold leading-tight tracking-tight" data-testid="expense-total">{formatMoney(result.expenses, 2)}</p>
                    <p className="mt-2 text-sm text-muted-foreground">Görünmeyenler dahil</p>
                  </div>
                  <div className="dashboard-stat dashboard-stat-highlight">
                    <div className="flex items-center justify-between gap-2 text-sm text-primary"><span>{result.net < 0 ? 'Günün net sonucu' : 'Cebinde kalan'}</span><Wallet className="size-4" aria-hidden="true" /></div>
                    <p className="mt-2 break-words font-heading text-[27px] font-semibold leading-tight tracking-tight text-primary" data-testid="net-total">{formatMoney(result.net, 2)}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{result.net < 0 ? 'Giderlerin gelirini aştı' : 'Vergi öncesi tahmini net'}</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
                <div className="min-w-0 rounded-xl border border-border bg-background/40 p-4 text-foreground md:p-5">
                  <div className="flex items-center justify-between gap-2"><h4 className="text-base font-semibold">Kazancına geniş açıdan bak.</h4><span className="hidden text-sm text-muted-foreground sm:inline">₺ / gün</span></div>
                  <p className="mt-1 text-sm text-muted-foreground">Örnek hafta · Son sütun senin hesabın</p>
                  <div className="pt-4"><EarningsChart net={result.net} /></div>
                </div>
                <div className="rounded-xl border border-border bg-background/40 p-4 text-foreground md:p-5">
                  <h4 className="text-base font-semibold">Nereye gitti bu para?</h4>
                  <div className="pt-4">
                    <dl className="flex flex-col gap-3.5">
                      {expenses.map(({ key, label, icon: Icon }) => <div key={key} className="flex items-center justify-between gap-3 text-sm"><dt className="flex items-center gap-2.5 text-muted-foreground"><Icon className="size-4" aria-hidden="true" />{label}</dt><dd className="font-medium tabular-nums">{formatMoney(values[key], 2)}</dd></div>)}
                    </dl>
                  </div>
                </div>
              </div>
              <div className="pt-5">
                <Separator />
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 text-sm">
                  <p className="flex items-center gap-2 text-muted-foreground"><Clock3 className="size-4" aria-hidden="true" /> Saatlik net kazancın <span className="font-semibold text-foreground" data-testid="hourly-total">{result.perHour === null ? '—' : formatMoney(result.perHour, 2)}</span></p>
                  <Button size="nav" variant="ghost" onClick={downloadReport}><Download data-icon="inline-start" aria-hidden="true" />Özeti indir</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5 text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">Bu bir canlı demodur. Rakamların kaydedilmez. Sonuç yalnızca girdiğin giderleri içerir; mali danışmanlık değildir.</p>
          <p className="sr-only" role="status">{downloadMessage}</p>
        </div>
      </div>
      <CalculationDialog open={editorOpen} onOpenChange={setEditorOpen} values={values} profession={profession} onCalculate={(nextValues) => { setValues(nextValues); setIsOwnCalculation(true); setEditorOpen(false); setDownloadMessage('') }} />
    </section>
  )
}
