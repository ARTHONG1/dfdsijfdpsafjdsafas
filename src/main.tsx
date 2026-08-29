import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { MobileSubmit } from './components/MobileSubmit';
import './index.css';

const isMobileSubmit = window.location.search.includes('mode=submit');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isMobileSubmit ? <MobileSubmit /> : <App />}
  </StrictMode>,
);

