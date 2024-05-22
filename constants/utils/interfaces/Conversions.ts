interface Conversions {
    [category: string]: {
      options: { label: string; value: string }[];
      conversiones: { [from: string]: { [to: string]: number } };
    };
  }

  interface ConversionsV {
    options: { label: string, value: string }[];
    conversiones: { [key: string]: { [key: string]: number | { factor: number, offset: number } } };
  }