import e from 'express';

export const semanticKeywords: Record<string, string[]> = {
  cheap: ['cheap', 'budget', 'affordable', 'low-cost', 'economical'],
  peaceful: ['peaceful', 'quiet', 'relaxing', 'calm', 'slow-paced'],
  nature: ['nature', 'mountains', 'landscape', 'scenic', 'outdoor'],
  culture: ['culture', 'museum', 'history', 'architecture', 'heritage'],
  romantic: ['romantic', 'couple', 'cozy', 'scenic', 'slow-paced'],
  luxury: ['luxury', 'premium', 'five-star', 'exclusive'],
  nightlife: ['nightlife', 'bars', 'clubs', 'entertainment'],
  family: ['family', 'children', 'safe', 'comfortable'],
  food: [
    'food',
    'culinary',
    'cuisine',
    'restaurants',
    'local food',
    'gastronomy',
  ],
  adventure: ['adventure', 'active', 'hiking', 'sports', 'outdoor'],
  beach: ['beach', 'sea', 'coast', 'seaside', 'swimming'],
  cityBreak: ['city break', 'urban', 'walkable', 'short trip', 'weekend'],
};

const europeanRegions = {
  benelux: ['Belgium', 'Netherlands', 'Luxembourg'],

  scandinavia: ['Denmark', 'Sweden', 'Norway', 'Finland', 'Iceland'],

  mediterranean: ['Italy', 'Spain', 'France', 'Turkey', 'Greece', 'Croatia'],

  westernEurope: [
    'France',
    'Spain',
    'Italy',
    'Denmark',
    'Netherlands',
    'Belgium',
  ],

  southernEurope: ['Italy', 'Spain', 'Greece', 'Croatia', 'Portugal'],
};

export const semanticLocations: Record<string, string[]> = {
  europe: [
    ...europeanRegions.benelux,
    ...europeanRegions.mediterranean,
    ...europeanRegions.scandinavia,
    ...europeanRegions.westernEurope,
    ...europeanRegions.southernEurope,
    'Albania',
    'Andorra',
    'Austria',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Poland',
    'Turkey',
  ],

  asia: [
    'Turkey',
    'Japan',
    'South Korea',
    'Thailand',
    'Indonesia',
    'Vietnam',
    'India',
    'Nepal',
  ],

  ...europeanRegions,
};
