export interface Car {
  id: number;
  brand: string;
  model: string;
  number: string;
  price: number;
  image: string | null;
  tarif: string[];
  images: { id: number; image: string }[];
}

export interface Filters {
  brands: string[];
  models: { [brand: string]: string[] };
  tarifs: string[];
}
