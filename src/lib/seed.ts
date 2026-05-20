import { addSong, getSongs } from './db';

const initialSongs = [
  {
    title: 'Medley Coritos',
    artist: 'Israel & New Breed',
    pdfUrl: 'https://drive.google.com/file/d/1pedhl35HmjLeRrfdiP0bC1N8xOv3qfsG/preview',
    chords: "[In] INTERLUDIO\n(Toda la banda entra con fuerza)\n\n1. CORITO: \"CON MIS MANOS Y MI VIDA\"\n[V1] VERSO 1\n[C] Con mis manos y mi vida te alabo Señor\n\n[C] CORO 1\n[Fmaj7] Porque Tú has sido\n[Em7] [Ebm7] [Dm7] Precioso para mí\n[G7sus4] [C] [Dm7] Precioso para mí\n[C/E] [C] [Fmaj7] Por que Tú has sido\n[Em7] [Ebm7] [Dm7] Precioso para mí\n[F/G] [C] Por eso te alabo Señor\n\n2. CORITO: \"ALABARÉ\"\n[C] CORO\n[Fmaj7] Alabaré, porque Tú has sido precioso para mí\n[G7sus4] [C] [Dm7] Precioso para mí\n[G] [C] Alabaré a mi Señor\n[Am7] [G] Alabaré, alabaré\n[F] [C] Alabaré a mi Señor\n\n[Vp] VAMP\n[C/E] [Fmaj7] Porque Tú has sido\n[Em7] [Ebm7] [Dm7] Precioso para mí\n[F/G] [C] Por eso te alabo Señor\n\n[PC] POST CORO\n[C] [C/G] [C] [C/G] Alabaré, alabaré\n[C] [G] Alabaré a mi Señor\n[C] Alabaré, alabaré\n[G] [C] Alabaré a mi Señor\n\n3. CORITO: \"TE ALABARÁN OH JEHOVÁ\"\n[V2] VERSO 2\n[C] Te alabarán oh Jehová todos los reyes\n[G] Todos los reyes de la tierra Porque han oído los dichos de Tu boca\n[G] [F] Y cantarán de los\n[Em] [Dm] [C] Caminos de Jehová\n\n4. CORITO: \"JUAN VIO EL NÚMERO\"\n[P1] PUENTE 1\n[C] Juan vio el número de los redimidos\n[G] De los que alababan al Señor\nUnos cantaban, otros oraban\n[C] Pero todos alababan al Señor\n\n[V2] VERSO 2\n[C] Te alabarán oh Jehová todos los reyes\n[G] Todos los reyes de la tierra Porque han oído los dichos de tu boca\n[G] [F] Y cantarán de los\n[Em] [Dm] [C] Caminos de Jehová\n\n[It] INTERLUDIO\n[F] [G] [A] [B7] [C7] [C]\n\n[C2] CORO 2\n[C] Porque la gloria de Jehová es grande\nPorque Jehová es perfecto\n[C] [G/B] En sus caminos\n[Am] [G] Porque Jehová atiende al humilde\n[G] [F] [Em] [Dm] [C] Más mira de lejos al altivo"
  },
  {
    title: 'Alaba Praise',
    artist: 'Elevation Worship',
    pdfUrl: 'https://drive.google.com/file/d/1dm-HBcGsuSTYY0n2Cg3ZRcnzF07s9LSv/preview',
    chords: "Intro: \n[A] [E] [F#m] [D]\n\nVERSO 1\n[A]\nTe alabo en el valle\n[D/A] [A]\nTe alabo en el monte\n[E/A] [D/A]\nTe alabo en el día\n[A]\nTe alabo en la noche\n[A]\nTe alabo en el medio\n[D/A] [A]\nEstando rodeado\n[E/G#] [D/A]\nPorque cuando alabo\n[A]\nTú estás a mi lado\n\nPRE-CORO\n[E]\nMientras tenga aliento\n[D]\nMi alma canta y\n\nCORO 1\n[F#m] [D] [A]\nA - la - ba a Dios\n[E]\nMi corazón\n[F#m] [D] [A]\nA - la - ba a Dios\n[E]\nMi corazón\n\nVERSO 2\n[A]\nTe alabo al sentirlo\n[D/A] [A]\nY aun cuando no\n[E/A]\nTe alabo y sé\n[D/A] [A]\nQue estás en control\n[A]\nEs más que un sonido\n[D/A] [A]\nEs adoración\n[E/G#] [D/A]\nY cuando alabamos\n[A]\nCaerá Jericó\n\nCORO 2\n[F#m] [D] [A]\nA - la - ba a Dios\n[E]\nMi corazón\n[F#m] [D] [A]\nA - la - ba a Dios\n[E]\nMi corazón\n[F#m]\nNo me detengo\n[D]\nMi Dios vivo está\n[A] [E]\nCómo me voy a callar\n[F#m] [D] [A] [E] [A]\nA - la - ba a Dios mi corazón\n\nPUENTE 1\n[A]\nAlabo al que reina\n[A]\nAlabo al Señor\n[A]\nAlabo a aquel que la tumba venció\n[A]\nAlabo al que es bueno\n[A]\nAlabo al que es fiel\n[A]\nLe alabo porque no hay otro como él\n\nPUENTE 2\n[A]\nAlabo al que reina\n[Bm]\nAlabo al Señor\n[F#m] [D]\nAlabo a aquel que la tumba venció\n[A]\nAlabo al que es bueno\n[Bm]\nAlabo al que es fiel\n[F#m] [D]\nLe alabo porque no hay otro como él\n\nCORO 2\n[F#m] [D] [A]\nA - la - ba a Dios\n[E]\nMi corazón\n[F#m] [D] [A]\nA - la - ba a Dios\n[E]\nMi corazón\n[F#m]\nNo me detengo\n[D]\nMi Dios vivo está\n[A] [E]\nCómo me voy a callar\n[F#m] [D] [A] [E] [A]\nA - la - ba a Dios mi corazón\n\nVAMP\nQue toda la creación\nAlabe a Dios\nAlabe a Dios"
  },
  {
    title: 'Queremos Fuego',
    artist: 'Jesus Worship Center',
    pdfUrl: '',
    chords: "[Intro]\n[Am] [G] [F] [Dm] [F] [E]\n[E] [Am] [E] [Am] [G] [F]\n[E] [Am] [E] [F] [G] [Am]\n\n[Verso]\n\n[Am]\nEstamos reunidos, con un solo motivo\n[F] [G]\nAlabando tú nombre, buscando más de ti\n[Am]\nSabemos que respondes, cuando tu pueblo clama\n[F] [G]\nQueremos ver tu gloria, visítanos señor\n\n[Pre-Estribillo]\n\n[E] [Am]\nCon ese fuego que quema...el que de gozo me llena\n[G] [C]\nEs ese fuego que invade...mi corazón\n[G] [E] [Am]\nCon ese fuego que quema...el que de gozo me llena\n[F] [Dm] [E]\nOh que el poder de tu espíritu venga, a ese lugar\n\n[Estribillo]\n\n[E] [Am] [E]\nSeñor queremos fuego... Señor queremos fuego... Señor queremos fuego\n[F] [G] [Am]\nQue Tu fuego consuma mi corazón\n\n([F] [G] [F] [G] [E])\n\n[E] [Am]\nQueremos que tu fuego, tú fuego que restaura\n[E]\nQue sana y purifica, renueva y santifica\n[Am]\nNo hay nada en este mundo, que deseamos más\n\nDerrama de tu espíritu, Yo sé que nos va a llenar\n[E]\nEstamos todos juntos con manos arriba\n[Am]\nGritando queremos fuego, Porque nosotros sabemos que ese\n\nFuego aún puede cambiar al mundo entero\n[E]\nFuego fuego eso queremos más, En medio de tu pueblo ahí estás\n[Am] [E]\nTodos a una voz a un mismo sentir, Cantamos alabanza y dice así\n\n[Puente]\n\n[E]\nQue tu fuego descienda...y llene mi alma\n[Am]\nQue tu fuego me encienda...que tu espíritu venga"
  }
];

export async function seedSongs() {
  const existingSongs = await getSongs();
  const existingTitles = new Set(existingSongs.map(s => s.title));
  
  for (const song of initialSongs) {
    if (!existingTitles.has(song.title)) {
      await addSong(song, crypto.randomUUID());
    }
  }
}
