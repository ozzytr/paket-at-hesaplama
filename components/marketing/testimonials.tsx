import Image from 'next/image'
import { Star } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const stories = [
  { name: 'Emre K.', role: 'Moto-kurye · İstanbul', image: '/img/kurye-hero.png', quote: 'Gün sonunda ciroya bakmak yetmiyor. Benzini, yemeği, bakımı çıkarınca gerçek rakamı görmek istiyorum. Emeğimin karşılığını bilmek bu kadar basit olmalı.' },
  { name: 'Zeynep A.', role: 'Bağımsız kurye · İzmir', image: '/img/kurye-molasi.png', quote: 'Bir günde birden fazla platformdan iş alıyorum. İhtiyacım olan şey üç ayrı hesap değil, hepsinin sonunda bana ne kaldığını gösteren tek bir ekran.' },
  { name: 'Murat D.', role: 'Paket taşımacısı · Ankara', image: '/img/kargo-tasimaci.png', quote: 'Aracın bakım zamanı gelince o masraf gökten düşmüyor. Her gün küçük bir pay ayırıp gerçek kazancımı görmek, yarına daha rahat çıkmak demek.' },
]

export function Testimonials() {
  return (
    <section id="yorumlar" aria-labelledby="testimonials-title" className="section-space border-y border-border bg-card/25 text-foreground">
      <div className="site-container">
        <div className="flex flex-col items-center gap-4 text-center"><p className="eyebrow">Yoldakilerin dilinden</p><h2 id="testimonials-title" className="section-title">Farklı hikâyeler.<br />Ortak bir “bana ne kaldı?”</h2><p className="section-description">PAKET AT, sahadaki bu ihtiyaçlar için tasarlanıyor.</p></div>
        <div className="pt-10">
          <div className="grid gap-5 md:grid-cols-3">
            {stories.map((story) => (
              <Card key={story.name} className="[--card-spacing:--spacing(6)]">
                <CardHeader><CardTitle><span className="sr-only">{story.name} için temsili kullanım senaryosu</span><span className="flex items-center gap-1 text-primary" aria-hidden="true">{[0, 1, 2, 3, 4].map((star) => <Star key={star} className="size-4 fill-current" strokeWidth={1.5} />)}</span></CardTitle></CardHeader>
                <CardContent className="flex-1"><blockquote className="text-base leading-relaxed text-foreground/90">“{story.quote}”</blockquote></CardContent>
                <CardFooter><div className="flex items-center gap-3"><Image src={story.image} width={44} height={44} alt="" className="size-11 rounded-full object-cover" /><div className="flex flex-col gap-0.5"><p className="text-sm font-semibold">{story.name}</p><p className="text-sm text-muted-foreground">{story.role}</p></div></div></CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">Bu sözler ve profiller temsili kullanım senaryolarıdır; gerçek müşteri değerlendirmesi değildir.</p>
      </div>
    </section>
  )
}
