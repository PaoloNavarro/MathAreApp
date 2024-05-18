export interface CalculatorState {
    currentValue: string;
    operator: string | null;
    previousValue: string | null;
  }
  
  export const initialState: CalculatorState = {
    currentValue: "0",
    operator: null,
    previousValue: null,
  };
  
  export const handleNumber = (value: string, state: CalculatorState): CalculatorState => {
    if (state.currentValue === "0") {
      return { ...state, currentValue: `${value}` };
    }
    return { ...state, currentValue: `${state.currentValue}${value}` };
  };
  
  const handleEqual = (state: CalculatorState): CalculatorState => {
    const { currentValue, previousValue, operator } = state;
    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue || '0');
    const resetState = { operator: null, previousValue: null };
  
    switch (operator) {
      case "+":
        return { ...state, currentValue: `${previous + current}`, ...resetState };
      case "-":
        return { ...state, currentValue: `${previous - current}`, ...resetState };
      case "*":
        return { ...state, currentValue: `${previous * current}`, ...resetState };
      case "/":
        return { ...state, currentValue: `${previous / current}`, ...resetState };
      default:
        return state;
    }
  };
  
  export const calculator = (type: string, value: string, state: CalculatorState): CalculatorState => {
    switch (type) {
      case "number":
        return handleNumber(value, state);
      case "clear":
        return initialState;
      case "posneg":
        return { ...state, currentValue: `${parseFloat(state.currentValue) * -1}` };
      case "percentage":
        return { ...state, currentValue: `${parseFloat(state.currentValue) * 0.01}` };
      case "operator":
        return { ...state, operator: value, previousValue: state.currentValue, currentValue: "0" };
      case "equal":
        return handleEqual(state);
      default:
        return state;
    }
  };
  