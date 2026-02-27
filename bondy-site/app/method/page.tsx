import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'The Bondy Method™ — How we think about technical hiring',
  description: 'We run recruitment the way great engineering teams run sprints. Every search is a project with a hypothesis, a strategy, and a clear definition of done.',
}

export default function MethodPage() {
  return (
    <main className="min-h-screen bg-b-stone">
      <Nav />

      {/* Header */}
      <section className="pt-[73px] border-b border-b-stone-rule">
        <div className="px-8 md:px-16 py-20 md:py-28 max-w-5xl">
          <div className="font-mono-bondy text-[10px] tracking-widest uppercase mb-8 text-b-orange">
            The Bondy Method™
          </div>
          <h1 className="font-display text-[clamp(48px,6vw,80px)] font-black leading-tight tracking-tight mb-8 text-b-stone-text">
            Every search<br />
            is a <em className="italic text-b-orange">project.</em>
          </h1>
          <p className="text-[16px] leading-relaxed font-light max-w-xl text-b-stone-mid">
            We run recruitment the way great engineering teams run sprints — with a hypothesis, a strategy,
            measurable checkpoints, and a clear definition of done. Not "we'll keep looking". Done.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="px-8 md:px-16 py-20">
        {[
          {
            n: '01',
            title: 'Brief',
            subtitle: 'We don\'t start recruiting. We start thinking.',
            body: 'Before we open any search, we sit with you and pressure-test the brief. Most hiring failures happen at the definition stage — not the sourcing stage. What level of seniority? What work modality? What skills are truly essential versus nice-to-have? What offer will be attractive to the right person? We help you answer all of this before we move.',
            time: '1–2 days',
          },
          {
            n: '02',
            title: 'Strategy',
            subtitle: 'Every profile requires a different approach.',
            body: 'We analyze the labor market for this specific profile and design a sourcing strategy accordingly. We select the right channels, build a target list, and develop a plan to approach the highest-potential candidates. There are no templates here. A senior Rust engineer and a Head of Engineering require completely different strategies — and we know the difference.',
            time: '1–2 days',
          },
          {
            n: '03',
            title: 'Search',
            subtitle: 'Active sourcing. No job posts, no passive waiting.',
            body: 'We go find the people you need. Direct outreach, warm introductions, deep network activation. Every candidate is assessed against the brief — not just their resume, but their trajectory, their motivations, and whether this role is genuinely the right next step for them. We interview before you do.',
            time: '3–5 days',
          },
          {
            n: '04',
            title: 'Shortlist',
            subtitle: 'Not resumes. Candidates.',
            body: 'What you receive is a curated shortlist of pre-interviewed candidates, each with a full report that covers what the CV never shows. Their technical depth, their communication style, what they\'re optimizing for in their next role, and why we believe they\'re the right fit. You walk into every interview knowing exactly who you\'re talking to.',
            time: '5–7 days total',
          },
          {
            n: '05',
            title: 'Close',
            subtitle: 'We don\'t disappear after the shortlist.',
            body: 'We stay through the offer stage. We help you calibrate the offer, anticipate counteroffers, and navigate the final decision. Every placed candidate comes with a 3-month guarantee — because we stand behind our work. And because we\'ve been wrong before, and learned exactly how to be less wrong.',
            time: 'Until done',
          },
        ].map((step) => (
          <div
            key={step.n}
            className="grid grid-cols-1 md:grid-cols-[120px_1fr_200px] gap-8 md:gap-16 py-14 border-t border-b-stone-rule"
          >
            <div className="font-mono-bondy text-[11px] tracking-widest text-b-orange">
              {step.n}
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3 text-b-stone-text">
                {step.title}
              </h2>
              <div className="text-base font-medium mb-5 text-b-stone-text">
                {step.subtitle}
              </div>
              <p className="text-[14px] leading-relaxed font-light max-w-xl text-b-stone-mid">
                {step.body}
              </p>
            </div>
            <div className="flex md:justify-end md:items-start">
              <div className="border border-b-stone-rule px-4 py-2 inline-block">
                <div className="font-mono-bondy text-[9px] tracking-widest uppercase mb-1 text-b-stone-light">Timeline</div>
                <div className="font-mono-bondy text-[11px] text-b-stone-mid">{step.time}</div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="px-8 md:px-16 py-20 md:py-28 border-t border-b-stone-rule bg-b-stone-alt">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black leading-tight tracking-tight text-b-stone-text">
              Ready to run your<br />
              first <em className="italic text-b-orange">Bondy search?</em>
            </h2>
          </div>
          <div>
            <p className="text-[15px] leading-relaxed font-light mb-8 text-b-stone-mid">
              Tell us about the role, the team, and what you've tried before.
              We'll tell you honestly whether we can help and how long it'll take.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 font-mono-bondy text-[11px] tracking-widest uppercase px-8 py-4 transition-colors bg-b-orange text-b-black hover:opacity-90"
            >
              Start a search ↗
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
