import Layout from "./pages/Layout";
import Hero from "./components/Hero";
import WatchCarousel from "./components/WatchCarousel";
import './App.css';
import { Route, Routes } from "react-router-dom";
import CardInfo from "./pages/CardInfo";
import WatchList from "./pages/WatchList";
import Header from "./components/Header";
import ErrorBoundary from "./pages/ErrorBoundary";

function App() {
  return (
    <>
    <Header />
      <Layout currentRoute={window.location.pathname}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/cardinfo/:id" element={<CardInfo />} />
          <Route path="/error" element={<ErrorBoundary />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
