import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/Login";
import {
  AlertTriangle,
  Info,
  CheckCircle,
  Search,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Apple,
  Wine,
  Coffee,
  Utensils,
  Cigarette,
  ChevronUp,
  Calendar,
  Plus,
  Upload,
  FileText,
  Bot,
  Sparkles,
  Send,
  MessageSquare,
  Clock,
  ClipboardList,
} from "lucide-react";
import { FOOD_INTERACTIONS, FoodInteraction } from "./data/foodInteractions";

type Sex = "F" | "M";

type Urgency = "Alta" | "Média" | "Baixa";

type RecentActivity = {
  id: string;
  age: number;
  sex: Sex;
  timestamp: number;
};

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
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      className="h-4 w-4 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  );
}

function PillIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86 7.717l.477 2.387a2 2 0 00.547 1.022l3.221-3.221a2 2 0 000-2.828l-3.221-3.222zM8.336 8.336a2 2 0 00-2.828 0 2.002 2.002 0 000 2.828l9.192 9.192a2 2 0 002.828 0 2.002 2.002 0 000-2.828L8.336 8.336z"
      />
    </svg>
  );
}

function Sidebar({
  activeTab,
  setActiveTab,
  dark,
  setDark,
  logout,
}: {
  activeTab: TabType;
  setActiveTab: (t: TabType) => void;
  dark: boolean;
  setDark: (d: boolean) => void;
  logout: () => void;
}) {
  const [uploadOpen, setUploadOpen] = React.useState(
    activeTab === "upload" || activeTab === "historico",
  );

  React.useEffect(() => {
    if (activeTab === "upload" || activeTab === "historico") {
      setUploadOpen(true);
    }
  }, [activeTab]);
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 border-r transition-colors z-50 flex flex-col ${
        dark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}
    >
      <div className="p-6 flex items-center gap-3">
        <span className="text-3xl">🩺</span>
        <div>
          <h1
            className={`text-lg font-bold leading-tight ${dark ? "text-white" : "text-slate-900"}`}
          >
            Guia Médico
          </h1>
          <p
            className={`text-[10px] uppercase tracking-widest font-semibold ${dark ? "text-slate-500" : "text-slate-400"}`}
          >
            Profissional
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <button
          onClick={() => setActiveTab("exames")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "exames"
              ? dark
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(79,70,229,0.1)]"
                : "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
              : dark
                ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
          }`}
        >
          <GridIcon />
          Exames por Idade
        </button>

        <button
          onClick={() => setActiveTab("interacoes")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "interacoes"
              ? dark
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(79,70,229,0.1)]"
                : "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
              : dark
                ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
          }`}
        >
          <PillIcon />
          Interações
        </button>

        <button
          onClick={() => setActiveTab("agenda")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "agenda"
              ? dark
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(79,70,229,0.1)]"
                : "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
              : dark
                ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
          }`}
        >
          <Calendar />
          Agenda Médica
        </button>

        <div className="space-y-1">
          <button
            onClick={() => setUploadOpen(!uploadOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "upload" || activeTab === "historico"
                ? dark
                  ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
                  : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                : dark
                  ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
            }`}
          >
            <div className="flex items-center gap-3">
              <Upload size={18} />
              Upload de Exames
            </div>
            <ChevronUp
              size={16}
              className={`transition-transform duration-200 ${uploadOpen ? "" : "rotate-180"}`}
            />
          </button>

          {uploadOpen && (
            <div className="ml-9 space-y-1 animate-in slide-in-from-top-2 duration-200">
              <button
                onClick={() => setActiveTab("upload")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "upload"
                    ? "text-indigo-500 bg-indigo-500/5"
                    : "text-slate-500 hover:text-indigo-400"
                }`}
              >
                <Plus size={14} />
                Novo Arquivo
              </button>
              <button
                onClick={() => setActiveTab("historico")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "historico"
                    ? "text-indigo-500 bg-indigo-500/5"
                    : "text-slate-500 hover:text-indigo-400"
                }`}
              >
                <Clock size={14} />
                Gestor de Exames
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800/10 dark:border-slate-800 space-y-2">
        <button
          onClick={() => setDark(!dark)}
          className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
            dark
              ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
              : "bg-slate-50 text-slate-700 hover:bg-slate-100"
          }`}
        >
          <div className="flex items-center gap-3">
            {dark ? <MoonIcon /> : <SunIcon />}
            <span>{dark ? "Modo Escuro" : "Modo Claro"}</span>
          </div>
          <div
            className={`w-8 h-4 rounded-full relative transition-colors ${dark ? "bg-indigo-500" : "bg-slate-300"}`}
          >
            <div
              className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${dark ? "left-5" : "left-1"}`}
            />
          </div>
        </button>

        <button
          onClick={logout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-red-400 hover:bg-red-900/20`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sair da Conta
        </button>
      </div>
    </aside>
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
    frequency:
      "Conforme programa (ex.: anual/bienal ou colonoscopia a cada 10 anos)",
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
          badge:
            "bg-amber-900/50 text-amber-300 ring-1 ring-inset ring-amber-700",
          dot: "bg-amber-400",
        };
      case "Baixa":
        return {
          badge:
            "bg-emerald-900/50 text-emerald-300 ring-1 ring-inset ring-emerald-700",
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
        badge:
          "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200",
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
        dark ? "bg-slate-800 ring-slate-700" : "bg-white ring-slate-200"
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

function RecentActivityList({
  activities,
  onSelect,
  dark,
}: {
  activities: RecentActivity[];
  onSelect: (age: number, sex: Sex) => void;
  dark: boolean;
}) {
  if (activities.length === 0) return null;

  return (
    <div className="mb-6">
      <h3
        className={`text-xs font-bold uppercase tracking-wider mb-3 ${
          dark ? "text-slate-500" : "text-slate-400"
        }`}
      >
        Atividade Recente
      </h3>
      <div className="flex flex-wrap gap-2">
        {activities.map((act) => (
          <button
            key={act.id}
            onClick={() => onSelect(act.age, act.sex)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              dark
                ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
            }`}
          >
            <span>{act.sex === "F" ? "👩" : "👨"}</span>
            <span>{act.age} anos</span>
          </button>
        ))}
      </div>
    </div>
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
          dark
            ? "bg-indigo-900/30 text-indigo-300"
            : "bg-indigo-50 text-indigo-700"
        }`}
      >
        <CalendarIcon />
        <div className="flex flex-wrap items-center gap-x-2">
          <span className="font-semibold">{exam.frequencyShort}</span>
          <span
            className={`text-xs ${dark ? "text-indigo-400" : "text-indigo-600"}`}
          >
            — {exam.frequency}
          </span>
        </div>
      </div>

      <div
        className={`mt-3 grid gap-2 text-sm ${dark ? "text-slate-400" : "text-slate-700"}`}
      >
        <div className="flex flex-wrap gap-x-2">
          <span
            className={`font-medium ${dark ? "text-slate-300" : "text-slate-700"}`}
          >
            Indicado para:
          </span>
          <span>
            {exam.who === "Todos"
              ? "Todos"
              : exam.who === "F"
                ? "Mulheres"
                : "Homens"}
            {exam.minAge !== undefined
              ? ` · a partir dos ${exam.minAge} anos`
              : ""}
            {exam.maxAge !== undefined ? ` · até aos ${exam.maxAge} anos` : ""}
          </span>
        </div>
        {exam.notes?.length ? (
          <ul
            className={`mt-1 list-disc space-y-1 pl-5 ${dark ? "text-slate-400" : "text-slate-700"}`}
          >
            {exam.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

// Types for medication interaction checker
type Medication = {
  rxcui: string;
  name: string;
  ptName?: string; // Portuguese name if available
};

// Portuguese name mapping for common medications
const DRUG_TRANSLATIONS: Record<string, string> = {
  aspirin: "Aspirina",
  ibuprofen: "Ibuprofeno",
  warfarin: "Varfarina",
  paracetamol: "Paracetamol",
  acetaminophen: "Paracetamol",
  amoxicillin: "Amoxicilina",
  atorvastatin: "Atorvastatina",
  metformin: "Metformina",
  lisinopril: "Lisinopril",
  simvastatin: "Simvastatina",
  omeprazole: "Omeprazol",
  amlodipine: "Amlodipina",
  metoprolol: "Metoprolol",
  albuterol: "Salbutamol",
  furosemide: "Furosemida",
  levothyroxine: "Levotiroxina",
  gabapentin: "Gabapentina",
  losartan: "Losartano",
  sertraline: "Sertralina",
  fluoxetine: "Fluoxetina",
  naproxen: "Naproxeno",
  clopidogrel: "Clopidogrel",
  pantoprazole: "Pantoprazol",
  prednisone: "Prednisona",
  rosuvastatin: "Rosuvastatina",
  tamsulosin: "Tansulosina",
  escitalopram: "Escitalopram",
  valsartan: "Valsartano",
  duloxetine: "Duloxetina",
  meloxicam: "Meloxicam",
};

// Create reverse map for searching (Portuguese -> English)
const REVERSE_DRUG_TRANSLATIONS = Object.entries(DRUG_TRANSLATIONS).reduce(
  (acc, [en, pt]) => {
    acc[pt.toLowerCase()] = en;
    return acc;
  },
  {} as Record<string, string>,
);

// Critical interactions fallback (when API fails)
const STATIC_INTERACTIONS: Record<
  string,
  { severity: string; description: string }
> = {
  "aspirin+clopidogrel": {
    severity: "Grave",
    description:
      "Aumenta significativamente o risco de sangramento. O uso concomitante é comum em certos casos cardíacos, mas requer monitorização médica rigorosa devido ao efeito sinérgico na inibição plaquetária.",
  },
  "clopidogrel+omeprazole": {
    severity: "Moderada",
    description:
      "O omeprazol pode reduzir a eficácia do clopidogrel (Plavix) ao inibir a enzima CYP2C19, aumentando o risco de eventos trombóticos. Considere pantoprazol como alternativa.",
  },
  "warfarin+aspirin": {
    severity: "Grave",
    description:
      "Risco muito elevado de hemorragia. Combinação geralmente evitada exceto em situações muito específicas (ex: válvulas mecânicas) sob supervisão.",
  },
  "sildenafil+nitrates": {
    severity: "Grave - Risco de Vida",
    description:
      "Uso concomitante pode causar hipotensão severa e fatal. Contraindicado.",
  },
};

// Common dosage forms and other terms
const FORM_TRANSLATIONS: Record<string, string> = {
  Tablet: "Comprimido",
  Capsule: "Cápsula",
  Solution: "Solução",
  Suspension: "Suspensão",
  Injection: "Injeção",
  Cream: "Creme",
  Ointment: "Pomada",
  Gel: "Gel",
  Inhaler: "Inalador",
  Spray: "Spray",
  Patch: "Adesivo",
  Oral: "Oral",
  Topical: "Tópico",
  Ophthalmic: "Oftálmico",
  Nasal: "Nasal",
  Chewable: "Mastigável",
  "Delayed Release": "Liberação Retardada",
  mg: "mg",
  mL: "mL",
};

const normalizeName = (name: string) => {
  return name
    .toLowerCase()
    .split("[")[0]
    .replace(/\d+\s*(mg|ml|mcg|unit|unidades|g|%)/gi, "")
    .split(
      /comprimido|cápsula|tablet|capsule|oral|suspensão|suspension|solução|solution/i,
    )[0]
    .trim();
};

const getSubstanceIcon = (substance: string) => {
  const s = substance.toLowerCase();
  if (
    s.includes("álcool") ||
    s.includes("alcohol") ||
    s.includes("vinho") ||
    s.includes("cerveja")
  )
    return <Wine className="w-4 h-4" />;
  if (
    s.includes("tabaco") ||
    s.includes("fumar") ||
    s.includes("cigarette") ||
    s.includes("smoking")
  )
    return <Cigarette className="w-4 h-4" />;
  if (
    s.includes("café") ||
    s.includes("cafes") ||
    s.includes("coffee") ||
    s.includes("cafeína")
  )
    return <Coffee className="w-4 h-4" />;
  if (s.includes("vitamina") || s.includes("suplemento") || s.includes("k"))
    return <Info className="w-4 h-4" />;
  if (
    s.includes("alimento") ||
    s.includes("dieta") ||
    s.includes("comida") ||
    s.includes("toranja") ||
    s.includes("grapefruit")
  )
    return <Utensils className="w-4 h-4" />;
  return <Apple className="w-4 h-4" />;
};

function getDisplayName(med: Medication) {
  if (med.ptName) return med.ptName;
  let displayName = med.name;

  // Combine dictionaries
  const allTranslations = { ...DRUG_TRANSLATIONS, ...FORM_TRANSLATIONS };

  // Iterate over all keys to replace multiple occurrences
  for (const [en, pt] of Object.entries(allTranslations)) {
    // Use word boundary for forms to avoid replacing substrings incorrectly,
    // but keep simple check for drug names if they are unique enough.
    // Making case insensitive global replacement.
    displayName = displayName.replace(new RegExp(en, "gi"), pt);
  }

  // Clean up some formatting if needed (e.g. "Oral Comprimido" -> "Comprimido Oral" might be hard without logic, but direct translation helps)
  return displayName;
}

type InteractionInfo = {
  drug1: string;
  drug2: string;
  description: string;
  severity?: string;
};

// Medication Interaction Checker Component
function InteractionChecker({ dark }: { dark: boolean }) {
  const [medications, setMedications] = React.useState<Medication[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<Medication[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [interactions, setInteractions] = React.useState<InteractionInfo[]>([]);
  const [isCheckingInteractions, setIsCheckingInteractions] =
    React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Search medications using RxNorm API
  const searchMedications = React.useCallback(async (term: string) => {
    if (term.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      let queryTerm = term;
      const lowerTerm = term.toLowerCase();

      // Check if term matches any Portuguese name
      const ptMatch = Object.keys(REVERSE_DRUG_TRANSLATIONS).find((pt) =>
        pt.includes(lowerTerm),
      );
      if (ptMatch) {
        queryTerm = REVERSE_DRUG_TRANSLATIONS[ptMatch];
      }

      const response = await fetch(
        `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${encodeURIComponent(queryTerm)}`,
      );

      if (!response.ok) throw new Error("Erro ao buscar medicamentos");

      const data = await response.json();
      const drugGroup = data.drugGroup?.conceptGroup;

      if (!drugGroup || !Array.isArray(drugGroup)) {
        setSearchResults([]);
        return;
      }

      const results: Medication[] = [];
      const seenRxcui = new Set<string>();

      drugGroup.forEach((group: any) => {
        if (group.conceptProperties && Array.isArray(group.conceptProperties)) {
          group.conceptProperties.forEach((concept: any) => {
            if (!seenRxcui.has(concept.rxcui)) {
              results.push({
                rxcui: concept.rxcui,
                name: concept.name,
              });
              seenRxcui.add(concept.rxcui);
            }
          });
        }
      });

      setSearchResults(results.slice(0, 10));
    } catch (err) {
      console.error("Search error:", err);
      setError("Erro ao buscar medicamentos. Verifique sua conexão.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        searchMedications(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, searchMedications]);

  // Add medication to list
  const addMedication = (med: Medication) => {
    if (!medications.find((m) => m.rxcui === med.rxcui)) {
      setMedications([...medications, med]);
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  // Remove medication from list
  const removeMedication = (rxcui: string) => {
    setMedications(medications.filter((m) => m.rxcui !== rxcui));
  };

  // Check interactions using OpenFDA
  const checkInteractions = React.useCallback(async () => {
    if (medications.length < 2) {
      setInteractions([]);
      return;
    }

    setIsCheckingInteractions(true);
    setError(null);

    try {
      const foundInteractions: InteractionInfo[] = [];

      // Check each medication pair
      for (let i = 0; i < medications.length; i++) {
        for (let j = i + 1; j < medications.length; j++) {
          const med1 = medications[i];
          const med2 = medications[j];

          // 1. Check Static/Hardcoded Interactions first
          let staticMatch = null;
          // Check exact matches or if keys contain the drug names
          for (const [key, info] of Object.entries(STATIC_INTERACTIONS)) {
            const parts = key.split("+");

            // Match if both drugs are present in the key pair, irrespective of order
            if (
              (med1.name.toLowerCase().includes(parts[0]) &&
                med2.name.toLowerCase().includes(parts[1])) ||
              (med1.name.toLowerCase().includes(parts[1]) &&
                med2.name.toLowerCase().includes(parts[0]))
            ) {
              staticMatch = info;
              break;
            }
          }

          if (staticMatch) {
            foundInteractions.push({
              drug1: med1.name,
              drug2: med2.name,
              description: staticMatch.description,
              severity: staticMatch.severity,
            });
            continue; // Skip API check if found statically
          }

          // 2. API Check (Bidirectional)
          try {
            const checkPair = async (primary: string, secondary: string) => {
              const cleanedPrimary = normalizeName(primary);
              const response = await fetch(
                `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(
                  cleanedPrimary,
                )}"+OR+openfda.generic_name:"${encodeURIComponent(cleanedPrimary)}"&limit=1`,
              );

              if (!response.ok) return null;

              const data = await response.json();
              if (data.results && data.results[0]) {
                const label = data.results[0];
                const interactionText = label.drug_interactions?.[0] || "";

                const secondaryWords = secondary.toLowerCase().split(" ");
                // Filter short words to avoid false positives
                const relevantWords = secondaryWords.filter(
                  (w) => w.length > 3,
                );

                const hasInteraction = relevantWords.some((word) =>
                  interactionText.toLowerCase().includes(word),
                );

                if (hasInteraction && interactionText) {
                  const sentences = interactionText.split(/[.!?]+/);
                  const relevantSentences = sentences.filter((s: string) =>
                    relevantWords.some((word) =>
                      s.toLowerCase().includes(word),
                    ),
                  );
                  return relevantSentences.join(". ").trim() + ".";
                }
              }
              return null;
            };

            // Run checks in parallel: A vs B AND B vs A
            const [result1, result2] = await Promise.all([
              checkPair(med1.name, med2.name),
              checkPair(med2.name, med1.name),
            ]);

            const description = result1 || result2;

            if (description) {
              foundInteractions.push({
                drug1: med1.name,
                drug2: med2.name,
                description: description,
                severity: "Moderada", // Fallback severity
              });
            }
          } catch (err) {
            // Continue checking other pairs even if one fails
            console.error(`Error checking ${med1.name} vs ${med2.name}:`, err);
          }
        }
      }

      setInteractions(foundInteractions);
    } catch (err) {
      setError("Erro ao verificar interações. Tente novamente.");
    } finally {
      setIsCheckingInteractions(false);
    }
  }, [medications]);

  // Auto-check interactions when medications change
  React.useEffect(() => {
    if (medications.length >= 2) {
      checkInteractions();
    } else {
      setInteractions([]);
    }
  }, [medications, checkInteractions]);

  // 4. Food Interactions
  const foodInteractions: { drug: string; interactions: FoodInteraction[] }[] =
    [];

  medications.forEach((drug) => {
    const drugName = drug.name.toLowerCase();

    Object.keys(FOOD_INTERACTIONS).forEach((key) => {
      const ptName = DRUG_TRANSLATIONS[key]?.toLowerCase();

      if (
        drugName.includes(key.toLowerCase()) ||
        (ptName && drugName.includes(ptName))
      ) {
        if (!foodInteractions.find((f) => f.drug === drug.name)) {
          foodInteractions.push({
            drug: drug.name,
            interactions: FOOD_INTERACTIONS[key],
          });
        }
      }
    });
  });

  return (
    <div className="grid gap-6">
      <Card title="💊 Pesquisar Medicamentos" dark={dark}>
        <div className="space-y-4">
          <div className="relative z-[60]" id="med-search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome do medicamento..."
              className={`w-full rounded-xl border px-4 py-3 text-sm shadow-sm outline-none transition-colors ${
                dark
                  ? "border-slate-600 bg-slate-700 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-900/50"
                  : "border-slate-300 bg-white text-slate-900 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              }`}
            />
            {isSearching && (
              <div className="absolute right-3 top-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
              </div>
            )}

            {searchResults.length > 0 && (
              <div
                className={`absolute left-0 right-0 top-full z-50 mt-2 max-h-[60vh] overflow-y-auto rounded-2xl border shadow-2xl backdrop-blur-xl ${
                  dark
                    ? "bg-slate-900/95 border-slate-700/50 shadow-indigo-500/10"
                    : "bg-white/95 border-slate-200 shadow-slate-200/50"
                }`}
              >
                {searchResults.map((med) => (
                  <button
                    key={med.rxcui}
                    onClick={() => addMedication(med)}
                    className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all border-b last:border-0 ${
                      dark
                        ? "text-slate-200 border-slate-800 hover:bg-slate-800/80"
                        : "text-slate-900 border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">
                        {getDisplayName(med)}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-wider font-bold opacity-50`}
                      >
                        {med.name !== getDisplayName(med)
                          ? med.name
                          : "Medicamento"}
                      </span>
                    </div>
                    <span className="text-xl opacity-20 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>

      {error && (
        <div
          className={`rounded-xl border p-4 text-sm ${
            dark
              ? "border-red-800 bg-red-900/30 text-red-400"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {error}
        </div>
      )}

      <Card title="📋 Medicamentos Selecionados" dark={dark}>
        {medications.length === 0 ? (
          <div
            className={`rounded-xl border border-dashed p-6 text-center text-sm ${
              dark
                ? "border-slate-600 bg-slate-900/30 text-slate-500"
                : "border-slate-300 bg-white text-slate-600"
            }`}
          >
            Nenhum medicamento selecionado. Use a pesquisa acima para adicionar
            medicamentos.
          </div>
        ) : (
          <div className="space-y-2">
            {medications.map((med) => (
              <div
                key={med.rxcui}
                className={`flex items-center justify-between rounded-xl border p-3 ${
                  dark
                    ? "border-slate-700 bg-slate-900/50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <span
                  className={`text-sm font-medium ${dark ? "text-slate-200" : "text-slate-900"}`}
                >
                  {getDisplayName(med)}
                </span>
                <button
                  onClick={() => removeMedication(med.rxcui)}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
                    dark
                      ? "text-red-400 hover:bg-red-900/30"
                      : "text-red-600 hover:bg-red-50"
                  }`}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {medications.length >= 2 && (
        <Card title="⚠️ Interações Detectadas" dark={dark}>
          {isCheckingInteractions ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
            </div>
          ) : interactions.length === 0 ? (
            <div
              className={`rounded-xl border p-6 text-center text-sm ${
                dark
                  ? "border-emerald-800 bg-emerald-900/30 text-emerald-400"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              ✓ Nenhuma interação conhecida encontrada entre os medicamentos
              selecionados.
            </div>
          ) : (
            <div className="space-y-4">
              {interactions.map((interaction, idx) => (
                <div
                  key={idx}
                  className={`relative overflow-hidden rounded-2xl border p-6 transition-all shadow-sm ${
                    dark
                      ? "bg-slate-800/40 border-slate-700/50 backdrop-blur-sm"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div
                    className={`absolute top-0 left-0 w-1.5 h-full ${
                      interaction.description
                        .toLowerCase()
                        .includes("contraindicado")
                        ? "bg-rose-500"
                        : interaction.description
                              .toLowerCase()
                              .includes("moderada")
                          ? "bg-amber-500"
                          : "bg-blue-500"
                    }`}
                  />

                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                            interaction.description
                              .toLowerCase()
                              .includes("contraindicado")
                              ? "bg-rose-500/10 text-rose-500"
                              : "bg-amber-500/10 text-amber-500"
                          }`}
                        >
                          {interaction.description
                            .toLowerCase()
                            .includes("contraindicado")
                            ? "🚫 Contraindicado"
                            : "⚠️ Monitoramento"}
                        </span>
                      </div>
                      <div
                        className={`text-lg font-bold ${
                          dark ? "text-slate-100" : "text-slate-900"
                        }`}
                      >
                        {getDisplayName({ name: interaction.drug1 } as any)} ↔{" "}
                        {getDisplayName({ name: interaction.drug2 } as any)}
                      </div>
                      <div
                        className={`mt-4 text-sm leading-relaxed ${
                          dark ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        <p
                          className={`font-semibold mb-2 ${dark ? "text-slate-300" : "text-slate-700"}`}
                        >
                          Descrição Clínica:
                        </p>
                        {interaction.description}
                      </div>
                    </div>
                    <button
                      className={`shrink-0 text-xs font-bold px-4 py-2 rounded-lg border transition-all ${
                        dark
                          ? "border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))}

              <div
                className={`rounded-xl p-4 text-sm ring-1 ${
                  dark
                    ? "bg-slate-900/50 text-slate-400 ring-slate-700"
                    : "bg-slate-50 text-slate-700 ring-slate-200"
                }`}
              >
                <div
                  className={`font-semibold ${dark ? "text-slate-200" : "text-slate-900"}`}
                >
                  ⚕️ Importante
                </div>
                <div className="mt-1">
                  Esta ferramenta é apenas informativa. Sempre consulte um
                  médico ou farmacêutico antes de tomar qualquer medicamento.
                  Nem todas as interações são detectadas.
                </div>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Food Interactions Section */}
      {foodInteractions.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <h3
            className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
              dark ? "text-slate-200" : "text-slate-800"
            }`}
          >
            🍽️ Interações com Alimentos e Estilo de Vida
          </h3>
          <div className="space-y-4">
            {foodInteractions.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-4 shadow-sm ${
                  dark
                    ? "bg-slate-800/50 border-slate-700"
                    : "bg-orange-50 border-orange-200"
                }`}
              >
                <div className="font-medium text-orange-600 mb-2">
                  Medicamento: {getDisplayName({ name: item.drug } as any)}
                </div>
                <ul className="space-y-3">
                  {item.interactions.map((interaction, i) => (
                    <li key={i} className="text-sm">
                      <div className="font-semibold flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                            interaction.severity === "High"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {interaction.severity === "High"
                            ? "ALTA"
                            : "MODERADA"}
                        </span>
                        <span
                          className={dark ? "text-slate-300" : "text-slate-800"}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-orange-500">
                              {getSubstanceIcon(interaction.substance)}
                            </span>
                            {interaction.substance}
                          </div>
                        </span>
                      </div>
                      <p
                        className={`mt-1 ml-1 ${dark ? "text-slate-400" : "text-slate-600"}`}
                      >
                        {interaction.description}
                      </p>
                      <div className="mt-1 text-xs text-slate-500 opacity-75">
                        Fonte: {interaction.source}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

type TabType = "exames" | "interacoes" | "agenda" | "upload" | "historico";

function AgendaPage({ dark }: { dark: boolean }) {
  const [appointments] = React.useState([
    {
      id: "1",
      title: "Maria Antônia S.",
      type: "Consulta de Rotina",
      time: "09:00",
      status: "Regular",
      initials: "MA",
    },
    {
      id: "2",
      title: "Roberto Paschoal",
      type: "Retorno / Pós-op",
      time: "11:30",
      status: "Retorno",
      initials: "RP",
    },
    {
      id: "3",
      title: "João Lucas P.",
      type: "Consulta Especialista",
      time: "15:00",
      status: "Regular",
      initials: "JL",
    },
  ]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  // Padding for the grid (starting on Wednesday as in the design)
  const padding = [28, 29, 30];

  return (
    <div className="animate-in fade-in duration-500 flex flex-col h-full overflow-hidden">
      {/* Search and Action Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          <button
            className={`px-4 py-1.5 text-xs font-semibold rounded-md shadow-sm ${dark ? "bg-slate-700 text-white" : "bg-white text-slate-800"}`}
          >
            Mês
          </button>
          <button className="px-4 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            Semana
          </button>
          <button className="px-4 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            Dia
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar consulta..."
              className={`w-full pl-10 pr-4 py-1.5 text-sm rounded-lg border-none focus:ring-2 focus:ring-indigo-500/20 ${
                dark
                  ? "bg-slate-800 text-slate-200 placeholder-slate-500"
                  : "bg-white text-slate-900 placeholder:text-slate-400 shadow-sm border border-slate-200"
              }`}
            />
          </div>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all active:scale-95 leading-none">
            <Plus size={18} />
            Nova Consulta
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-hidden">
        {/* Calendar Grid Section */}
        <div className="flex-1 overflow-hidden flex flex-col gap-4">
          <div className="flex items-center justify-center gap-4">
            <button
              className={`p-1.5 rounded-lg transition-colors ${dark ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-600"}`}
            >
              <ChevronLeft size={20} />
            </button>
            <h3
              className={`text-sm font-bold uppercase tracking-widest ${dark ? "text-slate-200" : "text-slate-700"}`}
            >
              Maio 2024
            </h3>
            <button
              className={`p-1.5 rounded-lg transition-colors ${dark ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-600"}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div
            className={`rounded-xl border shadow-sm overflow-hidden ${dark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
          >
            <div
              className={`grid grid-cols-7 border-b ${dark ? "border-slate-800 bg-slate-800/30" : "border-slate-200 bg-slate-50"}`}
            >
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                <div
                  key={day}
                  className="py-2.5 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                >
                  {day}
                </div>
              ))}
            </div>

            <div
              className={`grid grid-cols-7 gap-px ${dark ? "bg-slate-800" : "bg-slate-200"}`}
            >
              {/* Padding days */}
              {padding.map((d) => (
                <div
                  key={`p-${d}`}
                  className={`min-h-[100px] p-2 text-xs font-semibold opacity-30 ${dark ? "bg-slate-900/40" : "bg-slate-50"}`}
                >
                  {d}
                </div>
              ))}
              {/* Actual days */}
              {days.map((d) => (
                <div
                  key={d}
                  className={`min-h-[100px] p-2 relative transition-colors ${dark ? "bg-slate-900 hover:bg-slate-800/50 text-slate-500" : "bg-white hover:bg-slate-50 text-slate-400"} ${d === 24 ? (dark ? "bg-indigo-500/10" : "bg-indigo-50") : ""}`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 text-[11px] font-bold rounded-full ${d === 24 ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30" : ""}`}
                  >
                    {d}
                  </span>

                  {d === 24 && (
                    <div className="mt-2 space-y-1">
                      <div className="p-1.5 bg-indigo-500/10 border-l-2 border-indigo-600 rounded text-[9px] text-indigo-600 dark:text-indigo-400 font-bold truncate">
                        09:00 - Maria A.
                      </div>
                      <div className="p-1.5 bg-emerald-500/10 border-l-2 border-emerald-600 rounded text-[9px] text-emerald-600 dark:text-emerald-400 font-bold truncate">
                        11:30 - Roberto P.
                      </div>
                      <div className="p-1.5 bg-indigo-500/10 border-l-2 border-indigo-600 rounded text-[9px] text-indigo-600 dark:text-indigo-400 font-bold truncate">
                        15:00 - João Lucas
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div
                className={`min-h-[100px] p-2 text-xs font-semibold opacity-30 ${dark ? "bg-slate-900/40" : "bg-slate-50"}`}
              >
                1
              </div>
            </div>
          </div>
        </div>

        {/* Aside Panel */}
        <aside className="w-80 flex flex-col gap-8 flex-shrink-0">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`font-bold text-sm ${dark ? "text-white" : "text-slate-900"}`}
              >
                Próximas Consultas
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${dark ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"}`}
              >
                Hoje
              </span>
            </div>

            <div className="space-y-3">
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  className={`p-4 rounded-xl border transition-all group ${dark ? "bg-slate-800/40 border-slate-700/50 hover:border-indigo-500/30" : "bg-white border-slate-100 hover:border-indigo-300 shadow-sm"}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                          appt.status === "Retorno"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-indigo-500/10 text-indigo-500"
                        }`}
                      >
                        {appt.initials}
                      </div>
                      <div className="min-w-0 overflow-hidden">
                        <p
                          className={`text-sm font-bold leading-tight truncate ${dark ? "text-slate-200" : "text-slate-800"}`}
                        >
                          {appt.title}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                          {appt.type}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-bold ${appt.status === "Retorno" ? "text-emerald-500" : "text-indigo-500"}`}
                    >
                      {appt.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                    <button
                      className={`flex-1 py-1.5 text-[10px] font-bold rounded border transition-colors ${
                        dark
                          ? "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Prontuário
                    </button>
                    <button className="flex-1 py-1.5 text-[10px] font-bold bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                      Check-in
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                Amanhã, 25 Mai
              </span>
              <div
                className={`h-px w-full ${dark ? "bg-slate-800" : "bg-slate-100"}`}
              ></div>
            </div>

            <div
              className={`mt-4 p-4 rounded-xl border opacity-60 ${dark ? "bg-slate-800/30 border-slate-700/50" : "bg-slate-50 border-slate-100"}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${dark ? "bg-slate-800 text-slate-500" : "bg-slate-100 text-slate-400"}`}
                  >
                    CF
                  </div>
                  <div>
                    <p
                      className={`text-sm font-bold truncate ${dark ? "text-slate-400" : "text-slate-600"}`}
                    >
                      Clara Fonseca
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Exame Toxicológico
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-slate-500 text-indigo-500">
                  08:00
                </span>
              </div>
            </div>
          </div>

          <div
            className={`mt-auto pt-6 border-t ${dark ? "border-slate-800" : "border-slate-100"}`}
          >
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Legenda
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                <span
                  className={`text-[11px] font-medium ${dark ? "text-slate-400" : "text-slate-600"}`}
                >
                  Consulta Regular
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
                <span
                  className={`text-[11px] font-medium ${dark ? "text-slate-400" : "text-slate-600"}`}
                >
                  Retorno / Follow-up
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <span
                  className={`text-[11px] font-medium ${dark ? "text-slate-400" : "text-slate-600"}`}
                >
                  Urgência
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function UploadPage({ dark }: { dark: boolean }) {
  const [uploads] = React.useState([
    {
      id: "1",
      name: "exame_sangue_joao.pdf",
      size: "2.4 MB",
      progress: 45,
      status: "uploading",
    },
    {
      id: "2",
      name: "radiografia_torax_02.jpg",
      size: "5.1 MB",
      progress: 100,
      status: "completed",
    },
    {
      id: "3",
      name: "laudo_ressonancia_magnetica.pdf",
      size: "12.8 MB",
      progress: 82,
      status: "uploading",
    },
  ]);

  const [messages, setMessages] = React.useState([
    {
      role: "assistant",
      content:
        "Olá! Sou o assistente MedAge. Posso ajudar a interpretar seus exames. Qual arquivo deseja analisar?",
    },
  ]);
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    // Mock response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Entendido. Estou analisando as tendências nos seus últimos exames. Notei que seus níveis de vitamina D estão ligeiramente abaixo do ideal.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="animate-in fade-in duration-500 flex flex-col h-full gap-8">
      <div className="flex gap-8 h-full overflow-hidden">
        {/* Main Upload Content */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Dropzone */}
          <div
            className={`flex-1 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-12 transition-all ${
              dark
                ? "bg-slate-800/20 border-slate-700/50 hover:bg-slate-800/30 hover:border-indigo-500/30"
                : "bg-white border-slate-200 hover:bg-slate-50 hover:border-indigo-300 shadow-sm"
            }`}
          >
            <div className="flex gap-4 mb-6">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${dark ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600"}`}
              >
                <FileText className="w-7 h-7" />
              </div>
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${dark ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600"}`}
              >
                <Upload className="w-7 h-7" />
              </div>
            </div>
            <h2
              className={`text-xl font-bold mb-2 ${dark ? "text-white" : "text-slate-900"}`}
            >
              Arraste e solte seus arquivos aqui
            </h2>
            <p className="text-sm text-slate-500 mb-8 max-w-sm text-center">
              Suporte para arquivos PDF, PNG e JPG. Tamanho máximo de 20MB por
              arquivo.
            </p>
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
              Selecionar Arquivos
            </button>
          </div>

          {/* Active Uploads */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3
                className={`font-bold text-sm ${dark ? "text-white" : "text-slate-900"}`}
              >
                Uploads Ativos{" "}
                <span className="text-indigo-500 ml-2">3 arquivos</span>
              </h3>
              <button className="text-[10px] uppercase font-bold text-indigo-500 hover:text-indigo-400 tracking-wider">
                Limpar Concluídos
              </button>
            </div>

            <div className="space-y-3">
              {uploads.map((file) => (
                <div
                  key={file.id}
                  className={`p-4 rounded-2xl border ${dark ? "bg-slate-800/40 border-slate-700/50" : "bg-white border-slate-100 shadow-sm"}`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${dark ? "bg-slate-700 text-slate-400" : "bg-slate-50 text-slate-500"}`}
                    >
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p
                          className={`text-sm font-bold truncate ${dark ? "text-slate-200" : "text-slate-800"}`}
                        >
                          {file.name}
                        </p>
                        {file.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <X className="w-4 h-4 text-slate-500 cursor-pointer" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500">
                        {file.size} •{" "}
                        {file.status === "completed"
                          ? "Upload completo"
                          : `${file.progress}% concluído`}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`h-1.5 w-full rounded-full overflow-hidden ${dark ? "bg-slate-700" : "bg-slate-100"}`}
                  >
                    <div
                      className={`h-full transition-all duration-500 ${file.status === "completed" ? "bg-emerald-500 w-full" : "bg-indigo-600"}`}
                      style={{
                        width:
                          file.status === "completed"
                            ? "100%"
                            : `${file.progress}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Assistant Sidebar */}
        <aside className="w-80 flex flex-col h-full flex-shrink-0 animate-in slide-in-from-right duration-500">
          <div
            className={`flex-1 flex flex-col rounded-3xl border overflow-hidden ${dark ? "bg-slate-800/40 border-slate-700/50" : "bg-white border-slate-100 shadow-sm"}`}
          >
            {/* AI Header */}
            <div className="p-5 border-b border-slate-700/50 bg-indigo-600/5 items-center flex gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${dark ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-600"}`}
              >
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3
                  className={`font-bold text-sm ${dark ? "text-white" : "text-slate-900"}`}
                >
                  MedAge AI
                </h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    Online agora
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-[11px] font-medium leading-relaxed ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none"
                        : dark
                          ? "bg-slate-700 text-slate-200 rounded-tl-none"
                          : "bg-slate-100 text-slate-700 rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* AI Quick Actions */}
            <div className="px-5 py-3 flex gap-2 overflow-x-auto no-scrollbar">
              <button
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-bold border transition-colors ${
                  dark
                    ? "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Analisar último
              </button>
              <button
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-bold border transition-colors ${
                  dark
                    ? "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Explicar taxas
              </button>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-slate-700/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Pergunte sobre seus exames..."
                  className={`w-full pl-4 pr-12 py-3 rounded-xl text-xs outline-none transition-all ${
                    dark
                      ? "bg-slate-900 border-slate-700 text-slate-200 focus:ring-2 focus:ring-indigo-500/50"
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:ring-2 focus:ring-indigo-500/20 shadow-inner"
                  }`}
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sparkles / Insight Banner */}
          <div className="mt-6 p-5 rounded-3xl bg-indigo-600 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-16 h-16 rotate-12" />
            </div>
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <MessageSquare className="w-4 h-4" />
              <h4 className="font-bold text-xs uppercase tracking-wider">
                Insight da IA
              </h4>
            </div>
            <p className="text-[10px] text-indigo-100 font-medium leading-relaxed relative z-10">
              "Baseado nos seus últimos 3 meses, houve uma melhoria de 12% nos
              seus níveis de glicose."
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ExamHistoryPage({ dark }: { dark: boolean }) {
  const specialties = [
    {
      name: "Análises Clínicas",
      icon: "🧪",
      count: 12,
      color: "bg-emerald-500",
    },
    { name: "Radiologia", icon: "🩻", count: 5, color: "bg-indigo-500" },
    { name: "Cardiologia", icon: "❤️", count: 3, color: "bg-red-500" },
    { name: "Endocrinologia", icon: "⚖️", count: 4, color: "bg-amber-500" },
    { name: "Gastroenterologia", icon: "🍱", count: 2, color: "bg-orange-500" },
    { name: "Dermatologia", icon: "🔍", count: 2, color: "bg-rose-400" },
  ];

  const exams = [
    {
      id: 1,
      name: "Hemograma Completo",
      date: "15 Mai 2024",
      specialty: "Análises Clínicas",
      provider: "Laboratório Central",
      status: "Validado",
    },
    {
      id: 2,
      name: "Raio-X Tórax (PA/Lateral)",
      date: "10 Mai 2024",
      specialty: "Radiologia",
      provider: "Clínica Imagem",
      status: "Pendente",
    },
    {
      id: 3,
      name: "Glicemia de Jejum",
      date: "08 Mai 2024",
      specialty: "Análises Clínicas",
      provider: "Laboratório Central",
      status: "Validado",
    },
    {
      id: 4,
      name: "Eletrocardiograma",
      date: "02 Mai 2024",
      specialty: "Cardiologia",
      provider: "Hospital S. João",
      status: "Validado",
    },
    {
      id: 5,
      name: "Colesterol Total e Frações",
      date: "28 Abr 2024",
      specialty: "Análises Clínicas",
      provider: "Laboratório Central",
      status: "Arquivado",
    },
  ];

  return (
    <div className="animate-in fade-in duration-500 space-y-10 pb-20">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3
            className={`text-sm font-bold uppercase tracking-widest ${dark ? "text-slate-500" : "text-slate-400"}`}
          >
            Organizado por Especialidade
          </h3>
          <button
            className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider ${dark ? "text-indigo-400" : "text-indigo-600"}`}
          >
            <ClipboardList size={14} />
            Gerir Categorias
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {specialties.map((s) => (
            <button
              key={s.name}
              className={`p-5 rounded-3xl border text-left transition-all group ${
                dark
                  ? "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 hover:border-indigo-500/30"
                  : "bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-2xl ${dark ? "bg-slate-700" : "bg-slate-50"} flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}
              >
                {s.icon}
              </div>
              <p
                className={`text-xs font-bold leading-tight mb-1 ${dark ? "text-slate-200" : "text-slate-800"}`}
              >
                {s.name}
              </p>
              <p className="text-[10px] font-bold text-slate-500">
                {s.count} exames
              </p>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3
            className={`text-sm font-bold uppercase tracking-widest ${dark ? "text-slate-500" : "text-slate-400"}`}
          >
            Todos os Exames
          </h3>
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-sm"}`}
            >
              <Search size={14} className="text-slate-500" />
              <input
                type="text"
                placeholder="Pesquisar exames..."
                className={`bg-transparent border-none p-0 text-xs focus:ring-0 w-40 ${dark ? "text-slate-200" : "text-slate-800"}`}
              />
            </div>
            <select
              className={`text-xs font-bold rounded-lg border-none focus:ring-2 focus:ring-indigo-500/20 py-2 px-3 ${dark ? "bg-slate-800 text-slate-200" : "bg-white text-slate-700 shadow-sm"}`}
            >
              <option>Mais recentes</option>
              <option>Por nome</option>
              <option>Por especialidade</option>
            </select>
          </div>
        </div>

        <div
          className={`rounded-3xl border overflow-hidden ${dark ? "bg-slate-800/20 border-slate-700/50" : "bg-white border-slate-100 shadow-sm"}`}
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className={`border-b ${dark ? "border-slate-700/50 bg-slate-800/30" : "border-slate-50 bg-slate-50/50"}`}
              >
                <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Exame / Especialidade
                </th>
                <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Data
                </th>
                <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Local
                </th>
                <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Status
                </th>
                <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/10">
              {exams.map((exam) => (
                <tr
                  key={exam.id}
                  className={`${dark ? "hover:bg-slate-800/30" : "hover:bg-slate-50/50"} transition-colors group`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${dark ? "bg-slate-800 text-slate-400" : "bg-slate-50 text-slate-500"}`}
                      >
                        <FileText size={18} />
                      </div>
                      <div>
                        <p
                          className={`text-sm font-bold ${dark ? "text-slate-200" : "text-slate-800"}`}
                        >
                          {exam.name}
                        </p>
                        <p className="text-[10px] font-medium text-slate-500">
                          {exam.specialty}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-medium text-slate-400">
                    {exam.date}
                  </td>
                  <td className="p-4 text-xs font-medium text-slate-400">
                    {exam.provider}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                        exam.status === "Validado"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : exam.status === "Pendente"
                            ? "bg-amber-500/10 text-amber-500"
                            : "bg-slate-500/10 text-slate-500"
                      }`}
                    >
                      {exam.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-indigo-500 hover:text-indigo-400 font-bold text-xs transition-colors">
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function MainApp() {
  const { currentUser, logout, loading } = useAuth();
  const [dark, setDark] = useDarkMode();
  const [activeTab, setActiveTab] = React.useState<TabType>("exames");
  const [ageText, setAgeText] = React.useState<string>("");
  const [sex, setSex] = React.useState<Sex>("F");
  const [recentActivities, setRecentActivities] = React.useState<
    RecentActivity[]
  >(() => {
    const saved = localStorage.getItem("recentActivities");
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem("recentActivities", JSON.stringify(recentActivities));
  }, [recentActivities]);

  const addActivity = React.useCallback((age: number, sex: Sex) => {
    setRecentActivities((prev) => {
      const filtered = prev.filter((a) => !(a.age === age && a.sex === sex));
      const newActivity = {
        id: Math.random().toString(36).substr(2, 9),
        age,
        sex,
        timestamp: Date.now(),
      };
      return [newActivity, ...filtered].slice(0, 5);
    });
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${dark ? "bg-slate-900" : "bg-slate-50"}`}
      >
        <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Login />;
  }

  const age = Number(ageText);
  const ageValid = Number.isFinite(age) && age >= 0 && age <= 120;

  const matching = ageValid
    ? EXAMS.filter((e) => matchesSex(e, sex) && inAgeRange(e, age)).sort(
        sortByUrgency,
      )
    : [];

  const high = matching.filter((e) => e.urgency === "Alta");
  const medium = matching.filter((e) => e.urgency === "Média");
  const low = matching.filter((e) => e.urgency === "Baixa");

  React.useEffect(() => {
    if (ageValid && ageText !== "") {
      const timer = setTimeout(() => {
        addActivity(age, sex);
      }, 1500); // Save after 1.5s of inactivity
      return () => clearTimeout(timer);
    }
  }, [age, sex, ageValid, ageText, addActivity]);

  return (
    <div
      className={`min-h-screen transition-colors ${
        dark ? "bg-[#0f172a]" : "bg-slate-50"
      }`}
    >
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dark={dark}
        setDark={setDark}
        logout={logout}
      />

      <main className="pl-64 min-h-screen">
        <div className="mx-auto max-w-5xl px-8 py-10">
          <header className="mb-10">
            <div className="flex flex-col gap-2">
              <h1
                className={`text-3xl font-bold tracking-tight ${
                  dark ? "text-white" : "text-slate-900"
                }`}
              >
                {activeTab === "exames"
                  ? "📋 Protocolo de Exames"
                  : activeTab === "interacoes"
                    ? "💊 Verificador de Interações"
                    : activeTab === "agenda"
                      ? "📅 Agenda Médica"
                      : activeTab === "upload"
                        ? "📤 Upload de Exames"
                        : "📁 Gestor de Exames"}
              </h1>
              <p
                className={`max-w-2xl text-base ${
                  dark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {activeTab === "exames"
                  ? "Visualize rapidamente o protocolo preventivo recomendado para cada faixa etária. Otimize seus check-ups com diretrizes atualizadas."
                  : activeTab === "interacoes"
                    ? "Ferramenta avançada para cruzamento de substâncias e detecção de riscos potenciais em prescrições múltiplas."
                    : activeTab === "agenda"
                      ? "Gerencie seus agendamentos, exames e lembretes de saúde em um só lugar."
                      : activeTab === "upload"
                        ? "Gerencie e envie registros médicos de pacientes com segurança criptografada."
                        : "Acesse e organize seu histórico completo de exames médicos por especialidade."}
              </p>
            </div>

            {activeTab !== "agenda" &&
              activeTab !== "upload" &&
              activeTab !== "historico" && (
                <div
                  className={`mt-8 rounded-2xl px-6 py-4 text-sm shadow-sm border ${
                    dark
                      ? "bg-slate-800/50 text-slate-400 border-slate-700/50 backdrop-blur-sm"
                      : "bg-white text-slate-600 border-slate-200"
                  }`}
                >
                  <div
                    className={`font-bold flex items-center gap-2 mb-1 ${dark ? "text-slate-200" : "text-slate-800"}`}
                  >
                    <span>⚠️</span> Nota importante
                  </div>
                  <div>
                    Se tiver sintomas, gravidez, doença crónica, história
                    familiar relevante ou fatores de risco, os exames e prazos
                    podem mudar. Consulte sempre um profissional de saúde.
                  </div>
                </div>
              )}
          </header>

          {activeTab === "exames" && (
            <RecentActivityList
              activities={recentActivities}
              dark={dark}
              onSelect={(a, s) => {
                setAgeText(String(a));
                setSex(s);
              }}
            />
          )}

          {/* Tab Navigation was here, now handled by Sidebar */}

          {activeTab === "exames" && (
            <div className="grid gap-8 lg:grid-cols-2 animate-in fade-in duration-500">
              <Card
                title="👤 Identificação do Paciente"
                dark={dark}
                right={
                  <button
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                      dark
                        ? "text-slate-400 hover:bg-slate-700 hover:text-white"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
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
                      onChange={(e) =>
                        setAgeText(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      inputMode="numeric"
                      placeholder="Ex.: 42"
                      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm shadow-sm outline-none transition-colors ${
                        dark
                          ? "border-slate-600 bg-slate-700 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-900/50"
                          : "border-slate-300 bg-white text-slate-900 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                      }`}
                    />
                    {!ageText ? (
                      <p
                        className={`mt-1 text-xs ${dark ? "text-slate-500" : "text-slate-500"}`}
                      >
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
                    <p
                      className={`mt-2 text-xs ${dark ? "text-slate-500" : "text-slate-500"}`}
                    >
                      (Nota: isto serve apenas para recomendações típicas de
                      rastreio. Identidade de género e contexto clínico podem
                      alterar a recomendação.)
                    </p>
                  </div>

                  <div
                    className={`rounded-xl p-4 text-sm ring-1 ${
                      dark
                        ? "bg-slate-900/50 text-slate-400 ring-slate-700"
                        : "bg-slate-50 text-slate-700 ring-slate-200"
                    }`}
                  >
                    <div
                      className={`font-semibold ${dark ? "text-slate-200" : "text-slate-900"}`}
                    >
                      📊 Como interpretamos "urgência"
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>
                        <span className="font-semibold text-red-500">Alta</span>
                        : rastreio importante na faixa etária; tente agendar
                        dentro de semanas/meses.
                      </li>
                      <li>
                        <span className="font-semibold text-amber-500">
                          Média
                        </span>
                        : útil para prevenção; planeie no próximo check-up.
                      </li>
                      <li>
                        <span className="font-semibold text-emerald-500">
                          Baixa
                        </span>
                        : depende de risco/decisão partilhada; pode ser
                        oportunista.
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
                    Não há itens nesta lista para esta idade/sexo. Se tiver
                    dúvidas, fale com um profissional de saúde.
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div
                        className={`rounded-xl p-3 text-center shadow-sm ring-1 ${
                          dark
                            ? "bg-slate-900/50 ring-slate-700"
                            : "bg-white ring-slate-200"
                        }`}
                      >
                        <div
                          className={`text-xs font-medium ${dark ? "text-slate-400" : "text-slate-600"}`}
                        >
                          🔴 Alta
                        </div>
                        <div
                          className={`text-lg font-semibold ${dark ? "text-red-400" : "text-red-600"}`}
                        >
                          {high.length}
                        </div>
                      </div>
                      <div
                        className={`rounded-xl p-3 text-center shadow-sm ring-1 ${
                          dark
                            ? "bg-slate-900/50 ring-slate-700"
                            : "bg-white ring-slate-200"
                        }`}
                      >
                        <div
                          className={`text-xs font-medium ${dark ? "text-slate-400" : "text-slate-600"}`}
                        >
                          🟡 Média
                        </div>
                        <div
                          className={`text-lg font-semibold ${dark ? "text-amber-400" : "text-amber-600"}`}
                        >
                          {medium.length}
                        </div>
                      </div>
                      <div
                        className={`rounded-xl p-3 text-center shadow-sm ring-1 ${
                          dark
                            ? "bg-slate-900/50 ring-slate-700"
                            : "bg-white ring-slate-200"
                        }`}
                      >
                        <div
                          className={`text-xs font-medium ${dark ? "text-slate-400" : "text-slate-600"}`}
                        >
                          🟢 Baixa
                        </div>
                        <div
                          className={`text-lg font-semibold ${dark ? "text-emerald-400" : "text-emerald-600"}`}
                        >
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
                        Leve esta lista para a sua consulta e confirme o
                        calendário de rastreios de acordo com o seu país,
                        história familiar, medicação e fatores de risco.
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          )}

          {activeTab === "interacoes" && (
            <div className="animate-in fade-in duration-500">
              <InteractionChecker dark={dark} />
            </div>
          )}

          {activeTab === "agenda" && (
            <div className="animate-in fade-in duration-500">
              <AgendaPage dark={dark} />
            </div>
          )}

          {activeTab === "upload" && (
            <div className="animate-in fade-in duration-500">
              <UploadPage dark={dark} />
            </div>
          )}

          {activeTab === "historico" && (
            <div className="animate-in fade-in duration-500">
              <ExamHistoryPage dark={dark} />
            </div>
          )}

          {activeTab === "historico" && (
            <div className="animate-in fade-in duration-500">
              <ExamHistoryPage dark={dark} />
            </div>
          )}

          <footer
            className={`mt-12 pt-8 border-t ${dark ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-400"}`}
          >
            <p className="text-xs leading-relaxed max-w-3xl">
              ⚕️ Esta ferramenta não fornece diagnóstico. Em caso de dor no
              peito, falta de ar, sintomas neurológicos, sangramento
              significativo ou qualquer situação que pareça urgente, procure
              assistência médica imediata.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
