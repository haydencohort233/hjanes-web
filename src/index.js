import React from 'react';
import ResponsiveWrapper from './ResponsiveWrapper';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ResponsiveWrapper />
  </React.StrictMode>
);