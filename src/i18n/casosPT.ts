import type { TraduccionCaso } from '../services/traducirCaso'

export const CASOS_PT: Record<string, TraduccionCaso> = {
  c01: {
    titulo: 'A cura milagrosa do xarope de limão',
    origen:
      'Chequeado: "É falsa a corrente que afirma que médicos alemães encontraram a cura para o coronavírus"',
    escenario:
      'Uma corrente circulou no WhatsApp e no TikTok afirmando que um "xarope de limão com gengibre" elimina o vírus da moda em 24 horas. Cada reenvio multiplica as visualizações do vídeo.',
    explicacion:
      'É uma notícia fabricada que "se verifica a si mesma" pelo reenvio: fonte inventada, citação genérica e a mesma data reutilizada de correntes antigas.',
    senales: [
      'Fonte anônima ou domínio registrado recentemente',
      'Data reutilizada de correntes antigas',
      'Promessa de cura extremamente rápida',
      'Pressão constante para reenviar',
    ],
    fuentes: ['OMS', 'Blog de saúde natural sem autor'],
    pistas: {
      c01p1: {
        titulo: 'De onde vem?',
        contenido:
          'A mensagem cita uma "pesquisa de universidades europeias" sem citar nenhuma. O link leva a uma página com domínio registrado há 2 meses e sem dados de contato.',
      },
      c01p2: {
        titulo: 'Data de publicação',
        contenido:
          'O texto diz "urgente, reenvie agora" e repete a mesma redação de uma corrente desmentida no ano passado, com apenas o nome da doença alterado.',
      },
      c01p3: {
        titulo: 'O vídeo do "especialista"',
        contenido:
          'A suposta prova é um clipe com música de fundo, logos genéricos adicionados e um narrador que não se identifica: não aparece nenhum laboratório nem marca real.',
      },
      c01p4: {
        titulo: 'O que dizem as agências',
        contenido:
          'As autoridades de saúde já alertaram sobre "curas milagrosas" que se difundem por reenvio em massa nessas mesmas plataformas.',
      },
    },
  },
  c02: {
    titulo: 'O salto de seis metros do atacante',
    origen:
      'EFE Verifica: "Uma imagem de uma faixa com a frase «Fora Petro» em uma partida de Colômbia e Bolívia é uma montagem"',
    escenario:
      'Uma imagem que "volta" toda semana mostra um jogador de futebol que parece saltar seis metros para cabecear. Torcedores do time rival a compartilham para zombar.',
    explicacion:
      'A foto é autêntica em sua base, mas foi editada: a figura foi copiada e redimensionada para criar um salto impossível. É uma montagem, não uma foto nova nem IA.',
    senales: [
      'Sombra incoerente entre objetos',
      'Artefatos de recorte nas bordas',
      'Evidência fotográfica do momento real',
      'Difusão a partir de perfis recém-criados',
    ],
    fuentes: ['Agência fotográfica da partida', 'Conta anônima de memes'],
    pistas: {
      c02p1: {
        titulo: 'IA ou edição?',
        contenido:
          'Ao ampliar a imagem, as sombras não coincidem: o jogador está iluminado pela esquerda, mas a bola e a grama estão iluminadas pela direita.',
      },
      c02p2: {
        titulo: 'Bordas de recorte',
        contenido:
          'As bordas da camiseta aparecem "pixeladas" em uma faixa vertical exata: típico de copiar e colar a figura sobre outra fotografia.',
      },
      c02p3: {
        titulo: 'A foto original',
        contenido:
          'Existe uma fotografia da mesma partida tirada dois segundos antes por um fotógrafo da agência: o salto real serve apenas para impulsionar-se para o lado.',
      },
      c02p4: {
        titulo: 'Quem a difunde',
        contenido:
          'As primeiras contas que a compartilham têm menos de 100 seguidores, publicam apenas memes e têm 48 horas de atividade.',
      },
    },
  },
  c03: {
    titulo: 'O gesto do debate transformado em escândalo',
    origen:
      'Maldita.es: "Kamala Harris e seus supostos fones ocultos: por que não há provas de que sejam"',
    escenario:
      'Um vídeo do debate televisionado mostra uma candidata tocando o rosto. A conta que o publicou afirma que ela "é incapaz de responder sem nervosismo" e viraliza.',
    explicacion:
      'O gesto existiu, mas o vídeo o amplifica com um loop e uma rede de bots para fabricar nervosismo. É manipulação a partir de material real.',
    senales: [
      'Corte de loop detectado',
      'Contexto ignorado (transmissão completa)',
      'Difusão com bots simultâneos',
      'Conta de paródia sem etiqueta visível',
    ],
    fuentes: ['Transmissão oficial do debate', 'Perfil de paródia'],
    pistas: {
      c03p1: {
        titulo: 'A tomada completa',
        contenido:
          'Na transmissão oficial ela toca a franja uma única vez (por uma rajada de vento) e continua falando. O vídeo viral repete esse trecho em loop.',
      },
      c03p2: {
        titulo: 'Rastro da montagem',
        contenido:
          'Avançando quadro a quadro há um salto brusco entre o segundo 4 e o 5: dois planos unidos por um micro-corte, típico de um loop.',
      },
      c03p3: {
        titulo: 'Mapa de difusão',
        contenido:
          'A rede detectou 40 contas automáticas publicando o clipe na mesma hora, antes que qualquer veículo o mencionasse.',
      },
      c03p4: {
        titulo: 'A conta que o enviou',
        contenido:
          'A conta é de paródia (o nome o diz), embora o vídeo seja republicado sem a marca de paródia que normalmente acompanha suas publicações.',
      },
    },
  },
  c04: {
    titulo: 'O estudo "revolucionário" da universidade fantasma',
    origen:
      'Chequeado: "É falso que um estudo científico tenha demonstrado a eficácia do dióxido de cloro contra a COVID-19"',
    escenario:
      'Compartilham no seu grupo um título: "A energia infinita em um copo d\'água: estudo surpreendente". O link diz vir de uma universidade internacional.',
    explicacion:
      'O estudo nunca existiu de forma verificável: usa uma revista predatória, autoria inventada e resultados irrealistas. As insígnias "universidade" são falsas.',
    senales: [
      'Revista sem revisão por pares',
      'Autoria sem rastro acadêmico',
      'Resultados impossíveis de replicar',
      'Redação provavelmente gerada',
    ],
    fuentes: ['Diário local de verificação', 'Revista predatória'],
    pistas: {
      c04p1: {
        titulo: 'A "revista" que o publicou',
        contenido:
          'A revista oferece em sua página serviços de publicação pagos sem revisão externa, usando os logos de universidades famosas que não a apoiam.',
      },
      c04p2: {
        titulo: 'Autoria',
        contenido:
          'Os três autores não aparecem em buscadores acadêmicos e seu e-mail termina em um domínio comprado no mesmo mês da publicação.',
      },
      c04p3: {
        titulo: 'Os resultados',
        contenido:
          'O experimento usa pouquíssimas amostras e não informa incertezas. Nenhum laboratório independente conseguiu replicá-lo.',
      },
      c04p4: {
        titulo: 'Texto gerado?',
        contenido:
          'O estilo de redação é genérico e sem dados verificáveis. A detecção automática aponta alta probabilidade de geração assistida por IA.',
      },
    },
  },
  c05: {
    titulo: 'O áudio do médico despedido',
    origen:
      'Chequeado: "Vídeos falsos com IA usam a identidade de Cormillot, López Rosetti e outros médicos para vender tratamentos sem evidência"',
    escenario:
      'Nos grupos escolares circula um áudio em que um "pneumologista" recomenda um suplemento milagroso e diz ter 40 anos de experiência em um hospital conhecido.',
    explicacion:
      'É um deepfake de áudio: a voz de um médico real foi clonada para dizer palavras que ele nunca pronunciou. A clonagem de voz é uma das técnicas de desinformação que mais crescem.',
    senales: [
      'Padrão de clonagem de voz',
      'Desmentido do hospital',
      'Pausas artificialmente regulares',
      'Origem em canal de bem-estar falsificado',
    ],
    fuentes: ['Hospital regional', 'Canal de bem-estar fraudulento'],
    pistas: {
      c05p1: {
        titulo: 'Voz real ou clonada?',
        contenido:
          'A análise de espectro mostra pausas extremamente regulares e respiração que nenhum humano reproduz. Soa parecido a um médico real que aparece em vídeo de 2016.',
      },
      c05p2: {
        titulo: 'O hospital responde',
        contenido:
          'O hospital o desmentiu em comunicados: "esse profissional não existe nem tal áudio foi divulgado". O telefone que o áudio informa não existe.',
      },
      c05p3: {
        titulo: 'Origem do áudio',
        contenido:
          'O arquivo surgiu em um canal de bem-estar com seguidores falsos (a maioria sem fotos) e foi replicado no WhatsApp sem preservar metadados de autoria.',
      },
      c05p4: {
        titulo: 'Pistas técnicas',
        contenido:
          'A mesma frase se repete com entonação quase idêntica em três áudios publicados com horas de diferença: impossível em uma gravação real.',
      },
    },
  },
  c06: {
    titulo: 'A foto do show explodiu nas redes',
    origen:
      'Maldita.es: "Não, neste vídeo de um show de Aitana o público não grita «Pedro Sánchez»: é um áudio manipulado"',
    escenario:
      'Uma imagem de uma banda no palco de manhã cedo mostra a praça com pouca gente. Os críticos dizem que "não lotaram". A banda responde que milhares foram à praça.',
    explicacion:
      'A foto é real, mas foi apresentada como se retratasse a lotação final quando foi tirada antes do início. Um contexto unilateral transforma uma imagem autêntica em dado enganoso.',
    senales: [
      'Contexto temporal removido',
      'Relógio do estádio visível',
      'Compartilhada por conta tendenciosa',
      'Omite-se o restante da imagem',
    ],
    fuentes: ['Organizadores do show', 'Conta de torcida rival'],
    pistas: {
      c06p1: {
        titulo: 'O relógio ao fundo',
        contenido:
          'Ao fundo vê-se um relógio digital do estádio: marca 17:59. O show abriu às 17:00 e o ato principal começa às 18:30.',
      },
      c06p2: {
        titulo: 'A praça meia hora depois',
        contenido:
          'Outros vídeos do mesmo evento, das 18:20, mostram a praça lotada. A foto inicial foi tirada antes de a segunda onda de participantes chegar.',
      },
      c06p3: {
        titulo: 'Um detalhe que se omite',
        contenido:
          'A imagem não contém o timestamp da câmera original; ela é compartilhada por meio de uma captura de tela que corta o ingresso.',
      },
      c06p4: {
        titulo: 'Quem está por trás',
        contenido:
          'A conta que divulga a foto é uma conta de fãs do grupo rival, com publicações anteriores sobre a suposta falta de público da banda.',
      },
    },
  },
  c07: {
    titulo: 'O bônus impossível do banco central',
    origen: 'Chequeado: "Cuidado! Circulam conteúdos falsos de bônus, alimentos e subsídios"',
    escenario:
      'Uma publicação em um grupo de economia afirma que o banco central distribui um bônus a toda pessoa que reenviar a mensagem a 10 contatos. As pessoas começam a compartilhar seus dados.',
    explicacion:
      'É um golpe de suplantação: pedem reenvio para obter dados bancários pessoais. Nenhum banco premia o reenvio viral.',
    senales: [
      'Exigência de reenviar a mensagem',
      'Domínio imitador com hífen',
      'Solicitação de dados bancários',
      'Expansão com contas automáticas',
    ],
    fuentes: ['Banco Central', 'Formulário fraudulento'],
    pistas: {
      c07p1: {
        titulo: 'O banco responde',
        contenido:
          'A entidade publicou um comunicado: "nunca pedimos para reenviar mensagens; não existe nenhum sorteio por corrente. Verifiquem sempre o domínio."',
      },
      c07p2: {
        titulo: 'O domínio do formulário',
        contenido:
          'O link do "cadastro" aponta para um domínio que imita o do banco, mas com um hífen e letras a mais: não é o domínio oficial.',
      },
      c07p3: {
        titulo: 'O que pede no formulário',
        contenido:
          'O formulário coleta nome, documento e número da conta. É exatamente a informação que uma instituição não pede para "presentear" um bônus.',
      },
      c07p4: {
        titulo: 'Expansão',
        contenido:
          'A mensagem apareceu em 2 conversas e se propagou para milhares em horas, com respostas automáticas replicando o mesmo texto e pedindo reenvio.',
      },
    },
  },
  c08: {
    titulo: 'A campanha de vacinação escolar',
    origen: 'OMS: "Cobertura de vacinação" (folha informativa oficial)',
    escenario:
      'Um veículo local publicou que o ministério amplia o calendário de vacinas e inclui uma nova vacina para adolescentes. Compartilhado nos grupos da escola com o cartaz oficial.',
    explicacion:
      'É informação verdadeira e verificada: fonte oficial, data consistente, cobertura múltipla e cartaz com referência cruzada.',
    senales: [
      'Fonte oficial identificável',
      'Datas coincidentes',
      'Cobertura editorial dupla',
      'Documento com identificador verificável',
    ],
    fuentes: ['Ministério da Saúde', 'Agência A.'],
    pistas: {
      c08p1: {
        titulo: 'A fonte direta',
        contenido:
          'A notícia cita o comunicado oficial e os horários do centro de saúde. Contém número de telefone real de acompanhamento.',
      },
      c08p2: {
        titulo: 'Coerência de datas',
        contenido:
          'A data de publicação coincide com o calendário anual divulgado e com o site do ministério.',
      },
      c08p3: {
        titulo: 'Cruzamento de informações',
        contenido:
          'Dois veículos independentes cobriram a mesma notícia no mesmo dia, com a mesma data de início e sem contradição.',
      },
      c08p4: {
        titulo: 'Cartaz com detalhes verificáveis',
        contenido:
          'O cartaz inclui logos corretos, código do documento e um QR code que, ao ser escaneado, leva ao site oficial: coerência total.',
      },
    },
  },
  t01: {
    titulo: 'A marcha que não foi violenta',
    origen:
      'Maldita.es: "Não, este vídeo não mostra migrantes destruindo as ruas de Ceuta: são imagens gravadas na França"',
    escenario:
      'Mystery Media: sua equipe deve julgar um vídeo de 47 segundos que mostra uma marcha com imagens de distúrbios incluídas. A conta o etiqueta como "AGORA".',
    explicacion:
      'Une o início verídico de uma marcha com um fragmento de um distúrbio de outra data, cortado com edição. É manipulação de material real por montagem e bots.',
    senales: [
      'Corte de edição em 23s.',
      'Discrepância com a transmissão completa',
      'Datas de geolocalização não correspondem',
      'Difusão com bots',
    ],
    fuentes: ['Canal de TV regional', 'Novo perfil sem identidade'],
    pistas: {
      t01p1: {
        titulo: 'O clipe foi editado?',
        contenido:
          'O vídeo tem um corte brusco aos 23 segundos: as luzes e o tamanho da rua mudam de repente. Há montagem entre duas gravações.',
      },
      t01p2: {
        titulo: 'A fonte de referência',
        contenido:
          'O canal local transmitiu a mesma marcha sem distúrbios, do minuto zero ao fim. A versão viral adiciona imagens de outro evento.',
      },
      t01p3: {
        titulo: 'Geolocalização e data',
        contenido:
          'A geolocalização do vídeo coincide com a praça central, mas o arquivo foi criado semanas antes da data da marcha atual: é material de um evento anterior.',
      },
      t01p4: {
        titulo: 'Persistência da difusão',
        contenido:
          'O clipe disparou em 20 minutos com dezenas de contas automáticas compartilhando de diferentes pontos geográficos falsos.',
      },
    },
  },
  t02: {
    titulo: 'O apagão de 14 dias',
    origen:
      'EFE Verifica: "Apagão na Espanha: boatos sobre a origem e o alcance do corte de energia"',
    escenario:
      'No WhatsApp circula um mapa que "confirma" um apagão total e geral da região por 14 dias com cortes programados "reservados". O município não se manifestou.',
    explicacion:
      'O mapa é uma edição de um documento oficial de cortes programados. Não há apagão de 14 dias: a corrente infla o alcance para assustar e pedir reenvio.',
    senales: [
      'Mapa retocado',
      'Comunicado oficial diferente',
      'Reciclagem de datas',
      'Pede reenvio direto',
    ],
    fuentes: ['Município', 'Corrente de WhatsApp'],
    pistas: {
      t02p1: {
        titulo: 'A data que se repete',
        contenido:
          'A corrente diz "começar amanhã" e aparece repetida 12 vezes no mesmo grupo nos últimos 10 dias. O "apagão de amanhã" nunca ocorreu.',
      },
      t02p2: {
        titulo: 'O mapa oficial real',
        contenido:
          'O município publicou o mapa real de cortes programados para obras, com zonas e dias concretos que não coincidem com o viral.',
      },
      t02p3: {
        titulo: 'O mapa retocado',
        contenido:
          'Na versão compartilhada, a tipografia do nome "AMANHÃ CRÍTICO" é diferente e falta a legenda inferior do documento oficial.',
      },
      t02p4: {
        titulo: 'O gancho',
        contenido:
          'Termina com "COMENTE para que o aviso chegue rápido", o mecanismo perfeito para que quem não verifica transforme a corrente em foco.',
      },
    },
  },
  t03: {
    titulo: 'O moderador da campanha',
    origen:
      'EFE Verifica: "O registrador nacional da Colômbia não disse que manipulará os resultados das eleições; é um áudio gerado por IA"',
    escenario:
      'Mystery Media: sua equipe investiga um áudio em que um político parece "prometer ingressos" secretamente. Um rival o divulga como "espionagem". Voz real ou falsa?',
    explicacion:
      'Voz clonada com IA que imita um candidato real, gerada com seu material histórico e divulgada sem a marca obrigatória de "IA" em plena campanha eleitoral.',
    senales: [
      'Padrão espectral de clonagem',
      'Desmentido do partido e verificação',
      'Infla frases que não existem',
      'Omissão da marca de IA',
    ],
    fuentes: ['Jornal verificador', 'Áudio viral sem marca'],
    pistas: {
      t03p1: {
        titulo: 'Análise de som',
        contenido:
          'O padrão de pausas do áudio é simétrico em milissegundos (clássico de clonagem); as respirações não aparecem em pessoas reais. Soa como o discurso de um candidato de 2016.',
      },
      t03p2: {
        titulo: 'O partido e a imprensa',
        contenido:
          'O partido desmentiu e o jornal de verificação publicou 2 áudios semelhantes este ano como clonados com software de IA.',
      },
      t03p3: {
        titulo: 'Pistas da gravação',
        contenido:
          'O áudio "menciona" uma reunião pública transmitida pela TV. A transcrição do evento (com legendas automáticas) não contém essas frases.',
      },
      t03p4: {
        titulo: 'Timing e objetivo',
        contenido:
          'O áudio circulou poucos dias antes das eleições e omitiu a marca obrigatória de "conteúdo gerado por IA" presente na versão original.',
      },
    },
  },
  'w-1lnjdil': {
    titulo:
      'É falso o vídeo em que Lamine Yamal afirma "vou mandar Messi para casa" antes da final da Copa do Mundo 2026: a voz foi gerada com IA',
    escenario:
      'É falso o vídeo em que Lamine Yamal afirma "vou mandar Messi para casa" antes da final da Copa do Mundo 2026: a voz foi gerada com IA · La República',
  },
  'w-vh9ent': {
    titulo:
      'É falso que esta imagem corresponda ao princípio de incêndio registrado no hotel Sheraton: foi gerada com inteligência artificial',
    escenario:
      'É falso que esta imagem corresponda ao princípio de incêndio registrado no hotel Sheraton: foi gerada com inteligência artificial · La República',
  },
  'w-1gfxemm': {
    titulo:
      'É falso que este vídeo mostre torcedores noruegueses fazendo o "remo viking" em um aeroporto após a eliminação de sua seleção',
    escenario:
      'É falso que este vídeo mostre torcedores noruegueses fazendo o "remo viking" em um aeroporto após a eliminação de sua seleção · La República',
  },
  'w-1m0l2g4': {
    titulo:
      'É falso o vídeo de Erling Haaland comendo e se assustando ao ver o próprio reflexo: foi manipulado com IA',
    escenario:
      'É falso o vídeo de Erling Haaland comendo e se assustando ao ver o próprio reflexo: foi manipulado com IA · Chequeado',
  },
  'w-e9hkq': {
    titulo: 'Vídeo de mulher se bronzeando no Palácio Nacional é falso; foi criado com IA',
    escenario:
      'Vídeo de mulher se bronzeando no Palácio Nacional é falso; foi criado com IA · sdpnoticias',
  },
  'w-wgtj7g': {
    titulo:
      'Vídeo em que Nasry Asfura diz que não tem nada a invejar de Bukele está manipulado com IA',
    escenario:
      'Vídeo em que Nasry Asfura diz que não tem nada a invejar de Bukele está manipulado com IA · LaPrensa.hn',
  },
  'w-10bo2sk': {
    titulo:
      'Este vídeo de quatro torcedores argentinos batendo em um torcedor mexicano é falso; foi feito com IA',
    escenario:
      'Este vídeo de quatro torcedores argentinos batendo em um torcedor mexicano é falso; foi feito com IA · Newtral',
  },
  'w-wyqy69': {
    titulo: 'É falso que Claudia Sheinbaum tenha cancelado a sede da Copa no México',
    escenario:
      'É falso que Claudia Sheinbaum tenha cancelado a sede da Copa no México · Newtral',
  },
  'w-1qxykj1': {
    titulo: 'Expoem a Infodemia MX; vídeo de mulher que se bronzeia no Palácio Nacional não é falso',
    escenario:
      'Expoem a Infodemia MX; vídeo de mulher que se bronzeia no Palácio Nacional não é falso · etcetera.com.mx',
  },
  'w-qpbkqm': {
    titulo: 'É falso o vídeo em que se vê uma mulher tomando sol no Palácio Nacional',
    escenario:
      'É falso o vídeo em que se vê uma mulher tomando sol no Palácio Nacional · Polemón',
  },
  'w-1q20qcr': {
    titulo:
      'É falso este vídeo que mostra um menino rezando após ficar preso em um elevador: foi gerado com IA',
    escenario:
      'É falso este vídeo que mostra um menino rezando após ficar preso em um elevador: foi gerado com IA · Chequeado',
  },
  'w-1ny6dov': {
    titulo:
      'É falso que o suspeito do atentado a tiro contra Trump usa um moletom do Exército israelense nesta foto: a imagem foi feita com IA',
    escenario:
      'É falso que o suspeito do atentado a tiro contra Trump usa um moletom do Exército israelense nesta foto: a imagem foi feita com IA · Chequeado',
  },
  'w-1s82plm': {
    titulo: 'Este vídeo de um avião F-35 derrubado pelo Irã é falso: foi gerado com IA',
    escenario:
      'Este vídeo de um avião F-35 derrubado pelo Irã é falso: foi gerado com IA · fastcheck.cl',
  },
  'w-u5nmip': {
    titulo:
      'É falso que tenha sido publicado um cartaz contra Roberto Sánchez em Lajas, Chota: a imagem foi elaborada com inteligência artificial',
    escenario:
      'É falso que tenha sido publicado um cartaz contra Roberto Sánchez em Lajas, Chota: a imagem foi elaborada com inteligência artificial · La República',
  },
  'w-n6dky2': {
    titulo: 'É falso que Cilia Flores morreu na prisão de Nova York',
    escenario: 'É falso que Cilia Flores morreu na prisão de Nova York · ColombiaCheck',
  },
  'w-1q0w5l5': {
    titulo: 'Este vídeo de mísseis caindo em Tel Aviv é falso: foi criado com IA',
    escenario: 'Este vídeo de mísseis caindo em Tel Aviv é falso: foi criado com IA · ColombiaCheck',
  },
}