import { React, useEffect } from 'react';
import CounterService from './CounterService';

const Header = () => {
  const counterService = CounterService();

  const handleIncrement = () => {
    counterService.incrementCounter();
  };

  return (
    <div style={{ backgroundColor: 'blue', padding: '10px', color: 'white' }}>
      <h1>Contenido hecho en React.js</h1>
      <div style={{display: "flex;"}}>
        <button onClick={handleIncrement}>Incrementar contador</button>
        <label htmlFor="">Total: {counterService.count}</label>
      </div>
    </div>
  );
};

export default Header;
