'use client'

import { useState, type ReactNode } from 'react'
import { ArrowRight, CircleHelp, LockKeyhole, ShieldCheck } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type InfoKind = 'login' | 'privacy' | 'terms' | 'contact'

const information = {
  login: {
    icon: LockKeyhole,
    title: 'Yol arkadaşın hazırlanıyor.',
    description: 'PAKET AT hesap girişi henüz açılmadı. Ama kazancını görmek için beklemene gerek yok.',
    paragraphs: ['Canlı hesaplayıcıyı üyelik olmadan, ücretsiz deneyebilirsin. Rakamların yalnızca bu sayfada işlenir; hesap oluşturulmaz ve kayıt yapılmaz.'],
  },
  privacy: {
    icon: ShieldCheck,
    title: 'Gizlilik, laf olsun diye değil.',
    description: 'Bu tanıtım sürümünde hesaplama için kişisel bilgi istemiyoruz.',
    paragraphs: ['Girdiğin gelir ve gider tutarları yalnızca açık tarayıcı sayfasında hesaplanır. Sunucuya, yerel depolamaya veya bir hesaba kaydedilmez. Sayfayı yenilediğinde sıfırlanır.', 'Bu sürümde reklam izleyicileri, analitik çerezleri, üyelik ve ödeme altyapısı bulunmaz. Barındırma sağlayıcısı güvenlik ve hizmet sunumu için teknik erişim kayıtları işleyebilir.', 'Üyelik hizmeti açılmadan önce veri sorumlusu bilgileri ve ilgili KVKK aydınlatma metni ayrıca yayımlanacaktır.'],
  },
  terms: {
    icon: CircleHelp,
    title: 'Küçük yazılar, açık kurallar.',
    description: 'Hesaplayıcı, girdiğin rakamlara göre tahmini bir gün sonu sonucu sunar.',
    paragraphs: ['Sonuç; gelirinden yakıt, bakım, sigorta, yemek ve diğer girilen giderlerin çıkarılmasıyla hesaplanır. Vergi, sosyal güvenlik ve amortisman ayrıca girilmediyse sonuca dahil değildir. Bu araç muhasebe veya vergi danışmanlığı yerine geçmez.', 'Önizlemedeki tutarlar ve haftalık grafik örnek verilerdir. Referans bölümündeki sözler temsili kullanım senaryolarıdır; doğrulanmış müşteri değerlendirmeleri değildir.', 'Ücretli planlar önerilen lansman paketleridir; henüz satın alınamaz. Bu sitede ödeme alınmaz. Platform isimleri kullanım bağlamını açıklar; ortaklık veya doğrudan veri entegrasyonu anlamına gelmez.'],
  },
  contact: {
    icon: CircleHelp,
    title: 'Aklında bir soru mu var?',
    description: 'Hesaplayıcının kullanımı ve PAKET AT hakkında en sık gelen soruları bir araya getirdik.',
    paragraphs: ['Günlük gelirini ve masraflarını “Rakamlarını gir” alanına yaz. Bakım ve sigorta gibi dönemsel masrafların yalnızca bir iş gününe düşen payını kullan.', 'Bu tanıtım sürümünde canlı destek kanalı henüz açık değil. Kullanım detaylarını sık sorulanlar bölümünde bulabilirsin.'],
  },
}

export function InfoDialog({ kind, children, className }: { kind: InfoKind; children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false)
  const info = information[kind]
  const Icon = info.icon
  const href = kind === 'contact' ? '#sss' : '#hesapla'

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant={kind === 'login' ? 'outline' : 'ghost'} size="nav" className={className} />}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-6" aria-hidden="true" />
        </div>
        <DialogHeader>
          <DialogTitle>{info.title}</DialogTitle>
          <DialogDescription>{info.description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
          {info.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <a href={href} onClick={() => setOpen(false)} className={cn(buttonVariants({ size: 'cta' }), 'w-full')}>
          {kind === 'contact' ? 'Sık sorulanlara git' : 'Ücretsiz hesaplayıcıyı dene'}
          <ArrowRight data-icon="inline-end" aria-hidden="true" />
        </a>
      </DialogContent>
    </Dialog>
  )
}
