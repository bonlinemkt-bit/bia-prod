import { useState } from 'react'
import { C } from './constants.js'
import { FASES_INICIAL, REFS_INICIAL } from './data.js'
import { useStorage } from './useStorage.js'
import { Badge } from './components.jsx'
import Dashboard from './tabs/Dashboard.jsx'
import Briefing from './tabs/Briefing.jsx'
import Cronograma from './tabs/Cronograma.jsx'
import Referencias from './tabs/Referencias.jsx'
import Ideias from './tabs/Ideias.jsx'
import Assistente from './tabs/Assistente.jsx'

const TABS = [
  {id:'dashboard', icon:'&#9889;', label:'Dashboard'},
  {id:'briefing',  icon:'&#128203;', label:'Briefing'},
  {id:'cronograma',icon:'&#128197;', label:'Cronograma'},
  {id:'referencias',icon:'&#128193;', label:'Referencias'},
  {id:'ideias',    icon:'&#128161;', label:'Ideias'},
  {id:'assistente',icon:'&#127897;', label:'Assistente'},
]

export default function App() {
  const [tab, setTab] = useState('dashboard')
  const [fases, setFases] = useStorage('bia_fases', FASES_INICIAL)
  const [refs, setRefs] = useStorage('bia_refs', REFS_INICIAL)

  function toggleItem(faseId, idx) {
    setFases(prev => prev.map(f => f.id!==faseId ? f : {...f, items: f.items.map((it,i) => i!==idx ? it : {...it,done:!it.done})}))
  }
  function toggleRefStatus(id) {
    setRefs(prev => prev.map(r => r.id!==id ? r : {...r, status: r.status==='recebido' ? 'pendente' : 'recebido'}))
  }
  function adicionarRef(novaRef) { setRefs(prev => [...prev, novaRef]) }

  return (
    <div style={{ fontFamily:"'Inter',system-ui,sans-serif", background:C.bg, minHeight:'100vh', color:C.text, maxWidth:720, margin:'0 auto', paddingBottom:48 }}>
      <div style={{ background:'linear-gradient(135deg,#071929 0%,#0a2038 100%)', borderBottom:`1px solid ${C.border}`, padding:'16px 16px 0', position:'sticky', top:0, zIndex:50 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
          <div style={{ width:34, height:34, background:`linear-gradient(135deg,${C.accent},#6366f1)`, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, flexShrink:0 }}>&#9875;</div>
          <div>
            <div style={{ fontSize:15, fontWeight:800, color:C.white, letterSpacing:0.3 }}>B.IA PROD</div>
            <div style={{ fontSize:10, color:C.muted, letterSpacing:0.8, textTransform:'uppercase' }}>Itajai Boat Show 2026 · Fibrafort x Brava Reels</div>
          </div>
          <div style={{ marginLeft:'auto', display:'flex', gap:6 }}>
            <Badge color={C.green}>ATIVO</Badge>
            <Badge color='#f59e0b'>02-07 JUL</Badge>
          </div>
        </div>
        <div style={{ display:'flex', gap:1, overflowX:'auto' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ background:'transparent', color:tab===t.id ? C.white : C.muted, border:'none', borderBottom:`2px solid ${tab===t.id ? C.accent : 'transparent'}`, padding:'7px 11px', fontSize:11, fontWeight:tab===t.id ? 700 : 400, cursor:'pointer', whiteSpace:'nowrap' }}>
              <span dangerouslySetInnerHTML={{__html: t.icon}} /> {t.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding:'18px 14px' }}>
        {tab==='dashboard'   && <Dashboard fases={fases} refs={refs} onTabChange={setTab} />}
        {tab==='briefing'    && <Briefing />}
        {tab==='cronograma'  && <Cronograma fases={fases} onToggle={toggleItem} />}
        {tab==='referencias' && <Referencias refs={refs} onToggleStatus={toggleRefStatus} onAdd={adicionarRef} />}
        {tab==='ideias'      && <Ideias />}
        {tab==='assistente'  && <Assistente />}
      </div>
    </div>
  )
}
