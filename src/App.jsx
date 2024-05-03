import Layout from "./pages/Layout";
import Hero from "./components/Hero";
import WatchCarousel from "./components/WatchCarousel";
import './App.css';
import { Route, Routes } from "react-router-dom";
import CardInfo from "./pages/CardInfo";

function App() {
  return (
    <>
      <Layout currentRoute={window.location.pathname}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/cardinfo/:id" element={<CardInfo />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
