import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    FiGrid,
    FiTarget,
    FiDatabase,
    FiSliders,
    FiGitMerge,
    FiHelpCircle,
    FiCheck,
    FiChevronLeft,
    FiChevronRight,
    FiHome
} from 'react-icons/fi';

const Sidebar = ({ activeView, setActiveView, collapsed }) => {
    const [expanded, setExpanded] = useState(true);



    const menuItems = [
        {
            icon: <FiHome />, label: 'Dashboard',
            children: [
                { label: 'Overview', path: '/' },
                { label: 'Providers', path: '/providers' },
            ],
        },
        { path: '/models', icon: <FiTarget />, label: 'Model Catalog' },
        {
            icon: <FiHome />, label: 'Playground',
            children: [
                { label: 'Chat', path: '/chat' },
                { label: 'Realtime', path: '/realtime' },
            ],
        },
        { path: '/data-sources', icon: <FiDatabase />, label: 'Data Sources' },
        { path: '/data-training', icon: <FiSliders />, label: 'Model Training' },
        // { path: '/workflows', icon: <FiGitMerge />, label: 'Agent Builder' },
        { path: '/rules-setup', icon: <FiCheck />, label: 'Rules setup' },


    ];


    const toggleSection = (key) =>
        setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

    return (

        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <nav className="sidebar-nav">
                <ul className="menu-list">
                    {menuItems.map((item) => (
                        <li key={item.label}>

                            {item.children ? (
                                <div key={item.label} className="nav-section">

                                    <div
                                        className="nav-item-header"
                                        onClick={() => toggleSection(item.label)}
                                    >
                                        {item.icon}
                                        {!collapsed && <span>{item.label}</span>}
                                        {!collapsed && (
                                            <span
                                                className={`arrow ${expanded[item.label] ? 'expanded' : ''}`}
                                            >
                                                ▼
                                            </span>
                                        )}
                                    </div>


                                    {!collapsed && expanded[item.label] && (

                                        <div className="nav-subitems">

                                            {item.children.map((child) => (
                                                <NavLink
                                                    key={child.path}
                                                    to={child.path}
                                                    end={child.path === '/'}
                                                    className={({ isActive }) =>
                                                        `nav-subitem ${isActive ? 'active' : ''}`
                                                    }
                                                >
                                                    <div style={{ paddingLeft: "33px" }} >
                                                        {child.label}
                                                    </div>
                                                </NavLink>
                                            ))}
                                        </div>

                                    )}
                                </div>
                            ) : (

                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? 'active' : ''}`
                                    }
                                >
                                    <span className="icon">{item.icon}</span>
                                    {!collapsed && <span>{item.label}</span>}
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Help */}
                <div className="help-button">
                    <FiHelpCircle size={22} color='#ffffff' />
                    {/* {!collapsed && <p>Help</p>} */}
                </div>
            </nav>
        </aside>


    );
};



export default Sidebar;
