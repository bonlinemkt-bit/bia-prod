import { useState } from 'react'
import { C } from '../constants.js'
import { ASSUNTOS } from '../data.js'
import { Card, SectionLabel } from '../components.jsx'
import { callClaude, buildIdeaPrompt } from '../api.js'

export default function Ideias() {
  const [assunto, setAssunto] = useState('Focker 420')
  const [tipo, setTipo] = useState('reel')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  async function gerar() {
    setLoading(true); setResult(''); setErro('')
    try { setResult(await callClaude([{ role: 'user', content: buildIdeaPrompt(assunto, tipo) }], buildIdeaPrompt(assunto, tipo))) }
    catch (e) { setErro(e.message) }
    setLoading(false)
  }

  const opcoes = ASSUNTOS.flatMap(g => [
    { value: g.grupo, label: g.grupo, disabled: true },
    ...g.itens.map(it => ({ value: it, label: `  ${it}`, disabled: false })),
  ])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 12, color: C.muted }}>Gere direcoes de captacao para Stefano - baseadas no contexto real do evento.</div>
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Assunto</div>
            <select value={assunto} onChange={e => { if (!e.target.value.startsWith('--')) setAssunto(e.target.value) }} style={{ width: '100%', background: C.surface, color: C.text, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 10px', fontSize: 12 }}>
              {opcoes.map(o => <option key={o.value} value={o.value} disabled={o.disabled} style={{ color: o.disabled ? C.muted : C.text }}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Formato</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['story','reel'].map(t => <button key={t} onClick={() => setTipo(t)} style={{ flex: 1, background: tipo===t ? C.accent : C.surface, color: tipo===t ? C.white : C.muted, border: `1px solid ${tipo===t ? C.accent : C.border}`, borderRadius: 8, padding: '8px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{t==='story' ? 'Story' : 'Reel'}</button>)}
            </div>
          </div>
        </div>
        <button onClick={gerar} disabled={loading} style={{ width: '100%', background: loading ? C.border : `linear-gradient(135deg,${C.accent},#6366f1)`, color: C.white, border: 'none', borderRadius: 10, padding: '12px', fontSize: 13, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Gerando direcoes...' : 'Gerar 5 ideias de captacao'}
        </button>
      </Card>
      {erro && <Card style={{ borderColor: '#ef444444', background: '#ef444408' }}><div style={{ fontSize: 12, color: '#ef4444' }}>{erro}</div></Card>}
      {result && <Card><SectionLabel>{tipo==='story' ? 'Stories' : 'Reels'} - {assunto}</SectionLabel><div style={{ fontSize: 12, color: C.text, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{result}</div></Card>}
    </div>
  )
}
