export const BRIEFING = {
  evento: 'Itajai Boat Show 2026',
  datas_evento: '2 a 7 de julho de 2026',
  datas_gravacao: 'Dias 1-6 (02 a 07/jul) - overviews podem ser entregues pos-evento',
  contratante: 'Fibrafort / Focker Yachts',
  contato_fibrafort: 'Thaiane (Thay) - referencia on-site e aprovacao de conteudo',
  prestador: 'Stefano - Brava Reels',
  produtor: 'Bernard Ferreira - Produtor Executivo',
  barcos_agua: ['Focker 420','Focker 388 GT','Focker 366 GTS','Focker 355 (test drive)'],
  barcos_seco: ['Focker 300','Focker 212'],
  entregaveis: [
    'Stories diarios: corte seco, musica e solta - sem excesso de edicao',
    '4 Reels/dia: melhores imagens do dia, caprichados - foco real de qualidade',
    'Ritual de venda: vendedor avisa Stefano via WhatsApp => champagne, brinde, tacas',
    'Test drive: Stefano embarca junto se houver oportunidade, capta depoimento na saida',
    'Drone: 4 barcos alinhados - foto vertical 100% de cima + video passando por cima',
    'Timelapse do corredor do estande (corredor de alto fluxo)',
    'Overview institucional Focker 355 - ingles (Formato A ou B)',
    'Overview institucional Focker 366 GTS - ingles (formato diferente da 388)',
    'Overview institucional Focker 388 GT - ingles (formato diferente da 366)',
  ],
  formatos_overview: [
    'Formato A (insert): Bernard na popa falando + Stefano faz inserts + gancho + voice over + CTA',
    'Formato B (walking): Bernard andando pelo barco mostrando ao vivo',
    'Decisao: testar os dois formatos - 366 e 388 com formatos diferentes entre si',
    'Timing: manha cedo / antes da abertura / oportunista. Pode ser entregue pos-evento.',
  ],
  trilhas: ['Reels gerais: rock animado','Depoimentos: afro house / house elegante'],
  logistica: [
    'Drive: Thay abre pasta + adiciona e-mail do Stefano como editor - upload ao final de cada dia',
    'Agencia de Thay acessa o drive e gera conteudo paralelo com o bruto do Stefano',
    'Wi-Fi: Thay vai garantir - preocupacao com upload via 5G instavel',
    'Alimentacao: coquetel + salgados disponiveis; almoco sendo verificado por Thay',
    'NF: Stefano emite no inicio do evento - pagamento semana seguinte',
    'Drone: autorizacao formal obrigatoria - Thay providencia junto a organizacao',
    'Brand guide: Thay criou link com fonte, cores e guide - prometeu enviar para Bernard',
    'Referencias de reels Fibrafort Factory: ja passadas por Bernard para Stefano',
  ],
  validacao_agente: "B.IA PROD foi apresentado para Stefano e Thay durante a reuniao. Thay aprovou: Perfeito. Fluxo: duvidas do Stefano => agente => se nao souber, gera lista assertiva para Thay responder.",
}

