'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { formatMoney } from '@/lib/earnings'

const chartConfig = {
  net: { label: 'Net kazanç', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function EarningsChart({ net }: { net: number }) {
  const data = [
    { day: 'Pzt', net: 1160, fill: 'var(--chart-2)' },
    { day: 'Sal', net: 1490, fill: 'var(--chart-2)' },
    { day: 'Çar', net: 1320, fill: 'var(--chart-2)' },
    { day: 'Per', net: 1760, fill: 'var(--chart-2)' },
    { day: 'Cum', net: 1520, fill: 'var(--chart-2)' },
    { day: 'Cmt', net: 1690, fill: 'var(--chart-2)' },
    { day: 'Senin günün', net, fill: 'var(--chart-1)' },
  ]

  return (
    <ChartContainer config={chartConfig} className="h-48 w-full aspect-auto" aria-label="Örnek haftalık net kazanç grafiği. Son sütun hesaplanan günün sonucudur.">
      <BarChart accessibilityLayer data={data} margin={{ top: 12, right: 0, bottom: 0, left: -8 }} barCategoryGap="28%">
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 5" />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={12} tick={{ fontSize: 14 }} interval={0} tickFormatter={(value: string) => value === 'Senin günün' ? 'Senin' : value} />
        <YAxis tickLine={false} axisLine={false} width={48} tick={{ fontSize: 14 }} tickFormatter={(value: number) => value >= 1000 ? `${Number((value / 1000).toFixed(1)).toLocaleString('tr-TR')}b` : String(value)} />
        <ChartTooltip cursor={{ fill: 'var(--border)' }} content={<ChartTooltipContent formatter={(value) => <span className="text-sm text-foreground">Net kazanç: {formatMoney(Number(value), 2)}</span>} />} />
        <Bar dataKey="net" radius={[5, 5, 0, 0]} maxBarSize={44} isAnimationActive={false} />
      </BarChart>
    </ChartContainer>
  )
}
