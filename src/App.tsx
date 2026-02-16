import React from "react";

type Sex = "F" | "M";

type Urgency = "Alta" | "Média" | "Baixa";

type Exam = {
  id: string;
  name: string;
  who: "Todos" | "F" | "M";
  minAge?: number;
  maxAge?: number;
  frequency: string;
  frequencyShort: string;
  urgency: Urgency;
  reason: string;
  notes?: string[];
  tags?: string[];
};

// Hook para dark mode
function useDarkMode() {
  const [dark, setDark] = React.useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return stored === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(dark));
  }, [dark]);

  return [dark, setDark] as const;
}

// Ícones
function SunIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

const EXAMS: Exam[] = [
  {
    id: "bp",
    name: "Medição da pressão arterial",
    who: "Todos",
    minAge: 18,
    frequency: "Pelo menos 1x/ano (ou conforme indicação médica)",
    frequencyShort: "1x/ano",
    urgency: "Alta",
    reason:
      "A hipertensão é frequentemente silenciosa e aumenta o risco de AVC e enfarte.",
    tags: ["cardiovascular"],
  },
  {
    id: "bmi",
    name: "IMC e perímetro abdominal",
    who: "Todos",
    minAge: 16,
    frequency: "1x/ano",
    frequencyShort: "1x/ano",
    urgency: "Média",
    reason: "Ajuda a estimar risco metabólico e cardiovascular.",
    tags: ["metabólico"],
  },
  {
    id: "lipids",
    name: "Colesterol (perfil lipídico)",
    who: "Todos",
    minAge: 20,
    frequency: "A cada 4–6 anos (mais cedo se houver risco)",
    frequencyShort: "4-6 anos",
    urgency: "Média",
    reason:
      "O colesterol elevado aumenta o risco de doença cardiovascular; o rastreio permite intervir cedo.",
    tags: ["cardiovascular"],
  },
  {
    id: "glucose",
    name: "Glicemia/HbA1c (diabetes)",
    who: "Todos",
    minAge: 35,
    frequency: "A cada 3 anos (ou mais frequente se risco)",
    frequencyShort: "3 anos",
    urgency: "Média",
    reason:
      "Detetar pré-diabetes/diabetes precocemente reduz complicações (rim, visão, nervos).",
    tags: ["metabólico"],
  },
  {
    id: "hiv_hcv",
    name: "Rastreio de VIH e Hepatites (conforme risco)",
    who: "Todos",
    minAge: 16,
    frequency: "Pelo menos 1x na vida; repetir se risco",
    frequencyShort: "1x vida / risco",
    urgency: "Média",
    reason:
      "Algumas infeções podem ser assintomáticas e tratáveis; o rastreio depende de exposição e contexto.",
    tags: ["infeções"],
  },
  {
    id: "cervical",
    name: "Rastreio do colo do útero (Pap/HPV)",
    who: "F",
    minAge: 25,
    maxAge: 64,
    frequency: "Conforme programa local (ex.: HPV 5/5 anos)",
    frequencyShort: "3-5 anos",
    urgency: "Alta",
    reason:
      "O rastreio reduz muito o risco de cancro do colo do útero ao detetar lesões precoces.",
    tags: ["cancro"],
  },
  {
    id: "breast",
    name: "Mamografia (rastreio do cancro da mama)",
    who: "F",
    minAge: 50,
    maxAge: 69,
    frequency: "Normalmente 2/2 anos (varia por país/programa)",
    frequencyShort: "2 anos",
    urgency: "Alta",
    reason:
      "Deteção precoce pode melhorar prognóstico; calendário depende de programas e risco individual.",
    tags: ["cancro"],
  },
  {
    id: "prostate",
    name: "Próstata (PSA/avaliação) — decisão partilhada",
    who: "M",
    minAge: 50,
    frequency: "Conforme risco e decisão informada com médico",
    frequencyShort: "Variável",
    urgency: "Baixa",
    reason:
      "O rastreio pode ter benefícios e riscos (falsos positivos/overdiagnosis); discutir caso a caso.",
    tags: ["cancro"],
    notes: [
      "Considerar mais cedo se história familiar/alto risco.",
      "Se tiver sintomas urinários, procure avaliação (não é rastreio).",
    ],
  },
  {
    id: "crc",
    name: "Rastreio do cancro colorretal (fezes/colonoscopia)",
    who: "Todos",
    minAge: 50,
    frequency: "Conforme programa (ex.: anual/bienal ou colonoscopia a cada 10 anos)",
    frequencyShort: "1-2 anos / 10 anos",
    urgency: "Alta",
    reason:
      "Pode prevenir cancro ao detetar e remover pólipos e ao diagnosticar precocemente.",
    tags: ["cancro"],
  },
  {
    id: "bone",
    name: "Densitometria óssea (osteoporose)",
    who: "F",
    minAge: 65,
    frequency: "Conforme risco (ex.: a cada 2–5 anos)",
    frequencyShort: "2-5 anos",
    urgency: "Média",
    reason:
      "Ajuda a identificar risco de fratura e orientar prevenção/tratamento.",
    tags: ["ossos"],
  },
  {
    id: "vision",
    name: "Avaliação da visão (optometria/oftalmologia)",
    who: "Todos",
    minAge: 18,
    frequency: "A cada 1–2 anos (ou se sintomas)",
    frequencyShort: "1-2 anos",
    urgency: "Baixa",
    reason:
      "Deteta problemas visuais e alguns sinais de doença ocular (glaucoma/retinopatia em risco).",
    tags: ["geral"],
  },
  {
    id: "dental",
    name: "Consulta de saúde oral (dentista)",
    who: "Todos",
    minAge: 1,
    frequency: "1–2x/ano",
    frequencyShort: "6-12 meses",
    urgency: "Média",
    reason:
      "Prevenção de cáries e doença periodontal, associadas também a problemas sistémicos.",
    tags: ["geral"],
  },
  {
    id: "vaccines",
    name: "Revisão do boletim vacinal",
    who: "Todos",
    minAge: 0,
    frequency: "Sempre que houver consulta / conforme calendário",
    frequencyShort: "Cada consulta",
    urgency: "Média",
    reason:
      "Vacinas em dia reduzem risco de infeções graves; reforços podem ser necessários.",
    tags: ["prevenção"],
  },
];

