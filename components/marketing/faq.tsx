'use client'

import { ArrowUpRight } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const questions = [
  { question: 'PAKET AT sadece moto-kuryeler için mi?', answer: 'Hayır. Moto-kuryeler, bisikletli ve bağımsız kuryeler, paket taşımacıları, taksi ve minibüs şoförleri için tasarlandı. Canlı hesaplayıcıda çalışma şeklini seçebilir, örnek gelir ve giderleri kendi rakamlarınla değiştirebilirsin.' },
  { question: 'Çalıştığım platformdaki hesabımı bağlamam gerekiyor mu?', answer: 'Gerekmiyor. Getir, Yemeksepeti, Trendyol Go veya bağımsız işlerinden elde ettiğin toplam geliri kendin girersin. PAKET AT bu platformlardan bağımsızdır; platform şifreni istemez, hesabına bağlanmaz ve otomatik veri aktarımı yapmaz.' },
  { question: 'Bakım ve sigorta gibi dönemsel giderleri nasıl eklerim?', answer: 'Bu masrafların bir çalışma gününe düşen payını gir. Örneğin ayda 600 TL sigorta ödüyor ve 20 gün çalışıyorsan günlük payın 30 TL olur. Bakım için de aynı mantığı kullanabilirsin. Sonuç yalnızca girilen masrafları içerir; vergi, sosyal güvenlik ve amortisman ayrıca eklenmediyse dahil değildir.' },
  { question: 'Ücretsiz deneyebilir miyim? Verilerim kaydediliyor mu?', answer: 'Evet, canlı hesaplayıcı ücretsizdir. Üyelik ve kredi kartı gerekmez. Rakamların yalnızca açık sayfada işlenir, sunucuya veya tarayıcı depolamasına kaydedilmez; sayfayı yenileyince sıfırlanır. Sonucunu saklamak için “Özeti indir” seçeneğini kullanabilirsin. Ücretli üyelik planları henüz açılmadı.' },
]

export function FAQ() {
  return (
    <section id="sss" aria-labelledby="faq-title" className="section-space">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.3fr] lg:gap-24">
          <div className="flex flex-col items-start gap-4"><p className="eyebrow">Aklına takılmasın.</p><h2 id="faq-title" className="section-title">Yola çıkmadan<br />birkaç cevap.</h2><p className="section-description">Uzun uzun anlatmak yerine,<br />merak ettiğin yerden başlayalım.</p><a href="#hesapla" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground">Kendin dene, daha iyi anla<ArrowUpRight className="size-4" aria-hidden="true" /></a></div>
          <Accordion className="faq-list" defaultValue={[]}>
            {questions.map(({ question, answer }, index) => <AccordionItem key={question} value={`question-${index}`}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
