
// ==================== COMPONENT 2: INTENT REGISTRY PAGE ====================
import React, { useState, useEffect } from 'react';
import {
    Paper, Typography, Grid, TextField, Button, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Card, CardContent, Slider, Box, FormControl,
    InputLabel, Select, MenuItem, List, ListItem, ListItemIcon,
    ListItemText, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import {
    Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon,
    Psychology as PsychologyIcon, SmartToy as SmartToyIcon,
    Category as CategoryIcon, Search as SearchIcon,
    ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

import DOMAIN_TEMPLATES from './DOMAIN_TEMPLATES';

export const IntentRegistryPage = ({ domain = 'insurance' }) => {
    const [intents, setIntents] = useState([]);
    const [activeIntent, setActiveIntent] = useState(null);
    const [newPhrase, setNewPhrase] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Load domain-specific intents
        if (DOMAIN_TEMPLATES[domain]) {
            setIntents(DOMAIN_TEMPLATES[domain].intents || []);
            if (DOMAIN_TEMPLATES[domain].intents?.length > 0) {
                setActiveIntent(DOMAIN_TEMPLATES[domain].intents[0]);
            }
        }
    }, [domain]);

    const handleAddPhrase = () => {
        if (!newPhrase.trim() || !activeIntent) return;

        const updatedIntents = intents.map(intent => {
            if (intent.id === activeIntent.id) {
                return {
                    ...intent,
                    userPhrases: [...intent.userPhrases, newPhrase.trim()]
                };
            }
            return intent;
        });

        setIntents(updatedIntents);
        setActiveIntent(updatedIntents.find(i => i.id === activeIntent.id));
        setNewPhrase('');
    };

    const handleAddIntent = () => {
        const newIntent = {
            id: `intent_${Date.now()}`,
            name: 'New Intent',
            description: 'Describe this intent',
            userPhrases: [],
            requiredParameters: [],
            confidenceThreshold: 0.8,
            capabilities: []
        };

        setIntents([...intents, newIntent]);
        setActiveIntent(newIntent);
    };

    const handleTestIntent = (userInput) => {
        // Simulate intent recognition
        const results = intents.map(intent => {
            const score = calculateIntentScore(intent, userInput);
            return { intent, score };
        }).sort((a, b) => b.score - a.score);

        console.log('Intent recognition results:', results);
        return results;
    };

    const calculateIntentScore = (intent, userInput) => {
        const inputLower = userInput.toLowerCase();
        let score = 0;

        intent.userPhrases.forEach(phrase => {
            const phraseLower = phrase.toLowerCase();
            if (inputLower.includes(phraseLower.split(' ')[0])) {
                score += 0.3;
            }
        });

        return Math.min(score, 1.0);
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PsychologyIcon /> Intent Registry
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Map user phrases to AI capabilities with confidence scoring
            </Typography>

            <Grid container spacing={3}>
                {/* Left: Intent List */}
                <Grid item xs={12} md={5}>
                    <Paper variant="outlined" sx={{ p: 2, height: '500px', overflow: 'auto' }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Search intents..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                                }}
                            />
                            <Button variant="outlined" onClick={handleAddIntent}>
                                <AddIcon />
                            </Button>
                        </Box>

                        <List>
                            {intents
                                .filter(intent =>
                                    !searchQuery ||
                                    intent.name.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                                .map(intent => (
                                    <ListItem
                                        key={intent.id}
                                        button
                                        selected={activeIntent?.id === intent.id}
                                        onClick={() => setActiveIntent(intent)}
                                        sx={{
                                            borderRadius: 1,
                                            mb: 1,
                                            border: '1px solid',
                                            borderColor: activeIntent?.id === intent.id ? 'primary.main' : 'transparent'
                                        }}
                                    >
                                        <ListItemIcon>
                                            <SmartToyIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={intent.name}
                                            secondary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                    <Chip label={`${intent.userPhrases.length} phrases`} size="small" />
                                                    <Chip
                                                        label={`${(intent.confidenceThreshold || 0.8) * 100}%`}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Right: Intent Details */}
                <Grid item xs={12} md={7}>
                    {activeIntent ? (
                        <Paper variant="outlined" sx={{ p: 3, height: '500px', overflow: 'auto' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Box>
                                    <Typography variant="h6">{activeIntent.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {activeIntent.description}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton size="small">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton size="small" color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>

                            {/* User Phrases */}
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                                    <CategoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                                    User Phrases & Examples
                                </Typography>

                                <Grid container spacing={1} sx={{ mb: 2 }}>
                                    {activeIntent.userPhrases.map((phrase, index) => (
                                        <Grid item xs={12} sm={6} key={index}>
                                            <Chip
                                                label={phrase}
                                                onDelete={() => {
                                                    // Handle delete phrase
                                                }}
                                                sx={{ width: '100%', justifyContent: 'space-between' }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>

                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Add new user phrase..."
                                        value={newPhrase}
                                        onChange={(e) => setNewPhrase(e.target.value)}
                                    />
                                    <Button variant="contained" onClick={handleAddPhrase}>
                                        Add
                                    </Button>
                                </Box>
                            </Box>

                            {/* Confidence Settings */}
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                                    Confidence Threshold: {Math.round((activeIntent.confidenceThreshold || 0.8) * 100)}%
                                </Typography>
                                <Slider
                                    value={(activeIntent.confidenceThreshold || 0.8) * 100}
                                    onChange={(e, value) => {
                                        // Update confidence threshold
                                    }}
                                    marks={[
                                        { value: 50, label: '50%' },
                                        { value: 75, label: '75%' },
                                        { value: 90, label: '90%' }
                                    ]}
                                    valueLabelDisplay="auto"
                                />
                            </Box>

                            {/* Intent Testing */}
                            <Box>
                                <Typography variant="subtitle2" sx={{ mb: 2 }}>Test Intent Recognition</Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Type a user query to test..."
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleTestIntent(e.target.value);
                                            }
                                        }}
                                    />
                                    <Button variant="outlined">Test</Button>
                                </Box>
                            </Box>
                        </Paper>
                    ) : (
                        <Paper variant="outlined" sx={{
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography color="text.secondary">Select an intent to configure</Typography>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};
