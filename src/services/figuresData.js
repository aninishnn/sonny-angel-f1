export const RARITY = {
  COMMON: 'common',
  RARE: 'rare',
  EPIC: 'epic',
  SECRET: 'secret',
};

export const RARITY_ORDER = [RARITY.COMMON, RARITY.RARE, RARITY.EPIC, RARITY.SECRET];

export const figures = [
  // Common — 4
  { id: 'fig-01', nameEn: 'Scarlet Racer', nameKa: 'ალისფერი მრბოლელი', code: 'SCR', primary: '#E8333D', secondary: '#14171c', rarity: RARITY.COMMON, imageUrl: null },
  { id: 'fig-02', nameEn: 'Papaya Dash', nameKa: 'პაპაიას ელვა', code: 'PAP', primary: '#FF8000', secondary: '#14171c', rarity: RARITY.COMMON, imageUrl: null },
  { id: 'fig-03', nameEn: 'Azure Comet', nameKa: 'ლაჟვარდის კომეტა', code: 'AZC', primary: '#1c4fd6', secondary: '#ffffff', rarity: RARITY.COMMON, imageUrl: null },
  { id: 'fig-04', nameEn: 'Silver Arrow', nameKa: 'ვერცხლის ისარი', code: 'SLV', primary: '#C8CDD3', secondary: '#0a8a7a', rarity: RARITY.COMMON, imageUrl: null },
  // Rare — 4
  { id: 'fig-05', nameEn: 'Energy Bolt', nameKa: 'ენერგიის მუხტი', code: 'ENB', primary: '#1B2A6B', secondary: '#E8333D', rarity: RARITY.RARE, imageUrl: null },
  { id: 'fig-06', nameEn: 'Emerald Drift', nameKa: 'ზურმუხტის დრიფტი', code: 'EMD', primary: '#1f6f4a', secondary: '#F4B8C4', rarity: RARITY.RARE, imageUrl: null },
  { id: 'fig-07', nameEn: 'Pink Bloom', nameKa: 'ვარდისფერი ყვავილი', code: 'PNK', primary: '#F4B8C4', secondary: '#d98a9b', rarity: RARITY.RARE, imageUrl: null },
  { id: 'fig-08', nameEn: 'Sunset Turbo', nameKa: 'მზის ჩასვლის ტურბო', code: 'SUN', primary: '#ff6b3d', secondary: '#FFC93C', rarity: RARITY.RARE, imageUrl: null },
  // Epic — 3
  { id: 'fig-09', nameEn: 'Midnight Panther', nameKa: 'შუაღამის პანტერა', code: 'MID', primary: '#0b0b0d', secondary: '#FFC93C', rarity: RARITY.EPIC, imageUrl: null },
  { id: 'fig-10', nameEn: 'Violet Velocity', nameKa: 'იასამნისფერი სისწრაფე', code: 'VIO', primary: '#6a2bb6', secondary: '#FFC93C', rarity: RARITY.EPIC, imageUrl: null },
  { id: 'fig-11', nameEn: 'Golden Pitstop', nameKa: 'ოქროს პიტსტოპი', code: 'GLD', primary: '#FFC93C', secondary: '#14171c', rarity: RARITY.EPIC, imageUrl: null },
  // Secret — 1 (the rare "chase" pull)
  { id: 'fig-12', nameEn: 'Crystal Champion', nameKa: 'ბროლის ჩემპიონი', code: 'CHM', primary: '#eef1f4', secondary: '#1c4fd6', rarity: RARITY.SECRET, imageUrl: null },
];

export const figuresByRarity = (rarity) => figures.filter((f) => f.rarity === rarity);

export const getFigureById = (id) => figures.find((f) => f.id === id);

const WEIGHTS = { [RARITY.COMMON]: 50, [RARITY.RARE]: 30, [RARITY.EPIC]: 16, [RARITY.SECRET]: 4 };

export const pickRandomFigure = () => {
  const roll = Math.random() * 100;
  let acc = 0;
  let chosenRarity = RARITY.COMMON;
  for (const tier of RARITY_ORDER) {
    acc += WEIGHTS[tier];
    if (roll <= acc) {
      chosenRarity = tier;
      break;
    }
  }
  const pool = figuresByRarity(chosenRarity);
  return pool[Math.floor(Math.random() * pool.length)];
};

