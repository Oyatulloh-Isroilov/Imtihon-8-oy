import React from 'react'

function Header() {
    return (
        <>
            <div className="header">
                <h1>CRYPTOFOLIO</h1>
                <div className="headerWatch">
                    <select>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="UZS">UZS</option>
                    </select>
                    <button>WATCH LIST</button>
                </div>
            </div>
        </>
    )
}

export default Header