function urgencyStyles(u: Urgency, dark: boolean) {
  if (dark) {
    switch (u) {
      case "Alta":
        return {
          badge: "bg-red-900/50 text-red-300 ring-1 ring-inset ring-red-700",
          dot: "bg-red-400",
        };
      case "Média":
        return {
          badge: "bg-amber-900/50 text-amber-300 ring-1 ring-inset ring-amber-700",
          dot: "bg-amber-400",
        };
      case "Baixa":
        return {
          badge: "bg-emerald-900/50 text-emerald-300 ring-1 ring-inset ring-emerald-700",
          dot: "bg-emerald-400",
        };
    }
  }
  switch (u) {
    case "Alta":
      return {
        badge: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
        dot: "bg-red-500",
      };
    case "Média":
      return {
        badge: "bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200",
        dot: "bg-amber-500",
      };
    case "Baixa":
      return {
        badge: "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200",
        dot: "bg-emerald-500",
      };
  }
}

function inAgeRange(exam: Exam, age: number) {
  if (exam.minAge !== undefined && age < exam.minAge) return false;
  if (exam.maxAge !== undefined && age > exam.maxAge) return false;
  return true;
}

function matchesSex(exam: Exam, sex: Sex) {
  return exam.who === "Todos" || exam.who === sex;
}

function sortByUrgency(a: Exam, b: Exam) {
  const order: Record<Urgency, number> = { Alta: 0, Média: 1, Baixa: 2 };
  return order[a.urgency] - order[b.urgency];
}

