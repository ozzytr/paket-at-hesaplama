'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { parseDayForm, professions, type DayErrors, type DayForm, type DayNumbers, type Profession } from '@/lib/earnings'

const fields: { key: keyof DayNumbers; label: string }[] = [
  { key: 'revenue', label: 'Toplam gelir (₺)' },
  { key: 'fuel', label: 'Yakıt (₺)' },
  { key: 'maintenance', label: 'Günlük bakım payı (₺)' },
  { key: 'insurance', label: 'Günlük sigorta payı (₺)' },
  { key: 'food', label: 'Yemek (₺)' },
  { key: 'other', label: 'Diğer giderler (₺)' },
  { key: 'hours', label: 'Çalışma süresi (saat)' },
  { key: 'jobs', label: 'Teslimat / sefer sayısı' },
]

function CalculationForm({ values, onCalculate }: { values: DayNumbers; onCalculate: (values: DayNumbers) => void }) {
  const [errors, setErrors] = useState<DayErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const form = Object.fromEntries(fields.map(({ key }) => [key, String(data.get(key) ?? '')])) as DayForm
    const result = parseDayForm(form)
    setErrors(result.errors)
    const firstError = Object.keys(result.errors)[0]
    if (firstError) {
      document.getElementById(`calc-${firstError}`)?.focus()
      return
    }
    onCalculate(result.values)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FieldSet>
        <FieldLegend className="sr-only">Günlük gelir ve giderlerin</FieldLegend>
        <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map(({ key, label }) => (
            <Field key={key} data-invalid={Boolean(errors[key])}>
              <FieldLabel htmlFor={`calc-${key}`}>{label}</FieldLabel>
              <Input id={`calc-${key}`} name={key} type="text" inputMode={key === 'jobs' ? 'numeric' : 'decimal'} autoComplete="off" defaultValue={values[key]} required aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `error-${key}` : undefined} onChange={() => { if (errors[key]) setErrors((previous) => ({ ...previous, [key]: undefined })) }} />
              {errors[key] && <FieldError id={`error-${key}`}>{errors[key]}</FieldError>}
            </Field>
          ))}
        </FieldGroup>
        <FieldDescription>Bakım ve sigortanın yalnızca bir çalışma gününe düşen payını yaz. Komisyon, park, vergi veya diğer masraflarını “Diğer giderler” alanına ekleyebilirsin.</FieldDescription>
      </FieldSet>
      <div className="pt-6">
        <Button type="submit" size="cta" className="w-full">Net kazancımı hesapla <ArrowRight data-icon="inline-end" aria-hidden="true" /></Button>
      </div>
      <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground"><ShieldCheck className="size-4 shrink-0" aria-hidden="true" /> Verilerin kaydedilmez. Üyelik gerekmez.</p>
    </form>
  )
}

export function CalculationDialog({ open, onOpenChange, values, profession, onCalculate }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  values: DayNumbers
  profession: Profession
  onCalculate: (values: DayNumbers) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Bugün cebinde ne kaldı?</DialogTitle>
          <DialogDescription>{professions[profession].label} için örnek tutarları kendi rakamlarınla değiştir. Tüm tutarlar günlük ve Türk lirası cinsindedir.</DialogDescription>
        </DialogHeader>
        {open && <CalculationForm values={values} onCalculate={onCalculate} />}
      </DialogContent>
    </Dialog>
  )
}
