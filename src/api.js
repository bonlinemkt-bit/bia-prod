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
- Ritual de venda: vendedor avisa Stefano via WhatsApp => champagne + brinde
- Drone: 4 barcos alinhados - foto vertical 100% + video passando por cima
- Overviews institucionais em ingles: Focker 355, 366, 388
  * Formato A (insert): Bernard na popa + inserts + gancho + voice over + CTA
  * Formato B (walking): Bernard andando pelo barco ao vivo
  * 366 e 388 com formatos diferentes entre si

TRILHAS: rock animado (reels) | afro house / house elegante (depoimentos)
DRONE: autorizacao formal obrigatoria - Thay providencia
NF: Stefano emite no inicio - pagamento semana seguinte

Responda de forma direta, tecnica e executavel. Apenas producao audiovisual e logistica.`

export async function callClaude(messages, systemOverride) {
  const key = import.meta.env.VITE_ANTHROPIC_KEY
  if (!key) throw new Error('Chave VITE_ANTHROPIC_KEY nao configurada no .env')
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 2000, system: systemOverride || SYSTEM_PROMPT, messages }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.content.find(b => b.type === 'text')?.text || ''
}

export function buildIdeaPrompt(assunto, tipo) {
  const isEvento = assunto.startsWith('Itajai Boat Show')
  const isMarca = assunto.startsWith('Focker / Fibrafort')
  const contexto = isEvento
    ? 'Foco: atmosfera, movimento e momentos do evento - ambiente, publico premium, corredor do estande, timelapse, ritual de champagne.'
    : isMarca
    ? 'Foco: identidade visual e emocional da marca Focker / Fibrafort - equipe, acabamento, depoimentos espontaneos, posicionamento premium.'
    : `Foco: a embarcacao ${assunto} - angulos, diferenciais, detalhes tecnicos, experiencia de uso.`
  return `Voce e especialista em captacao audiovisual para eventos nauticos premium.
Gere 5 ideias de ${tipo === 'story' ? 'Stories' : 'Reels'} para captar durante o Itajai Boat Show 2026.
Assunto: ${assunto}
${contexto}
Contexto: smartphone + drone, 1 cameraman (Stefano/Brava Reels), feira nautica, publico premium. Tudo executavel sem ensaio.

Formato de cada ideia:
TITULO: (max 8 palavras)
CENA DE ABERTURA: (direcao literal para o cameraman - primeiros 2 segundos)
O QUE CAPTURAR: (2 linhas de direcao objetiva)
TRILHA: rock animado / afro house / ambiente nautico
---`
}
