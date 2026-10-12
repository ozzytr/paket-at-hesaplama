import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const examples = [
  { image: '/img/sehir-kuryesi.png', alt: 'İstanbul caddesinde turuncu paket çantalı motosikletiyle teslimata giden kurye', category: 'MOTO-KURYE', title: 'Her paketin hesabı sende.', description: 'Paket başına değil, günün tamamına bak.' },
  { image: '/img/paket-teslimati.png', alt: 'Bir apartmanın kapısında müşterisine paket teslim eden kurye', category: 'ÇOKLU PLATFORM', title: 'Platformlar ayrı. Hesabın tek.', description: 'Farklı işlerden gelen kazancını bir araya getir.' },
  { image: '/img/kurye-hero.png', alt: 'Motosikletinin üzerinde yeni teslimatına hazır bekleyen paket kuryesi', category: 'BAĞIMSIZ KURYE', title: 'Kendi işinin patronusun.', description: 'Emeğinin karşılığını da en iyi sen bil.' },
  { image: '/img/gece-kuryesi.png', alt: 'Akşam teslimatları arasında motosikletinin yanında telefonunu kontrol eden kurye', category: 'GECE MESAİSİ', title: 'Geç saatler. Net rakamlar.', description: 'Fazladan mesai, gerçekten fazladan kazanç mı?' },
  { image: '/img/kargo-tasimaci.png', alt: 'Teslimat aracına karton paketler yerleştiren kargo taşıyıcısı', category: 'PAKET TAŞIMACILIĞI', title: 'Dört teker, aynı hesap.', description: 'Aracın değişir. Masrafların önemi değişmez.' },
  { image: '/img/kurye-molasi.png', alt: 'Teslimat molasında çay içerken telefonundan günlük hesabına bakan kadın kurye', category: 'GÜN SONU', title: 'Mesai bitsin. Kafan dinlensin.', description: 'Eve soru işaretleriyle değil, net bir hesapla dön.' },
]

export function CourierGallery() {
  return (
    <section id="ornekler" aria-labelledby="gallery-title" className="section-space border-y border-border bg-card/25 text-foreground">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-4"><p className="eyebrow">Farklı rotalar. Aynı ihtiyaç.</p><h2 id="gallery-title" className="section-title">Yolu bilenlerin<br />hesabını da bilen uygulama.</h2></div>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground">İster iki tekerde paket taşı, ister dört tekerde yolcu. Günün sonunda önemli olan, sana kalan.</p>
        </div>
        <div className="pt-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((example) => (
              <figure key={example.title} className="gallery-card group relative isolate aspect-[1.23] overflow-hidden rounded-2xl border border-border">
                <Image src={example.image} alt={example.alt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" />
                <div className="photo-shade absolute inset-0" aria-hidden="true" />
                <span className="absolute left-5 top-5 rounded-full border border-foreground/20 bg-background/40 px-3 py-1 text-sm font-medium tracking-wide text-foreground backdrop-blur-sm">{example.category}</span>
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-foreground">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight">{example.title}</h3>
                  <p className="mt-2 max-w-72 text-sm leading-relaxed text-foreground/75">{example.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <p className="mt-7 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-muted-foreground">Taksi veya minibüs şoförü müsün? <a href="#hesapla" className="inline-flex items-center gap-1 font-medium text-primary hover:text-foreground">Hesaplayıcıda sana da yer var.<ArrowUpRight className="size-4" aria-hidden="true" /></a></p>
      </div>
    </section>
  )
}
