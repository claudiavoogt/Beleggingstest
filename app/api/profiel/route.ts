import { NextRequest, NextResponse } from 'next/server';

// --- SCORINGSLOGICA EN PROFIELEN: server-side, niet zichtbaar in de browser ---

const questions = [
  { scores: [0, 2, 3, 1] },
  { scores: [2, 1, 3, 0] },
  { scores: [1, 3, 0, 3] },
  { scores: [0, 2, 3, 1] },
  { scores: [0, 2, 3, 1] },
  { scores: [0, 2, 3, 1] },
  { scores: [0, 2, 3, 1] },
  { scores: [0, 2, 3, 1, 3] },
  { scores: [0, 1, 3, 2] },
];

const profiles = [
  {
    name: "De Twijfelaar",
    sub: "Je wílt wel, maar je gelooft nog niet dat het voor jou werkt.",
    desc: "Je hebt al vaker gedacht: dat beleggen is toch niets voor mensen zoals ik. Misschien heb je slechte verhalen gehoord, of voel je je financieel niet sterk genoeg om het risico te nemen. Maar hier is de waarheid: de meeste mensen die nu succesvol beleggen, begonnen precies waar jij nu staat. Het begint niet met geld, het begint met de juiste mindset en de juiste informatie.",
    strengths: [
      "Je bent voorzichtig en dat is een kracht, mits je het niet gebruikt als excuus om niets te doen.",
      "Je hebt de eerlijkheid om toe te geven dat je het nog niet weet.",
      "Die twijfel? Die verdwijnt zodra je begrijpt hoe het echt werkt.",
    ],
    ctaTitle: "De eerste stap is de moeilijkste.",
    ctaSub: "En die hoef je niet alleen te zetten.",
  },
  {
    name: "De Spaarder",
    sub: "Je doet het goed. Maar je geld doet het niet.",
    desc: "Jij spaart. Netjes, disciplineerd, elke maand. Maar ondertussen eet inflatie elk jaar een stukje van je vermogen op. Je spaarrekening voelt veilig, maar het is de stilste manier om geld te verliezen. Je bent klaar voor de volgende stap. Je hebt alleen een zetje nodig om te zien dat beleggen niet spannend of risicovol hoeft te zijn, als je het op de juiste manier doet.",
    strengths: [
      "Je hebt al bewezen dat je discipline hebt met geld.",
      "Je spaart al, dat betekent je hebt kapitaal om mee te beginnen.",
      "Jij hoeft het beleggen niet te leren van nul, je hoeft het sparen alleen om te zetten.",
    ],
    ctaTitle: "Van sparen naar vermogen opbouwen.",
    ctaSub: "Het verschil zit in één keuze.",
  },
  {
    name: "De Starter",
    sub: "Motivatie genoeg. Strategie ontbreekt nog.",
    desc: "Je weet dat je moet beginnen. Je hebt misschien al wat gelezen, een podcast geluisterd, een account aangemaakt. Maar ergens stokt het. Want waar begin je? Wat koop je? Hoeveel? Wanneer verkoop je weer? Zonder structuur is beleggen raden. En raden is geen plan. Jij hebt de energie, de motivatie en de wil. Je mist alleen een helder kader.",
    strengths: [
      "Je bent al actief op zoek en dat is precies de mentaliteit die werkt.",
      "Je hebt geen grote blokkades, alleen ontbrekende kennis.",
      "Zodra je een structuur hebt, ga jij snel.",
    ],
    ctaTitle: "Jij bent er klaar voor.",
    ctaSub: "Je hebt alleen een duidelijk startpunt nodig.",
  },
  {
    name: "De Zelfdoener",
    sub: "Je belégt al. Maar je hebt geen strategie.",
    desc: "Jij doet het al. Je hebt een broker, je koopt ETFs of aandelen, je volgt de markt. Maar diep van binnen weet je dat je op gevoel handelt. Er is geen plan. Geen duidelijke strategie. En dat kost je rendementen. Niet omdat je dom bent, maar omdat niemand je ooit heeft geleerd hoe je het systematisch aanpakt.",
    strengths: [
      "Je hebt de eerste drempel al genomen die de meeste mensen tegenhoudt.",
      "Je hebt ervaring en dat is meer waard dan je denkt.",
      "Wat jij nodig hebt is geen kennis, maar structuur.",
    ],
    ctaTitle: "Van gevoel naar strategie.",
    ctaSub: "Jij bent één stap verwijderd van echt resultaat.",
  },
];

function berekenProfiel(answers: (number | null)[]) {
  const total = answers.reduce(
    (s: number, a, i) => s + (a !== null && a !== undefined ? questions[i].scores[a] : 0),
    0
  );
  const max = questions.length * 3;
  const pct = total / max;

  if (pct < 0.25) return profiles[0];
  if (pct < 0.5) return profiles[1];
  if (pct < 0.75) return profiles[2];
  return profiles[3];
}

export async function POST(request: NextRequest) {
  try {
    const { answers } = await request.json();

    if (!Array.isArray(answers) || answers.length !== questions.length) {
      return NextResponse.json({ error: 'Ongeldige invoer' }, { status: 400 });
    }

    const profiel = berekenProfiel(answers);
    return NextResponse.json(profiel);
  } catch {
    return NextResponse.json({ error: 'Serverfout' }, { status: 500 });
  }
}
