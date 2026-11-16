import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Libros from './pages/Libros'
import { Routes, Route } from 'react-router'


function App() {

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path='' element={<Inicio />}/>
          <Route path='/catalogo' element={<Libros />}/>
        </Routes>
      </main>
      
      <Footer />
    </>
  )
}

export default App
