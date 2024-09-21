import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import BlogList from './pages/blog/BlogList';
import BlogPost from './pages/blog/BlogPost';
import AlbumGallery from './pages/AlbumGallery';
import AlbumDetails from './pages/AlbumDetails';

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
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/gallery" element={<AlbumGallery />} />
          <Route path="/gallery/:albumName" element={<AlbumDetails />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;