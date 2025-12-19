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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const Overview = () => {

    const navigate = useNavigate();

    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: true,
        infinite: true
    };

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

                {/* <div className="hero-card">

                    <h3>GPT-5</h3>
                    <p>
                        Advanced reasoning and generation for writing, coding, and problem solving.
                    </p>
                    <button className="check-btn">Check it out</button>
                </div> */}

                <Slider {...settings} className="hero-card">
                    <div>
                        <h3>GPT-5</h3>
                        <p>Advanced model with enhanced understanding, reasoning, and generating human-like responses. it including writing, problem-solving, and conversation.</p>
                        <button className="check-btn">Check it out</button>
                    </div>

                    <div>
                        <h3>GPT-4.5</h3>
                        <p>GPT-4.5  offers faster performance making it ideal for well-defined tasks and clear, focused prompts.</p>
                        <button className="check-btn">Check it out</button>
                    </div>
                </Slider>

            </div>

            <div className='overview'>
                <div className="card-container">
                    <div className='card-head-title' >
                        <div className="card-icon-wrapper mb-3">
                            <FiDatabase size={30} />
                        </div>

                        <h1 className="card-title">Database</h1>
                    </div>


                    <p className="card-description">
                        Connect and integrate external data sources to enable real-time access and retrieval of information.This allows to seamlessly pull and update data from multiple systems, databases, or APIs.
                    </p>

                    <button className="card-button" onClick={() => navigate('/data-sources')}>Setup</button>
                </div>

                <div className="card-container">
                    <div className='card-head-title' >
                        <div className="card-icon-wrapper mb-3">
                            <FiSliders size={30} />

                        </div>

                        <h2 className="card-title">Fine Tuning</h2>
                    </div>
                    <p className="card-description">
                        Train models with your data to get more relevant results. Leverage powerful pretrained models as a foundation, then fine-tune them to improve performance for your specific tasks, domains, or workflows.
                    </p>

                    <button className="card-button" onClick={() => navigate('/data-training')}>Try it</button>
                </div>
            </div>


            <div className='overview'>
                <div className="card-container">
                    <div className='card-head-title' >
                        <div className="card-icon-wrapper mb-3">
                            <FiGitMerge size={30} />
                            {/* <span className="ai-badge">AI</span> */}
                        </div>

                        <h2 className="card-title">Agent Builder</h2>
                    </div>
                    <p className="card-description">
                        Intelligent assistants that work for your business. Automate tasks, streamline operations, and make real-time decisions—freeing your team to focus on growth. From support to workflows, they boost efficiency and drive innovation.
                    </p>

                    <button className="card-button" onClick={() => navigate('/workflows')} >Build</button>
                </div>

                <div className="card-container">
                    <div className='card-head-title' >
                        <div className="card-icon-wrapper mb-3">
                            <FiCheck size={30} />
                            {/* <span className="ai-badge">AI</span> */}
                        </div>

                        <h2 className="card-title">Rules</h2>
                    </div>
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
