import { getSongs, deleteSong, addSong } from './db';

const initialSongs = [
  {
      id: '1',
      title: 'Medley Coritos',
      artist: 'Israel & New Breed',
      pdf_url: 'https://drive.google.com/file/d/1pedhl35HmjLeRrfdiP0bC1N8xOv3qfsG/preview',
      chords: "[In] INTERLUDIO\n(Toda la banda entra con fuerza)\n\n1. CORITO: \"CON MIS MANOS Y MI VIDA\"\n[V1] VERSO 1\n[C] Con mis manos y mi vida te alabo Señor\n\n[C] CORO 1\n[Fmaj7] Porque Tú has sido\n[Em7] [Ebm7] [Dm7] Precioso para mí\n[G7sus4] [C] [Dm7] Precioso para mí\n[C/E] [C] [Fmaj7] Por que Tú has sido\n[Em7] [Ebm7] [Dm7] Precioso para mí\n[F/G] [C] Por eso te alabo Señor\n\n2. CORITO: \"ALABARÉ\"\n[C] CORO\n[Fmaj7] Alabaré, porque Tú has sido precioso para mí\n[G7sus4] [C] [Dm7] Precioso para mí\n[G] [C] Alabaré a mi Señor\n[Am7] [G] Alabaré, alabaré\n[F] [C] Alabaré a mi Señor\n\n[Vp] VAMP\n[C/E] [Fmaj7] Porque Tú has sido\n[Em7] [Ebm7] [Dm7] Precioso para mí\n[F/G] [C] Por eso te alabo Señor\n\n[PC] POST CORO\n[C] [C/G] [C] [C/G] Alabaré, alabaré\n[C] [G] Alabaré a mi Señor\n[C] Alabaré, alabaré\n[G] [C] Alabaré a mi Señor\n\n3. CORITO: \"TE ALABARÁN OH JEHOVÁ\"\n[V2] VERSO 2\n[C] Te alabarán oh Jehová todos los reyes\n[G] Todos los reyes de la tierra Porque han oído los dichos de Tu boca\n[G] [F] Y cantarán de los\n[Em] [Dm] [C] Caminos de Jehová\n\n4. CORITO: \"JUAN VIO EL NÚMERO\"\n[P1] PUENTE 1\n[C] Juan vio el número de los redimidos\n[G] De los que alababan al Señor\nUnos cantaban, otros oraban\n[C] Pero todos alababan al Señor\n\n[V2] VERSO 2\n[C] Te alabarán oh Jehová todos los reyes\n[G] Todos los reyes de la tierra Porque han oído los dichos de tu boca\n[G] [F] Y cantarán de los\n[Em] [Dm] [C] Caminos de Jehová\n\n[It] INTERLUDIO\n[F] [G] [A] [B7] [C7] [C]\n\n[C2] CORO 2\n[C] Porque la gloria de Jehová es grande\nPorque Jehová es perfecto\n[C] [G/B] En sus caminos\n[Am] [G] Porque Jehová atiende al humilde\n[G] [F] [Em] [Dm] [C] Más mira de lejos al altivo"
  },
  {
      id: '2',
      title: 'Alaba Praise',
      artist: 'Elevation Worship',
      pdf_url: 'https://drive.google.com/file/d/1dm-HBcGsuSTYY0n2Cg3ZRcnzF07s9LSv/preview',
      chords: "Intro: \n[A] [E] [F#m] [D]\n\nVERSO 1\n[A]\nTe alabo en el valle\n[D/A] [A]\nTe alabo en el monte\n[E/A] [D/A]\nTe alabo en el día\n[A]\nTe alabo en la noche\n[A]\nTe alabo en el medio\n[D/A] [A]\nEstando rodeado\n[E/G#] [D/A]\nPorque cuando alabo\n[A]\nTú estás a mi lado\n\nPRE-CORO\n[E]\nMientras tenga aliento\n[D]\nMi alma canta y\n\nCORO 1\n[F#m] [D] [A]\nA - la - ba a Dios\n[E]\nMi corazón\n[F#m] [D] [A]\nA - la - ba a Dios\n[E]\nMi corazón\n\nVERSO 2\n[A]\nTe alabo al sentirlo\n[D/A] [A]\nY aun cuando no\n[E/A]\nTe alabo y sé\n[D/A] [A]\nQue estás en control\n[A]\nEs más que un sonido\n[D/A] [A]\nEs adoración\n[E/G#] [D/A]\nY cuando alabamos\n[A]\nCaerá Jericó\n\nCORO 2\n[F#m] [D] [A]\nA - la - ba a Dios\n[E]\nMi corazón\n[F#m] [D] [A]\nA - la - ba a Dios\n[E]\nMi corazón\n[F#m]\nNo me detengo\n[D]\nMi Dios vivo está\n[A] [E]\nCómo me voy a callar\n[F#m] [D] [A] [E] [A]\nA - la - ba a Dios mi corazón\n\nPUENTE 1\n[A]\nAlabo al que reina\n[A]\nAlabo al Señor\n[A]\nAlabo a aquel que la tumba venció\n[A]\nAlabo al que es bueno\n[A]\nAlabo al que es fiel\n[A]\nLe alabo porque no hay otro como él\n\nPUENTE 2\n[A]\nAlabo al que reina\n[Bm]\nAlabo al Señor\n[F#m] [D]\nAlabo a aquel que la tumba venció\n[A]\nAlabo al que es bueno\n[Bm]\nAlabo al que es fiel\n[F#m] [D]\nLe alabo porque no hay otro como él\n\nCORO 2\n[F#m] [D] [A]\nA - la - ba a Dios\n[E]\nMi corazón\n[F#m] [D] [A]\nA - la - ba a Dios\n[E]\nMi corazón\n[F#m]\nNo me detengo\n[D]\nMi Dios vivo está\n[A] [E]\nCómo me voy a callar\n[F#m] [D] [A] [E] [A]\nA - la - ba a Dios mi corazón\n\nVAMP\nQue toda la creación\nAlabe a Dios\nAlabe a Dios"
  },
  {
      id: '3',
      title: 'Queremos Fuego',
      artist: 'Jesus Worship Center',
      pdfUrl: '',
      chords: "[Intro]\n[Am] [G] [F] [Dm] [F] [E]\n[E] [Am] [E] [Am] [G] [F]\n[E] [Am] [E] [F] [G] [Am]\n\n[Verso]\n\n[Am]\nEstamos reunidos, con un solo motivo\n[F] [G]\nAlabando tú nombre, buscando más de ti\n[Am]\nSabemos que respondes, cuando tu pueblo clama\n[F] [G]\nQueremos ver tu gloria, visítanos señor\n\n[Pre-Estribillo]\n\n[E] [Am]\nCon ese fuego que quema...el que de gozo me llena\n[G] [C]\nEs ese fuego que invade...mi corazón\n[G] [E] [Am]\nCon ese fuego que quema...el que de gozo me llena\n[F] [Dm] [E]\nOh que el poder de tu espíritu venga, a ese lugar\n\n[Estribillo]\n\n[E] [Am] [E]\nSeñor queremos fuego... Señor queremos fuego... Señor queremos fuego\n[F] [G] [Am]\nQue Tu fuego consuma mi corazón\n\n([F] [G] [F] [G] [E])\n\n[E] [Am]\nQueremos que tu fuego, tú fuego que restaura\n[E]\nQue sana y purifica, renueva y santifica\n[Am]\nNo hay nada en este mundo, que deseamos más\n\nDerrama de tu espíritu, Yo sé que nos va a llenar\n[E]\nEstamos todos juntos con manos arriba\n[Am]\nGritando queremos fuego, Porque nosotros sabemos que ese\n\nFuego aún puede cambiar al mundo entero\n[E]\nFuego fuego eso queremos más, En medio de tu pueblo ahí estás\n[Am] [E]\nTodos a una voz a un mismo sentir, Cantamos alabanza y dice así\n\n[Puente]\n\n[E]\nQue tu fuego descienda...y llene mi alma\n[Am]\nQue tu fuego me encienda...que tu espíritu venga"
  },
  {
      id: '4',
      title: 'Hay poder en la alabanza',
      artist: 'Jesús Worship Center',
      pdfUrl: '',
      chords: "[Dm] [G] [Dm] [G]\n\nCORO:\n\n[N.C.] [Dm] [G]\nHay poder en la alabanza\n[Dm] [G] [Dm] [G]\nHay poder en la alabanza\n[Dm] [G] [Bb]\nHay poder en la alabanza\n[C] [Dm]\nCuando tu pueblo canta y te danza\n\n\nVERSO:\n\n[N.C.] [Dm]\nTengo un Dios\n[Dm] [G]\nQue es real\n[Dm] [G] [Dm] [G]\nEl se mueve Cuando yo le alabo\n\n[Bb]\nTengo un Dios\nQue es capaz\nPara El\nNada es imposible\n\n[Gm]\nAbrio el mar\n[Bb] [A]\nY aun los vientos le obedecen\n\n[N.C.] [Dm] [Gm]\nTengo un Dios\n[Dm] [Gm]\nQue es amor\n[Dm]\nPoderoso\n[Gm] [Dm] [C] [Bb] [Gm] [A]"
  },
  {
      id: '5',
      title: 'El ha cambiado mi lamento',
      artist: 'Desconocido',
      pdfUrl: '',
      chords: "Intro : \n[G] [B] [D] [G] [E] [C] [A] [G] [F#] [A] [C] [E] [D] [C#] [D] [E] [D]\n[G] [B] [D] [G] [E] [C] [E] [G#] [A] [B] [C] [B] [A] [F#] [G]\n\nCORO\n[G] [Am] [F#] [B] [D] [E] [Em7] [D] [G] [Am7]\n// EL HA CAM--BIA---DO MI LA-MENTO\n[Bm7] [C] [Em] [D] [G]\nY MI TRISTEZA EN DAN---ZA\n[G] [Am] [F#] [B] [D] [E] [Em7] [D] [G] [Am7] [Bm7] [Am] [C] [D] [G]\nNO CA-----LLA--RE----E CAN-TA-RE DE TU GO---ZO EN MI //\n\nVOZ\n\n[G] [C] [G]\nDONDE SOLO HABIA DOLOR\n[G] [C] [G]\nEL TRAJO SANIDAD\n[G] [C] [G]\nDONDE HABIA DESTRUCCION\n[G] [C] [G]\nEL NOS DIO CONSOLACION\n\n[G] [Am] [G] [F] [C] [G]\nSIEN--TO SU DULCE, DULCE AMOR QUE ME ILUMI---NA\n[G] [Am] [G] [F] [C]\nVE----O EL RESPLANDOR DEL SOL\n[Cm] [C] [Am] [G] [C] [D]\nQUE BRILLANDO ESTA CON SU ALE--GRI-A"
  },
  {
      id: '6',
      title: 'Con Fuego Y Poder',
      artist: 'Desconocido',
      pdfUrl: '',
      chords: "Intro: [Em] [D] [Am] \n\nVoz: [Em] [D] [Am] [C] [G] [D] [A] \n\nPre Coro: [B] [C] [Em] [D] [B] [C] [Em] [D] \n\nCoro: [C] [G] [D] [Em]"
  },
  {
      id: '7',
      title: '¿Quién Podrá?',
      artist: 'Desconocido',
      pdfUrl: '',
      chords: "Intro: [F] [Bb] [F]\n[F] [Bb] [C] [D] [F] [Bb] [F]\n\nSanto 1ra Parte: [B] [C] [A] [C]\n\nSanto 2da Parte: [B] [C] [D] [C] [B]\n\nNingún Principado: [D] [C] [Bb] [Gm]"
  },
  {
      id: '8',
      title: 'Él Viene Otra Vez',
      artist: 'Christiane D\'Clario & Alex Zurdo',
      pdfUrl: '',
      chords: "[INTRO]\n[F] [C] [F]\n[F] [C] [F] [Bb]\n\n[VERSO 1]\n[F] [C] [Bb] [F]\nYa no puedo esperar por el día en que volverá\n[C] [Bb] [F]\nA la puerta él está y el tiempo se acerca ya\n[F] [C] [F] [Bb] [F]\neh eh eh eh –\n[C] [Bb] [F]\nComo anhelo estar, junto a él por la eternidad\n[C] [Bb] [F]\nTodo hay que preparar, porque Cristo viene ya\n[C] [F] [Bb]\nVen, ven, ven\n(Dilo conmigo) [Dm] [C] [Bb]\nven, ven\n\n[CORO 1]\n[F] [C] [F]\nEl viene otra vez\n[Bb] [F] [C] [F]\nCon gloria y con poder\n[Bb] [F] [C] [F]\nCon gloria y con poder\n[Bb]\nY viene entre las nubes\n[Dm] [C] [Bb]\nY su iglesia dice: Ven, ven, ven, ven\n[F] [C] [F] [Bb] [Dm] [C] [Bb]\nVen, ven, ven\n\n[VERSO 2]\n[F] [C] [F] [Bb] [F]\nComo anhelo estar, junto a él por la eternidad\n[C] [F] [Bb] [C] [F]\nTodo hay que preparar porque Cristo viene ya\n[C] [F] [Bb]\nVen, ven (oh ven señor Jesús)\n[C] [Bb]\nven, ven\n\n[CORO 2]\n[F]\nÉl viene otra vez\n[C] [F]\n(de que viene, viene y nada lo detiene)\n[Bb] [F]\nCon gloria y con poder\n[C] [F]\n\n[PUENTE (coro 3)]\n(con mucha gloria, con su poder)\n[Bb] [F]\nCon gloria y con poder\n[C] [F]\nY viene entre las nubes (lo veré, lo veré, lo veré, lo veré)\n[Bb] [Dm] [C] [Bb]\nY su iglesia dice: Ven, ven, ven, ven\n\n[CORO 3]\n[F] [C] [F]\nÉl viene otra vez\n[Bb] [F]\nCon gloria y con poder\n[C] [F]\n(con gloria y con poder)\n[Bb] [F]\nCon gloria y con poder\n[C] [F]\nY viene entre las nubes (por su iglesia)\n[Bb] [Dm] [C] [Bb]\nY su iglesia dice: Ven, ven, ven, ven\n[F]\nVen, ven, ven\n\n[PUENTE]\n[Bb] [F] [C] [Dm]\nTodo ojo le verá, muertos resucitarán\n[Bb]\nY su pueblo se unirá en el cielo\n[F] [A] [Dm]\nYa no habrá porque llorar, será un gozo sin final\n[Bb]\nJuntos, cantaremos santo, santo\n[Bb] [F] [C] [Dm]\nTodo ojo le verá, muertos resucitarán\n[Bb]\nY su pueblo se unirá en el cielo\n[F] [A] [Dm]\nYa no habrá porque llorar, será un gozo sin final\n[Bb]\nJuntos, cantaremos santo, santo\n\n[FINAL]\n[F] [C]\nSanto, santo\n[Dm] [C] [Bb]\nJuntos cantaremos santo, santo\n[F] [C]\nSanto, santo\n[Dm] [C] [Bb]\nJuntos cantaremos santo, santo\n[F] [C]\nPor los siglos de los siglos (santo, santo)\n[Dm] [C] [Bb]\nPorque solo él es digno (santo, santo)\n[F] [C]\n\nVamos cántalo con tu vecino (santo, santo)\n[Dm]\nEs que Cristo ha vencido\n\n[CORO FINAL]\n[F]\nÉl viene otra vez\n[C] [F]\n(él viene otra vez)\n[Bb] [F]\nCon gloria y con poder\n[C] [F]\n(con gloria y con poder)\n[Bb] [F]\nCon gloria y con poder\n[C] [F]\nY viene entre las nubes (lo veré, lo veré, lo veré, lo veré)\n[Bb] [Dm] [C] [Bb]\nY su iglesia dice: Ven, ven, ven; ven,\n[F] [C] [F]\nVen, ven, ven\n[Bb] [F] [C] [F]\nY dice ven, ven, ven\n[Bb] [F] [C] [F] [Bb] [Dm] [C] [Bb]\nven, ven, ven\n[F]\nEl viene otra vez"
  },
  {
      id: '9',
      title: 'Milagroso (Abres camino)',
      artist: 'Way Maker',
      pdfUrl: '',
      chords: "[Intro]\n[G] [D] [A] [Bm]\n\n[Estrofa]\n[G]Aquí estás, te vemos mo[D]ver, te adora[A]ré, te adora[Bm]ré\n[G]Aquí estás, obrando en [D]mí, te adora[A]ré, te adora[Bm]ré\n\n[Coro]\n[G]Milagroso, abres camino, [D]cumples promesas\nLuz en ti[A]nieblas, mi Dios, así eres [Bm]Tú\n\n[Estrofa 2]\n[G]Aquí estás, sanando mi cora[D]zón, te adora[A]ré, te adora[Bm]ré\n[G]Aquí estás, tocando mi cora[D]zón, te adora[A]ré, te adora[Bm]ré\n\n[Coro]\n[G]Milagroso, abres camino, [D]cumples promesas\nLuz en ti[A]nieblas, mi Dios, así eres [Bm]Tú\n\n[Puente]\n[G]Aunque no pueda ver, estás obrando\n[D]Aunque no pueda ver, estás obrando\n[A]Siempre estás, siempre estás obrando\n[Bm]Siempre estás, siempre estás obrando\n\n[Coro]\n[G]Milagroso, abres camino, [D]cumples promesas\nLuz en ti[A]nieblas, mi Dios, así eres [Bm]Tú\n\n[Final]\n[G] [D] [A] [Bm]"
  },
  {
      id: '10',
      title: 'Danzando',
      artist: "Christine D'Clario",
      pdfUrl: '',
      chords: "[Intro]\n[Am] [F] [C] [G]\n[Am] [F] [C] [G]\n\n[Verso 1]\nTu palabra [Am]dice [F]\nQue aunque [C]pase por el fuego, [G]no me que[Am]maré [F]\nY si [C]paso por las aguas, [G]no me aho[Am]garé [F]\nAunque [C]haya oscuri[G]dad, con fe, ca[Am]minaré [F]\nPues Tú [C]siempre vas con[G]migo\n\n[Verso 2]\nTu palabra [Am]dice [F]\nNo hay [C]justo que Tú [G]hayas desa[Am]mpara[F]do\nEres [C]pan para el ham[G]briento y necesi[Am]tado [F]\nEn mi [C]mesa nunca, [G]nunca ha fal[Am]tado [F]\nTú pro[C]vees y no has fa[G]llado\n\n[Pre-Coro]\n[F]Yo no te[E7]meré, [F]Tu promesa es [E7]fiel\n\n[Coro]\nTu [Am]yugo es fá[F]cil, li[C]gera es Tu [G]carga\nTe en[Am]trego mi [F]vida y mi [C]ala[G]banza\nMi es[Am]cudo, mi [F]fuerza, mi se[C]guri[G]dad\nCon [F]Cristo camino y es[E7]toy\nDanzando en cada tempo[Am]rada [F] [C]\nDan[G]zando en cada tempo[Am]rada [F] [C] [G]\n\n[Verso 3]\nTu palabra [Am]dice [F]\nQue Tú [C]oyes el cla[G]mor del quebran[Am]tado [F]\nPor Tu [C]llaga en la [G]cruz, fuimos sa[Am]nados [F]\nSobre [C]toda enferme[G]dad, Tú has ga[Am]nado [F]\nY mi [C]vida está en Tu [G]mano\n\n[Verso 4]\nTu palabra [Am]dice [F]\nQue Tu [C]muerte en la [G]cruz fue por sal[Am]varnos [F]\nQue per[C]donas y re[G]dimes del pe[Am]cado [F]\nY en las [C]nubes, se[G]remos arre[Am]bata[F]dos\n[C]Cara a cara, [G]Te veremos\n\n[Pre-Coro]\n[F]Yo no te[E7]meré, [F]Tu promesa es [E7]fiel\n\n[Coro]\nTu [Am]yugo es fá[F]cil, li[C]gera es Tu [G]carga\nTe en[Am]trego mi [F]vida y mi [C]ala[G]banza\nMi es[Am]cudo, mi [F]fuerza, mi se[C]guri[G]dad\nCon [F]Cristo camino y es[E7]toy\nDan[G]zando en cada tempo[Am]rada [F] [C]\nDan[G]zando en cada tempo[Am]rada [F] [C]\nDan[G]zando en cada tempo[Am]rada [F] [C] [G]\n\n[Estribillo]\nSigo danzando, glorificando\nEn cada temporada, Tú sigues obrando\nAunque ande en el valle de sombra\nDanzo, danzo, danzo, danzo\n\n[Puente]\n[Am]No se apaga, no se apa[F]gará este ritmo\n[C]Aunque venga contra [G]mí el enemigo\n[Am]Tus promesas siem[F]pre van conmigo\n[C]Danzo, danzo, danzo, danzo\n\n[Am]No se apaga, no se apa[F]gará este ritmo\n[C]Aunque venga contra [G]mí el enemigo\n[Am]Tus promesas siem[F]pre van conmigo\n[C]Danzo, danzo, danzo, danzo\n\nEn [Am]Ti yo con[F]fío, en [C]Ti yo con[G]fío\nEn [Am]Ti yo con[F]fío, en [C]Ti yo con[G]fío\nEn [Am]Ti yo con[F]fío, en [C]Ti yo con[G]fío [Am] [F] [C] [G]\n\n[Coro]\nDan[G]zando en cada tempo[Am]rada [F] [C]\nDan[G]zando en cada tempo[Am]rada [F] [C]\n\n[Final]\nDanzando en cada tempo[Am]rada\n\n[Instrumental]\n[Am] [F] [C] [G]\n[Am] [F] [C] [G]\n[Am] [F] [C] [G]\n[Am] [F] [C] [G]\n\n[Cantico]\n[Am] [F] [C] [G]\n[Am] [F] [C] [G]\n[Am] [F] [C] [G]\n[Am] [F] [C] [G]\n\n[Coro]\nTu [Am]yugo es fá[F]cil, li[C]gera es Tu [G]carga\nTe en[Am]trego mi [F]vida y mi [C]ala[G]banza\nMi es[Am]cudo, mi [F]fuerza, mi se[C]guri[G]dad\nCon [F]Cristo camino y es[E7]toy\n\n[Outro]\nDan[Am]zando en cada temporada"
  } 
];

export async function resetSongs() {
  console.log("Starting full database reset...");
  try {
    const songs = await getSongs();
    console.log(`Found ${songs.length} songs to delete.`);
    for (const song of songs) {
        await deleteSong(song.id);
    }
    console.log("Collection cleared.");
    
    console.log("Seeding fresh songs...");
    for (const song of initialSongs) {
      await addSong(song, song.id);
    }
    console.log("Reset complete.");
  } catch (error) {
    console.error("Error in resetSongs:", error);
    throw error;
  }
}
