import Header from "./components/Header"
import Hero from "./components/Hero"
import WatchCarousel from "./components/WatchCarousel"
import './App.css'
import { Route, Routes } from "react-router-dom"
import CardInfo from "./pages/CardInfo"

function App() {

  return (
    <>
      <Header />
      <div className="container">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/" element={<WatchCarousel />} />
        <Route path="/cardinfo/:id" element={<CardInfo />} />
      </Routes>
      </div>
    </>
  )
}

export default App
