import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { FiDatabase, FiSliders, FiCheck } from 'react-icons/fi';
import DataTraining from '../../pages/DataTraining';
// import FineTuning from '../../pages/FineTuning';
import RulesSetupStep from '../../components/RulesSetupStep';

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

    return (
        <div className='main-content' style={{
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header Section */}
            <div className="flex gap-2 items-center px-10 pt-4 pb-2">
                <div>
                    <h1 className="text-2xl font-bold text-black-500">Model Training</h1>
                    <p className="text-sm text-gray-600 mt-1">Configure and train your AI model with data, fine-tuning, and rules</p>
                </div>
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
                    {/* <FineTuning /> */}
                    <div style={{
                        padding: '40px',
                        textAlign: 'center',
                        color: '#666',
                        minHeight: '300px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        Fine Tuning content will be available soon
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <RulesSetupStep />
                </TabPanel>
            </div>
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