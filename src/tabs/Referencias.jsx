import { useState } from 'react'
import { C } from '../constants.js'
import { TIPO_ICONE, TIPO_LABEL } from '../data.js'
import { Badge, Card } from '../components.jsx'

export default function Referencias({ refs, onToggleStatus, onAdd }) {
  const [modal, setModal] = useState(false)
  const [nova, setNova] = useState({ tipo: 'link', nome: '', url: '', obs: '' })

  function confirmar() {
    if (!nova.nome.trim()) return
    onAdd({ ...nova, id: Date.now(), status: nova.url ? 'recebido' : 'pendente' })
    setNova({ tipo: 'link', nome: '', url: '', obs: '' }); setModal(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 12, color: C.muted }}>{refs.filter(r => r.status==='recebido').length}/{refs.length} recebidas</div>
        <button onClick={() => setModal(true)} style={{ background: C.accent, color: C.white, border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Adicionar</button>
      </div>
      {refs.map(r => (
        <Card key={r.id} style={{ borderLeft: `3px solid ${r.status==='recebido' ? C.green : '#f59e0b'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 16 }}>{TIPO_ICONE[r.tipo] || '&#128279;'}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.white }}>{r.nome}</span>
                <Badge color={r.status==='recebido' ? C.green : '#f59e0b'}>{r.status==='recebido' ? 'Recebido' : 'Pendente'}</Badge>
              </div>
              <div style={{ fontSize: 10, color: C.muted }}>{TIPO_LABEL[r.tipo]}</div>
              {r.url && <a href={r.url} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: C.accent, wordBreak: 'break-all' }}>{r.url}</a>}
              {r.obs && <div style={{ fontSize: 11, color: C.muted, marginTop: 4, fontStyle: 'italic' }}>{r.obs}</div>}
            </div>
            <button onClick={() => onToggleStatus(r.id)} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 8px', color: C.muted, fontSize: 11, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {r.status==='recebido' ? 'Pendente' : 'Recebido'}
            </button>
          </div>
        </Card>
      ))}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: '#000b', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 16 }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, width: '100%', maxWidth: 400 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.white, marginBottom: 14 }}>Adicionar Referencia</div>
            {[{label:'Tipo',field:'tipo',type:'select'},{label:'Nome',field:'nome',placeholder:'Ex: Brand Guide'},{label:'URL',field:'url',placeholder:'https://...'},{label:'Obs',field:'obs',placeholder:'Ex: Enviado por Thay'}].map(f => (
              <div key={f.field} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{f.label}</div>
                {f.type==='select'
                  ? <select value={nova[f.field]} onChange={e => setNova(p => ({...p,[f.field]:e.target.value}))} style={{ width:'100%',background:C.card,color:C.text,border:`1px solid ${C.border}`,borderRadius:8,padding:'8px 10px',fontSize:12 }}>{Object.keys(TIPO_ICONE).map(o => <option key={o} value={o}>{TIPO_ICONE[o]} {TIPO_LABEL[o]}</option>)}</select>
                  : <input value={nova[f.field]} onChange={e => setNova(p => ({...p,[f.field]:e.target.value}))} placeholder={f.placeholder} style={{ width:'100%',background:C.card,color:C.text,border:`1px solid ${C.border}`,borderRadius:8,padding:'8px 10px',fontSize:12,outline:'none' }} />
                }
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button onClick={() => setModal(false)} style={{ flex:1,background:'transparent',color:C.muted,border:`1px solid ${C.border}`,borderRadius:8,padding:'9px',fontSize:12,cursor:'pointer' }}>Cancelar</button>
              <button onClick={confirmar} style={{ flex:2,background:C.accent,color:C.white,border:'none',borderRadius:8,padding:'9px',fontSize:12,fontWeight:800,cursor:'pointer' }}>Adicionar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
