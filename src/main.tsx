import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from "primereact/api";
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider value={{ unstyled: false }}>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
)
