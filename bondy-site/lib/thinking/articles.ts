// lib/thinking/articles.ts
// Source of truth for all /thinking articles — EN and ES.
// Each article has: slug, category, date, readingTime, meta (title + description), and content (full HTML string).

export type ArticleCategory =
  | 'Trends' | 'Bondy Method' | 'Market intel' | 'Leadership' | 'Culture'
  | 'Tendencias' | 'Método Bondy' | 'Inteligencia de mercado' | 'Liderazgo' | 'Cultura'
export type Lang = 'en' | 'es'

export interface DataCallout {
  num: string           // e.g. '+38%'
  label: string         // e.g. 'Variación promedio · 2023–2025'
  desc: string          // supporting text
}

export interface PullQuote {
  text: string
  cite?: string
}

export interface Article {
  slug: string
  lang: Lang
  category: ArticleCategory
  date: string          // ISO 8601 — e.g. '2026-04-15'
  readingTime: string   // e.g. '8 min read'
  title: string
  excerpt: string
  meta: {
    title: string
    description: string
  }
  content: string       // Full article body as HTML

  // Optional fields for the v4 editorial design.
  // When absent, the UI falls back to sensible defaults.
  author?: string            // e.g. 'Mara Schmitman'
  authorInitials?: string    // e.g. 'MS' — used in avatars. Max 2 chars.
  authorRole?: string        // e.g. 'Founder, Bondy Group'
  authorBio?: string         // short paragraph for the AuthorBio block
  tags?: string[]            // small inline tags in the hero
  quoteImage?: string        // multi-line string (\n as separator). Max 3 lines, max 6 words per line. Last line gets the green underline.
  pullQuote?: PullQuote      // rendered as a green-bordered block in the body
  dataCallout?: DataCallout  // rendered as a green-number stat card in the body
  featured?: boolean         // if true, surfaced at the top of the /thinking list
}

// ─────────────────────────────────────────────
// ENGLISH ARTICLES
// ─────────────────────────────────────────────

