import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="bg-b-black min-h-screen">
      <Nav />

      {/* -- HERO -- */}
      <section className="min-h-screen flex flex-col pt-[73px]">

        {/* Top bar */}
        <div className="border-b border-white/10 px-8 md:px-16 py-3 flex justify-between items-center">
          <span className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/20">
            Since 2008 - Technical Hiring
          </span>
          <span className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/20 hidden md:block">
            Buenos Aires - Global
          </span>
        </div>

        {/* Main hero content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 border-b border-white/10">

          {/* Left */}
          <div className="px-8 md:px-16 py-20 md:py-28 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-6 h-px bg-b-orange" />
                <span className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange">
                  The standard for technical hiring
                </span>
              </div>

              <h1 className="font-display text-[clamp(52px,7vw,88px)] font-black leading-[0.95] tracking-tight text-b-off mb-10">
                The last<br />
                recruiter<br />
                you'll ever<br />
                <em className="text-b-orange italic">need.</em>
              </h1>

              <p className="text-b-mid text-[15px] leading-relaxed font-light max-w-sm">
                Most recruiters send you candidates. We send you the right one.
                There's a significant difference   -   and we've spent 16 years perfecting it.
              </p>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-b-orange text-b-black font-mono-bondy text-[11px] tracking-widest uppercase px-7 py-4 hover:bg-b-orange/90 transition-colors"
              >
                Talk to us &#x2197;
              </Link>
              <Link
                href="/method"
                className="inline-flex items-center gap-3 border border-white/20 text-b-mid font-mono-bondy text-[11px] tracking-widest uppercase px-7 py-4 hover:border-white/40 hover:text-b-off transition-colors"
              >
                Our method &#x2192;
              </Link>
            </div>
          </div>

          {/* Right   -   stats */}
          <div className="grid grid-cols-2">
            <div className="border-b border-r border-white/10 px-8 py-10 md:px-10 md:py-14 flex flex-col justify-between">
              <span className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/30">Experience</span>
              <div>
                <div className="font-display text-[64px] md:text-[80px] font-black leading-none text-b-off tracking-tight">
                  16<span className="text-b-orange text-[40px]">+</span>
                </div>
                <div className="text-b-mid text-xs font-light mt-2 leading-relaxed">years in technical recruitment</div>
              </div>
            </div>

            <div className="border-b border-white/10 px-8 py-10 md:px-10 md:py-14 flex flex-col justify-between">
              <span className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/30">Speed</span>
              <div>
                <div className="font-display text-[64px] md:text-[80px] font-black leading-none text-b-off tracking-tight">
                  5-7<span className="text-b-orange text-[28px]">d</span>
                </div>
                <div className="text-b-mid text-xs font-light mt-2 leading-relaxed">to your first qualified candidate</div>
              </div>
            </div>

            <div className="border-b border-r border-white/10 px-8 py-10 md:px-10 md:py-14 flex flex-col justify-between">
              <span className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/30">Retention</span>
              <div>
                <div className="font-display text-[64px] md:text-[80px] font-black leading-none text-b-off tracking-tight">
                  94<span className="text-b-orange text-[28px]">%</span>
                </div>
                <div className="text-b-mid text-xs font-light mt-2 leading-relaxed">of placements still in role at 6 months</div>
              </div>
            </div>

            <div className="border-b border-white/10 px-8 py-10 md:px-10 md:py-14 flex flex-col justify-between" style={{background: '#161616'}}>
              <span className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/30">Warranty</span>
              <div>
                <div className="font-display text-[48px] md:text-[56px] font-black leading-none text-b-orange tracking-tight">
                  The Bondy<br />Method(TM)
                </div>
                <div className="text-b-mid text-xs font-light mt-3 leading-relaxed">A proprietary framework for technical hiring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- STATEMENT -- */}
      <section className="px-8 md:px-16 py-24 md:py-36 border-b border-white/10">
        <div className="max-w-4xl">
          <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-10">
            Our position
          </div>
          <h2 className="font-display text-[clamp(32px,4vw,56px)] font-black leading-tight text-b-off tracking-tight mb-8">
            We don't move fast.<br />
            We move <em className="text-b-orange italic">right.</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <p className="text-b-mid text-[15px] leading-relaxed font-light">
              Most companies treat recruitment as a numbers game   -   more resumes, more calls, more volume.
              We've always believed the opposite. Every search starts with a hypothesis and ends with certainty.
            </p>
            <p className="text-b-mid text-[15px] leading-relaxed font-light">
              That's why our clients don't come back looking for another recruiter.
              They come back because the hire worked   -   and they want that again.
            </p>
          </div>
        </div>
      </section>

      {/* -- SERVICES -- */}
      <section className="border-b border-white/10">
        <div className="px-8 md:px-16 py-12 border-b border-white/10">
          <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange">
            02   -   Services
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Hunting */}
          <div className="border-b md:border-b-0 md:border-r border-white/10 px-10 py-14 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors">
            <div>
              <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/30 mb-10">01</div>
              <h3 className="font-display text-3xl font-bold text-b-off mb-5 leading-tight tracking-tight">
                Hunting
              </h3>
              <p className="text-b-mid text-sm leading-relaxed font-light">
                You need someone hired. Not eventually   -   this quarter. We take ownership of the entire search
                and deliver a shortlist of pre-interviewed candidates within 5 to 7 business days.
                With a 3-month guarantee on every placement.
              </p>
            </div>
            <Link
              href="/services#hunting"
              className="mt-10 font-mono-bondy text-[10px] tracking-widest uppercase text-b-mid hover:text-b-orange transition-colors inline-flex items-center gap-2"
            >
              Learn more &#x2192;
            </Link>
          </div>

          {/* Pipeline */}
          <div className="border-b md:border-b-0 md:border-r border-white/10 px-10 py-14 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors">
            <div>
              <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/30 mb-10">02</div>
              <h3 className="font-display text-3xl font-bold text-b-off mb-5 leading-tight tracking-tight">
                Talent<br />Pipeline
              </h3>
              <p className="text-b-mid text-sm leading-relaxed font-light">
                You have the process. You have the interviewers. What you need is a shortlist that doesn't
                waste everyone's time. We build you a curated list of pre-vetted, ready-to-contact candidates   -  
                selected to spec, not to volume.
              </p>
            </div>
            <Link
              href="/services#pipeline"
              className="mt-10 font-mono-bondy text-[10px] tracking-widest uppercase text-b-mid hover:text-b-orange transition-colors inline-flex items-center gap-2"
            >
              Learn more &#x2192;
            </Link>
          </div>

          {/* RPO */}
          <div className="px-10 py-14 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors">
            <div>
              <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-white/30 mb-10">03</div>
              <h3 className="font-display text-3xl font-bold text-b-off mb-5 leading-tight tracking-tight">
                Embedded<br />Recruiter
              </h3>
              <p className="text-b-mid text-sm leading-relaxed font-light">
                A Bondy recruiter, inside your team, for as long as you need. Market insights in real time,
                full transparency, no agency markup. For companies with aggressive hiring plans that need
                both quality and market intelligence.
              </p>
            </div>
            <Link
              href="/services#rpo"
              className="mt-10 font-mono-bondy text-[10px] tracking-widest uppercase text-b-mid hover:text-b-orange transition-colors inline-flex items-center gap-2"
            >
              Learn more &#x2192;
            </Link>
          </div>
        </div>
      </section>

      {/* -- METHOD TEASER -- */}
      <section className="border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="px-8 md:px-16 py-20 md:py-28 border-b md:border-b-0 md:border-r border-white/10">
            <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-10">
              03   -   The Bondy Method(TM)
            </div>
            <h2 className="font-display text-[clamp(36px,4vw,56px)] font-black leading-tight tracking-tight text-b-off mb-8">
              Every search<br />is a <em className="text-b-orange italic">project.</em>
            </h2>
            <p className="text-b-mid text-[15px] leading-relaxed font-light mb-6 max-w-sm">
              We run recruitment the way great engineering teams run sprints   -   with a hypothesis,
              a strategy, measurable checkpoints, and a clear definition of done.
            </p>
            <p className="text-b-mid text-[15px] leading-relaxed font-light mb-12 max-w-sm">
              Not "we'll keep looking". Done.
            </p>
            <Link
              href="/method"
              className="inline-flex items-center gap-3 font-mono-bondy text-[11px] tracking-widest uppercase text-b-orange border-b border-b-orange/40 hover:border-b-orange pb-0.5 transition-colors"
            >
              Read the full method &#x2192;
            </Link>
          </div>

          {/* Method steps preview */}
          <div className="flex flex-col divide-y divide-white/10">
            {[
              { n: '01', title: 'Brief', desc: 'We pressure-test the role before opening the search. Most hiring failures happen here.' },
              { n: '02', title: 'Strategy', desc: 'We design the sourcing approach for this specific profile   -   not a template.' },
              { n: '03', title: 'Search', desc: 'Active sourcing, direct outreach, and qualification. No job posts, no passive waiting.' },
              { n: '04', title: 'Shortlist', desc: 'A curated list of pre-interviewed candidates with full reports. Not resumes.' },
            ].map((step) => (
              <div key={step.n} className="px-10 py-8 flex gap-8 items-start hover:bg-white/[0.02] transition-colors">
                <span className="font-mono-bondy text-[10px] text-b-orange tracking-widest mt-1 shrink-0">{step.n}</span>
                <div>
                  <div className="font-display text-lg font-bold text-b-off mb-2 tracking-tight">{step.title}</div>
                  <div className="text-b-mid text-sm font-light leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- FOR VCS -- */}
      <section className="px-8 md:px-16 py-20 md:py-28 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-8">
              For venture capital
            </div>
            <h2 className="font-display text-[clamp(32px,3.5vw,48px)] font-black leading-tight tracking-tight text-b-off">
              Your portfolio needs teams.<br />
              <em className="text-b-orange italic">Good</em> ones.<br />
              We know the difference.
            </h2>
          </div>
          <div>
            <p className="text-b-mid text-[15px] leading-relaxed font-light mb-6">
              We work with VC-backed companies at every stage   -   from the first engineering hire to scaling
              a team from 5 to 50. We understand the velocity you need and the quality you can't compromise on.
            </p>
            <p className="text-b-mid text-[15px] leading-relaxed font-light mb-10">
              We also work directly with funds that want a trusted technical recruiting partner
              across their portfolio.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-mono-bondy text-[11px] tracking-widest uppercase text-b-orange border-b border-b-orange/40 hover:border-b-orange pb-0.5 transition-colors"
            >
              Talk to us about your portfolio &#x2192;
            </Link>
          </div>
        </div>
      </section>

      {/* -- CTA FINAL -- */}
      <section className="px-8 md:px-16 py-24 md:py-36 text-center">
        <div className="font-mono-bondy text-[10px] tracking-widest uppercase text-b-orange mb-8">
          Ready?
        </div>
        <h2 className="font-display text-[clamp(40px,6vw,80px)] font-black leading-tight tracking-tight text-b-off mb-6">
          Tell us what<br />you need to <em className="text-b-orange italic">build.</em>
        </h2>
        <p className="text-b-mid text-[15px] font-light mb-12 max-w-md mx-auto leading-relaxed">
          No forms. No RFP. Just a conversation about what you're building and who you need.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-b-orange text-b-black font-mono-bondy text-[11px] tracking-widest uppercase px-10 py-5 hover:bg-b-orange/90 transition-colors"
        >
          Start the conversation &#x2197;
        </Link>
      </section>

      <Footer />
    </main>
  )
}
