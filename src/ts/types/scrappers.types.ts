type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type ScrapeResults = {
  [country: string]: {
    [category: string]: { apps: string[], subcategories?: { [subcategory: string]: string[] } }
  }
}
