export type Profession = 'moto' | 'kurye' | 'taksi' | 'minibus'

export type DayNumbers = {
  revenue: number
  fuel: number
  maintenance: number
  insurance: number
  food: number
  other: number
  hours: number
  jobs: number
}

export type DayForm = Record<keyof DayNumbers, string>
export type DayErrors = Partial<Record<keyof DayNumbers, string>>

export const professions: Record<Profession, { label: string; unit: string; example: DayNumbers }> = {
  moto: {
    label: 'Moto-kurye', unit: 'teslimat',
    example: { revenue: 2750, fuel: 380, maintenance: 120, insurance: 60, food: 150, other: 200, hours: 8, jobs: 32 },
  },
  kurye: {
    label: 'Bisikletli kurye', unit: 'teslimat',
    example: { revenue: 2100, fuel: 0, maintenance: 40, insurance: 40, food: 150, other: 130, hours: 8, jobs: 26 },
  },
  taksi: {
    label: 'Taksi şoförü', unit: 'yolculuk',
    example: { revenue: 4200, fuel: 1150, maintenance: 240, insurance: 110, food: 200, other: 400, hours: 10, jobs: 18 },
  },
  minibus: {
    label: 'Minibüs şoförü', unit: 'sefer',
    example: { revenue: 6200, fuel: 1900, maintenance: 320, insurance: 130, food: 200, other: 550, hours: 11, jobs: 16 },
  },
}

export const expenseKeys = ['fuel', 'maintenance', 'insurance', 'food', 'other'] as const
const amountKeys = ['revenue', ...expenseKeys] as const
const allKeys = [...amountKeys, 'hours', 'jobs'] as const

export function parseDayForm(form: DayForm): { values: DayNumbers; errors: DayErrors } {
  const errors: DayErrors = {}
  const values = {} as DayNumbers

  for (const key of allKeys) {
    const raw = form[key]?.trim() ?? ''
    const value = Number(raw.replace(',', '.'))
    const maximum = key === 'hours' ? 24 : key === 'jobs' ? 1000 : 1_000_000

    if (!/^\d+(?:[.,]\d{1,2})?$/.test(raw) || !Number.isFinite(value) || value < 0) {
      errors[key] = 'Sıfır veya pozitif bir sayı gir. Ondalık için virgül kullanabilirsin.'
    } else if (value > maximum) {
      errors[key] = `En fazla ${maximum.toLocaleString('tr-TR')} girebilirsin.`
    } else if (key === 'jobs' && !Number.isInteger(value)) {
      errors[key] = 'Teslimat veya sefer sayısını tam sayı olarak gir.'
    }
    values[key] = value
  }

  return { values, errors }
}

export function calculateDay(day: DayNumbers) {
  for (const key of allKeys) {
    const maximum = key === 'hours' ? 24 : key === 'jobs' ? 1000 : 1_000_000
    if (!Number.isFinite(day[key]) || day[key] < 0 || day[key] > maximum) {
      throw new RangeError(`Geçersiz hesaplama alanı: ${key}`)
    }
  }
  if (!Number.isInteger(day.jobs)) throw new RangeError('İş adedi tam sayı olmalıdır.')

  const revenueCents = Math.round(day.revenue * 100)
  const expensesCents = expenseKeys.reduce((total, key) => total + Math.round(day[key] * 100), 0)
  const net = (revenueCents - expensesCents) / 100

  return {
    revenue: revenueCents / 100,
    expenses: expensesCents / 100,
    net,
    perHour: day.hours > 0 ? net / day.hours : null,
    perJob: day.jobs > 0 ? net / day.jobs : null,
    expenseRatio: revenueCents > 0 ? (expensesCents / revenueCents) * 100 : null,
  }
}

export function formatMoney(value: number, decimals = 0) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency', currency: 'TRY', minimumFractionDigits: decimals, maximumFractionDigits: decimals,
  }).format(value)
}

export function makeDayReport(day: DayNumbers, profession: Profession) {
  const result = calculateDay(day)
  const profile = professions[profession]
  return [
    'PAKET AT — Gün sonu hesabım',
    `Çalışma türü: ${profile.label}`,
    `Toplam gelir: ${formatMoney(result.revenue, 2)}`,
    `Yakıt: ${formatMoney(day.fuel, 2)}`,
    `Günlük bakım payı: ${formatMoney(day.maintenance, 2)}`,
    `Günlük sigorta payı: ${formatMoney(day.insurance, 2)}`,
    `Yemek: ${formatMoney(day.food, 2)}`,
    `Diğer giderler: ${formatMoney(day.other, 2)}`,
    `Toplam gider: ${formatMoney(result.expenses, 2)}`,
    `Tahmini net kazanç: ${formatMoney(result.net, 2)}`,
    `Çalışma süresi: ${day.hours} saat`,
    `${profile.unit} sayısı: ${day.jobs}`,
    `Saatlik net kazanç: ${result.perHour === null ? 'Süre girilmedi' : formatMoney(result.perHour, 2)}`,
    '',
    'Bilgilendirme: Bu sonuç yalnızca girilen giderleri içerir. Vergi, sosyal güvenlik ve amortisman ayrıca eklenmediyse dahil değildir. Muhasebe veya vergi danışmanlığı yerine geçmez.',
    'Veriler sunucuya kaydedilmemiştir. Bu dosya cihazına indirdiğin kişisel bir kopyadır.',
  ].join('\n')
}
