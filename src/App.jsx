import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNextValue, setWaitingForNextValue] = useState(false);

  const handleNumber = (num) => {
    if (waitingForNextValue) {
      setDisplay(num);
      setWaitingForNextValue(false);
    } else {
      setDisplay((prev) => (prev === '0' ? num : prev + num));
    }
  };

  const handleDecimal = () => {
    if (waitingForNextValue) {
      setDisplay('0.');
      setWaitingForNextValue(false);
    } else if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  };

  const handleOperator = (op) => {
    const current = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(current);
    } else if (operation) {
      const result = calculate(prevValue, current, operation);
      setDisplay(result.toString());
      setPrevValue(result);
    }

    setOperation(op);
    setWaitingForNextValue(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b !== 0 ? a / b : 'Error';
      default:
        return b;
    }
  };

  const handleEqual = () => {
    if (!operation || prevValue === null) return;

    const current = parseFloat(display);
    const result = calculate(prevValue, current, operation);

    setDisplay(result.toString());
    setPrevValue(null);
    setOperation(null);
    setWaitingForNextValue(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForNextValue(false);
  };

  const handleToggleSign = () => {
    setDisplay((prev) => {
      if (prev === '0') return '0';
      return (parseFloat(prev) * -1).toString();
    });
  };

  return (
    <div className="calculator">

      
      <div className="display">{display}</div>
<div className="description">This is the calculator app open by yogesh</div>
      <div className="buttons">
        
        <button className="btn btn-clear" onClick={handleClear}>C</button>
        <button className="btn btn-special" onClick={handleToggleSign}>+/-</button>
        <button className="btn btn-operator" onClick={() => handleOperator('/')}>÷</button>

        <button className="btn" onClick={() => handleNumber('7')}>7</button>
        <button className="btn" onClick={() => handleNumber('8')}>8</button>
        <button className="btn" onClick={() => handleNumber('9')}>9</button>
        <button className="btn btn-operator" onClick={() => handleOperator('*')}>×</button>

        <button className="btn" onClick={() => handleNumber('4')}>4</button>
        <button className="btn" onClick={() => handleNumber('5')}>5</button>
        <button className="btn" onClick={() => handleNumber('6')}>6</button>
        <button className="btn btn-operator" onClick={() => handleOperator('-')}>-</button>

        <button className="btn" onClick={() => handleNumber('1')}>1</button>
        <button className="btn" onClick={() => handleNumber('2')}>2</button>
        <button className="btn" onClick={() => handleNumber('3')}>3</button>
        <button className="btn btn-operator" onClick={() => handleOperator('+')}>+</button>

        <button className="btn btn-zero" onClick={() => handleNumber('0')}>0</button>
        <button className="btn" onClick={handleDecimal}>.</button>
        <button className="btn btn-equal" onClick={handleEqual}>=</button>
      </div>
    </div>
  );
}

export default App;