const en: Article[] = [
  {
    slug: 'how-to-hire-software-engineers-in-argentina',
    lang: 'en',
    category: 'Trends',
    date: '2026-04-15',
    readingTime: '8 min read',
    title: 'How to hire software engineers in Argentina',
    excerpt: 'A practical guide to the hiring process from the inside — not from a platform that wants to close a deal, but from a firm that has been placing tech talent in Argentina since 2008.',
    meta: {
      title: 'How to Hire Software Engineers in Argentina — Bondy',
      description: 'A practical guide to hiring engineers in Argentina: talent pool, salary benchmarks, contracting options, and what actually slows searches down. From a Buenos Aires recruiting firm with 18+ years in market.',
    },
    content: `
<p>Argentina has become one of the more serious options for US and European engineering teams that need to hire without burning through budget. The country produces solid engineers, most of them USD-denominated and accustomed to working with distributed teams. Buenos Aires alone concentrates over 85% of the country's developer talent.</p>
<p>This guide covers what the hiring process actually looks like from the inside — not from a platform that wants to close a deal, but from a recruiting firm that has been placing tech talent in Argentina since 2008.</p>

<h2>Why Argentina, specifically</h2>
<p>There are a few things that distinguish Argentina from other LATAM markets that tend to get lumped together.</p>
<p>First, English. Argentina ranks in the "High" band of EF's 2024 English Proficiency Index and sits near the top of the region. That matters in practice: senior engineers participate in standups, write specs, and push back on product decisions in English without friction.</p>
<p>Second, the timezone. Buenos Aires is UTC-3, which means real overlap with US East Coast teams without requiring anyone to work at 7am or 11pm.</p>
<p>Third, the salaries. According to verified payroll data from Howdy covering 12,500+ developers across LATAM, Argentina leads the region with an average software engineer salary of $63,000 USD annually. That's still 2.5 to 3x below comparable US rates, but it reflects a market that has matured significantly since 2021.</p>
<p>For context: a senior engineer in Argentina typically earns $46,000–$82,000 USD per year depending on stack and seniority. Full-stack and AI/ML specialists can reach $85,000–$100,000. These are real numbers from real contracts — not estimates from job boards.</p>

<h2>What the talent pool actually looks like</h2>
<p>Argentina has roughly 115,000 software developers according to Statista's 2023 count. The number has grown since. Buenos Aires, Córdoba, and Rosario are the main hubs, with the capital representing the majority of available senior talent.</p>
<p>The most available profiles tend to be Backend engineers, Python developers, Full-Stack (React/Node), and Data engineers. Cloud and DevOps profiles are fewer and command a premium — $35,000–$60,000 USD annually for mid-to-senior roles.</p>
<p>One thing worth naming: the senior layer is thin. This is not unique to Argentina — it's a feature of any market that has been heavily recruited by US companies for the past five years. Many of the engineers with 7–10 years of experience are either locked into existing remote arrangements, passively looking at best, or asking for compensation that reflects the competition for their profile.</p>
<p>If you're looking for a senior Backend engineer with production Python experience and a track record with distributed systems, you're not fishing in a pond. You're fishing in a very specific stretch of a river.</p>

<h2>The actual process</h2>
<p>Here is how a well-run search works, in order:</p>
<p><strong>1. Define the role precisely — before you start sourcing.</strong><br>
This sounds obvious and is almost never done well. "Senior Backend Engineer" is not a brief. A good brief names the stack, the codebase complexity, the team structure, the seniority level with examples, the reporting line, and — critically — what "good" looks like in the first 90 days.</p>
<p><strong>2. Source actively, not reactively.</strong><br>
Posting a job and waiting is not a hiring strategy for senior engineers in Argentina. The profiles you want are not refreshing job boards. They need to be found, approached, and given a reason to engage.</p>
<p><strong>3. Screen before you interview.</strong><br>
A structured screening process saves everyone time. The goal is to qualify candidates on the basics — English, seniority, availability, compensation expectations, motivation — before scheduling a technical interview with your engineering team.</p>
<p><strong>4. Move at a realistic pace.</strong><br>
The best Argentine engineers often have more than one process open at the same time. "We'll get back to you in two weeks" is an offer to your competitor.</p>
<p><strong>5. Make an offer that reflects the market.</strong><br>
For senior roles in Buenos Aires working for a US company, competitive total compensation is $50,000–$75,000 USD annually depending on stack and scope. Offers below $45,000 for someone with five or more years of experience are rejected in the first conversation.</p>

<h2>The contracting question</h2>
<p>Most Argentine engineers working for US companies operate as contractors rather than employees. The most common structures are:</p>
<ul>
<li><strong>Direct contractor:</strong> The engineer invoices in USD, typically through a local Sociedad Unipersonal or a third-party platform. Simple, low overhead.</li>
<li><strong>EOR (Employer of Record):</strong> A third-party entity employs the engineer locally and invoices the US company. More compliance coverage, higher monthly cost ($5,900–$7,150/month fully loaded, per 2026 benchmarks from Howdy).</li>
<li><strong>Local entity:</strong> Viable only if you're building a team of 10+ people and want permanent infrastructure in Argentina.</li>
</ul>

<h2>What slows searches down</h2>
<p>After running technical searches in Argentina for over 17 years, these are the patterns that consistently delay or kill a hire:</p>
<ul>
<li><strong>Briefs that change mid-search.</strong> When the role shifts after sourcing has started, you don't just lose time — you lose candidates who were qualified for the original role and now aren't.</li>
<li><strong>Interview processes with too many rounds.</strong> More than three interviews for a senior engineer is unusual. More than four is a signal that the company can't decide.</li>
<li><strong>Compensation that's out of sync with the market.</strong> Budget locked in two years ago doesn't reflect 2025 rates.</li>
<li><strong>No clear decision-maker.</strong> When the hiring decision requires alignment from four people across two time zones, offers take a week to generate.</li>
</ul>

<h2>Summary</h2>
<p>Hiring software engineers in Argentina is a real option, and for many US companies it's a good one. The talent is there. The English is there. The timezone overlap is there. The cost difference is still material.</p>
<p>What it requires is a specific brief, active sourcing, a structured process, and competitive compensation from day one. The companies that treat Argentina as a discount market find that — and are consistently disappointed. The ones that treat it as a quality market, and build accordingly, build teams that stick.</p>

<hr>
<p class="article-sources"><strong>Sources:</strong> Howdy <em>LatAm Software Engineer Cost Benchmarks 2026</em> (verified payroll, 12,500+ developers); Huntly.ai <em>Software Developer Salaries in Argentina 2025</em>; Statista 2023 developer count via Terminal.io; EF English Proficiency Index 2024; Arc.dev <em>Remote Software Developer Salary in Argentina 2026</em>.</p>
`,
  },

  {
    slug: 'what-does-technical-recruiting-cost-in-latam',
    lang: 'en',
    category: 'Trends',
    date: '2026-04-15',
    readingTime: '7 min read',
    title: 'What does technical recruiting cost in LATAM?',
    excerpt: 'Before a CTO hires a recruiting firm to find engineers in Latin America, they usually ask the same question: what is this going to cost? A genuine breakdown of salary benchmarks, recruiter fees, and the hidden costs that surface mid-process.',
    meta: {
      title: 'What Does Technical Recruiting Cost in LATAM? — Bondy',
      description: 'A transparent breakdown of technical recruiting costs in LATAM: salary benchmarks for Argentina, recruiter fee models, EOR vs direct contracting, and the real cost of a slow or failed hire.',
    },
    content: `
<p>Before a CTO hires a recruiting firm to find engineers in Latin America, they usually ask the same question: what is this going to cost?</p>
<p>It's a reasonable question and a genuinely difficult one to answer, because recruiting fees in LATAM aren't standardized and the pricing models are inconsistent enough that comparing them directly is harder than it looks. This article breaks down the actual cost structure — salary benchmarks, recruiter fees, and the hidden costs that tend to surface mid-process.</p>
<p>We're a Buenos Aires-based recruiting firm and we've been doing this since 2008. These numbers come from our own experience, from verified market data, and from conversations with clients and candidates on both sides of these transactions.</p>

<h2>The salary side</h2>
<p>Any cost calculation starts with what you're going to pay the engineer. These are current (2025–2026) benchmarks for USD-denominated roles in Argentina:</p>
<table>
<thead><tr><th>Seniority</th><th>Annual salary (USD)</th></tr></thead>
<tbody>
<tr><td>Junior (0–2 years)</td><td>$21,000–$28,000</td></tr>
<tr><td>Mid-level (3–5 years)</td><td>$34,000–$45,000</td></tr>
<tr><td>Senior (5+ years)</td><td>$46,000–$82,000</td></tr>
<tr><td>Senior specialized (AI/ML, Go, Rust)</td><td>$80,000–$100,000</td></tr>
</tbody>
</table>
<p>Argentina leads LATAM in average developer salary at $63,000 annually (Howdy, 2025), which reflects years of USD-denominated contracts with international companies. Other countries in the region are catching up: Colombia and Chile have seen salary growth of 15–18% year-over-year in senior technical roles.</p>
<p>For context: the equivalent senior engineer role in the US costs $105,000–$160,000 in base salary. Even fully loaded, a senior Argentine engineer costs $85,000–$95,000 per year. The gap is still substantial.</p>

<h2>The recruiting fee</h2>
<p>This is where the pricing models diverge.</p>
<p><strong>Contingency (percentage of first-year salary):</strong> The most common model for boutique technical recruiting firms. Fees typically range from 15% to 25% of the candidate's first-year gross salary. On a $60,000 annual salary, that's $9,000–$15,000 per placement. No upfront cost; you pay only when the hire is made.</p>
<p><strong>Retained search:</strong> A portion of the fee is paid upfront as a retainer, with the remainder paid at placement. Standard in executive search and for hard-to-fill senior roles. Total fees are similar to contingency but the risk is shared.</p>
<p><strong>Flat fee:</strong> Some platforms charge a fixed fee regardless of salary — typically $2,500–$5,000 per placement. The trade-off is depth: at that price, you're getting a database search, not active hunting.</p>
<p><strong>Percentage of monthly invoice (staffing/EOR model):</strong> When the firm manages employment compliance as well as recruiting, they typically charge 15–25% of the developer's monthly salary on top of the salary itself.</p>

<h2>The employment structure adds cost</h2>
<p>Recruiting fees are one line item. The other is how you're going to pay the engineer once hired.</p>
<ul>
<li><strong>Direct contractor:</strong> Lowest overhead. Some legal exposure around misclassification depending on jurisdiction. For early hires at Series A or B stage, the most common path.</li>
<li><strong>EOR (Employer of Record):</strong> More compliance coverage. Fully loaded monthly cost through EOR services runs $5,900–$7,150 for a senior engineer (Howdy 2026 data).</li>
<li><strong>Local entity:</strong> Only worth the overhead if you're building a team of 10 or more people long-term.</li>
</ul>

<h2>The cost of a slow process</h2>
<p>This one doesn't show up on any invoice but it's real. Every month a senior engineering role stays open has a cost. Product timelines slip. Existing engineers absorb the load. Technical debt accumulates. In the US market, the average cost of an unfilled senior engineer role is estimated at $30,000–$50,000 per month in lost productivity (SHRM, 2023 data). In LATAM the numbers are smaller in absolute terms but the dynamic is identical.</p>
<p>A recruiting firm that charges 20% but fills the role in 45 days costs less than one that charges 15% and runs a 90-day process — not counting the productivity gap.</p>

<h2>The cost of the wrong hire</h2>
<p>The standard estimate for the cost of a failed senior hire is 1.5–2x annual salary (Society for Human Resource Management). For a $60,000 engineer, that's $90,000–$120,000 when you count the recruiting cost, onboarding time, lost productivity, and the cost of starting the process over.</p>

<h2>What to budget</h2>
<p>For a realistic planning number, budget the following for a single senior technical hire in Argentina:</p>
<ul>
<li><strong>Annual salary:</strong> $50,000–$75,000 (depending on stack and seniority)</li>
<li><strong>Recruiting fee (one-time):</strong> $10,000–$18,000 (15–25% contingency)</li>
<li><strong>EOR or contracting setup:</strong> $300–$700/month ongoing, or a one-time legal fee of $500–$1,500 for direct contractor setup</li>
<li><strong>Total first-year cost:</strong> $62,000–$95,000 fully loaded</li>
</ul>
<p>Compare that to the US equivalent: $170,000–$200,000+ fully loaded for a comparable senior engineer. The math still works significantly in LATAM's favor.</p>

<hr>
<p class="article-sources"><strong>Sources:</strong> Howdy <em>LatAm Software Engineer Cost Benchmarks 2026</em>; Huntly.ai <em>Software Developer Salaries in Argentina 2025</em>; Teilur Talent <em>LATAM Developer Salary Report 2026</em>; SHRM cost-of-failed-hire estimates; US BLS software engineering employment data via Terminal.io.</p>
`,
  },

  {
    slug: 'why-we-stop-a-search-when-fewer-than-1-in-4-candidates-advance',
    lang: 'en',
    category: 'Bondy Method',
    date: '2026-04-15',
    readingTime: '8 min read',
    title: 'Why we stop a search when fewer than 1 in 4 candidates advance',
    excerpt: 'When fewer than one in four candidates we present advance past the first interview, we stop the search and go back to the brief. Not because the candidates are weak. Because the data is telling us something fundamental is misaligned.',
    meta: {
      title: 'Why We Stop a Search When Fewer Than 1 in 4 Candidates Advance — Bondy',
      description: 'The 1-in-4 rule: how Bondy uses candidate advance rates as a diagnostic signal, why most recruiting firms ignore this data, and what a recalibration conversation actually looks like.',
    },
    content: `
<p>At some point in every search, there's a moment when the data tells you something is wrong.</p>
<p>For us, that signal has a specific shape: when fewer than one in four candidates we present advance past the first interview stage, we stop the search and go back to the brief.</p>
<p>Not because the candidates are weak. Usually they're not. We stop because that conversion rate tells us something fundamental is misaligned between what the client thinks they're hiring for and what we're actually sourcing. Running more candidates through a broken process doesn't fix the process.</p>
<p>This is the rule we call 1-in-4, and it's been one of the most useful constraints we've built into how we work.</p>

<h2>Where the rule comes from</h2>
<p>I've been doing technical recruiting since 2007. For the first several years, the default assumption — mine, and most firms' — was that a low advance rate meant the sourcing needed to improve. More candidates, better channels, different search strings.</p>
<p>That's sometimes true. But it's not usually the real problem.</p>
<p>The more common pattern is this: the brief was incomplete when the search started. Something critical was left undefined. What "senior" means in this team. How much autonomy the role actually requires. Whether the client wants someone to lead or someone to execute. What the engineering culture is like on a Tuesday afternoon when the sprint is going sideways.</p>
<p>When those things are undefined, interviewers apply their own filters — different filters, often contradictory ones. The process generates noise, not signal. The 1-in-4 rule was our response to that pattern. It's not a benchmark for quality — it's a diagnostic trigger.</p>

<h2>What the number actually measures</h2>
<p>After the first client interview — typically a technical screen or initial conversation with an engineering lead — we track how many candidates advance to the next stage. If fewer than 25% of the candidates we've presented are moving forward, that's the signal.</p>
<p>We chose first interview as the measurement point because it's early enough to course-correct before significant time has been spent on both sides, and late enough that we're not measuring our own pre-screening.</p>

<h2>What a recalibration actually looks like</h2>
<p>When we hit the threshold, we call the client. Not to report the number — to understand it. The conversation usually starts with the rejections. We ask about each candidate who didn't advance: not just "what was wrong" but "what specifically was missing."</p>
<p>Some examples of what we've found:</p>
<ul>
<li><strong>The seniority definition was wrong.</strong> The brief said "senior" but the interviewers were evaluating against a staff-level bar.</li>
<li><strong>The technical context wasn't communicated.</strong> A candidate looked strong on paper but had never worked with the scale of data the client's system processes.</li>
<li><strong>The role had changed.</strong> Between the brief and the first interviews, the team had made a decision that shifted the scope of the role.</li>
<li><strong>Two interviewers had different mental models.</strong> One was screening for technical depth. The other was screening for communication and cross-functional work style.</li>
</ul>
<p>None of these are unusual. They're standard features of how technical hiring actually works inside growing companies. The 1-in-4 rule doesn't prevent them — it forces them to surface before too much time has been spent.</p>

<h2>Why most firms don't do this</h2>
<p>The incentive structure in contingency recruiting is to keep moving. If you only get paid when a hire is made, stopping the process to recalibrate costs you time and delays the fee. The path of least resistance is to run more candidates through and hope the next batch lands better.</p>
<p>This is why volume shops exist. More submissions, more chances, faster close. The client gets a hire. Whether it's the right hire is someone else's problem.</p>
<p>We stopped accepting that trade a long time ago. The incentive to get it right is real: a hire that doesn't work out costs us the relationship. Over time, the 1-in-4 rule became a genuine operating principle rather than a risk management tool.</p>

<h2>The broader principle</h2>
<p>1-in-4 is a specific number attached to a specific point in the process. The underlying principle is simpler: if the data says something is wrong, stop and look at the data instead of running faster.</p>
<p>We track time-to-offer, offer acceptance rate, and 90-day retention for every search. Each of those numbers tells you something about where the process is breaking down. None of them are useful if you ignore them.</p>
<p>Technical recruiting produces a lot of data. Most of it sits in spreadsheets and ATS dashboards and is never looked at analytically. The firms that use it well run better processes, produce better hires, and build relationships with clients who are willing to hire them again.</p>

<hr>
<p class="article-sources"><strong>Sources:</strong> Bondy Group internal sourcing and placement data (2008–present). SHRM cost-of-bad-hire estimates (1.5–2x annual salary).</p>
`,
  },

  {
    slug: 'why-senior-engineers-in-argentina-are-harder-to-hire-than-two-years-ago',
    lang: 'en',
    category: 'Trends',
    date: '2026-04-15',
    readingTime: '7 min read',
    title: 'Why senior engineers in Argentina are harder to hire than two years ago',
    excerpt: 'In 2025, hiring a genuinely senior software engineer in Argentina is harder than it was before the global layoffs. Here\'s what changed and what it means for companies trying to hire now.',
    meta: {
      title: 'Why Senior Engineers in Argentina Are Harder to Hire Than Two Years Ago — Bondy',
      description: 'The global tech layoff window closed. US companies absorbed the senior talent. What changed in the Argentine engineering market since 2023 and what it means for your next search.',
    },
    content: `
<p>Two years ago, companies approaching Argentina for senior engineering talent had a window.</p>
<p>The global tech layoffs of 2022–2023 had shaken loose a portion of the senior talent that had been locked into remote arrangements with US companies. For a few months, candidates who normally would never respond to outreach were answering messages. Some were even applying to things.</p>
<p>That window closed.</p>
<p>In 2025, hiring a senior software engineer in Argentina — genuinely senior, not just "five years and the title" — is harder than it was before the layoffs began. Here's what changed and what it means for companies trying to hire now.</p>

<h2>What happened to the talent pool</h2>
<p>The short version: US companies absorbed most of it.</p>
<p>Between 2021 and 2024, demand from US and European companies for LATAM remote engineers grew 286% according to regional hiring reports. Argentina, with its English proficiency and time zone alignment, absorbed a disproportionate share of that demand. Companies that laid off US-based engineers often replaced them directly with Argentine and Colombian talent at significantly lower cost — documented cases exist of companies that laid off 200 US-based engineers and within months were building remote teams in LATAM.</p>
<p>The engineers who landed those roles didn't leave them. They're still in them. The attrition rate for Argentine engineers working for US companies has been low, because the value proposition is clear: they earn in USD, they work on interesting problems, and the alternative is a local market that can't compete on salary.</p>
<p>What this created is a senior layer that is largely locked. Not unemployed. Not looking. Passively reachable on a good day.</p>

<h2>The salary compression effect</h2>
<p>When US companies entered the Argentine market aggressively, they brought US-adjacent compensation expectations with them. Rates that would have been competitive in 2020 started falling short by 2022. By 2025, a senior Backend or Python engineer in Buenos Aires with genuine production experience expects $50,000–$75,000 USD annually. AI/ML specialists and strong Full-Stack profiles routinely ask for more.</p>
<p>Verified payroll data from Howdy's network of 12,500+ LATAM developers shows Argentina leading the region at an average of $63,000 annually for software engineers across all seniority levels. That average is pulled up by the senior end of the market.</p>
<p>For companies whose budgets were set based on 2021 or 2022 data, this is a problem. They arrive in Argentina expecting a discount market and find something closer to a competitive one for senior profiles.</p>

<h2>The experience gap is real</h2>
<p>Not all experience is equivalent, and this matters more than it did when the market was larger. An engineer with seven years of experience at a local Argentine startup has a different profile than an engineer with seven years building distributed systems for a US Series C company. Both have the same seniority on paper. The relevant technical context, the English fluency in a fast-moving standup, the familiarity with a US product development culture — those are different.</p>
<p>The profiles that combine seniority, production scale, and fluency in working with distributed international teams are the ones in highest demand. They're also the ones least likely to be actively looking.</p>

<h2>AI raised the bar on what "good" means</h2>
<p>As of 2025, layoffs in the global tech sector are increasingly focused on restructuring around AI productivity models. Traditional coding-only roles are contracting. Demand is growing for engineers who can work alongside AI tools, who understand how to integrate LLMs into production systems, who can make architectural decisions in a context where the productivity multiplier is real but the failure modes are new.</p>
<p>Pay premiums for AI/ML and AI-adjacent Backend profiles in Argentina have reached $85,000–$100,000 USD annually. Companies that come to Argentina looking for a senior engineer and describe the role as "some AI stuff" are describing one of the harder-to-fill profiles in the market.</p>

<h2>What this means practically</h2>
<ul>
<li><strong>Outreach takes longer to generate responses.</strong> The senior engineers worth finding are not refreshing LinkedIn. Patience and specificity are both required.</li>
<li><strong>Compensation calibration has to happen before sourcing.</strong> A budget that doesn't reflect 2025 rates will produce rejections at the offer stage after weeks of process.</li>
<li><strong>The brief has to be precise.</strong> A vague "senior backend" search produces vague results.</li>
<li><strong>Speed matters more than it did.</strong> Senior candidates in 2025 typically have more than one process running at the same time. The companies that close move from first interview to offer in two to three weeks.</li>
</ul>

<h2>The market is still worth it</h2>
<p>None of this means Argentina isn't a good place to hire. It is. The engineers are strong, the English proficiency is real, the time zones work. Even with salary growth, the cost differential versus the US remains significant: $50,000–$80,000 for a senior engineer in Argentina against $120,000–$160,000+ for a comparable profile in the US.</p>
<p>But it's no longer a buyer's market at the senior level. The companies that build well here treat it like what it is: a competitive market for a specific, limited supply of senior talent.</p>

<hr>
<p class="article-sources"><strong>Sources:</strong> Howdy <em>LatAm Software Engineer Cost Benchmarks 2026</em>; Rest of World (2023) on post-layoff LATAM replacement patterns; index.dev <em>LATAM Developer Rates in 2025</em> (286% demand growth); TechTarget on AI-driven restructuring; EF English Proficiency Index 2024; Statista 2023 developer count via Terminal.io.</p>
`,
  },

  {
    slug: 'why-salary-benchmarking-2023-is-obsolete',
    lang: 'en',
    category: 'Market intel',
    date: '2026-04-20',
    readingTime: '8 min read',
    title: 'Why 2023 salary benchmarking no longer works — and what to do about it.',
    excerpt: "Compensation ranges for LATAM engineering moved more in 18 months than in the previous 5 years. If you're still using 2023 data, you're working from an outdated map.",
    meta: {
      title: 'Why 2023 Salary Benchmarking No Longer Works — Bondy',
      description: 'Compensation ranges for LATAM engineering have shifted +38% for Senior+ profiles since 2023. Here is what actually changed, why it happened, and how to build a defensible rate today.',
    },
    author: 'Mara Schmitman',
    authorInitials: 'MS',
    authorRole: 'Founder, Bondy Group',
    authorBio: 'Organizational psychologist and founder of Bondy Group. Since 2008, leading searches for technical profiles for Series A to public companies across LATAM and globally. Her work starts with diagnostics before going to market.',
    tags: ['Market intel', 'Compensation', 'LATAM'],
    quoteImage: 'Speed\nis not\na virtue.',
    pullQuote: {
      text: 'An outdated map doesn\'t take you to the wrong place. It leaves you standing in the right place, convinced you\'ve already arrived.',
      cite: 'Mara Schmitman, Bondy Group',
    },
    dataCallout: {
      num: '+38%',
      label: 'Average variation · 2023–2025',
      desc: 'Increase in salary expectations for Senior+ engineering profiles across LATAM. Internal Bondy data based on 340 closed processes during the period.',
    },
    featured: true,
    content: `
<p>Three years ago, a Senior Backend Engineer in Buenos Aires asked for <strong>USD 4,000 to 6,000 monthly</strong>. Today the same profile asks for <strong>USD 6,500 to 9,000</strong>. The market moved. Candidate expectations moved. But many hiring managers still reference 2023 ranges.</p>

<p>The result is predictable: rejected offers, processes that drag on, and candidates who drop at the final stage because the number is nowhere near what they expected.</p>

<h2>Why this happened.</h2>

<p>Three factors combined. First, the <strong>de facto dollarization</strong> of the tech market: most profiles with more than 5 years of experience in LATAM today have direct access to US and European companies via remote. The reference floor is no longer local.</p>

<p>Second, <strong>demand concentration</strong>. The best profiles have multiple processes open at once. When scarcity is real, price goes up.</p>

<p>Third, <strong>company-side lag</strong>. Internal compensation bands are set annually. The market moves every quarter. The gap compounds.</p>

<h2>What to do about it.</h2>

<h3>1. Update your reference before opening the process.</h3>
<p>Don't assume what you paid 18 months ago is still competitive. Before defining the range, ask your recruiting firm for recent data on closed processes in the same stack and level.</p>

<h3>2. Separate the range from the budget.</h3>
<p>The range you show the candidate doesn't have to be identical to the internal approved ceiling. Showing it before the candidate defines their expectation anchors the conversation around the wrong number.</p>

<h3>3. Speed is a compensation variable.</h3>
<p>A process that takes 6 weeks competes at a disadvantage even if the number is correct. Clarity in stages and fast feedback are worth more than they seem.</p>

<hr>

<p>At Bondy we've been closing technical searches in LATAM for 16 years. What we're seeing today is not an anomaly: it's the new normal of a market that integrated globally faster than internal structures could process.</p>

<hr>
<p class="article-sources"><strong>Sources:</strong> Internal Bondy Group data (340 closed processes, 2023–2025). Cross-referenced against Howdy <em>LatAm Software Engineer Cost Benchmarks 2026</em> and Teilur Talent <em>LATAM Developer Salary Report 2026</em>.</p>
`,
  },

  {
    slug: 'the-diagnostic-we-run-before-every-search',
    lang: 'en',
    category: 'Bondy Method',
    date: '2026-04-15',
    readingTime: '9 min read',
    title: 'The diagnostic we run before every search (and why most firms skip it)',
    excerpt: 'Most recruiting processes start the same way: the client sends a job description, the recruiter starts sourcing. That sequence skips the most important step — and skipping it is why so many searches take longer than they should.',
    meta: {
      title: 'The Diagnostic We Run Before Every Search — Bondy',
      description: 'Before sourcing a single person, Bondy runs a structured diagnostic. What it covers, why it takes a week, and why searches run without it close significantly worse. From a Buenos Aires technical recruiting firm.',
    },
    content: `
<p>Most recruiting processes start the same way: the client sends a job description, the recruiter starts sourcing, and the first candidates show up in two weeks.</p>
<p>The problem with this sequence is that it skips the most important step. And skipping it is why so many searches take longer than they should, produce candidates that don't fit, and end with someone hired who doesn't work out in the first year.</p>
<p>Before we source a single person, we run a diagnostic. It takes time we don't bill for. It slows the start of sourcing by a week or two. And it's the thing most responsible for the searches that close well.</p>

<h2>What the diagnostic actually is</h2>
<p>It's not complicated. It's a structured conversation — usually 60 to 90 minutes — with the people who will actually evaluate candidates and make the hire. Not just the recruiter who opened the req. The engineering lead, the hiring manager, and whenever possible, someone from the team the person will join.</p>
<p>The goal is to answer a specific set of questions that most job descriptions leave undefined:</p>
<p><strong>What does "good" look like at 90 days?</strong> Not the laundry list of requirements. What specific things should this person have done, built, or changed in their first three months for the hire to be considered successful? If the people in the room give different answers to this question, you have a problem that sourcing won't solve.</p>
<p><strong>What does the work actually look like day to day?</strong> What will the person do on a Tuesday at 3pm? Who do they talk to? What systems do they touch?</p>
<p><strong>What's the team context?</strong> Seniority on paper is meaningless without knowing what seniority means in this specific team. A senior engineer joining a team of staff+ engineers is in a different role than a senior engineer who will be the most experienced person in the room.</p>
<p><strong>What are the real constraints?</strong> Timeline, budget, must-haves versus nice-to-haves, deal-breakers. I've had clients spend 45 minutes describing the technical requirements in detail and then mention at the end that the role is office-based in Buenos Aires three days a week. That's not a footnote. That eliminates 80% of the people we were going to source.</p>
<p><strong>Where did previous searches for this role fail?</strong> This one is underused. If the company has tried to hire for this role before, the patterns in those failures tell you more than any requirements list.</p>

<h2>What comes out of it</h2>
<p>At the end of the diagnostic, we produce a written brief. Not the job description — the brief is an internal document, two to three pages, that captures what we learned and how it translates into the search.</p>
<p>It defines: the specific seniority level with concrete examples, the technical bar with must-haves separated from wants, the working style requirements, the compensation range calibrated to current market rates, the interview process and who owns each stage, and the red flags that would disqualify an otherwise strong candidate.</p>
<p>We share this brief with the client. If they read it and say "that's not quite right," we talk about why. That conversation, before sourcing starts, is worth more than any amount of sourcing done against a vague brief.</p>

<h2>Why this step gets skipped</h2>
<p>The honest answer is that it costs time and it doesn't feel like output. Clients who are hiring urgently want to see candidates fast. A firm that starts sending profiles in week one feels like it's moving. A firm that asks for a 90-minute call before it starts anything feels like it's creating friction.</p>
<p>The firms that skip the diagnostic can send profiles faster. They just send more wrong ones. The client spends three weeks interviewing candidates who aren't quite right, adjusts the brief informally based on the rejections, and eventually the right person appears. By the time they're hired, the process has taken longer than a well-briefed search would have.</p>

<h2>The organizational psychology angle</h2>
<p>My background is in organizational psychology, which shapes how I think about this. A job description is a behavioral expectation document. When it's written well, it describes what a person needs to do, how they need to interact, and what outcomes they're responsible for. Most of them aren't written well.</p>
<p>The diagnostic is a structured process to extract the behavioral expectations that the job description didn't capture. Not the technical requirements — those are usually fine. The working style, the cultural fit, the team dynamics, the decision-making model.</p>
<p>In 17 years of technical recruiting, most early exits — the hires that are gone by month six — were not failures of technical assessment. The person could code. They couldn't communicate the way the team needed them to communicate. Or they needed more structure than the role provided. Or the role scope changed two months in and they weren't built for ambiguity. These mismatches are predictable before the hire is made if you ask the right questions.</p>

<h2>What clients can do before calling us</h2>
<p>If you're considering a technical search in Argentina and want to start the diagnostic work before engaging a firm, these are the questions worth answering internally:</p>
<ol>
<li>What does success look like at 90 days? Write it down in three specific sentences.</li>
<li>What is the actual technical environment — scale, stack, team size, development process?</li>
<li>What budget have we set, and is it current with 2025 market rates?</li>
<li>Have we tried to hire for this role before? What happened?</li>
<li>Who in our organization will interview, and what is each person's role in the decision?</li>
</ol>
<p>If those answers are clear before the first conversation with a recruiter, the search will be faster. If they're not clear, that's what the diagnostic is there to figure out.</p>

<hr>
<p class="article-sources"><strong>Sources:</strong> Bondy Group internal methodology and placement data (2008–present). SHRM cost-of-failed-hire estimates (1.5–2x annual salary). Organizational psychology literature on behavioral expectation frameworks (foundational to Bondy's diagnostic approach, drawing on Mara Schmitman's background at UdeSA).</p>
`,
  },
]

