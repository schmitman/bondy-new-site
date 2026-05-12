'use client'

import { useEffect, useState } from 'react'
import type * as React from 'react'
import Link from 'next/link'

type Profile = {
  email?: string
  name?: string
  linkedin_url?: string
  current_position?: string
  current_company?: string
  years_experience?: number | string
  location_city?: string
  location_country?: string
  primary_area?: string
  seniority?: string
  skills?: string[]
  modality_preference?: string[]
  english_level?: string
  spanish_level?: string
  open_to_relocate?: boolean
  willing_to_travel?: boolean
  desired_salary_amount?: number | string
  desired_salary_currency?: string
  desired_salary_period?: string
  desired_salary_notes?: string
  available_from?: string
  notice_period?: string
  contract_preference?: string[]
  pitch?: string
  edit_token_expires_at?: string
}

const COPY = {
  es: {
    loading: 'Cargando tu perfil…',
    invalidToken: 'Este link no es válido o ya expiró. Volvé a entrar a /jobs y dejá tus datos de nuevo — te vamos a mandar un link nuevo.',
    expired: 'El link expiró. Volvé a entrar a /jobs y completá tus datos de nuevo.',
    title: 'Tu perfil en Bondy',
    sub: 'Completá los campos que falten o actualizá lo que cambió. Solo nosotros vemos esta información — no se comparte con clientes sin tu autorización.',
    sections: {
      basic: 'Información básica',
      experience: 'Experiencia',
      skills: 'Skills y especialización',
      preferences: 'Preferencias de trabajo',
      languages: 'Idiomas',
      salary: 'Expectativa salarial',
      availability: 'Disponibilidad',
      pitch: 'Sobre vos',
    },
    fields: {
      name: 'Nombre completo',
      email: 'Email',
      linkedin: 'LinkedIn',
      currentPosition: 'Posición actual',
      currentCompany: 'Empresa actual',
      years: 'Años de experiencia',
      city: 'Ciudad',
      country: 'País',
      area: 'Área principal',
      seniority: 'Seniority',
      skillsAdd: 'Skills (separá con coma o Enter)',
      modality: 'Modalidad preferida',
      english: 'Nivel de inglés',
      spanish: 'Nivel de español',
      relocate: 'Abierto a relocarme',
      travel: 'Puedo viajar',
      salaryAmount: 'Monto',
      salaryCurrency: 'Moneda',
      salaryPeriod: 'Período',
      salaryNotes: 'Notas sobre salario',
      availableFrom: 'Disponible desde',
      noticePeriod: 'Aviso de renuncia',
      contract: 'Tipo de contrato preferido',
      pitch: 'Pitch / contanos algo sobre vos (opcional)',
    },
    save: 'Guardar cambios',
    saving: 'Guardando…',
    saved: '✓ Guardado',
    error: 'No pudimos guardar. Intentá de nuevo.',
    backHome: '← Volver al sitio',
    expiresIn: (days: number) => `Este link es válido por ${days} día${days === 1 ? '' : 's'} más.`,
  },
  en: {
    loading: 'Loading your profile…',
    invalidToken: 'This link is invalid or has expired. Go back to /jobs and submit your info again — we\'ll send a new link.',
    expired: 'The link has expired. Go back to /jobs and submit your info again.',
    title: 'Your Bondy profile',
    sub: 'Fill in what\'s missing or update what changed. Only we see this — we don\'t share it with clients without your permission.',
    sections: {
      basic: 'Basic info',
      experience: 'Experience',
      skills: 'Skills and specialization',
      preferences: 'Work preferences',
      languages: 'Languages',
      salary: 'Salary expectations',
      availability: 'Availability',
      pitch: 'About you',
    },
    fields: {
      name: 'Full name',
      email: 'Email',
      linkedin: 'LinkedIn',
      currentPosition: 'Current position',
      currentCompany: 'Current company',
      years: 'Years of experience',
      city: 'City',
      country: 'Country',
      area: 'Primary area',
      seniority: 'Seniority',
      skillsAdd: 'Skills (separate with comma or Enter)',
      modality: 'Preferred modality',
      english: 'English level',
      spanish: 'Spanish level',
      relocate: 'Open to relocating',
      travel: 'Willing to travel',
      salaryAmount: 'Amount',
      salaryCurrency: 'Currency',
      salaryPeriod: 'Period',
      salaryNotes: 'Salary notes',
      availableFrom: 'Available from',
      noticePeriod: 'Notice period',
      contract: 'Preferred contract type',
      pitch: 'Pitch / tell us about yourself (optional)',
    },
    save: 'Save changes',
    saving: 'Saving…',
    saved: '✓ Saved',
    error: 'Could not save. Please try again.',
    backHome: '← Back to site',
    expiresIn: (days: number) => `This link is valid for ${days} more day${days === 1 ? '' : 's'}.`,
  },
}

