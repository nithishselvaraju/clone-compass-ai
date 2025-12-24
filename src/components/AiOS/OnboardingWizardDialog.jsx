import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stepper,
    Step,
    StepLabel,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Checkbox,
    Chip,
    Typography,
    Button,
    Box,
    Divider,
    Paper
} from '@mui/material';

const OnboardingWizardDialog = ({ open, onClose, onComplete }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        companyName: '',
        industry: '',
        useCase: '',
        dataTypes: [],
        compliance: [],
        teamSize: '',
        modelPreference: ''
    });

    const industries = ['Insurance', 'Banking', 'Healthcare', 'Retail', 'Finance', 'Education', 'Manufacturing', 'Other'];
    const useCases = ['Customer Support', 'Claims Processing', 'Fraud Detection', 'Stock Analysis', 'Report Generation', 'Document Processing', 'HR Assistance', 'Other'];
    const dataTypes = ['Customer Data', 'Financial Records', 'Medical Records', 'Product Catalog', 'Market Data', 'Internal Documents', 'APIs/Webhooks', 'Databases'];
    const complianceFrameworks = ['GDPR', 'HIPAA', 'PCI-DSS', 'FINRA', 'SOC2', 'ISO27001'];

    const steps = ['Company Info', 'Business Domain', 'AI Purpose', 'Data & Compliance', 'Review'];

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            onComplete(formData);
            onClose();
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => setActiveStep(activeStep - 1);


    const inputSx = {
        "& .MuiOutlinedInput-root": {
            height: 44,
            backgroundColor: "#f4f5f6",
            borderRadius: "0px",
            border: "none",
            "& fieldset": {
                border: "none", // Remove border
            },
            "&:hover fieldset": {
                border: "none", // Remove border on hover
            },
            "&.Mui-focused fieldset": {
                border: "none", // Remove border on focus
                outline: "none",
            },
        },
        "& .MuiInputBase-input": {
            fontSize: "14px", // Adjust text size
            color: "#000000", // Text color
            padding: "0 12px", // Adjust padding
        },
    };

    const selectSx = {
        backgroundColor: "#f4f5f6",
        borderRadius: "0px",
        height: 44,
        "& .MuiSelect-select": {
            height: "44px !important",
            minHeight: "44px !important",
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            color: "#000000",
            padding: "0 12px !important",
        },
        "& fieldset": {
            border: "none", // Remove border
        },
        "&:hover fieldset": {
            border: "none", // Remove border on hover
        },
        "&.Mui-focused fieldset": {
            border: "none", // Remove border on focus
            outline: "none",
        },
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box className="space-y-4">

                        <Box>
                            <Typography variant="body2" fontWeight={450} fontSize={'15px'} color='#2f2f32' mb={1}>
                                Company Name
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Company Name"
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                sx={inputSx}
                            />
                        </Box>
                        {/* Team Size Field (styled like Source Type) */}
                        <Box>
                            <Typography
                                variant="body2"
                                fontWeight={450}
                                fontSize={'15px'}
                                color='#2f2f32'
                                mb={1}
                            >
                                Team Size
                            </Typography>
                            <TextField
                                select
                                fullWidth
                                value={formData.teamSize}
                                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                                sx={{
                                    ...inputSx,
                                    "& .MuiSelect-select": {
                                        display: "flex",
                                        alignItems: "center",
                                        height: "44px !important",
                                    },
                                }}
                                SelectProps={{
                                    displayEmpty: true,
                                    renderValue: (selected) => {
                                        if (!selected || selected === "") {
                                            return <span style={{ color: '#999' }}>Select Team Size</span>;
                                        }
                                        return selected;
                                    },
                                }}
                            >
                                <MenuItem value="">Select Team Size</MenuItem>
                                {['1-10', '11-50', '51-200', '201-1000', '1000+'].map(size => (
                                    <MenuItem key={size} value={size}>{size}</MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Box>
                );

            case 1:
                return (
                    <Box className="space-y-4">
                        {/* Industry Field (styled like Source Type) */}
                        <Box>
                            <Typography
                                variant="body2"
                                fontWeight={450}
                                fontSize={'15px'}
                                color='#2f2f32'
                                mb={1}
                            >
                                Industry
                            </Typography>
                            <TextField
                                select
                                fullWidth
                                value={formData.industry}
                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                sx={{
                                    ...inputSx,
                                    "& .MuiSelect-select": {
                                        display: "flex",
                                        alignItems: "center",
                                        height: "44px !important",
                                    },
                                }}
                                SelectProps={{
                                    displayEmpty: true,
                                    renderValue: (selected) => {
                                        if (!selected || selected === "") {
                                            return <span style={{ color: '#999' }}>Select Industry</span>;
                                        }
                                        return selected;
                                    },
                                }}
                            >
                                <MenuItem value="">Select Industry</MenuItem>
                                {industries.map(ind => (
                                    <MenuItem key={ind} value={ind}>{ind}</MenuItem>
                                ))}
                            </TextField>
                        </Box>

                        {/* Industry Description */}
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#666',
                                mt: 1,
                                fontStyle: 'italic'
                            }}
                        >
                            {formData.industry === 'Insurance' && 'We\'ll pre-configure policy lookup, claims processing, and compliance tools.'}
                            {formData.industry === 'Banking' && 'We\'ll pre-configure transaction analysis, fraud detection, and financial reporting tools.'}
                            {formData.industry === 'Healthcare' && 'We\'ll pre-configure HIPAA compliance, patient data handling, and medical terminology tools.'}
                            {formData.industry && !['Insurance', 'Banking', 'Healthcare'].includes(formData.industry) && 'We\'ll configure default AI tools for your industry.'}
                        </Typography>
                    </Box>
                );

            case 2:
                return (
                    <Box className="space-y-4">
                        {/* Primary Use Case Field */}
                        <Box>
                            <Typography
                                variant="body2"
                                fontWeight={450}
                                fontSize={'15px'}
                                color='#2f2f32'
                                mb={1}
                            >
                                Primary Use Case
                            </Typography>
                            <TextField
                                select
                                fullWidth
                                value={formData.useCase}
                                onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                                sx={{
                                    ...inputSx,
                                    "& .MuiSelect-select": {
                                        display: "flex",
                                        alignItems: "center",
                                        height: "44px !important",
                                    },
                                }}
                                SelectProps={{
                                    displayEmpty: true,
                                    renderValue: (selected) => {
                                        if (!selected || selected === "") {
                                            return <span style={{ color: '#999' }}>Select Primary Use Case</span>;
                                        }
                                        return selected;
                                    },
                                }}
                            >
                                <MenuItem value="">Select Primary Use Case</MenuItem>
                                {useCases.map(uc => (
                                    <MenuItem key={uc} value={uc}>{uc}</MenuItem>
                                ))}
                            </TextField>
                        </Box>

                        {/* Model Preference Field */}
                        <Box>
                            <Typography
                                variant="body2"
                                fontWeight={450}
                                fontSize={'15px'}
                                color='#2f2f32'
                                mb={1}
                            >
                                Model Preference
                            </Typography>
                            <TextField
                                select
                                fullWidth
                                value={formData.modelPreference}
                                onChange={(e) => setFormData({ ...formData, modelPreference: e.target.value })}
                                sx={{
                                    ...inputSx,
                                    "& .MuiSelect-select": {
                                        display: "flex",
                                        alignItems: "center",
                                        height: "44px !important",
                                    },
                                }}
                                SelectProps={{
                                    displayEmpty: true,
                                    renderValue: (selected) => {
                                        if (!selected || selected === "") {
                                            return <span style={{ color: '#999' }}>Select Model Preference</span>;
                                        }

                                        // Map values to display names
                                        const displayNames = {
                                            'openai': 'OpenAI GPT-4',
                                            'claude': 'Anthropic Claude',
                                            'llama': 'Meta Llama 3',
                                            'gemini': 'Google Gemini',
                                            'custom': 'Custom/Private Model'
                                        };
                                        return displayNames[selected] || selected;
                                    },
                                }}
                            >
                                <MenuItem value="">Select Model Preference</MenuItem>
                                <MenuItem value="openai">OpenAI GPT-4</MenuItem>
                                <MenuItem value="claude">Anthropic Claude</MenuItem>
                                <MenuItem value="llama">Meta Llama 3</MenuItem>
                                <MenuItem value="gemini">Google Gemini</MenuItem>
                                <MenuItem value="custom">Custom/Private Model</MenuItem>
                            </TextField>
                        </Box>
                    </Box>
                );

            case 3:
                return (
                    <Box className="space-y-4">
                        {/* Data Types Field */}
                        <Box>
                            <Typography
                                variant="body2"
                                fontWeight={450}
                                fontSize={'15px'}
                                color='#2f2f32'
                                mb={1}
                            >
                                Data Types You'll Use
                            </Typography>
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <Select
                                    multiple
                                    value={formData.dataTypes || []}
                                    onChange={(e) => setFormData({ ...formData, dataTypes: e.target.value })}
                                    displayEmpty
                                    renderValue={(selected) => {
                                        const selectedArray = Array.isArray(selected) ? selected : [];

                                        if (selectedArray.length === 0) {
                                            return <span style={{ color: '#999' }}>Select Data Types</span>;
                                        }
                                        return (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selectedArray.map(value => (
                                                    <Chip key={value} label={value} size="small" />
                                                ))}
                                            </Box>
                                        );
                                    }}
                                    sx={selectSx}

                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 300,
                                            },
                                        },
                                    }}
                                >
                                    {dataTypes.map(type => (
                                        <MenuItem key={type} value={type}>
                                            <Checkbox checked={(formData.dataTypes || []).includes(type)} />
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Compliance Requirements Field */}
                        <Box>
                            <Typography
                                variant="body2"
                                fontWeight={450}
                                fontSize={'15px'}
                                color='#2f2f32'
                                mb={1}
                            >
                                Compliance Requirements
                            </Typography>
                            <FormControl fullWidth>
                                <Select
                                    multiple
                                    value={formData.compliance || []}
                                    onChange={(e) => setFormData({ ...formData, compliance: e.target.value })}
                                    displayEmpty
                                    renderValue={(selected) => {
                                        const selectedArray = Array.isArray(selected) ? selected : [];

                                        if (selectedArray.length === 0) {
                                            return <span style={{ color: '#999' }}>Select Compliance Requirements</span>;
                                        }
                                        return (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selectedArray.map(value => (
                                                    <Chip key={value} label={value} size="small" />
                                                ))}
                                            </Box>
                                        );
                                    }}
                                    sx={selectSx}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 300,
                                            },
                                        },
                                    }}
                                >
                                    {complianceFrameworks.map(framework => (
                                        <MenuItem key={framework} value={framework}>
                                            <Checkbox checked={(formData.compliance || []).includes(framework)} />
                                            {framework}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                );

            case 4:
                return (
                    <Paper className="bg-gray-50" sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Configuration Summary</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Company:</Typography>
                                <Typography variant="body1" fontWeight="medium">{formData.companyName}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Industry:</Typography>
                                <Typography variant="body1" fontWeight="medium">{formData.industry}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Use Case:</Typography>
                                <Typography variant="body1" fontWeight="medium">{formData.useCase}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Model:</Typography>
                                <Typography variant="body1" fontWeight="medium">{formData.modelPreference}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Typography variant="body2" color="text.secondary">Data Types:</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: '60%' }}>
                                    {formData.dataTypes.map(type => (
                                        <Chip key={type} label={type} size="small" />
                                    ))}
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Typography variant="body2" color="text.secondary">Compliance:</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: '60%' }}>
                                    {formData.compliance.map(fw => (
                                        <Chip key={fw} label={fw} size="small" color="primary" />
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                );

            default:
                return null;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            {/* Header */}
            <DialogTitle>
                <Typography variant="h6" fontWeight="bold">
                    Configure Your AI Agent
                </Typography>
            </DialogTitle>

            <Divider />

            {/* Body */}
            <DialogContent sx={{ p: 0 }}>
                <Box sx={{ display: "flex", minHeight: "400px" }}>

                    <Box className="chat-pop-left"

                    >
                        {steps.map((label, index) => (
                            <Box
                                key={label}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 2,
                                    color: activeStep === index ? "#00bfa5" : "#666",
                                    fontWeight: activeStep === index ? "bold" : "normal",
                                }}
                            >
                                <Typography sx={{ width: 30, fontWeight: 'bold' }}>
                                    {`0${index + 1}`}
                                </Typography>
                                <Typography fontWeight={activeStep === index ? "bold" : "normal"}>
                                    {label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Right Content - Step Forms */}
                    <Box
                        sx={{
                            flex: 1,
                            p: 3,
                            overflowY: "auto"
                        }}
                    >
                        {renderStepContent(activeStep)}
                    </Box>
                </Box>
            </DialogContent>

            {/* Footer */}
            <DialogActions sx={{ p: 2 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#e0e0e0",
                        color: "#a6a6ae",
                        '&:hover': {
                            backgroundColor: "#d5d5d5"
                        }
                    }}
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{
                        backgroundColor: activeStep === 0 ? "#f5f5f5" : "#00bfa5",
                        color: activeStep === 0 ? "#a6a6ae" : "white",
                        '&:hover': {
                            backgroundColor: activeStep === 0 ? "#f5f5f5" : "#00a992"
                        }
                    }}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                        backgroundColor: "#00bfa5",
                        color: "white",
                        '&:hover': {
                            backgroundColor: "#00a992"
                        }
                    }}
                >
                    {activeStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
                </Button>
            </DialogActions>


        </Dialog>
    );
};

export default OnboardingWizardDialog;