// ─────────────────────────────────────────────
// SPANISH ARTICLES  (slugs match EN counterparts)
// ─────────────────────────────────────────────

const es: Article[] = [
  {
    slug: 'como-contratar-ingenieros-de-software-en-argentina',
    lang: 'es',
    category: 'Tendencias',
    date: '2026-04-15',
    readingTime: '8 min de lectura',
    title: 'Cómo contratar ingenieros de software en Argentina',
    excerpt: 'Una guía práctica sobre el proceso de contratación desde adentro — no desde una plataforma que quiere cerrar un deal, sino desde una firma que lleva colocando talento tech en Argentina desde 2008.',
    meta: {
      title: 'Cómo contratar ingenieros de software en Argentina — Bondy',
      description: 'Guía práctica para contratar engineers en Argentina: pool de talento, benchmarks de salarios, opciones de contratación y qué ralentiza realmente las búsquedas. De una firma de recruiting de Buenos Aires con 18+ años en el mercado.',
    },
    content: `
<p>Argentina se convirtió en una de las opciones más serias para equipos de ingeniería de EE.UU. y Europa que necesitan contratar sin quemar el presupuesto. El país produce engineers sólidos, la mayoría con contratos en USD y acostumbrados a trabajar con equipos distribuidos. Buenos Aires concentra más del 85% del talento developer del país.</p>
<p>Esta guía cubre cómo se ve el proceso de contratación desde adentro — no desde una plataforma que quiere cerrar un deal, sino desde una firma de recruiting que lleva colocando talento tech en Argentina desde 2008.</p>

<h2>Por qué Argentina, específicamente</h2>
<p>Hay algunas cosas que distinguen a Argentina de otros mercados LATAM que suelen agruparse.</p>
<p>Primero, el inglés. Argentina está en la banda "Alta" del EF English Proficiency Index 2024 y está cerca del tope de la región. Eso importa en la práctica: los engineers senior participan en standups, escriben specs y discuten decisiones de producto en inglés sin fricción.</p>
<p>Segundo, el huso horario. Buenos Aires es UTC-3, lo que significa superposición real con equipos de la Costa Este de EE.UU. sin que nadie tenga que trabajar a las 7am ni a las 11pm.</p>
<p>Tercero, los salarios. Según datos de nómina verificados de Howdy de más de 12.500 developers en LATAM, Argentina lidera la región con un salario promedio de $63.000 USD anuales para software engineers. Sigue siendo 2,5 a 3 veces menor que las tarifas comparables en EE.UU., pero refleja un mercado que maduró significativamente desde 2021.</p>

<h2>Cómo es realmente el pool de talento</h2>
<p>Argentina tiene aproximadamente 115.000 desarrolladores de software según el conteo de Statista 2023. Los perfiles más disponibles tienden a ser Backend engineers, Python developers, Full-Stack (React/Node) y Data engineers. Los perfiles de Cloud y DevOps son menos frecuentes y tienen una prima.</p>
<p>Vale la pena nombrarlo: la capa senior es delgada. No es exclusivo de Argentina — es una característica de cualquier mercado que fue fuertemente reclutado por empresas de EE.UU. en los últimos cinco años.</p>

<h2>El proceso real</h2>
<p><strong>1. Definir el rol con precisión — antes de empezar a sourcear.</strong><br>
"Senior Backend Engineer" no es un brief. Un buen brief nombra el stack, la complejidad del codebase, la estructura del equipo, el nivel de seniority con ejemplos y, fundamentalmente, cómo se ve "bueno" en los primeros 90 días.</p>
<p><strong>2. Sourcear activamente, no reactivamente.</strong><br>
Publicar un trabajo y esperar no es una estrategia de contratación para engineers senior en Argentina. Los perfiles que querés no están mirando job boards. Hay que encontrarlos, acercarse y darles una razón para que se interesen.</p>
<p><strong>3. Filtrar antes de entrevistar.</strong><br>
El objetivo es calificar a los candidatos en lo básico — inglés, seniority, disponibilidad, expectativas salariales — antes de coordinar una entrevista técnica con tu equipo de ingeniería.</p>
<p><strong>4. Moverse a un ritmo realista.</strong><br>
Los mejores engineers argentinos suelen tener más de un proceso abierto al mismo tiempo. "Te respondemos en dos semanas" es una invitación a tu competidor.</p>
<p><strong>5. Hacer una oferta que refleje el mercado.</strong><br>
Para roles senior en Buenos Aires trabajando para una empresa de EE.UU., la compensación total competitiva es $50.000–$75.000 USD anuales según stack y alcance.</p>

<h2>La pregunta del contrato</h2>
<p>La mayoría de los engineers argentinos que trabajan para empresas de EE.UU. operan como contratistas en lugar de empleados. Las estructuras más comunes son contratista directo, EOR (Employer of Record) o entidad local.</p>

<h2>Qué ralentiza las búsquedas</h2>
<ul>
<li><strong>Briefs que cambian a mitad de la búsqueda.</strong></li>
<li><strong>Procesos de entrevista con demasiadas rondas.</strong> Más de tres entrevistas para un engineer senior es inusual.</li>
<li><strong>Compensación desincronizada con el mercado.</strong> Un presupuesto bloqueado hace dos años no refleja las tarifas de 2025.</li>
<li><strong>Sin un tomador de decisiones claro.</strong></li>
</ul>

<hr>
<p class="article-sources"><strong>Fuentes:</strong> Howdy <em>LatAm Software Engineer Cost Benchmarks 2026</em>; Huntly.ai <em>Software Developer Salaries in Argentina 2025</em>; Statista 2023 via Terminal.io; EF English Proficiency Index 2024; Arc.dev <em>Remote Software Developer Salary in Argentina 2026</em>.</p>
`,
  },
  {
    slug: 'cuanto-cuesta-el-recruiting-tecnico-en-latam',
    lang: 'es',
    category: 'Tendencias',
    date: '2026-04-15',
    readingTime: '7 min de lectura',
    title: '¿Cuánto cuesta el recruiting técnico en LATAM?',
    excerpt: 'Antes de contratar una firma de recruiting para buscar engineers en América Latina, los CTOs suelen hacer la misma pregunta: ¿cuánto nos va a costar esto? Un desglose real de la estructura de costos.',
    meta: {
      title: '¿Cuánto cuesta el recruiting técnico en LATAM? — Bondy',
      description: 'Desglose transparente de los costos de recruiting técnico en LATAM: benchmarks de salarios en Argentina, modelos de fee, EOR vs contratación directa y el costo real de un proceso lento o una contratación fallida.',
    },
    content: `
<p>Antes de contratar una firma de recruiting para buscar engineers en América Latina, los CTOs suelen hacer la misma pregunta: ¿cuánto nos va a costar esto?</p>
<p>Es una pregunta razonable y genuinamente difícil de responder, porque los fees de recruiting en LATAM no están estandarizados y los modelos de pricing son lo suficientemente inconsistentes como para que compararlos directamente sea más difícil de lo que parece.</p>

<h2>El lado del salario</h2>
<p>Cualquier cálculo de costos empieza con lo que vas a pagarle al engineer. Estos son los benchmarks actuales (2025–2026) para roles denominados en USD en Argentina:</p>
<table>
<thead><tr><th>Seniority</th><th>Salario anual (USD)</th></tr></thead>
<tbody>
<tr><td>Junior (0–2 años)</td><td>$21.000–$28.000</td></tr>
<tr><td>Mid-level (3–5 años)</td><td>$34.000–$45.000</td></tr>
<tr><td>Senior (5+ años)</td><td>$46.000–$82.000</td></tr>
<tr><td>Senior especializado (AI/ML, Go, Rust)</td><td>$80.000–$100.000</td></tr>
</tbody>
</table>
<p>Argentina lidera LATAM con un salario promedio de $63.000 anuales (Howdy, 2025). Para contexto: el rol equivalente de engineer senior en EE.UU. cuesta $105.000–$160.000 en salario base. La brecha sigue siendo sustancial.</p>

<h2>El fee de recruiting</h2>
<p><strong>Contingencia (porcentaje del primer año de salario):</strong> El modelo más común. Los fees típicamente van del 15% al 25% del salario bruto del primer año del candidato. Sin costo inicial; se paga solo cuando se hace la contratación.</p>
<p><strong>kickoff fee:</strong> Una parte del fee se paga por adelantado como retainer. Estándar en executive search y para roles senior difíciles de cubrir.</p>
<p><strong>Fee fijo:</strong> Algunas plataformas cobran una tarifa fija independientemente del salario — típicamente $2.500–$5.000 por colocación. La contrapartida es profundidad.</p>
<p><strong>Porcentaje de factura mensual (modelo staffing/EOR):</strong> Cuando la firma gestiona el cumplimiento laboral además del recruiting, suelen cobrar 15–25% del salario mensual del developer.</p>

<h2>La estructura de empleo agrega costo</h2>
<ul>
<li><strong>Contratista directo:</strong> Menor overhead. Alguna exposición legal según jurisdicción. El camino más común para las primeras contrataciones en Serie A o B.</li>
<li><strong>EOR (Employer of Record):</strong> Mayor cobertura de compliance. Costo mensual fully loaded de $5.900–$7.150 para un engineer senior (datos Howdy 2026).</li>
<li><strong>Entidad local:</strong> Solo vale el overhead si estás construyendo un equipo de 10 o más personas a largo plazo.</li>
</ul>

<h2>El costo de un proceso lento</h2>
<p>Este no aparece en ninguna factura pero es real. Cada mes que un rol senior de ingeniería sigue abierto tiene un costo. Los timelines de producto se retrasan. Los engineers existentes absorben la carga. Una firma que cobra 20% pero cubre el rol en 45 días cuesta menos que una que cobra 15% y tiene un proceso de 90 días.</p>

<h2>¿Qué presupuestar?</h2>
<p>Para una sola contratación senior en Argentina: salario anual $50.000–$75.000, fee de recruiting $10.000–$18.000, setup EOR o contratista $300–$700/mes. Total primer año: $62.000–$95.000 fully loaded. Comparado con $170.000–$200.000+ fully loaded para un engineer comparable en EE.UU.</p>

<hr>
<p class="article-sources"><strong>Fuentes:</strong> Howdy <em>LatAm Software Engineer Cost Benchmarks 2026</em>; Huntly.ai <em>Software Developer Salaries in Argentina 2025</em>; Teilur Talent <em>LATAM Developer Salary Report 2026</em>; SHRM estimaciones costo de contratación fallida.</p>
`,
  },
  {
    slug: 'por-que-detenemos-una-busqueda-cuando-menos-de-1-de-cada-4-candidatos-avanza',
    lang: 'es',
    category: 'Método Bondy',
    date: '2026-04-15',
    readingTime: '8 min de lectura',
    title: 'Por qué detenemos una búsqueda cuando menos de 1 de cada 4 candidatos avanza',
    excerpt: 'Cuando menos de uno de cada cuatro candidatos que presentamos avanza después de la primera entrevista, detenemos la búsqueda y volvemos al brief. No porque los candidatos sean débiles. Porque los datos nos están diciendo que algo fundamental está desalineado.',
    meta: {
      title: 'Por qué detenemos una búsqueda cuando menos de 1 de cada 4 candidatos avanza — Bondy',
      description: 'La regla 1-en-4: cómo Bondy usa las tasas de avance de candidatos como señal diagnóstica, por qué la mayoría de las firmas de recruiting ignoran estos datos y cómo se ve una conversación de recalibración.',
    },
    content: `
<p>En algún momento de cada búsqueda, hay un momento en que los datos te dicen que algo está mal.</p>
<p>Para nosotros, esa señal tiene una forma específica: cuando menos de uno de cada cuatro candidatos que presentamos avanza después de la primera etapa de entrevistas, detenemos la búsqueda y volvemos al brief.</p>
<p>No porque los candidatos sean débiles. Generalmente no lo son. Nos detenemos porque esa tasa de conversión nos dice que algo fundamental está desalineado entre lo que el cliente cree que está contratando y lo que estamos sourcing. Pasar más candidatos por un proceso roto no arregla el proceso.</p>
<p>Esta es la regla que llamamos 1-en-4, y ha sido una de las restricciones más útiles que construimos en nuestra forma de trabajar.</p>

<h2>De dónde viene la regla</h2>
<p>Llevo haciendo recruiting técnico desde 2007. Durante los primeros años, el supuesto por defecto era que una tasa de avance baja significaba que el sourcing necesitaba mejorar. Más candidatos, mejores canales, diferentes strings de búsqueda. A veces es cierto. Pero generalmente no es el problema real.</p>
<p>El patrón más común es este: el brief estaba incompleto cuando comenzó la búsqueda. Algo crítico quedó sin definir — qué significa "senior" en este equipo, cuánta autonomía requiere realmente el rol, si el cliente quiere a alguien que lidere o alguien que ejecute.</p>
<p>La regla 1-en-4 fue nuestra respuesta a ese patrón. No es un benchmark de calidad — es un trigger diagnóstico.</p>

<h2>Qué mide el número</h2>
<p>Después de la primera entrevista con el cliente, rastreamos cuántos candidatos avanzan a la siguiente etapa. Si menos del 25% de los candidatos que presentamos están avanzando, esa es la señal. Elegimos la primera entrevista como punto de medición porque es suficientemente temprano para corregir el rumbo antes de que se haya invertido tiempo significativo de ambos lados.</p>

<h2>Cómo se ve una recalibración</h2>
<p>Cuando alcanzamos el umbral, llamamos al cliente. No para reportar el número — para entenderlo. La conversación generalmente empieza con los rechazos.</p>
<p>Ejemplos de lo que hemos encontrado:</p>
<ul>
<li><strong>La definición de seniority estaba equivocada.</strong> El brief decía "senior" pero los entrevistadores evaluaban contra un bar de nivel staff.</li>
<li><strong>El contexto técnico no se comunicó.</strong> Un candidato se veía fuerte en papel pero nunca había trabajado con la escala de datos que procesa el sistema del cliente.</li>
<li><strong>El rol había cambiado.</strong> Entre el brief y las primeras entrevistas, el equipo tomó una decisión que cambió el alcance del rol.</li>
<li><strong>Dos entrevistadores tenían modelos mentales diferentes.</strong> Uno evaluaba profundidad técnica; el otro, estilo de comunicación y trabajo cross-functional.</li>
</ul>

<h2>Por qué la mayoría de las firmas no hacen esto</h2>
<p>La estructura de incentivos en el recruiting por contingencia es seguir avanzando. Si solo te pagan cuando se hace la contratación, detener el proceso para recalibrar te cuesta tiempo y retrasa el fee. Por eso existen los volume shops. Más submissions, más chances, cierre más rápido.</p>
<p>Dejamos de aceptar ese trade hace mucho tiempo. Una contratación que no funciona nos cuesta la relación. Con el tiempo, la regla 1-en-4 se convirtió en un principio operativo genuino.</p>

<h2>El principio más amplio</h2>
<p>1-en-4 es un número específico en un punto específico del proceso. El principio subyacente es más simple: si los datos dicen que algo está mal, detenerse a mirar los datos en lugar de correr más rápido.</p>

<hr>
<p class="article-sources"><strong>Fuentes:</strong> Datos internos de sourcing y colocación de Bondy Group (2008–presente). SHRM estimaciones costo de contratación fallida (1,5–2x salario anual).</p>
`,
  },

  {
    slug: 'por-que-los-ingenieros-senior-en-argentina-son-mas-dificiles-de-contratar',
    lang: 'es',
    category: 'Tendencias',
    date: '2026-04-15',
    readingTime: '7 min',
    title: 'Por qué los ingenieros senior en Argentina son más difíciles de contratar que hace dos años',
    excerpt: 'En 2025, contratar un ingeniero de software senior en Argentina — genuinamente senior — es más difícil que antes de los layoffs globales. Esto es lo que cambió y qué significa para las empresas que quieren contratar ahora.',
    meta: {
      title: 'Por qué los ingenieros senior en Argentina son más difíciles de contratar — Bondy',
      description: 'La ventana de los layoffs se cerró. Las empresas de EE.UU. absorbieron el talento senior. Qué cambió en el mercado de ingeniería argentino desde 2023 y qué significa para tu próxima búsqueda.',
    },
    content: `
<p>Hace dos años, las empresas que se acercaban a Argentina buscando talento senior tenían una ventana.</p>
<p>Los despidos masivos en tech de 2022–2023 habían liberado una parte del talento senior que estaba bloqueado en arreglos remotos con empresas estadounidenses. Por unos meses, candidatos que normalmente nunca respondían a outreach estaban contestando mensajes. Algunos hasta aplicaban a cosas.</p>
<p>Esa ventana se cerró.</p>
<p>En 2025, contratar un ingeniero de software senior en Argentina — genuinamente senior, no solo "cinco años y el título" — es más difícil que antes de que empezaran los layoffs. Esto es lo que cambió y qué significa para las empresas que quieren contratar ahora.</p>

<h2>Qué le pasó al pool de talento</h2>
<p>La versión corta: las empresas estadounidenses lo absorbieron.</p>
<p>Entre 2021 y 2024, la demanda de empresas de EE.UU. y Europa por ingenieros remotos de LATAM creció un 286% según informes regionales de hiring. Argentina, con su nivel de inglés y alineación horaria, absorbió una parte desproporcionada de esa demanda. Empresas que despidieron ingenieros basados en EE.UU. muchas veces los reemplazaron directamente con talento argentino y colombiano a un costo significativamente menor.</p>
<p>Los ingenieros que consiguieron esos roles no los dejaron. Siguen en ellos. La tasa de attrición de ingenieros argentinos trabajando para empresas estadounidenses fue baja, porque la propuesta de valor es clara: cobran en dólares, trabajan en problemas interesantes y la alternativa es un mercado local que no puede competir en salario.</p>
<p>Lo que esto creó es una capa senior que está en gran medida bloqueada. No desempleada. No buscando. Accesible pasivamente en el mejor de los casos.</p>

<h2>El efecto de compresión salarial</h2>
<p>Cuando las empresas estadounidenses entraron al mercado argentino agresivamente, trajeron expectativas de compensación cercanas a las de EE.UU. Las tarifas que eran competitivas en 2020 empezaron a quedarse cortas en 2022. Para 2025, un ingeniero Backend o Python senior en Buenos Aires con experiencia real en producción espera entre USD 50.000 y 75.000 anuales. Los especialistas en AI/ML y los buenos perfiles Full-Stack rutinariamente piden más.</p>
<p>Datos verificados de nómina de la red de Howdy (12.500+ desarrolladores de LATAM) muestran a Argentina liderando la región con un promedio de USD 63.000 anuales para ingenieros de software en todos los niveles de seniority.</p>
<p>Para empresas cuyos presupuestos fueron fijados en base a datos de 2021 o 2022, esto es un problema. Llegan a Argentina esperando un mercado de descuento y encuentran algo más cercano a uno competitivo para los perfiles senior.</p>

<h2>La brecha de experiencia es real</h2>
<p>No toda la experiencia es equivalente, y esto importa más que antes cuando el mercado era más grande. Un ingeniero con siete años de experiencia en una startup argentina local tiene un perfil distinto al de un ingeniero con siete años construyendo sistemas distribuidos para una empresa estadounidense en Series C. Ambos tienen el mismo seniority en papel. El contexto técnico relevante, el inglés fluido en un standup que va rápido, la familiaridad con la cultura de desarrollo de producto de una empresa estadounidense — esas cosas son distintas.</p>
<p>Los perfiles que combinan seniority, escala productiva y fluidez trabajando con equipos internacionales distribuidos son los más demandados. Y también los que menos probablemente estén buscando activamente.</p>

<h2>La IA subió el bar de qué significa "bueno"</h2>
<p>Los despidos en el sector tech global están cada vez más enfocados en reestructuraciones alrededor de modelos de productividad basados en IA. Los roles puramente de coding están contrayendo. La demanda crece para ingenieros que pueden trabajar junto a herramientas de IA, que entienden cómo integrar LLMs en sistemas de producción, que pueden tomar decisiones arquitecturales en un contexto donde el multiplicador de productividad es real pero los modos de falla son nuevos.</p>
<p>Los premiums salariales para perfiles AI/ML y Backend adyacente a IA en Argentina llegaron a USD 85.000–100.000 anuales. Las empresas que vienen a Argentina buscando un ingeniero senior y describen el rol como "algo de IA" están describiendo uno de los perfiles más difíciles de cubrir en el mercado.</p>

<h2>Qué significa esto en la práctica</h2>
<ul>
<li><strong>El outreach tarda más en generar respuestas.</strong> Los ingenieros senior que vale la pena encontrar no están actualizando LinkedIn. Se requieren paciencia y especificidad.</li>
<li><strong>La calibración salarial tiene que pasar antes del sourcing.</strong> Un presupuesto que no refleja las tarifas de 2025 va a producir rechazos en la etapa de oferta después de semanas de proceso.</li>
<li><strong>El brief tiene que ser preciso.</strong> Una búsqueda vaga de "backend senior" produce resultados vagos.</li>
<li><strong>La velocidad importa más que antes.</strong> Los candidatos senior en 2025 típicamente tienen más de un proceso corriendo al mismo tiempo. Las empresas que cierran se mueven de la primera entrevista a la oferta en dos o tres semanas.</li>
</ul>

<h2>El mercado sigue valiendo la pena</h2>
<p>Nada de esto significa que Argentina no sea un buen lugar para contratar. Lo es. Los ingenieros son sólidos, el nivel de inglés es real, los husos horarios funcionan. Incluso con el crecimiento salarial, la diferencia de costo versus EE.UU. sigue siendo significativa: USD 50.000–80.000 para un ingeniero senior en Argentina frente a USD 120.000–160.000+ para un perfil comparable en EE.UU.</p>
<p>Pero ya no es un mercado comprador en el nivel senior. Las empresas que construyen bien aquí lo tratan como lo que es: un mercado competitivo para una oferta específica y limitada de talento senior.</p>

<hr>
<p class="article-sources"><strong>Fuentes:</strong> Howdy <em>LatAm Software Engineer Cost Benchmarks 2026</em>; Rest of World (2023) sobre patrones de reemplazo post-layoffs en LATAM; index.dev <em>LATAM Developer Rates in 2025</em> (crecimiento de demanda del 286%); TechTarget sobre reestructuración impulsada por IA; EF English Proficiency Index 2024.</p>
`,
  },

  {
    slug: 'el-diagnostico-que-corremos-antes-de-cada-busqueda',
    lang: 'es',
    category: 'Método Bondy',
    date: '2026-04-15',
    readingTime: '9 min',
    title: 'El diagnóstico que corremos antes de cada búsqueda (y por qué la mayoría de las firmas lo saltea)',
    excerpt: 'La mayoría de los procesos de recruiting empiezan igual: el cliente manda una JD, el recruiter empieza a sourcear. Esa secuencia saltea el paso más importante — y saltearlo es la razón por la que tantas búsquedas tardan más de lo que deberían.',
    meta: {
      title: 'El Diagnóstico que Corremos Antes de Cada Búsqueda — Bondy',
      description: 'Antes de sourcear a una sola persona, Bondy corre un diagnóstico estructurado. Qué cubre, por qué lleva una semana, y por qué las búsquedas corridas sin él cierran significativamente peor.',
    },
    content: `
<p>La mayoría de los procesos de recruiting empiezan igual: el cliente manda una descripción del puesto, el recruiter empieza a sourcear y los primeros candidatos aparecen en dos semanas.</p>
<p>El problema con esta secuencia es que saltea el paso más importante. Y saltearlo es la razón por la que tantas búsquedas tardan más de lo que deberían, producen candidatos que no encajan, y terminan con alguien contratado que no funciona en el primer año.</p>
<p>Antes de sourcear a una sola persona, corremos un diagnóstico. Toma tiempo que no facturamos. Retrasa el inicio del sourcing una o dos semanas. Y es lo que más contribuye a que las búsquedas cierren bien.</p>

<h2>En qué consiste el diagnóstico</h2>
<p>No es complicado. Es una conversación estructurada — generalmente de 60 a 90 minutos — con las personas que van a evaluar candidatos y tomar la decisión de contratación. No solo el recruiter que abrió el req. El engineering lead, el hiring manager y, cuando es posible, alguien del equipo al que se va a unir la persona.</p>
<p>El objetivo es responder un conjunto específico de preguntas que la mayoría de las job descriptions dejan sin definir:</p>
<p><strong>¿Cómo se ve "bueno" a los 90 días?</strong> No la lista de requisitos. ¿Qué cosas específicas debería haber hecho, construido o cambiado esta persona en sus primeros tres meses para que la contratación se considere exitosa? Si las personas en la sala dan respuestas distintas a esta pregunta, tienen un problema que el sourcing no va a resolver.</p>
<p><strong>¿Cómo es el trabajo en el día a día?</strong> ¿Qué va a hacer la persona un martes a las 3pm? ¿Con quién habla? ¿Qué sistemas toca?</p>
<p><strong>¿Cuál es el contexto del equipo?</strong> El seniority en papel no significa nada sin saber qué significa seniority en este equipo específico. Un ingeniero senior que entra a un equipo de staff+ engineers está en un rol distinto al de un ingeniero senior que va a ser la persona con más experiencia en la sala.</p>
<p><strong>¿Cuáles son las restricciones reales?</strong> Timeline, presupuesto, must-haves versus nice-to-haves, dealbreakers. Tuve clientes que pasaron 45 minutos describiendo los requisitos técnicos en detalle y después mencionaron al final que el rol es presencial en Buenos Aires tres días por semana. Eso no es una nota al pie. Elimina al 80% de las personas que íbamos a sourcear.</p>
<p><strong>¿Dónde fallaron las búsquedas anteriores para este rol?</strong> Esta está subutilizada. Si la empresa ya intentó contratar para este rol, los patrones en esos fracasos te dicen más que cualquier lista de requisitos.</p>

<h2>Qué sale de la conversación</h2>
<p>Al final del diagnóstico, producimos un brief escrito. No la job description — el brief es un documento interno, de dos o tres páginas, que captura lo que aprendimos y cómo se traduce en la búsqueda.</p>
<p>Define: el nivel de seniority específico con ejemplos concretos, el bar técnico con los must-haves reales separados de los deseos, los requisitos de estilo de trabajo, el rango de compensación calibrado al mercado a la fecha de inicio de la búsqueda, el proceso de entrevistas y quién es dueño de cada etapa, y las red flags que descalificarían a un candidato que de otro modo es fuerte.</p>
<p>Compartimos este brief con el cliente. Si lo leen y dicen "no es exactamente eso", hablamos de por qué. Esa conversación, antes de que empiece el sourcing, vale más que cualquier cantidad de sourcing hecho contra un brief vago.</p>

<h2>Por qué se saltea este paso</h2>
<p>La respuesta honesta es que cuesta tiempo y no se parece a un entregable. Los clientes que están contratando con urgencia quieren ver candidatos rápido. Una firma que empieza a mandar perfiles en la primera semana parece que está avanzando. Una firma que pide una llamada de 90 minutos antes de hacer cualquier cosa parece que está generando fricción.</p>
<p>Las firmas que saltean el diagnóstico pueden mandar perfiles más rápido. Solo que mandan más perfiles equivocados. El cliente pasa tres semanas entrevistando candidatos que no están del todo bien, ajusta el brief informalmente a partir de los rechazos y eventualmente aparece la persona correcta. Para cuando se los contrata, el proceso tardó más de lo que hubiese tardado una búsqueda bien briefeada.</p>

<h2>El ángulo de la psicología organizacional</h2>
<p>Mi formación es en psicología organizacional, y eso moldea cómo pienso en esto. Una job description es un documento de expectativas de comportamiento. Cuando está bien escrito, describe lo que una persona necesita hacer, cómo necesita interactuar y por qué resultados es responsable. La mayoría no están bien escritas.</p>
<p>El diagnóstico es un proceso estructurado para extraer las expectativas de comportamiento que la job description no capturó. No los requisitos técnicos — esos generalmente están bien. El estilo de trabajo, el encaje organizacional, la dinámica del equipo, el modelo de toma de decisiones.</p>
<p>En 17 años de recruiting técnico, la mayoría de las salidas tempranas — las contrataciones que se van antes de los seis meses — no fueron fracasos de evaluación técnica. La persona podía programar. No podía comunicarse de la manera que el equipo necesitaba. O necesitaba más estructura de la que el rol provea. O el rol cambió dos meses después y no estaban construidos para la ambigüedad. Estos desajustes son predecibles antes de que se haga la contratación si hacés las preguntas correctas.</p>

<h2>Qué pueden hacer los clientes antes de llamarnos</h2>
<p>Si estás considerando una búsqueda técnica en Argentina y querés empezar el trabajo de diagnóstico antes de contactar una firma, estas son las preguntas que vale la pena responder internamente:</p>
<ol>
<li>¿Cómo se ve el éxito a 90 días? Escribílo en tres oraciones específicas.</li>
<li>¿Cuál es el entorno técnico real — escala, stack, tamaño del equipo, proceso de desarrollo?</li>
<li>¿Qué presupuesto tenemos fijado, y está actualizado con las tarifas de mercado de 2025?</li>
<li>¿Ya intentamos contratar para este rol antes? ¿Qué pasó?</li>
<li>¿Quién en nuestra organización va a entrevistar y cuál es el rol de cada persona en la decisión?</li>
</ol>
<p>Si esas respuestas están claras antes de la primera conversación con un recruiter, la búsqueda va a ser más rápida. Si no están claras, para eso existe el diagnóstico.</p>

<hr>
<p class="article-sources"><strong>Fuentes:</strong> Metodología interna y datos de placement de Bondy Group (2008–presente). Estimaciones de costo de contratación fallida de SHRM (1,5–2 veces el salario anual). Literatura de psicología organizacional sobre marcos de expectativas de comportamiento (base del enfoque diagnóstico de Bondy, a partir de la formación de Mara Schmitman en UdeSA).</p>
`,
  },

  {
    slug: 'por-que-el-salary-benchmarking-de-2023-ya-no-sirve',
    lang: 'es',
    category: 'Inteligencia de mercado',
    date: '2026-04-20',
    readingTime: '8 min',
    title: 'Por qué el salary benchmarking de 2023 ya no sirve — y qué hacer con eso.',
    excerpt: 'Los rangos de compensación en engineering LATAM se movieron más en 18 meses que en los 5 años previos. Si todavía estás usando los datos de 2023, estás trabajando con un mapa desactualizado.',
    meta: {
      title: 'Por qué el salary benchmarking de 2023 ya no sirve — Bondy',
      description: 'Los rangos de compensación en engineering LATAM se movieron +38% para perfiles Senior+ desde 2023. Esto es lo que cambió, por qué pasó, y cómo armar un rango defendible hoy.',
    },
    author: 'Mara Schmitman',
    authorInitials: 'MS',
    authorRole: 'Founder, Bondy Group',
    authorBio: 'Psicóloga organizacional y fundadora de Bondy Group. Desde 2008 lidera búsquedas de perfiles técnicos para empresas Serie A a públicas en LATAM y globalmente. Su trabajo parte de un diagnóstico antes de salir al mercado.',
    tags: ['Inteligencia', 'Compensación', 'LATAM'],
    quoteImage: 'Speed\nis not\na virtue.',
    pullQuote: {
      text: 'Un mapa desactualizado no te lleva al lugar equivocado. Te deja parado en el lugar correcto, convencido de que ya llegaste.',
      cite: 'Mara Schmitman, Bondy Group',
    },
    dataCallout: {
      num: '+38%',
      label: 'Variación promedio · 2023–2025',
      desc: 'Incremento en expectativas salariales de perfiles Senior+ en engineering LATAM. Datos internos Bondy basados en 340 procesos cerrados en el período.',
    },
    featured: true,
    content: `
<p>Hace tres años, un Senior Backend Engineer en Buenos Aires pedía entre <strong>USD 4.000 y 6.000 mensuales</strong>. Hoy el mismo perfil pide entre <strong>USD 6.500 y 9.000</strong>. El mercado se movió. Las expectativas de los candidatos se movieron. Pero muchos hiring managers siguen usando los mismos rangos de 2023 como referencia.</p>

<p>El resultado es predecible: ofertas rechazadas, procesos que se alargan, y candidatos que se caen en la última etapa porque la cifra no está ni cerca de lo que esperaban.</p>

<h2>Por qué pasó esto.</h2>

<p>Tres factores se combinaron. Primero, la <strong>dolarización de facto</strong> del mercado tech: la mayoría de los perfiles con más de 5 años de experiencia en LATAM hoy tiene acceso directo a empresas de EEUU y Europa vía remote. El piso de referencia dejó de ser local.</p>

<p>Segundo, la <strong>concentración de la demanda</strong>. Los mejores perfiles tienen múltiples procesos abiertos en simultáneo. Cuando hay escasez real, el precio sube.</p>

<p>Tercero, el <strong>desfasaje del lado empresa</strong>. Las bandas salariales internas se fijan anualmente. El mercado se mueve cada trimestre. La brecha se acumula.</p>

<h2>Qué hacer con esto.</h2>

<h3>1. Actualizá tu referencia antes de abrir el proceso.</h3>
<p>No des por sentado que lo que pagaste hace 18 meses sigue siendo competitivo. Antes de definir el rango, pedíle a tu firma de recruiting datos recientes de procesos cerrados en el mismo stack y nivel.</p>

<h3>2. Separá el rango del presupuesto.</h3>
<p>El rango que le mostrás al candidato no tiene que ser idéntico al techo interno aprobado. Mostrarlo antes de que el candidato defina su expectativa ancla la conversación en el número equivocado.</p>

<h3>3. La velocidad es una variable de compensación.</h3>
<p>Un proceso que tarda 6 semanas compite en desventaja aunque el número sea correcto. Claridad en las etapas y feedback rápido valen más de lo que parece.</p>

<hr>

<p>En Bondy llevamos 16 años cerrando búsquedas técnicas en LATAM. Lo que vemos hoy no es una anomalía: es la nueva normalidad de un mercado que se integró globalmente más rápido de lo que las estructuras internas pudieron procesar.</p>

<hr>
<p class="article-sources"><strong>Fuentes:</strong> Datos internos Bondy Group (340 procesos cerrados, 2023–2025). Contrastados con Howdy <em>LatAm Software Engineer Cost Benchmarks 2026</em> y Teilur Talent <em>LATAM Developer Salary Report 2026</em>.</p>
`,
  },
]