const AREAS = ['Backend', 'Frontend', 'Fullstack', 'Mobile', 'Data', 'DevOps', 'QA', 'Hardware', 'Product', 'Design', 'Recruiting', 'Other']
const SENIORITIES = ['Junior', 'SSR', 'Senior', 'Lead', 'Staff', 'Principal']
const MODALITIES = ['remote', 'hybrid', 'on-site']
const LANGUAGE_LEVELS = ['basic', 'intermediate', 'advanced', 'native']
const CONTRACT_TYPES = ['full-time', 'part-time', 'contractor', 'freelance']
const CURRENCIES = ['USD', 'ARS', 'EUR', 'BRL', 'MXN', 'CLP', 'COP', 'UYU']
const PERIODS = ['monthly', 'yearly']

export default function EditFormClient({ lang, token }: { lang: 'en' | 'es'; token: string }) {
  const L = COPY[lang]
  const [state, setState] = useState<'loading' | 'invalid' | 'expired' | 'ready'>('loading')
  const [profile, setProfile] = useState<Profile>({})
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [skillInput, setSkillInput] = useState('')

  useEffect(() => {
    if (!token) {
      setState('invalid')
      return
    }
    fetch(`/api/jobs/edit?token=${encodeURIComponent(token)}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setProfile(data.profile)
          setState('ready')
        } else if (data.reason === 'expired') {
          setState('expired')
        } else {
          setState('invalid')
        }
      })
      .catch(() => setState('invalid'))
  }, [token])

  function patch(p: Partial<Profile>) {
    setProfile((prev) => ({ ...prev, ...p }))
  }

  function toggleArray(field: keyof Profile, value: string) {
    const arr = (profile[field] as string[]) || []
    const next = arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]
    patch({ [field]: next } as Partial<Profile>)
  }

  function addSkill() {
    const v = skillInput.trim()
    if (!v) return
    const existing = profile.skills || []
    if (existing.find((s) => s.toLowerCase() === v.toLowerCase())) {
      setSkillInput('')
      return
    }
    patch({ skills: [...existing, v] })
    setSkillInput('')
  }

  function removeSkill(s: string) {
    patch({ skills: (profile.skills || []).filter((x) => x !== s) })
  }

  async function save() {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/jobs/edit?token=${encodeURIComponent(token)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          linkedin_url: profile.linkedin_url || null,
          current_position: profile.current_position || null,
          current_company: profile.current_company || null,
          years_experience: profile.years_experience ? Number(profile.years_experience) : null,
          location_city: profile.location_city || null,
          location_country: profile.location_country || null,
          primary_area: profile.primary_area || null,
          seniority: profile.seniority || null,
          skills: profile.skills || [],
          modality_preference: profile.modality_preference || [],
          english_level: profile.english_level || null,
          spanish_level: profile.spanish_level || null,
          open_to_relocate: !!profile.open_to_relocate,
          willing_to_travel: !!profile.willing_to_travel,
          desired_salary_amount: profile.desired_salary_amount ? Number(profile.desired_salary_amount) : null,
          desired_salary_currency: profile.desired_salary_currency || null,
          desired_salary_period: profile.desired_salary_period || null,
          desired_salary_notes: profile.desired_salary_notes || null,
          available_from: profile.available_from || null,
          notice_period: profile.notice_period || null,
          contract_preference: profile.contract_preference || [],
          pitch: profile.pitch || null,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.reason || 'error')
      setSavedAt(new Date())
    } catch (e) {
      setError((e as Error).message || L.error)
    } finally {
      setSaving(false)
    }
  }

  const tw = {
    card: '#FFFFFF', ink: '#3A3530', sub: '#5A5550', faint: '#7A7874',
    rule: '#E8E4DE', green: '#4A8C40', greenTint: 'rgba(74,140,64,0.06)', warn: '#C06A2D',
  }
  const serif = "'Special Elite', Georgia, serif"
  const body = "'Plus Jakarta Sans', system-ui, sans-serif"

  if (state === 'loading') {
    return <div style={{ fontFamily: body, color: tw.sub, padding: 40, textAlign: 'center' }}>{L.loading}</div>
  }
  if (state === 'invalid') {
    return (
      <div style={errorBox}>
        <div style={{ fontFamily: serif, fontSize: 22, color: tw.ink, marginBottom: 12 }}>⚠ {lang === 'es' ? 'Link inválido' : 'Invalid link'}</div>
        <p style={{ fontFamily: body, fontSize: 14, color: tw.sub, margin: '0 0 18px 0' }}>{L.invalidToken}</p>
        <Link href={`/${lang}/jobs`} style={ctaLink}>← /jobs</Link>
      </div>
    )
  }
  if (state === 'expired') {
    return (
      <div style={errorBox}>
        <div style={{ fontFamily: serif, fontSize: 22, color: tw.ink, marginBottom: 12 }}>⏱ {lang === 'es' ? 'Link expirado' : 'Link expired'}</div>
        <p style={{ fontFamily: body, fontSize: 14, color: tw.sub, margin: '0 0 18px 0' }}>{L.expired}</p>
        <Link href={`/${lang}/jobs`} style={ctaLink}>← /jobs</Link>
      </div>
    )
  }

  const expiresIn = profile.edit_token_expires_at
    ? Math.max(0, Math.ceil((new Date(profile.edit_token_expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null

  return (
    <div style={{ background: tw.card, border: `1px solid ${tw.rule}`, padding: '40px 36px' }}>
      <div style={{ fontFamily: body, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: tw.green, marginBottom: 12, fontWeight: 500 }}>
        BONDY · TALENT POOL
      </div>
      <h1 style={{ fontFamily: serif, fontSize: 30, lineHeight: 1.2, color: tw.ink, margin: '0 0 14px 0', fontWeight: 400 }}>{L.title}</h1>
      <p style={{ fontFamily: body, fontSize: 14, lineHeight: 1.7, color: tw.sub, margin: '0 0 20px 0' }}>{L.sub}</p>
      <div style={{ fontFamily: body, fontSize: 12, color: tw.faint, marginBottom: 32, background: tw.greenTint, padding: '8px 12px', display: 'inline-block' }}>
        {profile.email} {expiresIn !== null && expiresIn > 0 ? ` · ${L.expiresIn(expiresIn)}` : ''}
      </div>

      {/* Basic */}
      <Section title={L.sections.basic}>
        <FieldRow>
          <Field label={L.fields.name}><Input value={profile.name || ''} onChange={(v) => patch({ name: v })} /></Field>
          <Field label={L.fields.linkedin}><Input value={profile.linkedin_url || ''} onChange={(v) => patch({ linkedin_url: v })} placeholder="https://linkedin.com/in/..." /></Field>
        </FieldRow>
        <FieldRow>
          <Field label={L.fields.city}><Input value={profile.location_city || ''} onChange={(v) => patch({ location_city: v })} /></Field>
          <Field label={L.fields.country}><Input value={profile.location_country || ''} onChange={(v) => patch({ location_country: v })} /></Field>
        </FieldRow>
      </Section>

      {/* Experience */}
      <Section title={L.sections.experience}>
        <FieldRow>
          <Field label={L.fields.currentPosition}><Input value={profile.current_position || ''} onChange={(v) => patch({ current_position: v })} /></Field>
          <Field label={L.fields.currentCompany}><Input value={profile.current_company || ''} onChange={(v) => patch({ current_company: v })} /></Field>
        </FieldRow>
        <FieldRow>
          <Field label={L.fields.years}><Input type="number" value={String(profile.years_experience ?? '')} onChange={(v) => patch({ years_experience: v })} /></Field>
          <Field label={L.fields.seniority}><Select value={profile.seniority || ''} onChange={(v) => patch({ seniority: v })} options={SENIORITIES} /></Field>
        </FieldRow>
      </Section>

      {/* Skills */}
      <Section title={L.sections.skills}>
        <Field label={L.fields.area}>
          <Select value={profile.primary_area || ''} onChange={(v) => patch({ primary_area: v })} options={AREAS} />
        </Field>
        <Field label={L.fields.skillsAdd}>
          <div style={{ display: 'flex', gap: 8 }}>
            <Input
              value={skillInput}
              onChange={setSkillInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ',') {
                  e.preventDefault()
                  addSkill()
                }
              }}
              placeholder="TypeScript, React, AWS…"
            />
            <button type="button" onClick={addSkill} style={smallBtn}>+</button>
          </div>
          {(profile.skills?.length || 0) > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
              {(profile.skills || []).map((s) => (
                <span key={s} style={chip}>
                  {s}
                  <button onClick={() => removeSkill(s)} type="button" style={chipX}>×</button>
                </span>
              ))}
            </div>
          )}
        </Field>
      </Section>

      {/* Preferences */}
      <Section title={L.sections.preferences}>
        <Field label={L.fields.modality}>
          <MultiToggle
            options={MODALITIES}
            value={profile.modality_preference || []}
            onToggle={(v) => toggleArray('modality_preference', v)}
          />
        </Field>
        <Field label={L.fields.contract}>
          <MultiToggle
            options={CONTRACT_TYPES}
            value={profile.contract_preference || []}
            onToggle={(v) => toggleArray('contract_preference', v)}
          />
        </Field>
        <FieldRow>
          <CheckRow checked={!!profile.open_to_relocate} onChange={(v) => patch({ open_to_relocate: v })} label={L.fields.relocate} />
          <CheckRow checked={!!profile.willing_to_travel} onChange={(v) => patch({ willing_to_travel: v })} label={L.fields.travel} />
        </FieldRow>
      </Section>

      {/* Languages */}
      <Section title={L.sections.languages}>
        <FieldRow>
          <Field label={L.fields.english}><Select value={profile.english_level || ''} onChange={(v) => patch({ english_level: v })} options={LANGUAGE_LEVELS} /></Field>
          <Field label={L.fields.spanish}><Select value={profile.spanish_level || ''} onChange={(v) => patch({ spanish_level: v })} options={LANGUAGE_LEVELS} /></Field>
        </FieldRow>
      </Section>

      {/* Salary */}
      <Section title={L.sections.salary}>
        <FieldRow>
          <Field label={L.fields.salaryAmount}><Input type="number" value={String(profile.desired_salary_amount ?? '')} onChange={(v) => patch({ desired_salary_amount: v })} /></Field>
          <Field label={L.fields.salaryCurrency}><Select value={profile.desired_salary_currency || ''} onChange={(v) => patch({ desired_salary_currency: v })} options={CURRENCIES} /></Field>
          <Field label={L.fields.salaryPeriod}><Select value={profile.desired_salary_period || ''} onChange={(v) => patch({ desired_salary_period: v })} options={PERIODS} /></Field>
        </FieldRow>
        <Field label={L.fields.salaryNotes}><Input value={profile.desired_salary_notes || ''} onChange={(v) => patch({ desired_salary_notes: v })} /></Field>
      </Section>

      {/* Availability */}
      <Section title={L.sections.availability}>
        <FieldRow>
          <Field label={L.fields.availableFrom}><Input type="date" value={profile.available_from || ''} onChange={(v) => patch({ available_from: v })} /></Field>
          <Field label={L.fields.noticePeriod}><Input value={profile.notice_period || ''} onChange={(v) => patch({ notice_period: v })} placeholder={lang === 'es' ? '2 semanas, 1 mes…' : '2 weeks, 1 month…'} /></Field>
        </FieldRow>
      </Section>

      {/* Pitch */}
      <Section title={L.sections.pitch}>
        <Field label={L.fields.pitch}>
          <textarea
            value={profile.pitch || ''}
            onChange={(e) => patch({ pitch: e.target.value })}
            style={{ ...inputStyle(), minHeight: 100, lineHeight: 1.6, resize: 'vertical' }}
            placeholder={lang === 'es' ? 'Lo que quieras contarnos…' : 'Anything you want us to know…'}
          />
        </Field>
      </Section>

      {/* Save bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 32, paddingTop: 24, borderTop: `1px solid ${tw.rule}` }}>
        <button onClick={save} disabled={saving} style={primaryBtn(saving)}>
          {saving ? L.saving : L.save}
        </button>
        {savedAt && !saving && (
          <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: tw.green }}>
            {L.saved} · {savedAt.toLocaleTimeString(lang === 'es' ? 'es-AR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
        {error && <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: 11, color: tw.warn }}>{L.error}</span>}
        <Link href={`/${lang}`} style={{ marginLeft: 'auto', fontFamily: body, fontSize: 11, color: tw.faint, textDecoration: 'none' }}>{L.backHome}</Link>
      </div>
    </div>
  )
}

// ───────── Inline UI helpers ─────────
const palette = { rule: '#E8E4DE', ink: '#3A3530', sub: '#5A5550', green: '#4A8C40', warn: '#C06A2D', bg: '#FEFCF9', white: '#FFFFFF' }
const body = "'Plus Jakarta Sans', system-ui, sans-serif"
const mono = "'Courier Prime', monospace"

function inputStyle(): React.CSSProperties {
  return {
    fontFamily: body, fontSize: 14, padding: '10px 12px',
    background: palette.white, color: palette.ink,
    border: `1px solid ${palette.rule}`, outline: 'none', width: '100%', boxSizing: 'border-box',
  }
}

function Input({
  value, onChange, placeholder, type, onKeyDown,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}) {
  return (
    <input
      type={type || 'text'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      style={inputStyle()}
    />
  )
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle()}>
      <option value="">—</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function MultiToggle({ options, value, onToggle }: { options: string[]; value: string[]; onToggle: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {options.map((o) => {
        const on = value.includes(o)
        return (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            style={{
              fontFamily: mono, fontSize: 11, letterSpacing: '0.06em',
              padding: '7px 12px',
              background: on ? palette.green : palette.white,
              color: on ? palette.white : palette.sub,
              border: `1px solid ${on ? palette.green : palette.rule}`,
              cursor: 'pointer',
            }}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}

function CheckRow({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: body, fontSize: 14, color: palette.ink, flex: 1 }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  )
}

function Section({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: palette.green, margin: '0 0 14px 0' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
      <span style={{ fontFamily: body, fontSize: 12, color: palette.sub, fontWeight: 500 }}>{label}</span>
      {children}
    </label>
  )
}

function FieldRow({ children }: { children?: React.ReactNode }) {
  return <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>{children}</div>
}

const primaryBtn = (disabled: boolean): React.CSSProperties => ({
  fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
  background: palette.green, color: '#fff', border: 'none', padding: '12px 24px',
  cursor: disabled ? 'wait' : 'pointer', opacity: disabled ? 0.6 : 1,
})
const smallBtn: React.CSSProperties = {
  fontFamily: mono, fontSize: 14, padding: '0 14px',
  background: palette.green, color: '#fff', border: 'none', cursor: 'pointer',
}
const chip: React.CSSProperties = {
  fontFamily: mono, fontSize: 11, padding: '4px 8px 4px 10px',
  background: palette.bg, color: palette.ink, border: `1px solid ${palette.rule}`,
  display: 'inline-flex', alignItems: 'center', gap: 4,
}
const chipX: React.CSSProperties = {
  background: 'transparent', border: 'none', color: palette.warn, cursor: 'pointer',
  fontSize: 16, lineHeight: 1, padding: '0 2px',
}
const errorBox: React.CSSProperties = {
  background: palette.white, border: `1px solid ${palette.rule}`, padding: '40px 36px',
}
const ctaLink: React.CSSProperties = {
  fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
  color: palette.green, textDecoration: 'none', borderBottom: `1px solid ${palette.green}`,
  paddingBottom: 2,
}
