import { ArrowUpRight, ChartNoAxesCombined, ReceiptText, Wallet } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const steps = [
  { number: '01', icon: Wallet, title: 'Kazandığını yaz.', description: 'Paket ücretlerini, yolculuk gelirini, primlerini ve bahşişlerini topla. Günlük gelirini tek bir rakamla gir.' },
  { number: '02', icon: ReceiptText, title: 'Giderlerini ekle.', description: 'Depoya koyduğun yakıttan öğlen yemeğine, bakım payından sigortaya kadar hiçbir masrafı gözden kaçırma.' },
  { number: '03', icon: ChartNoAxesCombined, title: 'Gerçeği gör. Rahatla.', description: 'Giderler düşsün, gerçek kazancın ortaya çıksın. Saatlik kazancını gör ve günün özetini cebine indir.' },
]

export function HowItWorks() {
  return (
    <section id="nasil-calisir" aria-labelledby="how-title" className="section-space">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-4"><p className="eyebrow">Nasıl çalışır?</p><h2 id="how-title" className="section-title">3 adımda, kafan rahat.</h2></div>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground">Karmaşık tablolar yok. Muhasebe dili yok.<br />Senin işin yol, bizim işimiz hesap.</p>
        </div>
        <div className="pt-10">
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map(({ number, icon: Icon, title, description }) => (
              <Card key={number} className="[--card-spacing:--spacing(7)]">
                <CardHeader>
                  <div className="flex items-center justify-between pb-5"><span className="flex size-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/8 text-primary"><Icon className="size-6" aria-hidden="true" /></span><span className="font-heading text-sm font-semibold text-muted-foreground">ADIM {number}</span></div>
                  <CardTitle><h3 className="text-xl font-semibold tracking-tight">{title}</h3></CardTitle>
                </CardHeader>
                <CardContent><p className="text-base leading-relaxed text-muted-foreground">{description}</p></CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="pt-7 text-center"><a href="#hesapla" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground">Anlatması bu kadar. Denemesi daha kolay.<ArrowUpRight className="size-4" aria-hidden="true" /></a></div>
      </div>
    </section>
  )
}
