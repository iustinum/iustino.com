import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import BlogLanding from './components/blog/BlogLanding';
import BlogPost from './components/blog/BlogPost';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<BlogLanding />} />
          <Route path="blog/:slug" element={<BlogPost />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;