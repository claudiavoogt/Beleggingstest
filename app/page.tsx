'use client';

import { useState } from "react";

// Alleen de vragen en antwoordopties blijven in de browser — geen scores, geen profielen
const questions = [
  {
    q: "Hoe reageer jij als je hoort dat iemand in jouw omgeving flink winst heeft gemaakt met beleggen?",
    opts: [
      "Ik denk: dat is gewoon geluk, voor mij werkt dat niet.",
      "Ik word nieuwsgierig, maar weet niet waar ik moet beginnen.",
      "Ik wil ook weten hoe dat werkt, want ik wil ook goeie rendementen maken.",
      "Ik ben blij voor ze, maar ik doe het liever veilig met sparen.",
    ],
  },
  {
    q: "Wat is jouw huidige relatie met geld?",
    opts: [
      "Ik verdien goed, maar heb het gevoel dat er weinig overblijft.",
      "Ik spaar netjes elke maand, maar het voelt alsof het nergens naartoe gaat.",
      "Ik doe al wat met beleggen, maar zonder duidelijk plan.",
      "Ik twijfel of ik überhaupt genoeg geld heb om te beleggen.",
    ],
  },
  {
    q: "Stel: je hebt €5.000 vrij te besteden. Wat doe jij?",
    opts: [
      "Het staat veilig op mijn spaarrekening. Je weet maar nooit.",
      "Ik beleg het, maar weet eerlijk gezegd niet precies hoe of waarvoor.",
      "Ik zou het willen beleggen maar durf de stap niet te zetten.",
      "Ik verdeel het over mijn bestaande beleggingen, maar zonder echte strategie.",
    ],
  },
  {
    q: "Hoe kijk jij naar risico?",
    opts: [
      "Risico = iets verliezen. Dat wil ik absoluut niet.",
      "Ik weet dat risico erbij hoort, maar ik weet niet hoe ik het beheers.",
      "Ik begrijp risico in theorie, maar maak er geen bewuste keuzes over.",
      "Ik heb liever zekerheid, ook als dat minder oplevert.",
    ],
  },
  {
    q: "Wat weet jij nu al over beleggen?",
    opts: [
      "Bijna niets. Het voelt als een andere wereld.",
      "Ik ken de basis (ETF, aandelen, fondsen), maar weet niet wat bij mij past.",
      "Ik beleg al en heb een portefeuille, maar geen bewuste strategie.",
      "Ik heb weleens iets gelezen, maar het voelt te ingewikkeld.",
    ],
  },
  {
    q: "Waarom heb je deze test gedaan?",
    opts: [
      "Ik ben nieuwsgierig of beleggen überhaupt iets voor mij is.",
      "Ik wil weten wat de volgende stap is voor iemand zoals ik.",
      "Ik wil bevestiging dat ik op de goede weg zit, of juist corrigeren.",
      "Ik zoek een veilige manier om mijn geld harder te laten werken.",
    ],
  },
  {
    q: "Hoe ga jij om met financiële beslissingen?",
    opts: [
      "Ik stel het liefst uit. Ik heb er geen vertrouwen in.",
      "Ik wil het goed doen maar weet niet hoe ik moet beginnen.",
      "Ik neem wel beslissingen, maar mis het overzicht om het goed te doen.",
      "Ik doe het voorzichtig en ga pas als ik zeker weet dat het veilig is.",
    ],
  },
  {
    q: "Wat houdt jou het meest tegen om te beleggen?",
    opts: [
      "De angst dat ik alles kwijtraak.",
      "Geen idee waar ik moet starten.",
      "Ik heb geen strategie en gooi er maar wat in.",
      "Ik vind het te onzeker vergeleken met sparen.",
    ],
  },
  {
    q: "Wat zou het voor jou betekenen als jouw geld harder voor jou werkt?",
    opts: [
      "Vrijheid. Minder afhankelijk zijn van mijn inkomen.",
      "Eindelijk echt iets opbouwen in plaats van alleen bewaren.",
      "Mijn portefeuille laten groeien met een echte strategie.",
      "Rust. Weten dat mijn toekomst financieel geregeld is.",
    ],
  },
];

interface Profile {
  name: string;
  sub: string;
  desc: string;
  strengths: string[];
  ctaTitle: string;
  ctaSub: string;
}

