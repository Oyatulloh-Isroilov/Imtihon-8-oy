import React, { useState, useEffect } from 'react';
import '../css/components.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';

function Header() {
    const [showWatchMenu, setShowWatchMenu] = useState(false);

    const toggleWatchMenu = () => {
        setShowWatchMenu(!showWatchMenu);
    };

    useEffect(() => {
        const closeWatchMenu = (e) => {
            if (!e.target.closest('.header')) {
                setShowWatchMenu(false);
            }
        };

        document.addEventListener('click', closeWatchMenu);

        return () => document.removeEventListener('click', closeWatchMenu);
    }, []);

    const handleHomeClick = () => {
        window.location.href = '/';
    };

    return (
        <>
            <div className="header">
                <h1 className='logo' onClick={handleHomeClick}>CRYPTOFOLIO</h1>
                <div className="headerWatch">
                    <select className='cryptoMoney'>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="RUBL">RUBL</option>
                    </select>
                    <Link className='watchLink' to="/watchlist">
                        <button className={`watchBtn ${showWatchMenu ? 'active' : ''}`} onClick={toggleWatchMenu}>
                            <RemoveRedEyeIcon className={`eyeIcon ${showWatchMenu ? 'green' : ''}`} />
                            WATCH LIST
                        </button>
                    </Link>
                </div>
            </div>
            {showWatchMenu && (
                <div className="watchMenu">
                    <h1 className='watchlistText'>WATCHLIST</h1>
                </div>
            )}
        </>
    );
}

export default Header;

    