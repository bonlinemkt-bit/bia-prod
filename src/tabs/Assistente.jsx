import { useState, useRef, useEffect } from 'react'
import { C } from '../constants.js'
import { callClaude } from '../api.js'

const MSG_INICIAL = [{ role: 'assistant', content: 'B.IA PROD ativo. Itajai Boat Show 2026 - Fibrafort x Brava Reels.\n\nUse as abas para gerenciar cronograma, referencias e ideias de captacao, ou pergunte aqui qualquer duvida de producao.' }]

export default function Assistente() {
  const [msgs, setMsgs] = useState(MSG_INICIAL)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatRef = useRef(null)
  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight }, [msgs])

  async function enviar() {
    if (!input.trim() || loading) return
    const novas = [...msgs, { role: 'user', content: input }]
    setMsgs(novas); setInput(''); setLoading(true)
    try {
      const reply = await callClaude(novas.slice(1))
      setMsgs([...novas, { role: 'assistant', content: reply }])
    } catch (e) { setMsgs([...novas, { role: 'assistant', content: `Erro: ${e.message}` }]) }
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)', minHeight: 400 }}>
      <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 12 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '85%', background: m.role === 'user' ? C.accent : '#0f2035', border: `1px solid ${m.role === 'user' ? C.accent : C.border}`, borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', padding: '10px 14px', fontSize: 12, lineHeight: 1.6, color: C.text, whiteSpace: 'pre-wrap' }}>{m.content}</div>
          </div>
        ))}
        {loading && <div style={{ padding: '10px 14px', display: 'flex', gap: 4 }}>{[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, background: C.accent, borderRadius: '50%', animation: `pulse 1s ease-in-out ${i*0.2}s infinite` }} />)}</div>}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); enviar() }}} placeholder="Duvida de producao, logistica, roteiro..." style={{ flex: 1, background: '#0d1e2e', border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, padding: '10px 12px', fontSize: 12, resize: 'none', height: 52, outline: 'none', fontFamily: 'inherit' }} />
        <button onClick={enviar} disabled={loading || !input.trim()} style={{ background: !input.trim() || loading ? C.border : C.accent, border: 'none', borderRadius: 10, padding: '0 16px', cursor: !input.trim() || loading ? 'not-allowed' : 'pointer', color: C.white, fontSize: 18 }}>&#9658;</button>
      </div>
    </div>
  )
}
