import Image from 'next/image'
import { ArrowUpRight, Check } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Brand } from './brand'
import { InfoDialog } from './info-dialog'

export function ClosingCTA() {
  return (
    <section aria-labelledby="cta-title" className="pb-20 md:pb-28">
      <div className="site-container">
        <div className="grid overflow-hidden rounded-3xl bg-primary text-primary-foreground md:grid-cols-[1.2fr_1fr]">
          <div className="p-8 md:p-12 lg:p-14">
            <div className="flex flex-col items-start gap-6">
              <p className="text-sm font-semibold uppercase tracking-[0.14em]">Daha net bir yarın, bugün başlar.</p>
              <h2 id="cta-title" className="font-heading text-4xl font-semibold leading-[1.12] tracking-[-0.05em] lg:text-5xl">Yol uzun.<br />Hesabın kısa olsun.</h2>
              <p className="max-w-sm text-base leading-relaxed text-primary-foreground/80">Günün sonunda ne kazandığını tahmin etme.<br className="hidden sm:block" /> Bil. PAKET AT ile direksiyon sende kalsın.</p>
              <a href="#hesapla" className={buttonVariants({ variant: 'secondary', size: 'cta' })}>İlk hesabını yap<ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a>
              <p className="flex items-center gap-2 text-sm text-primary-foreground/80"><Check className="size-4" aria-hidden="true" />Ücretsiz. Kartsız. Karmaşasız.</p>
            </div>
          </div>
          <div className="relative min-h-72 md:min-h-full"><Image src="/img/kurye-molasi.png" alt="Paket teslimatları arasında molasını verirken telefonuna bakan kurye" fill sizes="(max-width: 767px) 100vw, 45vw" className="object-cover object-center" /></div>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border pb-7 pt-14">
      <div className="site-container">
        <div className="flex flex-col justify-between gap-12 pb-12 md:flex-row">
          <div className="flex flex-col items-start gap-5"><a href="#top" aria-label="PAKET AT ana sayfa"><Brand /></a><p className="max-w-xs text-sm leading-relaxed text-muted-foreground">Yoldaki emeğinin, alın terinin,<br />günün sonunda cebinde kalanın hesabı.</p><p className="text-sm font-medium text-foreground">Sen paketi at. Hesabı biz yapalım.</p></div>
          <div className="grid grid-cols-2 gap-x-14 gap-y-8 sm:grid-cols-3 sm:gap-x-20">
            <div className="flex flex-col gap-4"><h3 className="text-sm font-semibold">Keşfet</h3><nav aria-label="Alt ürün menüsü" className="flex flex-col gap-3 text-sm text-muted-foreground"><a href="#hesapla" className="hover:text-foreground">Canlı hesaplayıcı</a><a href="#nasil-calisir" className="hover:text-foreground">Nasıl çalışır?</a><a href="#fiyatlar" className="hover:text-foreground">Fiyatlar</a></nav></div>
            <div className="flex flex-col gap-4"><h3 className="text-sm font-semibold">Yol arkadaşların</h3><nav aria-label="Alt topluluk menüsü" className="flex flex-col gap-3 text-sm text-muted-foreground"><a href="#ornekler" className="hover:text-foreground">Kimler için?</a><a href="#yorumlar" className="hover:text-foreground">Yoldaki hikâyeler</a><a href="#sss" className="hover:text-foreground">Sık sorulanlar</a></nav></div>
            <div className="flex flex-col items-start gap-4"><h3 className="text-sm font-semibold">İyi bilmek gerek</h3><div className="-ml-4 flex flex-col items-start gap-0.5"><InfoDialog kind="privacy">Gizlilik ve KVKK</InfoDialog><InfoDialog kind="terms">Kullanım koşulları</InfoDialog><InfoDialog kind="contact">Yardım merkezi</InfoDialog></div></div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-center text-sm text-muted-foreground sm:flex-row sm:text-left"><p>© {new Date().getFullYear()} PAKET AT. Tüm hakları saklıdır.</p><p>Yolda olanlar için, özenle tasarlandı.</p></div>
      </div>
    </footer>
  )
}
