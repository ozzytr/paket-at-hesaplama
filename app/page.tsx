import { SiteHeader } from '@/components/marketing/site-header'
import { Hero } from '@/components/marketing/hero'
import { ProductPreview } from '@/components/marketing/product-preview'
import { HowItWorks } from '@/components/marketing/how-it-works'
import { CourierGallery } from '@/components/marketing/courier-gallery'
import { Pricing } from '@/components/marketing/pricing'
import { Testimonials } from '@/components/marketing/testimonials'
import { FAQ } from '@/components/marketing/faq'
import { ClosingCTA, SiteFooter } from '@/components/marketing/site-footer'

export default function Page() {
  return (
    <div id="top" className="overflow-x-clip">
      <SiteHeader />
      <main id="ana-icerik">
        <Hero />
        <ProductPreview />
        <HowItWorks />
        <CourierGallery />
        <Pricing />
        <Testimonials />
        <FAQ />
        <ClosingCTA />
      </main>
      <SiteFooter />
    </div>
  )
}

