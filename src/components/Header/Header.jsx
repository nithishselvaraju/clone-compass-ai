import React from 'react';
import { FiMenu } from 'react-icons/fi';
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
                <div className="logo-icon" />
                <span className="logo-text">APEX AI</span>
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
