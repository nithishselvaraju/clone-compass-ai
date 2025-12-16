import React from 'react';
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
import { useNavigate } from 'react-router-dom';

const Overview = () => {

    const navigate = useNavigate();

    return (
        <div className="main-content" >

            <div className="hero-section">

                <div className="hero-content">
                    <h1>Start Your AI Journey</h1>
                    <p>
                        Compass is a cutting-edge AI platform designed to elevate productivity
                        and drive smarter decision-making.
                    </p>
                    <button className="explore-btn" onClick={() => navigate('/models')}>Explore models</button>
                </div>

                <div className="hero-card">

                    <h3>GPT-5</h3>
                    <p>
                        Advanced reasoning and generation for writing, coding, and problem solving.
                    </p>
                    <button className="check-btn">Check it out</button>
                </div>

            </div>

            <div className='overview'>
                <div className="card-container">
                    <div className="card-icon-wrapper">
                        <FiDatabase size={20} />
                    </div>

                    <h2 className="card-title">Database</h2>

                    <p className="card-description">
                        Connect and integrate external data sources to enable real-time access and retrieval of information. This allows the application to seamlessly pull, query, and update data from multiple systems, databases, or APIs, ensuring up-to-date insights and efficient data-driven operations.
                    </p>

                    <button className="card-button" onClick={() => navigate('/data-sources')}>Setup</button>
                </div>

                <div className="card-container">
                    <div className="card-icon-wrapper">
                        <FiSliders size={20} />

                    </div>

                    <h2 className="card-title">Fine Tuning</h2>

                    <p className="card-description">
                        Train models with your data to get more relevant results. Leverage powerful pretrained models as a foundation, then fine-tune them to improve performance for your specific tasks, domains, or workflows.
                    </p>

                    <button className="card-button" onClick={() => navigate('/data-training')}>Try it</button>
                </div>
            </div>


            <div className='overview'>
                <div className="card-container">
                    <div className="card-icon-wrapper">
                        <FiGitMerge size={20} />
                        {/* <span className="ai-badge">AI</span> */}
                    </div>

                    <h2 className="card-title">Agent Builder</h2>

                    <p className="card-description">
                        Intelligent assistants that work for your business. Automate tasks, streamline operations, and make real-time decisions—freeing your team to focus on growth. From support to workflows, they boost efficiency and drive innovation.
                    </p>

                    <button className="card-button" onClick={() => navigate('/workflows')} >Build</button>
                </div>

                <div className="card-container">
                    <div className="card-icon-wrapper">
                        <FiCheck size={20} />
                        {/* <span className="ai-badge">AI</span> */}
                    </div>

                    <h2 className="card-title">Rules</h2>

                    <p className="card-description">
                        Define and configure guardrails, restrictions, and conditions to control system behavior and enforce compliance. This ensures that operations, data processing, and model outputs adhere to organizational policies and desired constraints
                    </p>

                    <button className="card-button" onClick={() => navigate('/rules-setup')} >Setup</button>
                </div>
            </div>

        </div >
    );
};

export default Overview;
