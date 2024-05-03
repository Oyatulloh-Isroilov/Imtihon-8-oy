import React from 'react';
import Header from "../components/Header";
import WatchCarousel from '../components/WatchCarousel';

export default function Layout({ children, currentRoute }) {
  const isHomePage = currentRoute === "/"; // Check if home page

  return (
    <>
      {isHomePage && <Header />}
      <div className="container">
        <WatchCarousel />
        {children}
        {currentRoute !== "/cardinfo/:id"}
      </div>
    </>
  );
}
