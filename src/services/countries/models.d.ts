export interface Country {
  name: string;
  alpha2Code: string;
}

export interface RegionsTable {
  caption: string;
  rows: Record<string, {
    columns: Record<string, string>;
  }>;
}
