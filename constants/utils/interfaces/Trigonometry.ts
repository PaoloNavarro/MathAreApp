interface TrigonometryParameter {
    label: string;
    value: string;
  }
  interface TrigonometryFormula {
    parameters: string[];
    formula: string;
  }
  interface TrigonometryData {
    options: TrigonometryParameter[];
    formulas: {
      [key: string]: TrigonometryFormula;
    };
  }