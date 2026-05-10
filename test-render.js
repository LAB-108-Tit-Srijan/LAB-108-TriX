import React from 'react';
import { renderToString } from 'react-dom/server';
import BookingDrawer from './src/components/rentals/BookingDrawer.jsx';
import { rentals } from './src/data/rentalsData.js';

try {
  const html = renderToString(React.createElement(BookingDrawer, { rental: rentals[0], onClose: () => {} }));
  console.log("Render successful!");
} catch (e) {
  console.error("Render failed:", e);
}
