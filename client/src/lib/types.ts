export interface ProductImage {
  url: string;
  alt: string;
}

export interface ColorVariation {
  name: string;
  value: string;
  hex: string;
}

export const defaultColors: ColorVariation[] = [
  { name: "Cinza Escuro", value: "gray", hex: "#374151" },
  { name: "Azul Marinho", value: "blue", hex: "#1E3A8A" },
  { name: "Marrom Couro", value: "brown", hex: "#92400E" },
  { name: "Preto", value: "black", hex: "#000000" },
  { name: "Branco", value: "white", hex: "#FFFFFF" },
  { name: "Vermelho", value: "red", hex: "#DC2626" },
  { name: "Verde", value: "green", hex: "#059669" },
  { name: "Amarelo", value: "yellow", hex: "#D97706" },
];
