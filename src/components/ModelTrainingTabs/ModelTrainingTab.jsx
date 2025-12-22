import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { FiDatabase, FiSliders, FiCheck } from 'react-icons/fi';
import DataTraining from '../../pages/DataTraining';
import FineTuning from '../../components/FineTuningForTab/FineTuning';
import RulesSetupStep from '../../components/RulesSetupStep';


import { Button, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider, IconButton, Slider, Menu, MenuItem } from "@mui/material";
import { PiPaintBrushHouseholdLight } from "react-icons/pi";
import { VscGitCompare } from "react-icons/vsc";
import { FaBarsProgress } from "react-icons/fa6";
import { IoMdPlay } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci"
import gpt from "../../assets/gpt-JRKBi7sz.svg"
import meta from "../../assets/meta-svg.svg"
import mbzuai from "../../assets/mbzuai.svg"
import inception from "../../assets/inception.svg"
import mistral from "../../assets/mistral.svg"
import stablediffusion from "../../assets/stablediffusion.png"
import anthropicCalude from "../../assets/anthropicCalude.svg"
import deepseek from "../../assets/deepseek.svg"
import qwen from "../../assets/qwen.svg"
import cohere from "../../assets/cohere.svg"
import xai from "../../assets/xai.svg"
import { MdVisibility, MdVisibilityOff } from "react-icons/md";



// TabPanel Component for content switching
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`model-training-tabpanel-${index}`}
            aria-labelledby={`model-training-tab-${index}`}
            {...other}
            className="hide-scrollbar"
            style={{
                height: '100%',
                overflowY: 'auto',
            }}
        >
            {value === index && (
                <Box sx={{ p: 0, height: '100%' }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const ModelTrainingTab = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [aiModel, setAiModel] = useState(false)
    const providers = [
        { name: "OpenAI", logo: gpt },
        { name: "Meta", logo: meta },
        { name: "MBZUAI", logo: mbzuai },
        { name: "Inception", logo: inception },
        { name: "Mistral AI", logo: mistral },
        { name: "Stability AI", logo: stablediffusion },
        { name: "Anthropic Claude", logo: anthropicCalude },
        { name: "DeepSeek", logo: deepseek },
        { name: "Qwen", logo: qwen },
        { name: "Cohere", logo: cohere },
        { name: "xAI", logo: xai },
    ];

    return (
        <div className='main-content' >
            {/* Header Section */}
            <div className="flex gap-2 justify-between items-center px-10 pt-4 pb-2">
                <div>
                    <h1 className="text-2xl font-bold text-black-500">Model Training</h1>
                    <p className="text-sm text-gray-600 mt-1">Configure and train your AI model with data, fine-tuning, and rules</p>
                </div>

                <button className="request-model-btn align-right"
                    onClick={() => setAiModel(true)}>Select Model</button>
            </div>

            {/* Horizontal Tabs */}
            <Box sx={{
                width: '100%',
                borderBottom: 1,
                borderColor: 'divider',
                px: 10
            }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    // textColor="#14e2b9ff"
                    // indicatorColor="#1fe4bcff"
                    sx={{
                        '& .MuiTab-root': {
                            fontSize: '14px',
                            fontWeight: 500,
                            textTransform: 'none',
                            minHeight: '60px',
                            color: '#807e7eff', // Default text color (gray)
                            '&.Mui-selected': {
                                color: '#000000ff', // Selected text color (teal)
                                fontWeight: 600,
                            },
                            '&:hover': {
                                color: '#000000ff', // Hover color (teal)
                            },
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#000000ff', // Indicator color (teal)
                        },
                    }}
                >
                    <Tab
                        icon={<FiDatabase size={20} />}
                        iconPosition="start"
                        label="Data Training"
                    />
                    <Tab
                        icon={<FiSliders size={20} />}
                        iconPosition="start"
                        label="Fine Tuning"
                    />
                    <Tab
                        icon={<FiCheck size={20} />}
                        iconPosition="start"
                        label="Rules Setup"
                    />
                </Tabs>
            </Box>

            {/* Scrollable Content Area - Hidden Scrollbars */}
            <div className="hide-scrollbar" style={{
                flex: 1,
                overflow: 'auto',
                padding: '0 40px'
            }}>
                <TabPanel value={value} index={0}>
                    <DataTraining />
                </TabPanel>
                <TabPanel value={value} index={1}>

                    <FineTuning />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <RulesSetupStep />
                </TabPanel>
            </div>

            <Dialog
                open={aiModel}
                maxWidth="md"
                fullWidth
            >
                {/* Header */}
                <DialogTitle>
                    <Typography variant="h6" fontWeight="bold">Select Model</Typography>
                </DialogTitle>

                <Divider />

                {/* Body */}
                <Box sx={{ display: "flex", height: "250px" }}>

                    {/* Left Sidebar */}
                    <Box className="chat-pop-left"
                    // sx={{
                    //   width: 220,
                    //   borderRight: "1px solid #e0e0e0",
                    //   backgroundColor: "#F4F5F6",
                    //   p: 2,
                    //   gap: 2
                    // }}
                    >
                        {[
                            { step: "01", label: "Provider", active: true },
                            { step: "02", label: "Models" },
                            { step: "03", label: "Compute" },
                            { step: "04", label: "Billing type" }
                        ].map((item) => (
                            <Box
                                key={item.step}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 2,
                                    color: item.active ? "#00bfa5" : "#666",
                                    fontWeight: item.active ? "bold" : "normal",


                                }}
                            >
                                <Typography sx={{ width: 30 }}>
                                    {item.step}
                                </Typography>
                                <Typography fontWeight="bold" >{item.label}</Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Right Content */}
                    <Box
                        sx={{
                            flex: 1,
                            p: 3,
                            overflowY: "auto"
                        }}
                    >
                        {providers.map((provider) => (
                            <Box
                                key={provider.name}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 3,
                                    px: 6,
                                    // py: 2,
                                    pt: 1,       // padding-top
                                    pb: 0,
                                    borderRadius: 2,
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "#f5f5f5",
                                    },
                                }}
                            >
                                <img
                                    src={provider.logo}
                                    alt={provider.name}
                                    style={{ width: 40, height: 40, objectFit: "contain" }}
                                />
                                <Typography fontWeight="bold" fontSize="18px" variant="h6">{provider.name}</Typography>
                            </Box>
                        ))}

                    </Box>
                </Box>



                {/* Footer */}
                <DialogActions sx={{ p: 2 }}>
                    <Button variant="contained" sx={{ backgroundColor: "#e0e0e0", color: "#a6a6ae" }} onClick={() => setAiModel(false)} >Cancel</Button>
                    <Button variant="contained" sx={{ backgroundColor: "#14eca4ff", color: "#fff" }}>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

// Add this CSS to hide scrollbars but keep functionality
const hideScrollbarStyles = `
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

/* Optional: Smooth scrolling */
.hide-scrollbar {
    scroll-behavior: smooth;
}
`;

// You can add these styles to your global CSS or inline
export default ModelTrainingTab;