import React from 'react';
import Header from "../components/Header";
import WatchCarousel from '../components/WatchCarousel';

export default function Layout({ children, currentRoute }) {
  const isHomePage = currentRoute === "/";

  return (
    <>
      <div className="container">
        {children}
        {currentRoute !== "/cardinfo/:id"}
      </div>
    </>
  );
}