// ─────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────

export const articles: Article[] = [...en, ...es]

export function getArticlesByLang(lang: Lang): Article[] {
  return articles.filter(a => a.lang === lang)
}

export function getArticleBySlug(slug: string, lang: Lang): Article | undefined {
  return articles.find(a => a.slug === slug && a.lang === lang)
}

export function getAllSlugs(lang: Lang): string[] {
  return articles.filter(a => a.lang === lang).map(a => a.slug)
}

export function getFeaturedArticle(lang: Lang): Article | undefined {
  const byLang = articles.filter(a => a.lang === lang)
  return byLang.find(a => a.featured) ?? byLang[0]
}

export function getRelatedArticles(slug: string, lang: Lang, limit = 3): Article[] {
  return articles
    .filter(a => a.lang === lang && a.slug !== slug)
    .slice(0, limit)
}

// Builds a short "Apr 2026" / "Abr 2026" style label from an ISO date.
export function formatArticleDate(iso: string, lang: Lang): string {
  const d = new Date(iso + 'T00:00:00')
  const monthsEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const monthsEs = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  const months = lang === 'es' ? monthsEs : monthsEn
  return `${months[d.getMonth()]} ${d.getFullYear()}`
}

// Normalizes the string 'Line 1\nLine 2' into an array of trimmed lines (max 3).
// Used by QuoteImage to produce the SVG from the frontmatter.
export function splitQuoteImage(quote: string | undefined): string[] {
  if (!quote) return []
  return quote.split('\n').map(s => s.trim()).filter(Boolean).slice(0, 3)
}
