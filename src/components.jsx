import { C } from './constants.js'

export function Badge({ children, color = C.accent }) {
  return (
    <span style={{ background: color + '22', color, border: `1px solid ${color}44`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700, letterSpacing: 0.4, whiteSpace: 'nowrap' }}>
      {children}
    </span>
  )
}

export function Card({ children, style = {} }) {
  return <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '14px 16px', ...style }}>{children}</div>
}

export function ProgressBar({ value, total, color = C.accent }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 5, background: C.border, borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 99, transition: 'width .4s' }} />
      </div>
      <span style={{ fontSize: 10, color: C.muted, minWidth: 30 }}>{pct}%</span>
    </div>
  )
}

export function Checkbox({ checked, color = C.accent, onChange }) {
  return (
    <div onClick={onChange} style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${checked ? color : C.border}`, background: checked ? color + '22' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', marginTop: 1 }}>
      {checked && <span style={{ color, fontSize: 11, lineHeight: 1 }}>&#10003;</span>}
    </div>
  )
}

export function SectionLabel({ children }) {
  return <div style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: 10 }}>{children}</div>
}
