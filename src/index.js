import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Replace ReactDOM.render with createRoot
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