export const FASES_INICIAL = [
  { id:'pre', label:'Pre-Evento', color:'#0ea5e9', icon:'&#128197;', items:[
    {resp:'Thay',    data:'ate 27/Jun',    texto:'Enviar brand guide (fontes, cores, guide da campanha)', done:false},
    {resp:'Thay',    data:'ate 27/Jun',    texto:'Abrir Google Drive e adicionar Stefano como editor', done:false},
    {resp:'Thay',    data:'ate 27/Jun',    texto:'Enviar referencias de reels do ano passado + trilhas', done:false},
    {resp:'Thay',    data:'ate 27/Jun',    texto:'Confirmar almoco no orcamento', done:false},
    {resp:'Thay',    data:'antes 02/Jul',  texto:'Autorizacao formal de voo de drone junto a organizacao', done:false},
    {resp:'Stefano', data:'ate 27/Jun',    texto:'Confirmar e-mail para acesso ao Google Drive', done:false},
    {resp:'Stefano', data:'antes do evento',texto:'Montar cronograma diario por periodo (manha/tarde/noite)', done:false},
    {resp:'Bernard', data:'imediato',      texto:'Enviar link do agente B.IA PROD para Stefano', done:false},
    {resp:'Bernard', data:'antes 02/Jul',  texto:'Preparar roteiro/copy overviews ingles: Focker 355, 366, 388', done:false},
    {resp:'Bernard', data:'antes 02/Jul',  texto:'Revisar cronograma do Stefano e passar para Thay', done:false},
    {resp:'Bernard', data:'antes 02/Jul',  texto:'Alinhar com Stefano momento de gravacao dos overviews', done:false},
  ]},
  { id:'d1', label:'Dia 1 - 02/Jul (Qui)', color:'#f59e0b', icon:'&#127916;', items:[
    {resp:'Stefano', data:'manha cedo',      texto:'Shot drone: 4 barcos alinhados - foto vertical 100% + video passando por cima', done:false},
    {resp:'Stefano', data:'manha',           texto:'Captacao geral de abertura do estande / chegada da equipe Fibrafort', done:false},
    {resp:'Stefano', data:'oportunista',     texto:'Overview institucional Focker 355 - ingles (Formato A ou B)', done:false},
    {resp:'Stefano', data:'ao longo do dia', texto:'Stories do dia: corte seco, musica, soltar sem excesso', done:false},
    {resp:'Stefano', data:'ao longo do dia', texto:'Ritual de venda: atencao ao WhatsApp do vendedor => champagne + brinde', done:false},
    {resp:'Stefano', data:'ao longo do dia', texto:'Timelapse do corredor do estande (horario de pico)', done:false},
    {resp:'Stefano', data:'ao longo do dia', texto:'Test drive 355: embarcar junto se houver oportunidade, captar depoimento na saida', done:false},
    {resp:'Stefano', data:'fim do dia',      texto:'Upload de todo o material no Google Drive (pasta Dia 1)', done:false},
    {resp:'Stefano', data:'fim do dia',      texto:'Editar e entregar 4 Reels do dia', done:false},
    {resp:'Stefano', data:'02/Jul',          texto:'Emitir NF e entregar para Thay/Bernard', done:false},
  ]},
  { id:'d2', label:'Dia 2 - 03/Jul (Sex)', color:'#f59e0b', icon:'&#127916;', items:[
    {resp:'Stefano', data:'manha/oportunista', texto:'Overview institucional Focker 366 GTS - ingles (formato diferente da 388)', done:false},
    {resp:'Stefano', data:'ao longo do dia',   texto:'Stories do dia + ritual de venda', done:false},
    {resp:'Stefano', data:'ao longo do dia',   texto:'Captacao de detalhes tecnicos: motor, acabamento, cabine', done:false},
    {resp:'Stefano', data:'ao longo do dia',   texto:'Captar depoimentos de visitantes / potenciais compradores', done:false},
    {resp:'Stefano', data:'fim do dia',        texto:'Upload material Drive (pasta Dia 2) + entregar 4 Reels', done:false},
  ]},
  { id:'d3', label:'Dia 3 - 04/Jul (Sab)', color:'#f59e0b', icon:'&#127916;', items:[
    {resp:'Stefano', data:'manha/oportunista', texto:'Overview institucional Focker 388 GT - ingles (formato diferente da 366)', done:false},
    {resp:'Stefano', data:'ao longo do dia',   texto:'Stories do dia + ritual de venda', done:false},
    {resp:'Stefano', data:'ao longo do dia',   texto:'Focker 420 e barcos no seco (foco secundario)', done:false},
    {resp:'Stefano', data:'fim do dia',        texto:'Upload material Drive (pasta Dia 3) + entregar 4 Reels', done:false},
  ]},
  { id:'d4', label:'Dia 4 - 05/Jul (Dom)', color:'#f59e0b', icon:'&#127916;', items:[
    {resp:'Stefano', data:'ao longo do dia', texto:'Stories do dia + ritual de venda', done:false},
    {resp:'Stefano', data:'ao longo do dia', texto:'Captar depoimentos finais e melhores momentos para compilado', done:false},
    {resp:'Stefano', data:'fim do dia',      texto:'Upload material Drive (pasta Dia 4) + entregar 4 Reels', done:false},
  ]},
  { id:'d5', label:'Dia 5 - 06/Jul (Seg)', color:'#f59e0b', icon:'&#127916;', items:[
    {resp:'Stefano', data:'ao longo do dia', texto:'Stories do dia + ritual de venda', done:false},
    {resp:'Stefano', data:'fim do dia',      texto:'Upload material Drive (pasta Dia 5) + entregar 4 Reels', done:false},
    {resp:'Thay',    data:'06/Jul (meta)',   texto:'Efetuar pagamento de Stefano (NF emitida no Dia 1)', done:false},
  ]},
  { id:'d6', label:'Dia 6 - 07/Jul (Ter) + Pos', color:'#a855f7', icon:'&#128230;', items:[
    {resp:'Stefano', data:'pos-evento', texto:'Entregar overviews (355/366/388) se nao gravados durante o evento', done:false},
    {resp:'Bernard', data:'pos-evento', texto:'Confirmar recebimento e organizacao de todo o material no Drive', done:false},
    {resp:'Bernard', data:'pos-evento', texto:'Solicitar feedback de Thay sobre o material entregue', done:false},
    {resp:'Bernard', data:'pos-evento', texto:'Avaliar contrato com Brava Reels para proximas producoes', done:false},
  ]},
]

