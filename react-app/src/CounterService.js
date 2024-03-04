import { useState, useEffect, useRef } from 'react';

const CounterService = () => {
  const [count, setCount] = useState(0);
  const wsRef = useRef(null);

  useEffect(() => {
    // Crear el WebSocket al montar el componente
    wsRef.current = new WebSocket('ws://localhost:9001');

    // Manejar la apertura de la conexión WebSocket
    wsRef.current.onopen = () => {
      console.log('React: WebSocket connection established');
    };

    // Manejar los mensajes recibidos a través del WebSocket
    wsRef.current.onmessage = (event) => {
      console.log('React: Received message:', event.data);
    };

    // Manejar errores en la conexión WebSocket
    wsRef.current.onerror = (error) => {
      console.error('React: WebSocket error:', error);
    };

    // Manejar el cierre de la conexión WebSocket
    wsRef.current.onclose = () => {
      console.log('React: WebSocket connection closed');
    };

    // Retornar una función de limpieza para cerrar el WebSocket cuando el componente se desmonte
    return () => {
      wsRef.current.close();
    };
  }, []);

  const incrementCounter = () => {
    let newCount = count + 1;
    setCount(newCount);

    // Acceder al WebSocket a través de la referencia y enviar el mensaje
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ counterUpdate: newCount }));
    }
  };

  return {
    count,
    incrementCounter
  };
};

export default CounterService;
