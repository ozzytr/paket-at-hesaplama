import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Check, CirclePlay, ShieldCheck } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pb-14 pt-12 md:pb-16 md:pt-16 lg:pt-20">
      <div className="site-container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="hero-copy flex flex-col items-start gap-7">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
              Yoldaki emeğinin karşılığı.
            </p>
            <h1 id="hero-title" className="hero-title font-heading">
              Paket tamam.<br />
              Peki, cebinde<br />
              <span className="text-primary">ne kaldı?</span>
            </h1>
            <p className="max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Yakıt, bakım, sigorta, yemek… Ciroyu değil, <span className="text-foreground">gerçek kazancını</span> gör. PAKET AT ile günün hesabını tek tıkla çıkar, yoluna kafan rahat devam et.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#hesapla" className={buttonVariants({ size: 'cta' })}>Kazancını hesapla <ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a>
              <a href="#nasil-calisir" className={buttonVariants({ size: 'cta', variant: 'outline' })}><CirclePlay data-icon="inline-start" aria-hidden="true" /> Nasıl çalışır?</a>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex shrink-0 items-center [&>img+img]:-ml-2.5" aria-hidden="true">
                <Image src="/img/kurye-hero.png" width={36} height={36} alt="" className="size-9 rounded-full border-2 border-background object-cover object-[50%_25%]" />
                <Image src="/img/kurye-molasi.png" width={36} height={36} alt="" className="size-9 rounded-full border-2 border-background object-cover object-[40%_30%]" />
                <Image src="/img/kargo-tasimaci.png" width={36} height={36} alt="" className="size-9 rounded-full border-2 border-background object-cover object-[50%_30%]" />
              </div>
              <div className="flex flex-col gap-0.5 text-sm">
                <span className="font-medium">Yolda olan herkes için.</span>
                <span className="text-muted-foreground">Üyelik yok. Kredi kartı yok.</span>
              </div>
            </div>
          </div>
          <div className="hero-photo">
            <Image src="/img/kurye-hero.png" alt="İstanbul sokaklarında, turuncu paket çantasıyla siyah motosikletinin üzerindeki kurye" fill priority sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover object-center" />
            <div className="photo-shade absolute inset-0 rounded-3xl" aria-hidden="true" />
            <div className="absolute right-5 top-5 rounded-full border border-foreground/20 bg-background/35 px-3.5 py-1.5 text-sm text-foreground backdrop-blur-md">
              Direksiyon sende.
            </div>
            <div className="absolute bottom-7 left-5 w-64 rounded-2xl border border-foreground/15 bg-card/95 p-5 text-card-foreground shadow-xl backdrop-blur-xl md:-left-8 md:bottom-10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Örnek günün net kazancı</span>
                <ArrowUpRight className="size-4 text-primary" aria-hidden="true" />
              </div>
              <p className="mt-2 font-heading text-[38px] font-bold leading-tight tracking-[-0.05em]">₺1.840<span className="text-lg text-muted-foreground">,00</span></p>
              <div className="mt-3 flex items-center gap-1.5 text-sm text-primary"><Check className="size-4" aria-hidden="true" /> Masraflar çıktı. Bu senin.</div>
            </div>
            <a href="#hesapla" aria-label="Canlı kazanç hesaplayıcısına git" className="absolute bottom-7 right-5 flex size-11 items-center justify-center rounded-full border border-foreground/30 bg-background/20 text-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"><ArrowDown className="size-5" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <div className="site-container pt-16 md:pt-20">
        <div className="border-y border-border py-7">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <p className="text-center text-sm leading-relaxed text-muted-foreground lg:text-left">Hangi platformda olursan ol,<br className="hidden lg:block" /> <span className="text-foreground">hesabın aynı yerde.</span></p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 text-muted-foreground md:gap-x-12">
              <span className="font-heading text-2xl font-extrabold tracking-[-0.07em]">getir</span>
              <span className="text-[21px] font-bold italic tracking-[-0.045em]">yemeksepeti</span>
              <span className="text-xl font-bold tracking-[-0.04em]">trendyol <span className="font-normal">go</span></span>
              <span className="hidden h-6 w-px bg-border md:block" aria-hidden="true" />
              <span className="text-sm font-medium">Bağımsız kuryeler</span>
              <span className="text-sm font-medium">Taksi & minibüs</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
          Platformdan bağımsızdır. Hesaplarını bağlaman gerekmez.
        </div>
      </div>
    </section>
  )
}
