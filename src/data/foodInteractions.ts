export interface FoodInteraction {
  substance: string;
  severity: "High" | "Moderate";
  description: string;
  source: string;
}

// Keys must be lowercase drug names (english)
export const FOOD_INTERACTIONS: Record<string, FoodInteraction[]> = {
  // Warfarin & Blood Thinners
  warfarin: [
    {
      substance: "Vitamin K (Vegetais Verdes Escuros)",
      severity: "High",
      description:
        "Alimentos ricos em Vitamina K (espinafre, couve, brócolis) podem diminuir a eficácia da varfarina e aumentar o risco de coágulos. Mantenha o consumo consistente.",
      source: "Johns Hopkins Medicine",
    },
    {
      substance: "Alho, Gengibre, Ginkgo, Ginseng",
      severity: "Moderate",
      description:
        "O uso excessivo destes suplementos pode aumentar o risco de sangramento.",
      source: "Johns Hopkins Medicine",
    },
    {
      substance: "Álcool",
      severity: "Moderate",
      description:
        "O álcool pode alterar o metabolismo da varfarina, aumentando o risco de sangramento.",
      source: "Johns Hopkins Medicine",
    },
  ],

  // Statins (Cholesterol)
  atorvastatin: [
    {
      substance: "Toranja (Grapefruit)",
      severity: "High",
      description:
        "O suco de toranja pode aumentar os níveis do medicamento no sangue, elevando o risco de efeitos colaterais musculares e hepáticos.",
      source: "Johns Hopkins Medicine",
    },
  ],
  simvastatin: [
    {
      substance: "Toranja (Grapefruit)",
      severity: "High",
      description:
        "O suco de toranja pode aumentar significativamente os níveis do medicamento, elevando o risco de danos musculares graves (rabdomiólise).",
      source: "Johns Hopkins Medicine",
    },
  ],
  lovastatin: [
    {
      substance: "Toranja (Grapefruit)",
      severity: "High",
      description:
        "Evite o consumo de toranja, pois interfere na metabolização do medicamento.",
      source: "Johns Hopkins Medicine",
    },
  ],

  // Antibiotics
  tetracycline: [
    {
      substance: "Laticínios (Leite, Queijo, Iogurte)",
      severity: "Moderate",
      description:
        "O cálcio nos laticínios pode impedir a absorção correta do antibiótico. Tome o medicamento 1h antes ou 2h depois das refeições lácteas.",
      source: "Johns Hopkins Medicine",
    },
  ],
  doxycycline: [
    {
      substance: "Laticínios e Ferro",
      severity: "Moderate",
      description:
        "Suplementos de ferro e laticínios podem reduzir a absorção. Separe a administração.",
      source: "Johns Hopkins Medicine",
    },
  ],
  ciprofloxacin: [
    {
      substance: "Laticínios e Cafeína",
      severity: "Moderate",
      description:
        "Laticínios reduzem a absorção. O medicamento também pode aumentar os efeitos da cafeína.",
      source: "Johns Hopkins Medicine",
    },
  ],
  metronidazole: [
    {
      substance: "Álcool",
      severity: "High",
      description:
        "O consumo de álcool (mesmo em pequenas quantidades) pode causar náuseas severas, vômitos, cólicas e dores de cabeça (efeito tipo dissulfiram). Evite álcool durante e 48h após o tratamento.",
      source: "Johns Hopkins Medicine",
    },
  ],

  // MAOIs (Generic check, though less common currently)
  tranylcypromine: [
    {
      substance: "Tiramina (Queijos curados, Vinho tinto, Embutidos)",
      severity: "High",
      description:
        "Pode causar crises hipertensivas graves. Evite alimentos ricos em tiramina.",
      source: "Johns Hopkins Medicine",
    },
  ],
  phenelzine: [
    {
      substance: "Tiramina (Queijos curados, Vinho tinto, Embutidos)",
      severity: "High",
      description:
        "Risco de crise hipertensiva fatal. Dieta restritiva necessária.",
      source: "Johns Hopkins Medicine",
    },
  ],

  // Others
  digoxin: [
    {
      substance: "Fibra (Farelo de Trigo)",
      severity: "Moderate",
      description:
        "Grandes quantidades de fibra insolúvel podem diminuir a absorção da digoxina. Tome o medicamento longe das refeições ricas em fibras.",
      source: "Johns Hopkins Medicine",
    },
    {
      substance: "Alcaçuz Preto (Black Licorice)",
      severity: "High",
      description:
        "Pode causar arritmias cardíacas quando combinado com digoxina devido à perda de potássio.",
      source: "FDA / Johns Hopkins",
    },
  ],
  spironolactone: [
    {
      substance: "Substitutos do Sal (Potássio) e Bananas",
      severity: "Moderate",
      description:
        "O excesso de potássio na dieta pode levar a hipercalemia perigosa, pois o medicamento já retém potássio.",
      source: "Johns Hopkins Medicine",
    },
  ],
};
