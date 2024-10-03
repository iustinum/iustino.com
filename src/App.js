import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout.js';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Projects from './pages/Projects.js';
import BlogList from './pages/BlogList.js';
import BlogDetail from './pages/BlogDetail.js';
import AlbumGallery from './pages/AlbumGallery.js';
import AlbumDetails from './pages/AlbumDetails.js';

function App() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/gallery" element={<AlbumGallery />} />
          <Route path="/gallery/:albumName" element={<AlbumDetails />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;