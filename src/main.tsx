import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import CaseStudies from './pages/CaseStudies'
import Portfolio from './pages/Portfolio'
import AboutUs from './pages/AboutUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Careers from './pages/Careers'
import Learning from './pages/Learning'
import ScrollToTop from './components/ScrollToTop'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
