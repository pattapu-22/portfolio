// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import App from './App.jsx'
// // import Gallery from './Gallery';


// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>,
// // )

// import React, { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';

// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// import App from './App.jsx'; // Home page
// import Gallery from './Gallery.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/gallery" element={<Gallery />} />
//       </Routes>
//     </Router>
//   </StrictMode>,
// );
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App.jsx'; // Home page
import Gallery from './Gallery.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router basename="/portfolio">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  </StrictMode>,
);
