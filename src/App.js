import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import BlogLanding from './pages/blog/BlogLanding';
import BlogPost from './pages/blog/BlogPost';
import Art from './pages/Art';
import AlbumView from './components/AlbumView';

function App() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<BlogLanding />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/art" element={<Art />} />
          <Route path="/art/:albumName" element={<AlbumView />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;