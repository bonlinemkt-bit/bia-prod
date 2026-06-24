import { C, RESP_COLOR } from '../constants.js'
import { Badge, Card, ProgressBar, Checkbox } from '../components.jsx'

export default function Cronograma({ fases, onToggle }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 12, color: C.muted }}>Toque em qualquer item para marcar como concluido.</div>
      {fases.map(fase => {
        const done = fase.items.filter(i => i.done).length
        return (
          <Card key={fase.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.white }}>{fase.label}</div>
              <Badge color={done === fase.items.length && done > 0 ? C.green : fase.color}>{done}/{fase.items.length}</Badge>
            </div>
            <ProgressBar value={done} total={fase.items.length} color={fase.color} />
            <div style={{ marginTop: 10 }}>
              {fase.items.map((it, i) => (
                <div key={i} onClick={() => onToggle(fase.id, i)} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '7px 0', borderBottom: i < fase.items.length-1 ? `1px solid ${C.border}` : 'none', cursor: 'pointer' }}>
                  <Checkbox checked={it.done} color={RESP_COLOR[it.resp] || fase.color} onChange={() => onToggle(fase.id, i)} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 2 }}>
                      <Badge color={RESP_COLOR[it.resp] || C.muted}>{it.resp}</Badge>
                      <span style={{ fontSize: 10, color: C.muted }}>{it.data}</span>
                    </div>
                    <div style={{ fontSize: 12, color: it.done ? C.muted : C.text, textDecoration: it.done ? 'line-through' : 'none', lineHeight: 1.5 }}>{it.texto}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
