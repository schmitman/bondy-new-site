import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Thinking — Bondy',
  description: 'Frameworks, market insights, and ideas on technical hiring from the Bondy team.',
}

const articles = [
  {
    slug: 'why-most-job-briefs-are-wrong',
    label: 'Frameworks',
    date: 'Feb 2025',
    title: 'Why most job briefs are wrong before the search starts',
    excerpt: 'The single most common reason a search fails isn\'t sourcing. It\'s an imprecise brief. Here\'s how to write one that actually works.',
    readTime: '5 min',
  },
  {
    slug: 'senior-engineer-market-2025',
    label: 'Market',
    date: 'Jan 2025',
    title: 'The senior engineer market in Latin America: Q1 2025 update',
    excerpt: 'Compensation benchmarks, demand signals, and what\'s changed since the 2023 tech slowdown.',
    readTime: '8 min',
  },
  {
    slug: 'six-month-retention',
    label: 'Data',
    date: 'Dec 2024',
    title: 'Why we measure retention at 6 months — not at hire',
    excerpt: 'The metric that changed how we think about quality. And why most agencies deliberately avoid measuring it.',
    readTime: '4 min',
  },
  {
    slug: 'what-vps-of-engineering-actually-want',
    label: 'Clients',
    date: 'Nov 2024',
    title: 'What VPs of Engineering actually want from a recruiter',
    excerpt: 'After 16 years of conversations, we\'ve learned that the most important thing isn\'t the shortlist. It\'s knowing when to say no.',
    readTime: '6 min',
  },
]

export default function ThinkingPage() {
  return (
    <main style={{background: '#F9F8F6'}} className="min-h-screen">
      <Nav />

      <section className="pt-[73px] border-b" style={{borderColor: '#EBEBEB'}}>
        <div className="px-8 md:px-16 py-20 md:py-28">
          <div className="font-mono-bondy text-[10px] tracking-widest uppercase mb-8" style={{color: '#E05C00'}}>
            Thinking
          </div>
          <h1 className="font-display text-[clamp(48px,6vw,72px)] font-black leading-tight tracking-tight mb-6" style={{color: '#111111'}}>
            Ideas, frameworks,<br />
            and <em className="italic" style={{color: '#E05C00'}}>market intelligence.</em>
          </h1>
          <p className="text-[16px] leading-relaxed font-light max-w-xl" style={{color: '#888885'}}>
            We write about what we see in the market, how we think about hiring, and what works.
            No content marketing. Just things we've found worth writing down.
          </p>
        </div>
      </section>

      <section className="divide-y" style={{borderColor: '#EBEBEB'}}>
        {articles.map((article) => (
          <article key={article.slug} className="px-8 md:px-16 py-12 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 hover:bg-white/50 transition-colors cursor-pointer border-b" style={{borderColor: '#EBEBEB'}}>
            <div className="flex flex-row md:flex-col justify-between md:justify-start gap-4 md:gap-3">
              <div className="font-mono-bondy text-[10px] tracking-widest uppercase" style={{color: '#E05C00'}}>{article.label}</div>
              <div className="font-mono-bondy text-[10px] tracking-widest" style={{color: '#D8D6D2'}}>{article.date}</div>
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-4" style={{color: '#111111'}}>
                {article.title}
              </h2>
              <p className="text-[14px] leading-relaxed font-light mb-6" style={{color: '#888885'}}>
                {article.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <span className="font-mono-bondy text-[10px] tracking-widest uppercase" style={{color: '#E05C00'}}>
                  Read → 
                </span>
                <span className="font-mono-bondy text-[10px]" style={{color: '#D8D6D2'}}>
                  {article.readTime} read
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <Footer />
    </main>
  )
}
