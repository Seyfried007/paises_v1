export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  flags: {
    png: string;
    svg: string;
  };
  region: string;
  population: number;
  capital: string[];
}
