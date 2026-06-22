import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import RunsPage from './pages/RunsPage'
import RunDetail from './pages/RunDetail'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/runs" element={<RunsPage />} />
        <Route path="/run/:id" element={<RunDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
