interface AreaFormula {
    parameters: string[];
    formula: string;
  }
  
  interface Areas {
    options: { label: string; value: string }[];
    formulas: {
      [shape: string]: AreaFormula;
    };
  }
  