const SYSTEM_PROMPT = `Voce e o B.IA PROD - agente de producao executiva da captacao audiovisual do Itajai Boat Show 2026.

CONTEXTO:
- Evento: Itajai Boat Show 2026 - 02 a 07 de julho de 2026
- Contratante: Fibrafort / Focker Yachts (contato: Thaiane / Thay)
- Prestador: Stefano - Brava Reels
- Produtor Executivo: Bernard Ferreira
- Barcos na agua: Focker 420, 388 GT, 366 GTS, 355 (test drive)
- Barcos no seco: 300 e 212

ENTREGAVEIS:
- Stories diarios: corte seco, musica, solta
- 4 Reels/dia caprichados - foco real de qualidade
- Ritual de venda: vendedor avisa Stefano via WhatsApp => champagne, brinde, tacas
- Test drive 355: Stefano embarca, capta depoimento espontaneo na saida
- Drone: 4 barcos alinhados - foto vertical 100% + video passando por cima
- Timelapse do corredor do estande
- Overviews em ingles: Focker 355, 366, 388 (Formatos A e B)

TRILHAS: rock animado (reels) | afro house / house elegante (depoimentos)
DRIVE: upload ao final de cada dia
DRONE: autorizacao formal obrigatoria - Thay providencia
NF: Stefano emite no inicio - pagamento semana seguinte

FLUXO: duvidas de Stefano => B.IA PROD => se nao souber, gera lista para Thay responder.
Resposta direta, tecnica, executavel. Apenas producao audiovisual e logistica.`

function toGeminiContents(messages, systemPrompt) {
  const contents = []
  if (systemPrompt) {
    contents.push({ role: 'user', parts: [{ text: `[INSTRUCOES]\n${systemPrompt}` }] })
    contents.push({ role: 'model', parts: [{ text: 'Entendido. Pronto para atuar.' }] })
  }
  for (const m of messages) {
    contents.push({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })
  }
  return contents
}

export async function callClaude(messages, systemOverride) {
  const key = import.meta.env.VITE_GEMINI_KEY
  if (!key) throw new Error('Chave VITE_GEMINI_KEY nao configurada')

  const contents = toGeminiContents(messages, systemOverride || SYSTEM_PROMPT)
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: { maxOutputTokens: 2000, temperature: 0.7 },
    }),
  })

  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Resposta vazia do Gemini')
  return text
}

export function buildIdeaPrompt(assunto, tipo) {
  const isEvento = assunto.includes('Boat Show')
  const isMarca  = assunto.includes('Fibrafort')

  const contexto = isEvento
    ? 'Foco: atmosfera, movimento e momentos do evento - publico premium, corredor, timelapse, ritual de champagne.'
    : isMarca
    ? 'Foco: identidade visual e emocional da marca Focker / Fibrafort - equipe, acabamento, depoimentos, posicionamento premium.'
    : `Foco: a embarcacao ${assunto} - angulos, diferenciais, detalhes tecnicos, experiencia de uso.`

  return `Voce e especialista em captacao audiovisual para eventos nauticos premium.
Gere 5 ideias de ${tipo === 'story' ? 'Stories' : 'Reels'} para captar durante o Itajai Boat Show 2026.
Assunto: ${assunto}
${contexto}
Contexto: smartphone + drone, 1 cameraman (Stefano/Brava Reels), feira nautica, publico premium. Executavel sem ensaio.

Formato de cada ideia:
TITULO: (max 8 palavras)
CENA DE ABERTURA: (direcao literal para o cameraman - primeiros 2 segundos)
O QUE CAPTURAR: (2 linhas de direcao objetiva)
TRILHA: rock animado / afro house / ambiente nautico
---`
}