function UrgencyBadge({ urgency, dark }: { urgency: Urgency; dark: boolean }) {
  const s = urgencyStyles(urgency, dark);
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${s.badge}`}
      title={`Urgência: ${urgency}`}
    >
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {urgency}
    </span>
  );
}

function Card({
  title,
  children,
  right,
  dark,
}: {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  dark: boolean;
}) {
  return (
    <section
      className={`rounded-2xl p-5 shadow-sm ring-1 transition-colors ${
        dark
          ? "bg-slate-800 ring-slate-700"
          : "bg-white ring-slate-200"
      }`}
    >
      <header className="mb-3 flex items-start justify-between gap-3">
        <h2
          className={`text-base font-semibold ${
            dark ? "text-slate-100" : "text-slate-900"
          }`}
        >
          {title}
        </h2>
        {right}
      </header>
      {children}
    </section>
  );
}

function ExamItem({ exam, dark }: { exam: Exam; dark: boolean }) {
  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${
        dark
          ? "border-slate-700 bg-slate-900/50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div
            className={`text-sm font-semibold ${
              dark ? "text-slate-100" : "text-slate-900"
            }`}
          >
            {exam.name}
          </div>
          <div
            className={`mt-1 text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}
          >
            {exam.reason}
          </div>
        </div>
        <UrgencyBadge urgency={exam.urgency} dark={dark} />
      </div>

      {/* Frequência destacada */}
      <div
        className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 ${
          dark ? "bg-indigo-900/30 text-indigo-300" : "bg-indigo-50 text-indigo-700"
        }`}
      >
        <CalendarIcon />
        <div className="flex flex-wrap items-center gap-x-2">
          <span className="font-semibold">{exam.frequencyShort}</span>
          <span className={`text-xs ${dark ? "text-indigo-400" : "text-indigo-600"}`}>
            — {exam.frequency}
          </span>
        </div>
      </div>

      <div className={`mt-3 grid gap-2 text-sm ${dark ? "text-slate-400" : "text-slate-700"}`}>
        <div className="flex flex-wrap gap-x-2">
          <span className={`font-medium ${dark ? "text-slate-300" : "text-slate-700"}`}>
            Indicado para:
          </span>
          <span>
            {exam.who === "Todos" ? "Todos" : exam.who === "F" ? "Mulheres" : "Homens"}
            {exam.minAge !== undefined ? ` · a partir dos ${exam.minAge} anos` : ""}
            {exam.maxAge !== undefined ? ` · até aos ${exam.maxAge} anos` : ""}
          </span>
        </div>
        {exam.notes?.length ? (
          <ul className={`mt-1 list-disc space-y-1 pl-5 ${dark ? "text-slate-400" : "text-slate-700"}`}>
            {exam.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export function App() {
  const [dark, setDark] = useDarkMode();
  const [ageText, setAgeText] = React.useState<string>("");
  const [sex, setSex] = React.useState<Sex>("F");

  const age = Number(ageText);
  const ageValid = Number.isFinite(age) && age >= 0 && age <= 120;

  const matching = ageValid
    ? EXAMS.filter((e) => matchesSex(e, sex) && inAgeRange(e, age)).sort(sortByUrgency)
    : [];

  const high = matching.filter((e) => e.urgency === "Alta");
  const medium = matching.filter((e) => e.urgency === "Média");
  const low = matching.filter((e) => e.urgency === "Baixa");

  return (
    <div
      className={`min-h-screen transition-colors ${
        dark
          ? "bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1
                className={`text-2xl font-semibold tracking-tight ${
                  dark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                🩺 Guia de exames por idade
              </h1>
              <p
                className={`mt-1 max-w-2xl text-sm ${
                  dark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Insira a sua idade e sexo para ver uma lista de rastreios/avaliações frequentes,
                organizada por urgência. Isto é uma ferramenta educativa — não substitui aconselhamento médico.
              </p>
            </div>
            <button
              onClick={() => setDark(!dark)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium shadow-sm ring-1 transition-colors ${
                dark
                  ? "bg-slate-800 text-slate-200 ring-slate-700 hover:bg-slate-700"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
              }`}
              title={dark ? "Mudar para modo claro" : "Mudar para modo escuro"}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
              <span className="hidden sm:inline">{dark ? "Modo claro" : "Modo escuro"}</span>
            </button>
          </div>

          <div
            className={`mt-4 rounded-2xl px-4 py-3 text-xs shadow-sm ring-1 ${
              dark
                ? "bg-slate-800 text-slate-400 ring-slate-700"
                : "bg-white text-slate-600 ring-slate-200"
            }`}
          >
            <div className={`font-semibold ${dark ? "text-slate-200" : "text-slate-800"}`}>
              ⚠️ Nota importante
            </div>
            <div className="mt-1">
              Se tiver sintomas, gravidez, doença crónica, história familiar relevante ou fatores de risco,
              os exames e prazos podem mudar. Consulte sempre um profissional de saúde.
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card
            title="📋 Os seus dados"
            dark={dark}
            right={
              <button
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  dark
                    ? "text-slate-300 hover:bg-slate-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => {
                  setAgeText("");
                  setSex("F");
                }}
                type="button"
              >
                Limpar
              </button>
            }
          >
            <div className="grid gap-4">
              <div>
                <label
                  className={`text-sm font-medium ${dark ? "text-slate-200" : "text-slate-800"}`}
                >
                  Idade
                </label>
                <input
                  value={ageText}
                  onChange={(e) => setAgeText(e.target.value.replace(/[^0-9]/g, ""))}
                  inputMode="numeric"
                  placeholder="Ex.: 42"
                  className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm shadow-sm outline-none transition-colors ${
                    dark
                      ? "border-slate-600 bg-slate-700 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-900/50"
                      : "border-slate-300 bg-white text-slate-900 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  }`}
                />
                {!ageText ? (
                  <p className={`mt-1 text-xs ${dark ? "text-slate-500" : "text-slate-500"}`}>
                    Introduza a idade para gerar recomendações.
                  </p>
                ) : !ageValid ? (
                  <p className="mt-1 text-xs text-red-500">
                    Idade inválida. Use um valor entre 0 e 120.
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  className={`text-sm font-medium ${dark ? "text-slate-200" : "text-slate-800"}`}
                >
                  Sexo
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSex("F")}
                    className={`rounded-xl border px-3 py-2 text-sm font-semibold shadow-sm transition ${
                      sex === "F"
                        ? dark
                          ? "border-indigo-500 bg-indigo-900/50 text-indigo-300 ring-4 ring-indigo-900/30"
                          : "border-indigo-500 bg-indigo-50 text-indigo-800 ring-4 ring-indigo-100"
                        : dark
                        ? "border-slate-600 bg-slate-700 text-slate-300 hover:bg-slate-600"
                        : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    👩 Mulher
                  </button>
                  <button
                    type="button"
                    onClick={() => setSex("M")}
                    className={`rounded-xl border px-3 py-2 text-sm font-semibold shadow-sm transition ${
                      sex === "M"
                        ? dark
                          ? "border-indigo-500 bg-indigo-900/50 text-indigo-300 ring-4 ring-indigo-900/30"
                          : "border-indigo-500 bg-indigo-50 text-indigo-800 ring-4 ring-indigo-100"
                        : dark
                        ? "border-slate-600 bg-slate-700 text-slate-300 hover:bg-slate-600"
                        : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    👨 Homem
                  </button>
                </div>
                <p className={`mt-2 text-xs ${dark ? "text-slate-500" : "text-slate-500"}`}>
                  (Nota: isto serve apenas para recomendações típicas de rastreio. Identidade de género e contexto clínico
                  podem alterar a recomendação.)
                </p>
              </div>

              <div
                className={`rounded-xl p-4 text-sm ring-1 ${
                  dark
                    ? "bg-slate-900/50 text-slate-400 ring-slate-700"
                    : "bg-slate-50 text-slate-700 ring-slate-200"
                }`}
              >
                <div className={`font-semibold ${dark ? "text-slate-200" : "text-slate-900"}`}>
                  📊 Como interpretamos "urgência"
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>
                    <span className="font-semibold text-red-500">Alta</span>: rastreio importante na faixa etária; tente agendar dentro de
                    semanas/meses.
                  </li>
                  <li>
                    <span className="font-semibold text-amber-500">Média</span>: útil para prevenção; planeie no próximo check-up.
                  </li>
                  <li>
                    <span className="font-semibold text-emerald-500">Baixa</span>: depende de risco/decisão partilhada; pode ser oportunista.
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card title="📝 Resultado" dark={dark}>
            {!ageText ? (
              <div
                className={`rounded-xl border border-dashed p-6 text-sm ${
                  dark
                    ? "border-slate-600 bg-slate-900/30 text-slate-500"
                    : "border-slate-300 bg-white text-slate-600"
                }`}
              >
                Introduza a idade para ver os exames sugeridos.
              </div>
            ) : !ageValid ? (
              <div
                className={`rounded-xl border p-6 text-sm ${
                  dark
                    ? "border-red-800 bg-red-900/30 text-red-400"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                Não foi possível calcular recomendações com esta idade.
              </div>
            ) : matching.length === 0 ? (
              <div
                className={`rounded-xl border p-6 text-sm ${
                  dark
                    ? "border-slate-700 bg-slate-900/30 text-slate-500"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                Não há itens nesta lista para esta idade/sexo. Se tiver dúvidas, fale com um profissional de saúde.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div
                    className={`rounded-xl p-3 text-center shadow-sm ring-1 ${
                      dark ? "bg-slate-900/50 ring-slate-700" : "bg-white ring-slate-200"
                    }`}
                  >
                    <div className={`text-xs font-medium ${dark ? "text-slate-400" : "text-slate-600"}`}>
                      🔴 Alta
                    </div>
                    <div className={`text-lg font-semibold ${dark ? "text-red-400" : "text-red-600"}`}>
                      {high.length}
                    </div>
                  </div>
                  <div
                    className={`rounded-xl p-3 text-center shadow-sm ring-1 ${
                      dark ? "bg-slate-900/50 ring-slate-700" : "bg-white ring-slate-200"
                    }`}
                  >
                    <div className={`text-xs font-medium ${dark ? "text-slate-400" : "text-slate-600"}`}>
                      🟡 Média
                    </div>
                    <div className={`text-lg font-semibold ${dark ? "text-amber-400" : "text-amber-600"}`}>
                      {medium.length}
                    </div>
                  </div>
                  <div
                    className={`rounded-xl p-3 text-center shadow-sm ring-1 ${
                      dark ? "bg-slate-900/50 ring-slate-700" : "bg-white ring-slate-200"
                    }`}
                  >
                    <div className={`text-xs font-medium ${dark ? "text-slate-400" : "text-slate-600"}`}>
                      🟢 Baixa
                    </div>
                    <div className={`text-lg font-semibold ${dark ? "text-emerald-400" : "text-emerald-600"}`}>
                      {low.length}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {matching.map((exam) => (
                    <ExamItem key={exam.id} exam={exam} dark={dark} />
                  ))}
                </div>

                <div
                  className={`rounded-xl p-4 text-sm ring-1 ${
                    dark
                      ? "bg-indigo-900/30 text-indigo-300 ring-indigo-800"
                      : "bg-indigo-50 text-indigo-900 ring-indigo-200"
                  }`}
                >
                  <div className="font-semibold">💡 Dica</div>
                  <div className="mt-1">
                    Leve esta lista para a sua consulta e confirme o calendário de rastreios de acordo com o seu país,
                    história familiar, medicação e fatores de risco.
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        <footer className={`mt-10 text-xs ${dark ? "text-slate-500" : "text-slate-500"}`}>
          <p>
            ⚕️ Esta ferramenta não fornece diagnóstico. Em caso de dor no peito, falta de ar, sintomas neurológicos,
            sangramento significativo ou qualquer situação que pareça urgente, procure assistência médica imediata.
          </p>
        </footer>
      </div>
    </div>
  );
}
