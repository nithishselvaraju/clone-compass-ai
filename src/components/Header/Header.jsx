import React from 'react';
import { FiMenu } from 'react-icons/fi';
import apexLogo from '../../assets/apex-logo.svg';
import ApexLogo from '../ApexLog.js'

const Header = ({ onToggleSidebar }) => (
    <header className="header">
        <div className="header-left">
            {/* <button className="menu-btn">☰</button> */}
            <button
                onClick={onToggleSidebar}
                className="menu-btn"
            >
                <FiMenu size={20} />
            </button>
            <div className="logo">

                {/* <div>Logo path: {apexLogo}</div> */}
                {/* <svg width="45" height="32" fill="#070707">
                    <use xlinkHref={`${apexLogo}#icon`} />
                </svg> */}
                <ApexLogo />
                <span className="logo-text">APEX AI 3</span>
            </div>
        </div>

        <div className="header-right">
            <button className="doc-btn">📄 Documentation ↗</button>
            <button className="workspace-btn">⊞ Workspace</button>
            <div className="user-menu">
                <span>Nithish</span>
                <span className="dropdown-arrow">▼</span>
            </div>
        </div>
    </header>
);

export default Header;
