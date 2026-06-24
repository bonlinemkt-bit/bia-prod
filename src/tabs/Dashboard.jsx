import { C, RESP_COLOR } from '../constants.js'
import { BRIEFING } from '../data.js'
import { Card, Badge, ProgressBar, SectionLabel } from '../components.jsx'

const PENDENCIAS = [
  { resp:'Thay', prazo:'ate 27/Jun', item:'Enviar brand guide (fontes, cores, guide da campanha)' },
  { resp:'Thay', prazo:'ate 27/Jun', item:'Abrir Google Drive e adicionar Stefano como editor' },
  { resp:'Thay', prazo:'antes 02/Jul', item:'Autorizacao formal de voo de drone junto a organizacao' },
  { resp:'Stefano', prazo:'ate 27/Jun', item:'Confirmar e-mail para acesso ao Drive' },
  { resp:'Stefano', prazo:'antes do evento', item:'Montar cronograma diario por periodo (manha/tarde/noite)' },
  { resp:'Bernard', prazo:'imediato', item:'Enviar link do agente B.IA PROD para Stefano' },
]

export default function Dashboard({ fases, refs, onTabChange }) {
  const totalItens = fases.reduce((a,f) => a+f.items.length, 0)
  const doneItens = fases.reduce((a,f) => a+f.items.filter(i=>i.done).length, 0)
  const fasePre = fases.find(f=>f.id==='pre')
  const donePre = fasePre.items.filter(i=>i.done).length
  const refsOk = refs.filter(r=>r.status==='recebido').length

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:8 }}>
        {[
          {label:'Progresso', val:`${doneItens}/${totalItens}`, color:C.accent},
          {label:'Pre-evento', val:`${donePre}/${fasePre.items.length}`, color:C.purple},
          {label:'Referencias', val:`${refsOk}/${refs.length}`, color:'#f59e0b'},
          {label:'Dias grav.', val:'6', color:C.green},
        ].map(k => (
          <Card key={k.label} style={{ textAlign:'center', padding:'12px 6px' }}>
            <div style={{ fontSize:20, fontWeight:800, color:k.color }}>{k.val}</div>
            <div style={{ fontSize:10, color:C.muted, marginTop:2 }}>{k.label}</div>
          </Card>
        ))}
      </div>
      <Card>
        <SectionLabel>Progresso por Fase</SectionLabel>
        {fases.map(f => {
          const d = f.items.filter(i=>i.done).length
          return (
            <div key={f.id} onClick={() => onTabChange('cronograma')} style={{ marginBottom:10, cursor:'pointer' }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:4 }}>
                <span style={{ color:C.text }}>{f.label}</span>
                <span style={{ color:f.color, fontWeight:700 }}>{d}/{f.items.length}</span>
              </div>
              <ProgressBar value={d} total={f.items.length} color={f.color} />
            </div>
          )
        })}
      </Card>
      <Card>
        <SectionLabel>Pendencias Criticas</SectionLabel>
        {PENDENCIAS.map((p,i) => (
          <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', padding:'6px 0', borderBottom:`1px solid ${C.border}` }}>
            <Badge color={RESP_COLOR[p.resp]||C.muted}>{p.resp}</Badge>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, color:C.text }}>{p.item}</div>
              <div style={{ fontSize:10, color:C.muted, marginTop:2 }}>{p.prazo}</div>
            </div>
          </div>
        ))}
      </Card>
      <Card>
        <SectionLabel>Embarcacoes</SectionLabel>
        <div style={{ fontSize:11, color:C.muted, marginBottom:6 }}>NA AGUA - foco principal</div>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:10 }}>{BRIEFING.barcos_agua.map(b => <Badge key={b} color={C.accent}>{b}</Badge>)}</div>
        <div style={{ fontSize:11, color:C.muted, marginBottom:6 }}>NO SECO - foco secundario</div>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>{BRIEFING.barcos_seco.map(b => <Badge key={b} color={C.muted}>{b}</Badge>)}</div>
      </Card>
    </div>
  )
}
