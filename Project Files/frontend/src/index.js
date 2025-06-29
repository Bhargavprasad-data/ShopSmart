// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { CartProvider } from './context/CartContext';

// ReactDOM.render(
//   <CartProvider>
//     <App />
//   </CartProvider>,
//   document.getElementById('root')
// );

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <CartProvider>
    <App />
  </CartProvider>
);
