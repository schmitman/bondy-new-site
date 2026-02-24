import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Services   -   Bondy',
  description: 'Three ways to work with Bondy: Hunting, Talent Pipeline, and Embedded Recruiter.',
}

export default function ServicesPage() {
  return (
    <main className="bg-b-black min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-[73px] border-b border-white/10">
        <div className="px-8 md:px-16 py-20 md:py-28">
          <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-8">
            Services
          </div>
          <h1 className="font-display text-[clamp(48px,6vw,80px)] font-black leading-tight tracking-tight text-b-off mb-8">
            Three ways<br />
            we can <em className="text-b-orange italic">work together.</em>
          </h1>
          <p className="text-b-mid text-[16px] leading-relaxed font-light max-w-xl">
            Different hiring challenges require different approaches.
            We've designed each service around a specific type of need.
          </p>
        </div>
      </section>

      {/* Service 01   -   Hunting */}
      <section id="hunting" className="border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-b md:border-b-0 md:border-r border-white/10 px-8 md:px-16 py-20">
            <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/30 mb-10">01</div>
            <h2 className="font-display text-[clamp(36px,4vw,56px)] font-black leading-tight tracking-tight text-b-off mb-6">
              Hunting
            </h2>
            <p className="text-b-mid text-[15px] leading-relaxed font-light mb-6">
              You need someone hired. Not eventually   -   this quarter.
            </p>
            <p className="text-b-mid text-[15px] leading-relaxed font-light">
              We take full ownership of the search, from brief to signed offer.
              You get a curated shortlist of pre-interviewed candidates within 5 to 7 business days,
              each with a detailed report. We stay through the close. Every placement comes with a
              3-month guarantee   -   if it doesn't work out, we search again at no extra cost.
            </p>
          </div>
          <div className="px-8 md:px-16 py-20 flex flex-col justify-between">
            <div className="space-y-8">
              {[
                ['What's included', 'Full brief, sourcing strategy, direct search, candidate interviews, detailed reports, offer support.'],
                ['Timeline', '5-7 business days to first qualified shortlist. Offer close typically within 3-5 weeks.'],
                ['Guarantee', '3-month placement warranty. We search again if the hire doesn\'t work out.'],
                ['Best for', 'Specific roles that need to be filled urgently. Senior or hard-to-find profiles.'],
              ].map(([label, text]) => (
                <div key={label} className="border-l-2 border-b-orange/30 pl-5">
                  <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-2">{label}</div>
                  <p className="text-b-mid text-sm font-light leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-12 inline-flex items-center gap-3 bg-b-orange text-b-black font-mono-bondy text-[11px] tracking-widest uppercase px-7 py-4 hover:bg-b-orange/90 transition-colors self-start"
            >
              Start a search ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Service 02   -   Pipeline */}
      <section id="pipeline" className="border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-b md:border-b-0 md:border-r border-white/10 px-8 md:px-16 py-20">
            <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/30 mb-10">02</div>
            <h2 className="font-display text-[clamp(36px,4vw,56px)] font-black leading-tight tracking-tight text-b-off mb-6">
              Talent<br />Pipeline
            </h2>
            <p className="text-b-mid text-[15px] leading-relaxed font-light mb-6">
              You have the process. You have the interviewers.
              What you need is a shortlist that doesn't waste everyone's time.
            </p>
            <p className="text-b-mid text-[15px] leading-relaxed font-light">
              We build you a curated list of pre-vetted, ready-to-contact candidates   -  
              selected to spec, not to volume. You run the interviews. We make sure
              the people in the room are worth interviewing.
            </p>
          </div>
          <div className="px-8 md:px-16 py-20 flex flex-col justify-between">
            <div className="space-y-8">
              {[
                ['What's included', 'Candidate sourcing, profile qualification, lightweight reports, and a curated delivery.'],
                ['Timeline', 'Typically 3-5 days to first pipeline delivery.'],
                ['Best for', 'Companies with strong internal interview processes that need better top-of-funnel quality.'],
                ['Difference vs Hunting', 'We handle sourcing and qualification. You handle interviews and close.'],
              ].map(([label, text]) => (
                <div key={label} className="border-l-2 border-b-orange/30 pl-5">
                  <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-2">{label}</div>
                  <p className="text-b-mid text-sm font-light leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-12 inline-flex items-center gap-3 border border-white/20 text-b-mid font-mono-bondy text-[11px] tracking-widest uppercase px-7 py-4 hover:border-white/40 hover:text-b-off transition-colors self-start"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </section>

      {/* Service 03   -   Embedded */}
      <section id="rpo" className="border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-b md:border-b-0 md:border-r border-white/10 px-8 md:px-16 py-20">
            <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/30 mb-10">03</div>
            <h2 className="font-display text-[clamp(36px,4vw,56px)] font-black leading-tight tracking-tight text-b-off mb-6">
              Embedded<br />Recruiter
            </h2>
            <p className="text-b-mid text-[15px] leading-relaxed font-light mb-6">
              A Bondy recruiter, inside your team, for as long as you need.
            </p>
            <p className="text-b-mid text-[15px] leading-relaxed font-light">
              Market insights in real time, full transparency, no agency markup.
              For companies with aggressive hiring plans that need both quality and market intelligence.
              The recruiter works as part of your team, understands your culture deeply,
              and brings the full weight of the Bondy network.
            </p>
          </div>
          <div className="px-8 md:px-16 py-20 flex flex-col justify-between">
            <div className="space-y-8">
              {[
                ['What's included', 'Full-time or part-time embedded recruiter, market salary reports, hiring strategy advisory.'],
                ['Engagement', 'Minimum 3 months. Month-to-month renewable.'],
                ['Best for', 'Series A+ companies scaling from 10 to 50+ engineers. High-velocity hiring plans.'],
                ['Advantage', 'You get agency-quality sourcing with in-house commitment and market data.'],
              ].map(([label, text]) => (
                <div key={label} className="border-l-2 border-b-orange/30 pl-5">
                  <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-2">{label}</div>
                  <p className="text-b-mid text-sm font-light leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-12 inline-flex items-center gap-3 border border-white/20 text-b-mid font-mono-bondy text-[11px] tracking-widest uppercase px-7 py-4 hover:border-white/40 hover:text-b-off transition-colors self-start"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-24 text-center">
        <h2 className="font-display text-[clamp(36px,5vw,64px)] font-black leading-tight tracking-tight text-b-off mb-6">
          Not sure which<br />
          service fits? <em className="text-b-orange italic">Ask us.</em>
        </h2>
        <p className="text-b-mid text-[15px] font-light mb-10 max-w-md mx-auto leading-relaxed">
          We'll tell you honestly. Sometimes the answer is none of them   -  
          and we'd rather tell you now than waste your time.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-b-orange text-b-black font-mono-bondy text-[11px] tracking-widest uppercase px-10 py-5 hover:bg-b-orange/90 transition-colors"
        >
          Start the conversation ↗
        </Link>
      </section>

      <Footer />
    </main>
  )
}
