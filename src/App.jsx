import Header from "./components/Header"
import Hero from "./components/Hero"
import WatchCarousel from "./components/WatchCarousel"
import './App.css'

function App() {

  return (
    <>
      <Header />
      <WatchCarousel />
      <div className="container">
        <Hero />
      </div>
    </>
  )
}

export default App
