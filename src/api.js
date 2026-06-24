// B.IA PROD — API via Groq (llama-3.3-70b-versatile)
// Free tier: 1000 req/dia, sem cartao, sem billing

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
- 4 Reels/dia caprichados
- Ritual de venda: vendedor avisa Stefano via WhatsApp => champagne, brinde, tacas
- Test drive 355: Stefano embarca, capta depoimento na saida
- Drone: 4 barcos alinhados - foto vertical 100% + video passando por cima
- Timelapse do corredor do estande
- Overviews em ingles: Focker 355, 366, 388 (Formatos A e B)

TRILHAS: rock animado (reels) | afro house / house elegante (depoimentos)
DRONE: autorizacao formal obrigatoria - Thay providencia
NF: Stefano emite no inicio - pagamento semana seguinte

FLUXO: duvidas de Stefano => B.IA PROD => se nao souber, gera lista para Thay responder.
Resposta direta, tecnica, executavel. Apenas producao audiovisual e logistica.`

export async function callClaude(messages, systemOverride) {
  const key = import.meta.env.VITE_GROQ_KEY
  if (!key) throw new Error('Chave VITE_GROQ_KEY nao configurada')

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 2000,
      messages: [
        { role: 'system', content: systemOverride || SYSTEM_PROMPT },
        ...messages,
      ],
    }),
  })

  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.choices?.[0]?.message?.content || ''
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
