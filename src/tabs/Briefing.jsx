import { C } from '../constants.js'
import { BRIEFING } from '../data.js'
import { Card, SectionLabel } from '../components.jsx'

function InfoRow({ label, value }) {
  return <Card style={{ padding: '10px 14px' }}><div style={{ fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>{label}</div><div style={{ fontSize: 12, color: C.text }}>{value}</div></Card>
}
function ListCard({ label, items, color = '#f59e0b' }) {
  return <Card><SectionLabel>{label}</SectionLabel>{items.map((e, i) => <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: i < items.length-1 ? `1px solid ${C.border}` : 'none' }}><span style={{ color, flexShrink: 0 }}>-&gt;</span><span style={{ fontSize: 12 }}>{e}</span></div>)}</Card>
}
export default function Briefing() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 12, color: C.muted }}>Extraido da reuniao de briefing - Fibrafort x Brava Reels x Bernard.</div>
      <InfoRow label="Evento" value={BRIEFING.evento} />
      <InfoRow label="Datas do evento" value={BRIEFING.datas_evento} />
      <InfoRow label="Datas de gravacao" value={BRIEFING.datas_gravacao} />
      <InfoRow label="Contratante" value={BRIEFING.contratante} />
      <InfoRow label="Contato Fibrafort" value={BRIEFING.contato_fibrafort} />
      <InfoRow label="Prestador" value={BRIEFING.prestador} />
      <InfoRow label="Produtor Executivo" value={BRIEFING.produtor} />
      <ListCard label="Entregaveis Confirmados" items={BRIEFING.entregaveis} color="#f59e0b" />
      <ListCard label="Formatos Overview Institucional" items={BRIEFING.formatos_overview} color="#0ea5e9" />
      <Card><SectionLabel>Trilhas</SectionLabel>{BRIEFING.trilhas.map((t,i) => <div key={i} style={{ fontSize: 12, padding: '4px 0', color: C.text }}>{t}</div>)}</Card>
      <ListCard label="Logistica" items={BRIEFING.logistica} color={C.muted} />
      <Card style={{ borderColor: '#22c55e44', background: '#22c55e08' }}><SectionLabel>Validacao do Agente</SectionLabel><div style={{ fontSize: 12, color: C.text }}>{BRIEFING.validacao_agente}</div></Card>
    </div>
  )
}