export default function BeleggenProfieltest() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [result, setResult] = useState<Profile | null>(null);
  const [laden, setLaden] = useState(false);

  const select = (i: number) => {
    const updated = [...answers];
    updated[current] = i;
    setAnswers(updated);
  };

  const goNext = async () => {
    if (answers[current] === null) return;

    if (current === questions.length - 1) {
      setLaden(true);
      try {
        const res = await fetch("/api/profiel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers }),
        });
        const profiel: Profile = await res.json();
        setResult(profiel);
      } catch {
        // stille fout
      } finally {
        setLaden(false);
      }
      return;
    }
    setCurrent(current + 1);
  };

  const goBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const restart = () => {
    setCurrent(0);
    setAnswers(new Array(questions.length).fill(null));
    setResult(null);
  };

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&family=Lora:ital,wght@0,400;1,400&family=Playfair+Display:ital@1&display=swap');
        html, body { margin: 0 !important; padding: 0 !important; background: #F5F5F5 !important; }
        * { box-sizing: border-box; }
        .pf-wrap { max-width: 680px; margin: 0 auto; padding: 0 0 60px; font-family: 'Lora', serif; background: #F5F5F5; min-height: 100vh; }
        .pf-banner { width: 100%; height: 200px; background: linear-gradient(135deg, #1A1F36 0%, #6B2D84 60%, #B72452 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        .pf-banner::before { content: ''; position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; border-radius: 50%; background: rgba(183,36,82,0.15); }
        .pf-banner::after { content: ''; position: absolute; bottom: -30px; left: -30px; width: 150px; height: 150px; border-radius: 50%; background: rgba(107,45,132,0.2); }
        .pf-banner-tag { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 3px; color: #2e8999; text-transform: uppercase; margin-bottom: 8px; position: relative; z-index: 1; }
        .pf-banner-title { font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 800; color: #fff; text-align: center; line-height: 1.2; padding: 0 20px; position: relative; z-index: 1; }
        .pf-banner-sub { font-family: 'Lora', serif; font-style: italic; color: rgba(255,255,255,0.7); font-size: 14px; margin-top: 8px; position: relative; z-index: 1; }
        .pf-body { padding: 24px 20px; }
        .pf-progress-wrap { margin-bottom: 28px; }
        .pf-progress-label { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; color: #6B2D84; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
        .pf-progress-bar { height: 4px; background: #E0E0E0; border-radius: 2px; }
        .pf-progress-fill { height: 4px; background: linear-gradient(90deg, #6B2D84, #B72452); border-radius: 2px; transition: width 0.4s ease; }
        .pf-q-num { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; color: #2e8999; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
        .pf-q-text { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 800; color: #1A1F36; line-height: 1.4; margin-bottom: 24px; }
        .pf-options { display: flex; flex-direction: column; gap: 10px; }
        .pf-option { background: #fff; border: 1.5px solid #E0E0E0; border-radius: 10px; padding: 14px 16px; cursor: pointer; transition: all 0.2s; font-family: 'Lora', serif; font-size: 15px; color: #1A1F36; text-align: left; width: 100%; }
        .pf-option:hover { border-color: #6B2D84; background: #F9F4FC; }
        .pf-option.selected { border-color: #B72452; background: #FDF1F4; color: #B72452; font-weight: 600; }
        .pf-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 28px; }
        .pf-btn-back { font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 600; color: #888; background: none; border: none; cursor: pointer; padding: 10px 0; letter-spacing: 1px; text-transform: uppercase; visibility: visible; }
        .pf-btn-back.hidden { visibility: hidden; }
        .pf-btn-next { font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 700; color: #fff; background: #B72452; border: none; border-radius: 8px; padding: 12px 28px; cursor: pointer; letter-spacing: 1px; text-transform: uppercase; transition: background 0.2s; }
        .pf-btn-next:hover:not(:disabled) { background: #8C1B3C; }
        .pf-btn-next:disabled { background: #CCC; cursor: default; }
        .pf-laden-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; gap: 16px; }
        .pf-laden-tekst { font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 700; color: #6B2D84; letter-spacing: 1px; text-transform: uppercase; }
        .pf-laden-dot { width: 10px; height: 10px; border-radius: 50%; background: #B72452; animation: puls 1s infinite; }
        @keyframes puls { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.7); } }
        .pf-result-banner { width: 100%; padding: 40px 24px 32px; background: linear-gradient(135deg, #1A1F36 0%, #6B2D84 100%); text-align: center; }
        .pf-result-tag { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 3px; color: #2e8999; text-transform: uppercase; margin-bottom: 10px; }
        .pf-result-profile { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 8px; }
        .pf-result-sub { font-family: 'Playfair Display', serif; font-style: italic; color: rgba(255,255,255,0.75); font-size: 16px; }
        .pf-result-body { padding: 24px 20px; }
        .pf-result-desc { font-family: 'Lora', serif; font-size: 16px; line-height: 1.7; color: #1A1F36; margin-bottom: 24px; }
        .pf-strengths-box { background: #fff; border: 1.5px solid #E0E0E0; border-radius: 10px; padding: 20px; margin-bottom: 24px; }
        .pf-strengths-title { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 700; color: #6B2D84; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 14px; }
        .pf-strength-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; font-family: 'Lora', serif; font-size: 14px; color: #1A1F36; }
        .pf-strength-dot { width: 8px; height: 8px; border-radius: 50%; background: #2e8999; flex-shrink: 0; margin-top: 5px; }
        .pf-cta-block { background: linear-gradient(135deg, #B72452, #6B2D84); border-radius: 12px; padding: 28px 24px; text-align: center; }
        .pf-cta-title { font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 800; color: #fff; margin-bottom: 8px; }
        .pf-cta-sub { font-family: 'Lora', serif; font-style: italic; color: rgba(255,255,255,0.8); font-size: 14px; margin-bottom: 20px; }
        .pf-cta-btn { font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 700; color: #B72452; background: #fff; border: none; border-radius: 8px; padding: 13px 32px; cursor: pointer; letter-spacing: 1px; text-transform: uppercase; display: inline-block; text-decoration: none; }
        .pf-restart { display: block; text-align: center; margin-top: 20px; font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 600; color: #888; cursor: pointer; letter-spacing: 1px; text-transform: uppercase; background: none; border: none; width: 100%; }
        .pf-footer { background: linear-gradient(135deg, #1A1F36 0%, #6B2D84 100%); padding: 24px 20px; text-align: center; margin-top: 8px; }
        .pf-footer p { font-family: 'Lora', serif; font-size: 13px; color: rgba(255,255,255,0.7); margin: 0; }
        .pf-footer a { color: #2e8999; text-decoration: underline; }
        .pf-footer-copy { margin-top: 6px; opacity: 0.65; font-size: 11px; }
      `}</style>

      <div className="pf-wrap">
        <div className="pf-banner">
          <div className="pf-banner-tag">Rebel in Finance</div>
          <div className="pf-banner-title">Is beleggen iets voor jou?</div>
          <div className="pf-banner-sub">Doe de test. Ontdek je profiel.</div>
        </div>

        {laden ? (
          <div className="pf-laden-wrap">
            <div className="pf-laden-dot" />
            <div className="pf-laden-tekst">Jouw profiel wordt berekend...</div>
          </div>
        ) : !result ? (
          <div className="pf-body">
            <div className="pf-progress-wrap">
              <div className="pf-progress-label">
                Vraag {current + 1} van {questions.length}
              </div>
              <div className="pf-progress-bar">
                <div className="pf-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="pf-q-num">VRAAG {current + 1}</div>
            <div className="pf-q-text">{questions[current].q}</div>

            <div className="pf-options">
              {questions[current].opts.map((opt, i) => (
                <button
                  key={i}
                  className={`pf-option${answers[current] === i ? " selected" : ""}`}
                  onClick={() => select(i)}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="pf-nav">
              <button
                className={`pf-btn-back${current === 0 ? " hidden" : ""}`}
                onClick={goBack}
              >
                ← Terug
              </button>
              <button
                className="pf-btn-next"
                onClick={goNext}
                disabled={answers[current] === null}
              >
                {current === questions.length - 1 ? "Bekijk mijn profiel →" : "Volgende →"}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="pf-result-banner">
              <div className="pf-result-tag">Jouw beleggersprofiel</div>
              <div className="pf-result-profile">{result.name}</div>
              <div className="pf-result-sub">{result.sub}</div>
            </div>
            <div className="pf-result-body">
              <div className="pf-result-desc">{result.desc}</div>
              <div className="pf-strengths-box">
                <div className="pf-strengths-title">Dit herken jij in jezelf</div>
                {result.strengths.map((s, i) => (
                  <div className="pf-strength-item" key={i}>
                    <div className="pf-strength-dot" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <div className="pf-cta-block">
                <div className="pf-cta-title">{result.ctaTitle}</div>
                <div className="pf-cta-sub">{result.ctaSub}</div>
                <a className="pf-cta-btn" href="https://claudiavoogt.nl/investeren-kun-je-leren/" target="_blank" rel="noopener noreferrer">Ja, ik wil meer weten</a>
              </div>
              <button className="pf-restart" onClick={restart}>
                ↺ Doe de test opnieuw
              </button>
            </div>
          </>
        )}

        <footer className="pf-footer">
          <p>
            <a href="https://claudiavoogt.nl" target="_blank" rel="noopener noreferrer">
              claudiavoogt.nl
            </a>
            {' '}— Beleggingsexpert &amp; investeringsmentor
          </p>
          <p className="pf-footer-copy">
            © {new Date().getFullYear()} Claudia Voogt. Alle rechten voorbehouden. Deze tool mag niet worden gekopieerd, nagebouwd of hergebruikt zonder schriftelijke toestemming.
          </p>
        </footer>
      </div>
    </>
  );
}
