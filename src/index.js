import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Function to clear localStorage once after a certain time
function clearLocalStorageOnce(expirationMinutes) {
    const expirationMs = expirationMinutes * 60 * 1000; // Convert minutes to milliseconds
    const clearFlag = 'localStorageClearedFlag';
  
    // Check if the clear flag exists in localStorage
    if (!localStorage.getItem(clearFlag)) {
      setTimeout(() => {
        localStorage.clear(); // Clear all items in localStorage
        localStorage.setItem(clearFlag, 'true'); // Set the clear flag in localStorage
      }, expirationMs);
    }
  }
  
// Replace ReactDOM.render with createRoot
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
clearLocalStorageOnce(30);
root.render(<App />);
