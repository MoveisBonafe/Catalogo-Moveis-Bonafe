export interface PriceFilter {
  min?: number;
  max?: number;
}

export interface FilterState {
  priceRanges: string[];
  ratings: string[];
  brands: string[];
}

export interface SortOption {
  value: string;
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { value: "relevant", label: "Mais Relevantes" },
  { value: "price-low", label: "Menor Preço" },
  { value: "price-high", label: "Maior Preço" },
  { value: "rating", label: "Melhor Avaliados" },
  { value: "newest", label: "Mais Recentes" },
];

export const PRICE_RANGES = [
  { id: "0-50", label: "Até R$ 50", min: 0, max: 50 },
  { id: "50-100", label: "R$ 50 - R$ 100", min: 50, max: 100 },
  { id: "100-200", label: "R$ 100 - R$ 200", min: 100, max: 200 },
  { id: "200+", label: "Acima de R$ 200", min: 200 },
];

export const RATING_FILTERS = [
  { id: "5", label: "5 estrelas", rating: 5 },
  { id: "4+", label: "4+ estrelas", rating: 4 },
  { id: "3+", label: "3+ estrelas", rating: 3 },
];
