import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import CreatePortfolio from './pages/CreatePortfolio';
import Preview from './pages/Preview';
import AuthPage from './context/AuthContext';

function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
    <div className='app'>
      <Header/>
      <main>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<Preview/>} />
            <Route path="/profile" element={<Preview/>} />

        </Routes>    
      </main>
    </div>
   </Router>
  )
}

export default App