export const REFS_INICIAL = [
  {id:1, tipo:'brand_guide', nome:'Brand Guide Fibrafort/Focker', url:'', status:'pendente', obs:'Thay prometeu enviar ate 27/Jun'},
  {id:2, tipo:'video',       nome:'Referencias Reels Fibrafort Factory', url:'', status:'recebido', obs:'Bernard ja passou para Stefano'},
  {id:3, tipo:'drive',       nome:'Google Drive da Producao', url:'', status:'pendente', obs:'Thay vai criar e adicionar Stefano como editor'},
  {id:4, tipo:'audio',       nome:'Trilha: Rock Animado (Reels Gerais)', url:'', status:'pendente', obs:'Thay enviando referencias de trilha'},
  {id:5, tipo:'audio',       nome:'Trilha: Afro House / House Elegante (Depoimentos)', url:'', status:'pendente', obs:'Thay enviando referencias de trilha'},
]

export const ASSUNTOS = [
  {grupo:'-- Embarcacoes na agua --', itens:['Focker 420','Focker 388 GT','Focker 366 GTS','Focker 355 (test drive)']},
  {grupo:'-- Embarcacoes no seco --', itens:['Focker 300','Focker 212']},
  {grupo:'-- Evento --',              itens:['Itajai Boat Show -- Atmosfera geral','Itajai Boat Show -- Ritual de venda (champagne)','Itajai Boat Show -- Publico e movimento','Itajai Boat Show -- Drone / Vista aerea']},
  {grupo:'-- Marca --',               itens:['Focker / Fibrafort -- Identidade de marca','Focker / Fibrafort -- Equipe e bastidores','Focker / Fibrafort -- Depoimentos de clientes']},
]

export const TIPO_ICONE = {brand_guide:'🎨', video:'🎬', drive:'☁️', audio:'🎵', imagem:'🖼️', doc:'📄', link:'🔗'}
export const TIPO_LABEL = {brand_guide:'Brand Guide', video:'Video', drive:'Drive', audio:'Audio', imagem:'Imagem', doc:'Documento', link:'Link'}
