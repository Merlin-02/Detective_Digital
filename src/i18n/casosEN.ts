import type { TraduccionCaso } from '../services/traducirCaso'

export const CASOS_EN: Record<string, TraduccionCaso> = {
  c01: {
    titulo: 'The miracle cure of lemon syrup',
    origen:
      'Chequeado: "It is false the chain that claims German doctors found the cure for the coronavirus"',
    escenario:
      'A chain message circulated on WhatsApp and TikTok claiming that a "lemon and ginger syrup" eliminates the trending virus in 24 hours. Each forward multiplies the video\'s views.',
    explicacion:
      'It is fabricated news that "verifies itself" through forwarding: invented source, generic quote and the same date reused from old chains.',
    senales: [
      'Anonymous source or recently registered domain',
      'Date reused from old chains',
      'Promise of an extremely fast cure',
      'Constant pressure to forward',
    ],
    fuentes: ['WHO', 'Natural health blog with no author'],
    pistas: {
      c01p1: {
        titulo: 'Where does it come from?',
        contenido:
          'The message cites "research by European universities" without naming any. The link leads to a page whose domain was registered 2 months ago and has no contact details.',
      },
      c01p2: {
        titulo: 'Publication date',
        contenido:
          'The text says "urgent, forward now" and repeats the same wording of a chain debunked last year, only the disease name changed.',
      },
      c01p3: {
        titulo: 'The "expert" video',
        contenido:
          'The alleged proof is a clip with background music, generic added logos and a narrator who never identifies himself: no real laboratory or brand appears.',
      },
      c01p4: {
        titulo: 'What do agencies say',
        contenido:
          'Health authorities have already warned about "miracle cures" that spread through mass forwarding on these very platforms.',
      },
    },
  },
  c02: {
    titulo: "The striker's six-metre jump",
    origen:
      'EFE Verifica: "An image of a banner with the phrase «Out with Petro» at a Colombia vs Bolivia match is a montage"',
    escenario:
      'An image that "returns" every week shows a football player who seems to jump six metres to head the ball. Fans of the rival team share it to mock him.',
    explicacion:
      'The photo is authentic in its basis but was edited: the figure was copied and rescaled to create an impossible jump. It is a montage, not a new photo or AI.',
    senales: [
      'Incoherent shadow between objects',
      'Cut-out artifacts at the edges',
      'Photographic evidence of the real moment',
      'Spread from recently created profiles',
    ],
    fuentes: ['Match photo agency', 'Anonymous meme account'],
    pistas: {
      c02p1: {
        titulo: 'AI or editing?',
        contenido:
          'When zooming in, the shadows do not match: the player is lit from the left, but the ball and grass are lit from the right.',
      },
      c02p2: {
        titulo: 'Cut-out edges',
        contenido:
          'The shirt edges look "pixelated" in an exact vertical strip: typical of copy-pasting the figure onto another photo.',
      },
      c02p3: {
        titulo: 'The original photo',
        contenido:
          'There is a photo of the same match taken two seconds earlier by an agency photographer: the real jump only serves to push to the side.',
      },
      c02p4: {
        titulo: 'Who shares it',
        contenido:
          'The first accounts sharing it have fewer than 100 followers, post only memes and are 48 hours old.',
      },
    },
  },
  c03: {
    titulo: 'The debate gesture turned into scandal',
    origen:
      'Maldita.es: "Kamala Harris and her alleged earpieces: why there is no evidence they are"',
    escenario:
      'A video from the televised debate shows a candidate touching her face. The account that posted it claims she "cannot answer without being nervous" and it goes viral.',
    explicacion:
      'The gesture existed, but the video amplifies it with a loop and a bot network to fabricate nervousness. It is manipulation based on real material.',
    senales: [
      'Detected loop cut',
      'Ignored context (full broadcast)',
      'Spread with simultaneous bots',
      'Parody account without visible label',
    ],
    fuentes: ['Official debate broadcast', 'Parody profile'],
    pistas: {
      c03p1: {
        titulo: 'The full shot',
        contenido:
          'In the official broadcast she touches her fringe once (because of a gust of wind) and keeps talking. The viral video repeats that snippet in a loop.',
      },
      c03p2: {
        titulo: 'Traces of the montage',
        contenido:
          'Advancing frame by frame there is a sharp jump between second 4 and 5: two shots joined by a micro-cut, typical of a loop.',
      },
      c03p3: {
        titulo: 'Diffusion map',
        contenido:
          'The network detected 40 automated accounts posting the clip within the same hour, before any outlet mentioned it.',
      },
      c03p4: {
        titulo: 'The account that uploaded it',
        contenido:
          'The account is a parody one (the name says so), although the video is republished without the parody label that usually marks its posts.',
      },
    },
  },
  c04: {
    titulo: 'The "revolutionary" study of the ghost university',
    origen:
      'Chequeado: "It is false that a scientific study proved the effectiveness of chlorine dioxide against COVID-19"',
    escenario:
      'They share a headline in your group: "Infinite energy in a glass of water: surprising study". The link claims to come from an international university.',
    explicacion:
      'The study never existed in a verifiable way: it uses a predatory journal, invented authorship and unrealistic results. The "university" badges are false.',
    senales: [
      'Journal without peer review',
      'Authorship with no academic trace',
      'Results impossible to replicate',
      'Probably generated writing',
    ],
    fuentes: ['Local verification outlet', 'Predatory journal'],
    pistas: {
      c04p1: {
        titulo: 'The "journal" that published it',
        contenido:
          "The journal's page offers paid publication services without external review, using the logos of famous universities that do not endorse it.",
      },
      c04p2: {
        titulo: 'Authorship',
        contenido:
          'The three authors do not appear in academic search engines and their email ends in a domain bought the same month as the publication.',
      },
      c04p3: {
        titulo: 'The results',
        contenido:
          'The experiment uses very few samples and does not report uncertainties. No independent laboratory could replicate it.',
      },
      c04p4: {
        titulo: 'AI-generated text?',
        contenido:
          'The writing style is generic and lacks verifiable data. Automatic detection marks a high probability of AI-assisted generation.',
      },
    },
  },
  c05: {
    titulo: 'The audio of the fired doctor',
    origen:
      'Chequeado: "Fake AI videos use the identity of Cormillot, López Rosetti and other doctors to sell treatments without evidence"',
    escenario:
      'An audio circulates in school groups where a "pulmonologist" recommends a miracle supplement and claims to have 40 years of experience at a well-known hospital.',
    explicacion:
      'It is an audio deepfake: a real doctor\'s voice was cloned to say words he never spoke. Voice cloning is one of the fastest-growing disinformation techniques.',
    senales: [
      'Voice cloning pattern',
      'Hospital debunk',
      'Artificially regular pauses',
      'Origin in a forged wellness channel',
    ],
    fuentes: ['Regional hospital', 'Fraudulent wellness channel'],
    pistas: {
      c05p1: {
        titulo: 'Real or cloned voice?',
        contenido:
          'Spectrum analysis shows extremely regular pauses and breathing no human reproduces. It sounds like a real doctor who appears in a 2016 video.',
      },
      c05p2: {
        titulo: 'The hospital responds',
        contenido:
          'The hospital denied it in statements: "that professional does not exist and no such audio was released". The phone number given in the audio does not exist.',
      },
      c05p3: {
        titulo: 'Origin of the audio',
        contenido:
          'The file emerged in a wellness channel with fake followers (most without photos) and was re-shared on WhatsApp without preserving authorship metadata.',
      },
      c05p4: {
        titulo: 'Technical clues',
        contenido:
          'The same phrase is repeated with almost identical intonation in three audios published hours apart: impossible in a real recording.',
      },
    },
  },
  c06: {
    titulo: 'The concert photo exploded on social media',
    origen:
      'Maldita.es: "No, in this video of an Aitana concert the audience does not shout «Pedro Sánchez»: it is a manipulated audio"',
    escenario:
      'An early image of a band on stage shows the square with few people. Critics say they "did not sell out". The band replies that thousands poured into the square.',
    explicacion:
      'The photo is real, but it was presented as if it showed the final crowd when it was taken before the start. A one-sided context turns an authentic image into misleading evidence.',
    senales: [
      'Temporal context removed',
      'Stadium clock visible',
      'Shared by a biased account',
      'The rest of the image is omitted',
    ],
    fuentes: ['Concert organizers', 'Rival fan account'],
    pistas: {
      c06p1: {
        titulo: 'The clock in the background',
        contenido:
          'A stadium digital clock is visible in the background: it reads 17:59. The concert opened at 17:00 and the main act starts at 18:30.',
      },
      c06p2: {
        titulo: 'The square half an hour later',
        contenido:
          'Other videos of the same event, from 18:20, show the square packed. The initial photo was taken before the second wave of attendees arrived.',
      },
      c06p3: {
        titulo: 'A detail that is left out',
        contenido:
          'The image lacks the timestamp of the original camera; it is shared through a screenshot that crops the ticket.',
      },
      c06p4: {
        titulo: 'Who is behind it',
        contenido:
          'The account sharing the photo is a fan account of the rival band, with previous posts about the band\'s supposed lack of audience.',
      },
    },
  },
  c07: {
    titulo: 'The impossible central bank bonus',
    origen:
      'Chequeado: "Careful! False content about bonuses, food benefits and subsidies is circulating"',
    escenario:
      'A post in an economics group claims the central bank gives a bonus to anyone who forwards the message to 10 contacts. People start sharing their data.',
    explicacion:
      'It is an impersonation scam: they ask you to forward the message to obtain personal banking data. No bank rewards viral forwarding.',
    senales: [
      'Demand to forward the message',
      'Imitating domain with hyphen',
      'Request for banking data',
      'Expansion with automated accounts',
    ],
    fuentes: ['Central Bank', 'Fraudulent form'],
    pistas: {
      c07p1: {
        titulo: 'The bank responds',
        contenido:
          'The entity published a statement: "we never ask you to forward messages; there is no chain giveaway. Always check the domain."',
      },
      c07p2: {
        titulo: "The form's domain",
        contenido:
          "The \"registration\" link points to a domain that mimics the bank's but with an extra hyphen and letters: it is not the official domain.",
      },
      c07p3: {
        titulo: 'What the form asks for',
        contenido:
          'The form collects name, ID number and bank account. That is exactly the information an institution would not ask for to "give away" a bonus.',
      },
      c07p4: {
        titulo: 'Expansion',
        contenido:
          'The message appeared in 2 chats and spread to thousands of chats within hours, with automated replies replicating the same text and asking to forward it.',
      },
    },
  },
  c08: {
    titulo: 'The school vaccination campaign',
    origen: 'WHO: "Immunization coverage" (official fact sheet)',
    escenario:
      'A local outlet reported that the ministry is expanding the vaccination schedule and adding a new vaccine for teenagers. It is shared in school groups with the official poster.',
    explicacion:
      'It is true and verified information: official source, consistent date, multiple coverage and a cross-referenced poster.',
    senales: [
      'Identifiable official source',
      'Matching dates',
      'Double editorial coverage',
      'Document with verifiable identifier',
    ],
    fuentes: ['Ministry of Health', 'Agency A.'],
    pistas: {
      c08p1: {
        titulo: 'The direct source',
        contenido:
          "The news cites the official statement and the health center's opening hours. It includes a real follow-up phone number.",
      },
      c08p2: {
        titulo: 'Date consistency',
        contenido:
          "The publication date matches the annual schedule and the ministry's website.",
      },
      c08p3: {
        titulo: 'Cross-checking of information',
        contenido:
          'Two independent outlets covered the same news the same day with the same start date and no contradiction.',
      },
      c08p4: {
        titulo: 'Poster with verifiable details',
        contenido:
          'The poster includes correct logos, a document code and a QR code that leads to the official site when scanned: total consistency.',
      },
    },
  },
  t01: {
    titulo: 'The march that was not violent',
    origen:
      'Maldita.es: "No, this video does not show migrants ransacking Ceuta\'s streets: the footage was filmed in France"',
    escenario:
      'Mystery Media: your team must rule on a 47-second video showing a march with added images of riots. The account labels it "NOW".',
    explicacion:
      'It joins the truthful start of a march with a clip of a riot from another date, cut with editing. It is manipulation of real material through montage and bots.',
    senales: [
      'Edit cut at 23s.',
      'Discrepancy with the full broadcast',
      'Geolocation dates do not match',
      'Spread with bots',
    ],
    fuentes: ['Regional TV channel', 'New profile with no identity'],
    pistas: {
      t01p1: {
        titulo: 'Is the clip edited?',
        contenido:
          'The video has a sharp cut at second 23: the lights and street size change suddenly. There is a montage between two recordings.',
      },
      t01p2: {
        titulo: 'The reference source',
        contenido:
          'The local channel broadcast the same march without riots, from minute zero to the end. The viral version adds images of another event.',
      },
      t01p3: {
        titulo: 'Geolocation and date',
        contenido:
          'The geolocation matches the central square, but the file was created weeks before the current march date: it is material from an earlier event.',
      },
      t01p4: {
        titulo: 'Propagation persistence',
        contenido:
          'The clip took off within 20 minutes with dozens of automated accounts sharing it from different fake geographic points.',
      },
    },
  },
  t02: {
    titulo: 'The blackout said to last 14 days',
    origen:
      'EFE Verifica: "Blackout in Spain: hoaxes about the origin and reach of the power cut"',
    escenario:
      'A map circulates on WhatsApp "confirming" a total blackout across the region for 14 days with "scheduled" power cuts. The municipality has not spoken out.',
    explicacion:
      'The map is an edit of an official document of scheduled cuts. There is no 14-day blackout: the chain inflates the scope to scare people and ask for forwarding.',
    senales: [
      'Retouched map',
      'Different official statement',
      'Date recycling',
      'Asks for direct forwarding',
    ],
    fuentes: ['Municipality', 'WhatsApp chain'],
    pistas: {
      t02p1: {
        titulo: 'The date that repeats',
        contenido:
          'The chain says "starting tomorrow" and has appeared 12 times in the same group over the last 10 days. The "tomorrow blackout" never happened.',
      },
      t02p2: {
        titulo: 'The real official map',
        contenido:
          'The municipality published the real map of scheduled cuts for construction work, with specific zones and days that do not match the viral one.',
      },
      t02p3: {
        titulo: 'The retouched map',
        contenido:
          'In the shared version, the typography of the name "CRITICAL TOMORROW" differs and the bottom legend of the official document is missing.',
      },
      t02p4: {
        titulo: 'The hook',
        contenido:
          'It ends with "COMMENT so the warning spreads fast", the perfect mechanism for someone who does not verify to turn the chain into a hotspot.',
      },
    },
  },
  t03: {
    titulo: 'The campaign moderator',
    origen:
      'EFE Verifica: "Colombia\'s national registrar did not say he would manipulate the election results; it is an AI-generated audio"',
    escenario:
      'Mystery Media: your team investigates an audio where a politician seems to secretly "promise tickets". A rival spreads it as "espionage". Real voice or fake?',
    explicacion:
      'An AI-cloned voice imitating a real candidate, generated with his historical material and spread without the mandatory "AI" label, at election cost.',
    senales: [
      'Spectral cloning pattern',
      'Denial by the party and the verifier',
      'It inflates phrases that do not exist',
      'Omission of the AI label',
    ],
    fuentes: ['Verification newspaper', 'Viral audio without label'],
    pistas: {
      t03p1: {
        titulo: 'Sound analysis',
        contenido:
          "The audio's pause pattern is symmetric at the millisecond level (classic of cloning); the breaths are not like a real person's. It sounds like a 2016 candidate's speech.",
      },
      t03p2: {
        titulo: 'The party and the press',
        contenido:
          'The party denied it, and the verification outlet has published 2 similar audios this year as cloned with AI software.',
      },
      t03p3: {
        titulo: 'Clues from the recording',
        contenido:
          'The audio "mentions" a public meeting broadcast on TV. The event\'s transcript (with automatic subtitles) does not contain those phrases.',
      },
      t03p4: {
        titulo: 'Timing and goal',
        contenido:
          'The audio circulated days before the elections and omitted the mandatory "AI-generated content" label present in the original version.',
      },
    },
  },
  'w-1lnjdil': {
    titulo:
      'It is false the video in which Lamine Yamal claims he will "send Messi home" before the 2026 World Cup final: the voice was generated with AI',
    escenario:
      'It is false the video in which Lamine Yamal claims he will "send Messi home" before the 2026 World Cup final: the voice was generated with AI · La República',
  },
  'w-vh9ent': {
    titulo:
      'It is false that this image corresponds to the initial fire alarm recorded at the Sheraton hotel: it was generated with artificial intelligence',
    escenario:
      'It is false that this image corresponds to the initial fire alarm recorded at the Sheraton hotel: it was generated with artificial intelligence · La República',
  },
  'w-1gfxemm': {
    titulo:
      'It is false that this video shows Norwegian fans doing the "Viking row" at an airport after their national team\'s elimination',
    escenario:
      'It is false that this video shows Norwegian fans doing the "Viking row" at an airport after their national team\'s elimination · La República',
  },
  'w-1m0l2g4': {
    titulo:
      'It is false the video of Erling Haaland eating and getting startled at his reflection: it was manipulated with AI',
    escenario:
      'It is false the video of Erling Haaland eating and getting startled at his reflection: it was manipulated with AI · Chequeado',
  },
  'w-e9hkq': {
    titulo:
      'Video of a woman sunbathing in the National Palace is false; it was created with AI',
    escenario:
      'Video of a woman sunbathing in the National Palace is false; it was created with AI · sdpnoticias',
  },
  'w-wgtj7g': {
    titulo:
      'Video in which Nasry Asfura says he has nothing to envy Bukele for is manipulated with AI',
    escenario:
      'Video in which Nasry Asfura says he has nothing to envy Bukele for is manipulated with AI · LaPrensa.hn',
  },
  'w-10bo2sk': {
    titulo:
      'This video of four Argentine fans beating a Mexican fan is false; it was made with AI',
    escenario:
      'This video of four Argentine fans beating a Mexican fan is false; it was made with AI · Newtral',
  },
  'w-wyqy69': {
    titulo: 'It is false that Claudia Sheinbaum cancelled the World Cup venue in Mexico',
    escenario:
      'It is false that Claudia Sheinbaum cancelled the World Cup venue in Mexico · Newtral',
  },
  'w-1qxykj1': {
    titulo:
      'Infodemia MX exposed; video of woman sunbathing in the National Palace is not false',
    escenario:
      'Infodemia MX exposed; video of woman sunbathing in the National Palace is not false · etcetera.com.mx',
  },
  'w-qpbkqm': {
    titulo: 'It is false the video showing a woman sunbathing in the National Palace',
    escenario:
      'It is false the video showing a woman sunbathing in the National Palace · Polemón',
  },
  'w-1q20qcr': {
    titulo:
      'It is false this video showing a child praying after being trapped in an elevator: it was generated with AI',
    escenario:
      'It is false this video showing a child praying after being trapped in an elevator: it was generated with AI · Chequeado',
  },
  'w-1ny6dov': {
    titulo:
      'It is false that the Trump shooting suspect wears an Israeli Army hoodie in this photo: the image was made with AI',
    escenario:
      'It is false that the Trump shooting suspect wears an Israeli Army hoodie in this photo: the image was made with AI · Chequeado',
  },
  'w-1s82plm': {
    titulo: 'This video of an F-35 jet shot down by Iran is false: it was generated with AI',
    escenario:
      'This video of an F-35 jet shot down by Iran is false: it was generated with AI · fastcheck.cl',
  },
  'w-u5nmip': {
    titulo:
      'It is false that a poster against Roberto Sánchez was published in Lajas, Chota: the image was made with artificial intelligence',
    escenario:
      'It is false that a poster against Roberto Sánchez was published in Lajas, Chota: the image was made with artificial intelligence · La República',
  },
  'w-n6dky2': {
    titulo: 'It is false that Cilia Flores died in a New York jail',
    escenario: 'It is false that Cilia Flores died in a New York jail · ColombiaCheck',
  },
  'w-1q0w5l5': {
    titulo: 'This video of missiles falling on Tel Aviv is false: it was created with AI',
    escenario:
      'This video of missiles falling on Tel Aviv is false: it was created with AI · ColombiaCheck',
  },
}